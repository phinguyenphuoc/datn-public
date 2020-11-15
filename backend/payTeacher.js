const CronJob = require("cron").CronJob;
const { query } = require("./config")
const moment = require('moment')
const _ = require('lodash')
const stripe = require('stripe')('sk_test_51HmJteHcZqoAfgJmAngCsK8vkon8zGmfqvCcPS5q286GRxIfxr8E0qjLACyttQwMsN3CLDcLWK4BnMCG3IiBhSXv00dMMjH21w');
const genInvoicePDF = require('./genInvoicePDF')
const { v4: uuidv4 } = require('uuid');

const getMonthEarningForTeacher = (startDate, endDate) => {
  return new Promise((resolve, reject) => {
    query(
      `
      SELECT 
      ARRAY_AGG(t.id) as ids,
      ARRAY_AGG(t.full_name) AS full_names,
      ARRAY_AGG(t.instrument) as instruments,
      ARRAY_AGG(t.profile_id) as profile_ids, 
      ARRAY_AGG(t.pricing_id) as prices_ids,
      ARRAY_AGG(t.total_lesson) as total_lessons,
      t.customer_id
      FROM
      (SELECT 
      l.id,
      l.teacher_id as profile_id,
      l.pricing_id,
      array_length(ARRAY_AGG(s.id),1) as total_lesson,
      CONCAT (p.first_name, ' ', p.last_name) AS full_name,
      i.name as instrument,
      c.customer_id
      FROM public.lesson l
      INNER JOIN public.schedule as s ON s.lesson_id = l.id
      INNER JOIN public.customer as c ON c.profile_id = l.teacher_id
      INNER JOIN public.profile as p ON p.id = l.student_id
      INNER JOIN public.instrument as i ON i.id = l.instrument_id
      WHERE ($1 >= l.start_date OR l.end_date >= $2)  
      AND s.lesson_date BETWEEN  $2 and $1
      AND l.status = $3 AND s.status = $4
      GROUP BY c.customer_id, l.id, p.id, i.id) as t
      GROUP BY t.customer_id`,
      [endDate, startDate, "active", "booked"],
      (err, result) => {
        if (err) {
          reject(err)
        } else {
          console.log(result.rows)
          resolve(result.rows)
        }
      }
    )
  })
}

const getPricingFromListPriceId = (prices_ids) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT * FROM public.pricing WHERE id = ANY ($1)`,
      [prices_ids],
      (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result.rows)
        }
      }
    )
  })
}

const insertInvoices = (startDate, endDate, lesson_id, total_lesson, amount, profile_id) => {
  return new Promise((resolve, reject) => {
    query(
      `INSERT INTO public.invoices(start_date, end_date, lesson_id, total_lesson, amount, profile_id) 
      VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
      [startDate, endDate, lesson_id, total_lesson, amount, profile_id],
      (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result.rows[0])
        }
      }
    )
  })
}

const updateInvoicePdfUrl = (id, url, tag) => {
  return new Promise((resolve, reject) => {
    query(
      `UPDate public.invoices
      SET invoice_pdf = $2,
      tag = $3
      WHERE id = $1 RETURNING *`,
      [id, url, tag],
      (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result.rows[0])
        }
      }
    )
  })
}

const payoutMoneyToTeacher = async (amount, customer_id) => {
  try {
    const transfer = await stripe.transfers.create({
      destination: customer_id,
      amount: amount,
      currency: 'usd',
    });
    return transfer
  } catch (err) {
    console.log('Error', err);
  }
}

const jobPayoutMoneyToTeacher = () => {
  shouldStart = false;
  const crawl = new CronJob(
    '*/10 * * * * *',
    async function () {
      console.log('You will see this message every start of the month', new Date());
      // if (0) {
      //   crawl.stop();
      // }
      const startDate = moment().format('YYYY-MM-DD')
      const endDate = moment().subtract(-1, 'months').format('YYYY-MM-DD')
      console.log({
        startDate, endDate
      })

      const result = await getMonthEarningForTeacher(startDate, endDate)
      let listPriceId = []
      result.forEach(item => {
        listPriceId = [...listPriceId, ...item.prices_ids]
      })
      listPriceId = _.uniq(listPriceId);
      console.log("listPriceId", listPriceId)
      const prices = await getPricingFromListPriceId(listPriceId)
      const priceObj = {}
      prices.forEach(price => {
        priceObj[`${price.id}`] = price.gross_price
      })

      console.log(priceObj)

      for (let i = 0; i < result.length; i++) {
        const item = result[i]
        const profile_id = item.profile_ids[0]
        let totalAmount = 0
        item.total_lessons.forEach((count, index) => {
          totalAmount += count * priceObj[`${item.prices_ids[index]}`]
        })
        console.log("totalAmount", totalAmount)
        if (totalAmount > 0) {
          await payoutMoneyToTeacher(totalAmount * 100, item.customer_id)
          const invoice = await insertInvoices(startDate, endDate, item.ids, item.total_lessons, totalAmount, profile_id)
          const pdfObjData = []
          item.ids.forEach((_row, index) => {
            pdfObjData.push({
              instrument: item.instruments[index].toUpperCase(),
              studentFullName: item.full_names[index],
              pricePerLesson: priceObj[`${item.prices_ids[index]}`],
              amount: item.ids.length,
              totalAmount,
            })
          })
          const uniqTag = uuidv4()
          const invoiceUrl = await genInvoicePDF(pdfObjData, startDate, endDate, uniqTag)
          console.log({
            invoiceUrl,
            id: invoice.id
          })
          await updateInvoicePdfUrl(invoice.id, invoiceUrl, uniqTag)
        }
      }
    },
    null,
    true,
    'America/Los_Angeles'
  );
};

module.exports = { jobPayoutMoneyToTeacher }
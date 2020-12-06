const CronJob = require("cron").CronJob;
const { query } = require("./config");
const getS3 = require('./aws-s3')
const s3 = getS3()
const STEP = 100;
const stripe = require('stripe')('sk_test_51HmJteHcZqoAfgJmAngCsK8vkon8zGmfqvCcPS5q286GRxIfxr8E0qjLACyttQwMsN3CLDcLWK4BnMCG3IiBhSXv00dMMjH21w');
const dateStep = 2

const getNext48HoursLessonUpcoming = () => {
  const startDate = new Date()
  const endDate = new Date(startDate.getTime() + 1000 * 60 * 60 * 24 * dateStep)
  const startDateFormat = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`
  const endDateFormat = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`
  console.log({
    startDateFormat, endDateFormat
  })
  return new Promise((resolve, reject) => {
    query(
      `SELECT
      s.id, 
      s.lesson_id,
      (c.customer_id) as customer,
      (c.payment_source) as payment_source,
      ARRAY_AGG(p.gross_price) as prices
      FROM schedule as s
      INNER JOIN public.lesson l ON l.id = s.lesson_id 
      INNER JOIN public.customer as c ON c.profile_id = l.student_id
      INNER JOIN public.pricing as p ON p.id = l.pricing_id
      WHERE s.lesson_date BETWEEN $1 AND $2 AND s.status = $3 
      GROUP BY s.id, l.student_id, c.customer_id`,
      [startDateFormat, endDateFormat, "booked"],
      (err, result) => {
        if (err) {
          reject(err)
        } else {
          const responseData = result.rows.map(item => {
            return {
              schedule_id: item.id,
              lesson_id: item.lesson_id,
              customer_id: item.customer,
              price_per_lesson: item.prices[0],
              payment_method: item.payment_source
            }
          })
          resolve(responseData)
        }
      }
    )
  })
}

const updateSchedulePaymentIntent = (id, payment_intent) => {
  return new Promise((resolve, reject) => {
    query(
      `UPDATE public.schedule
      set payment_intent = $2
      WHERE id = $1`,
      [id, payment_intent],
      (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      }
    )
  })
}

const chargeStudent = async (amount, customer_id, payment_method) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      customer: customer_id,
      payment_method: payment_method,
      off_session: true,
      confirm: true,
    });
    return paymentIntent.id
  } catch (err) {
    // Error code will be authentication_required if authentication is needed
    console.log('Error code is: ', err.code);
    const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
    console.log('PI retrieved: ', paymentIntentRetrieved.id);
  }
}

const jobChargeMoneyStudent = () => {
  shouldStart = false;
  const crawl = new CronJob(
    '0 0 */12 * * *',
    async function () {
      console.log('Charge money student', new Date());
      const studentChargeObj = await getNext48HoursLessonUpcoming()
      console.log("studentChargeObj", studentChargeObj)
      for (let i = 0; i < studentChargeObj.length; i++) {
        const item = studentChargeObj[i]
        const scheduleId = item.schedule_id
        const amount = item.price_per_lesson * 100;
        const payment_intent = await chargeStudent(amount, item.customer_id, item.payment_method)
        await updateSchedulePaymentIntent(scheduleId, payment_intent)
      }
    },
    null,
    true,
    'America/Los_Angeles'
  );
};

module.exports = { jobChargeMoneyStudent }
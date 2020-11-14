const CronJob = require("cron").CronJob;
const { query } = require("./config");
const getS3 = require('./aws-s3')
const s3 = getS3()
const STEP = 100;
let shouldStart = true; // Should start new cron job

const getNext48HoursLessonUpcoming = () => {
  const startDate = new Date()
  const endDate = new Date(startDate.getTime() + 1000 * 60 * 60 * 24 * 2)
  const startDateFormat = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`
  const endDateFormat = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`
  console.log({
    startDateFormat, endDateFormat
  })
  return new Promise((resolve, reject) => {
    query(
      `SELECT 
      s.lesson_id,
      ARRAY_AGG(l.id) as ids,
      ARRAY_AGG(l.student_id) as students,
      ARRAY_AGG(c.customer_id) as customers,
      ARRAY_AGG(c.payment_source) as payment_sources,
      ARRAY_AGG(p.gross_price) as prices
      FROM schedule as s
      INNER JOIN public.lesson l ON l.id = s.lesson_id 
      INNER JOIN public.customer as c ON c.profile_id = l.student_id
      INNER JOIN public.pricing as p ON p.id = l.pricing_id
      where s.lesson_date BETWEEN $1 AND $2 AND s.status = $3 GROUP BY s.lesson_id`,
      [startDateFormat, endDateFormat, "booked"],
      (err, result) => {
        if (err) {
          reject(err)
        } else {
          const responseData = result.rows.map(item => {
            return {
              lesson_id: item.lesson_id,
              student_id: item.students[0],
              total_lesson: item.ids.length,
              customer_id: item.customers[0],
              price_per_lesson: item.prices[0],
              payment_method: payment_sources[0]
            }
          })
          resolve(responseData)
        }
      }
    )
  })
}

const updateLessonChargeStatus = (lesson_ids) => {
  const startDate = new Date()
  const endDate = new Date(startDate.getTime() + 1000 * 60 * 60 * 24 * 2)
  const startDateFormat = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`
  const endDateFormat = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`
  console.log({
    startDateFormat, endDateFormat
  })
  return new Promise((resolve, reject) => {
    query(
      `UPDATE public.schedule
      set charged = $1
      WHERE lesson_id = ANY($2) and lesson_date BETWEEN $3 AND $4 `,
      [true, lesson_ids, startDateFormat, endDateFormat],
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
    '*/10 * * * * *',
    async function () {
      console.log('You will see this message every 10 second - UPDATE MISSING PRICE', new Date());
      // if (0) {
      //   crawl.stop();
      // }
      const studentChargeObj = await getNext48HoursLessonUpcoming()
      for (let i = 0; i < studentChargeObj.length; i++) {
        const item = studentChargeObj[i]
        const amount = item.total_lesson * item.price_per_lesson * 100;
        await chargeStudent(amount, item.customer_id, item.payment_method)
      }
      const lesson_ids = studentChargeObj.map(item => item.lesson_id)
      // await updateLessonChargeStatus(lesson_ids)
      // S3 upload invoice etc
    },
    null,
    true,
    'America/Los_Angeles'
  );
};

module.exports = { jobChargeMoneyStudent }
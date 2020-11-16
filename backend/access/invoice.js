const { query } = require('../config')
const moment = require('moment')

const getTeacherEarning = (teacher_id, date) => {
  const startDate = date + '-01'
  const endDate = moment(startDate).endOf('month').format('YYYY-MM-DD')
  console.log({ startDate, endDate, teacher_id })
  return new Promise((resolve, reject) => {
    query(
      `SELECT 
      i.start_date,
      i.end_date,
      array_length(i.lesson_id, 1) as total_class,
      i.total_lesson,
      i.amount,
      i.tag,
      i.invoice_pdf
      FROM public.invoices as i 
      WHERE profile_id = $1 AND start_date = $2 and end_date = $3`,
      [teacher_id, startDate, endDate],
      (error, results) => {
        if (error) {
          reject(error)
        } else {
          const responseData = results.rows.map(item => {
            return {
              ...item,
              total_lesson: item.total_lesson.reduce((a, b) => +a + +b, 0)
            }
          })
          resolve(responseData)
        }
      }
    )
  })
}

module.exports = { getTeacherEarning }
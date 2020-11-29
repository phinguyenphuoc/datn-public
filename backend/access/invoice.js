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

const getRecentEarning = (teacher_id, start_date, end_date) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT * FROM public.invoices
      WHERE profile_id = $1 AND start_date = $2 and end_date = $3`,
      [teacher_id, start_date, end_date],
      (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve(results.rows[0])
        }
      }
    )
  })
}

const getPeriodEarning = (lesson_ids, start_date, end_date) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT 
      to_char(s.lesson_date, 'YYYY-MM-DD') as date,
      s.status,
      pr.gross_price as earned, pr.duration,
      p.first_name,
      p.last_name
      FROM public.schedule as s
      INNER JOIN public.lesson as l ON s.lesson_id = l.id
      INNER JOIN public.pricing as pr ON pr.id = l.pricing_id
      INNER JOIN public.profile as p ON p.id = l.student_id
      WHERE s.lesson_id = ANY($1) AND s.lesson_date BETWEEN $2 AND $3`,
      [lesson_ids, start_date, end_date],
      (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve(results.rows)
        }
      }
    )
  })
}
module.exports = { getTeacherEarning, getRecentEarning, getPeriodEarning }
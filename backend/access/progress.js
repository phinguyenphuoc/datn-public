const { query } = require('../config')

const addReport = ({ bad_comment, comment, good_comment, level, rate_percentage, reported_date, title, lesson_id }) => {
  return new Promise((resolve, reject) => {
    query(
      `INSERT INTO public.progress_report(bad_comment, comment, good_comment, level, rate_percentage, reported_date, title, lesson_id)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [bad_comment, comment, good_comment, level, rate_percentage, reported_date, title, lesson_id],
      (err, results) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          resolve(results.rows[0])
        }
      }
    )
  })
}

const getProgress = (lesson_ids) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT rp.*, to_char(reported_date, 'YYYY-MM-DD') as reported_date, 
      p.first_name, p.last_name, p.avatar
      FROM public.progress_report rp
      INNER JOIN public.lesson as l ON l.id = rp.lesson_id
      INNER JOIN public.profile as p ON p.id = l.teacher_id
      WHERE rp.lesson_id = ANY($1)`,
      [lesson_ids],
      (err, results) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          resolve(results.rows)
        }
      }
    )
  })
}

module.exports = { addReport, getProgress }
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

module.exports = { addReport }
const { query } = require('../config')

const reportProblem = ({ lesson_id, issues, lesson_info, comment }) => {
  return new Promise((resolve, reject) => {
    query(
      `INSERT INTO public.report(lesson_id, issues, lesson_info, comment)
      VALUES($1,$2,$3,$4)`,
      [lesson_id, issues, lesson_info, comment],
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      }
    )
  })
}

module.exports = { reportProblem }

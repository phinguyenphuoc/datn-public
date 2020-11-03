const { query } = require('../config')

const bookingALesson = ({ teacher_profile_id, lessonType, instrument, level, price, description, student_profile_id }) => {
  return new Promise((resolve, reject) => {
    query(
      `INSERT INTO public.booking(teacher_profile_id, lesson_type, instrument_id, level, price_id, description, student_profile_id, approve)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [teacher_profile_id, lessonType, instrument, level, price, description, student_profile_id, false],
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

module.exports = { bookingALesson }
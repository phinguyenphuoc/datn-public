const { query } = require('../config')
const teacher = require('./teacher')

const createLesson = ({ booking_id, pricing_id, start_date, end_date, instrument_id, trial, frequency, language, status }) => {
  return new Promise((resolve, reject) => {
    query(
      `INSERT INTO public.lesson(booking_id, pricing_id, start_date, end_date, instrument_id, trial, frequency, language, status)
          VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [booking_id, pricing_id, start_date, end_date, instrument_id, trial, frequency, language, status],
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

const getActiveTeacherLesson = (teacher_profile_id) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT * FROM public.lesson WHERE teacher_id = $1`,
      [teacher_profile_id],
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

module.exports = { createLesson, getActiveTeacherLesson }
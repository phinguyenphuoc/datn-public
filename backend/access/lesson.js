const { query } = require('../config')

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

const getActiveStudentLesson = (student_profile_id) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT * FROM public.lesson WHERE student_id = $1`,
      [student_profile_id],
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

const getListStudentOfTeacher = (teacher_profile_id) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT p.*,
      ARRAY_AGG(l.instrument_id) as instrument_ids,
      ARRAY_AGG(m.type) as types,
      ARRAY_AGG(m.tag) as tags,
      ARRAY_AGG(m.url) as urls
      FROM public.lesson as l
      INNER JOIN public.profile as p ON l.student_id = p.id
      INNER JOIN public.media as m ON m.profile_id = l.student_id
      WHERE teacher_id = $1 GROUP BY p.id`,
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

const getLessonOfPairStudentAndTeacher = (teacher_profile_id, student_profile_id) => {
  console.log({ teacher_profile_id, student_profile_id })
  return new Promise((resolve, reject) => {
    query(
      `SELECT * FROM public.lesson WHERE student_id = $1 AND teacher_id = $2`,
      [student_profile_id, teacher_profile_id],
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

module.exports = {
  createLesson,
  getActiveTeacherLesson,
  getActiveStudentLesson,
  getListStudentOfTeacher,
  getLessonOfPairStudentAndTeacher
}
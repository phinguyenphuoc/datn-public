const { query } = require('../config')

const createLesson = ({ booking_id, pricing_id, start_date, end_date, instrument_id, frequency, language, status, teacher_id, student_id }) => {
  return new Promise((resolve, reject) => {
    query(
      `INSERT INTO public.lesson(booking_id, pricing_id, start_date, end_date, instrument_id, frequency, language, status, teacher_id, student_id)
          VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [booking_id, pricing_id, start_date, end_date, instrument_id, frequency, language, status, teacher_id, student_id],
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
      ARRAY_AGG(l.instrument_id) as instrument_ids
      FROM public.lesson as l
      INNER JOIN public.profile as p ON l.student_id = p.id
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

const cancelClass = (id) => {
  return new Promise((resolve, reject) => {
    query(
      `UPDATE public.lesson SET status = 'cancelled' WHERE id = $1 RETURNING *`,
      [id],
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
  getLessonOfPairStudentAndTeacher,
  cancelClass
}
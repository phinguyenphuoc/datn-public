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

const getTeacherPendingBooking = ({ teacher_profile_id }) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT b.*, p.first_name, p.last_name, p.phone_number, m.url FROM public.booking AS b
      INNER JOIN public.profile AS p ON b.student_profile_id = p.id 
      INNER JOIN public.media AS m ON b.student_profile_id = m.profile_id
      WHERE teacher_profile_id = $1 and approve = $2 and m.type = $3 and m.tag = $4`,
      [teacher_profile_id, false, "image", "avatar"],
      (error, results) => {
        if (error) {
          reject(error)
        } else {
          console.log(results.rows)
          const responseData = results.rows.map(booking => {
            return {
              id: booking.id,
              teacher_profile_id: booking.teacher_profile_id,
              student_profile_id: booking.student_profile_id,
              instrument_id: booking.instrument_id,
              level: booking.level,
              description: booking.description,
              approve: false,
              student: {
                first_name: booking.first_name,
                last_name: booking.last_name,
                avatar: booking.url,
                age: 18,
                phone: booking.phone_number || "0905030698"
              }
            }
          })
          resolve(responseData)
        }
      }
    )
  })
}

const getBookingInformation = (id, teacher_profile_id) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT * FROM public.booking WHERE id = $1 and teacher_profile_id = $2`,
      [id, teacher_profile_id],
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

const approveBooking = (id) => {
  return new Promise((resolve, reject) => {
    query(
      `UPDATE public.booking set approve = $1 WHERE id = $2 RETURNING *`,
      [true, id],
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

const getListStudentFromBooking = ({ booking_ids }) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT p.* FROM public.booking as b 
      INNER JOIN profile as p ON b.student_profile_id = p.id
      WHERE b.id = ANY ($1)`,
      [booking_ids],
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
module.exports = { bookingALesson, getTeacherPendingBooking, getBookingInformation, approveBooking, getListStudentFromBooking }
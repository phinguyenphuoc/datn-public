const { query } = require('../config')

const instruments = [
  "",
  'piano',
  'guitar',
  'violin',
  'cello',
  'ukulele',
  'flute',
  'saxophone',
  'bass guitar',
  'viola',
  'voice',
  'trumpet',
  'drums',
  'bassoon',
  'trombone',
  'upright bass',
  'music theory',
  'composition',
  'french horn'
]

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
      `SELECT b.*, p.first_name, p.last_name, p.phone_number, p.avatar FROM public.booking AS b
      INNER JOIN public.profile AS p ON b.student_profile_id = p.id 
      WHERE teacher_profile_id = $1 and approve = $2 `,
      [teacher_profile_id, false],
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
              instrument: instruments[booking.instrument_id],
              level: booking.level,
              description: booking.description,
              approve: false,
              student: {
                first_name: booking.first_name,
                last_name: booking.last_name,
                avatar: booking.avatar,
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

const getListTeacherForStudentFromBooking = (student_profile_id) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT p.*, 
      ARRAY_AGG(s.instrument_id) as instrument_ids,
      ARRAY_AGG(s.level) as levels
      FROM public.booking as b 
      INNER JOIN profile as p ON b.teacher_profile_id = p.id
      INNER JOIN skill as s ON s.profile_id = b.teacher_profile_id
      WHERE b.student_profile_id = $1 AND b.approve = $2 GROUP BY p.id`,
      [student_profile_id, true],
      (error, results) => {
        if (error) {
          reject(error)
        } else {
          const responseData = results.rows.map(item => {
            const skills = item.instrument_ids.map((id, index) => {
              return {
                level: item.levels[index],
                instrument: instruments[id]
              }
            })
            return {
              avatar: item.avatar,
              city: item.city,
              first_name: item.first_name,
              id: item.id,
              last_name: item.last_name,
              phone: item.phone_number,
              skills: skills
            }
          })
          resolve(responseData)
        }
      }
    )
  })
}

const getListActiveBookingForTeacher = (teacher_profile_id) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT * FROM public.booking
      WHERE teacher_profile_id = $1 and approve = $2`,
      [teacher_profile_id, true],
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

const getListActiveBookingForStudent = (student_profile_id) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT * FROM public.booking
      WHERE student_profile_id = $1 and approve = $2`,
      [student_profile_id, true],
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

const getSetupBooking = (lesson_id) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT b.*, p.first_name, p.last_name,
      p.avatar, p.phone_number, p.id 
      FROM public.lesson as l
      INNER JOIN public.booking as b ON l.booking_id = b.id
      INNER JOIN public.profile as p ON b.student_profile_id = p.id
      WHERE l.id = $1`,
      [lesson_id],
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
  bookingALesson,
  getTeacherPendingBooking,
  getBookingInformation,
  approveBooking,
  getListStudentFromBooking,
  getListTeacherForStudentFromBooking,
  getListActiveBookingForTeacher,
  getListActiveBookingForStudent,
  getSetupBooking
}
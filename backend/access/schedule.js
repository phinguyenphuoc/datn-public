const { query } = require('../config')
const moment = require('moment')

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

const createScheduleForLesson = ({ lesson_id, start_date, end_date, start_hour, end_hour }) => {
  const totalWeek = moment(end_date).diff(moment(start_date), 'weeks') + 1
  let valuesString = `VALUES('${start_date}', '${start_hour}', '${end_hour}', ${lesson_id}, 'booked'),`
  for (let i = 1; i < totalWeek; i++) {
    const date = moment(start_date).add(i, 'week').format('YYYY-MM-DD')
    valuesString += `('${date}', '${start_hour}', '${end_hour}', ${lesson_id}, 'booked'),`
  }
  valuesString = valuesString.slice(0, - 1)
  return new Promise((resolve, reject) => {
    query(
      `INSERT INTO public.schedule(lesson_date, start_hour, end_hour, lesson_id, status) ${valuesString}`,
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

const getScheduleDateInMonthForTeacher = (date, lesson_ids) => {
  const startOfMonth = date + '-01'
  const endOfMonth = moment(startOfMonth).endOf('month').format('YYYY-MM-DD');
  return new Promise((resolve, reject) => {
    query(
      `SELECT s.*, to_char(s.lesson_date, 'YYYY-MM-DD') as date, l.end_date, l.start_date, l.id AS lesson_id, l.instrument_id , b.teacher_profile_id,
      b.student_profile_id,
      p.first_name, p.last_name,m.url 
      FROM public.schedule AS s
      INNER JOIN public.lesson AS l ON s.lesson_id = l.id
      INNER JOIN public.booking as b ON l.booking_id = b.id
      INNER JOIN public.profile as p ON b.student_profile_id = p.id
      INNER JOIN public.media as m ON m.profile_id = b.student_profile_id
      WHERE s.lesson_date between $1 AND $2 AND m.type = $3 AND M.tag = $4 and s.lesson_id = ANY($5) ORDER BY s.lesson_date ASC`,
      [startOfMonth, endOfMonth, "image", "avatar", lesson_ids],
      (error, results) => {
        if (error) {
          reject(error)
        } else {
          const responseData = results.rows.map(item => {
            return {
              date: item.date,
              end_hour: item.end_hour,
              id: item.id,
              lesson: {
                end_date: item.end_date,
                start_date: item.start_date,
                id: item.lesson_id,
                instrument: instruments[item.instrument_id],
                student_info: `${item.first_name} ${item.last_name}`,
                student: {
                  id: item.student_profile_id,
                  avatar: item.url,
                  first_name: item.first_name,
                  last_name: item.last_name,
                  phone: "4004004004"
                }
              },
              start_hour: item.start_hour,
              type: item.status,
              zoom_meeting: null
            }
          })
          resolve(responseData)
        }
      }
    )
  })
}

const getScheduleDateInMonthForStudent = (date, lesson_ids) => {
  const startOfMonth = date + '-01'
  const endOfMonth = moment(startOfMonth).endOf('month').format('YYYY-MM-DD');
  return new Promise((resolve, reject) => {
    query(
      `SELECT s.*, to_char(s.lesson_date, 'YYYY-MM-DD') as date, l.end_date, l.start_date, l.id AS lesson_id, l.instrument_id , b.teacher_profile_id,
      b.teacher_profile_id,
      p.first_name, p.last_name, p.avatar
      FROM public.schedule AS s
      INNER JOIN public.lesson AS l ON s.lesson_id = l.id
      INNER JOIN public.booking as b ON l.booking_id = b.id
      INNER JOIN public.profile as p ON b.teacher_profile_id = p.id
      WHERE s.lesson_date between $1 AND $2 AND s.lesson_id = ANY($3)
      ORDER BY s.lesson_date ASC`,
      [startOfMonth, endOfMonth, lesson_ids],
      (error, results) => {
        if (error) {
          reject(error)
        } else {
          const responseData = results.rows.map(item => {
            return {
              date: item.date,
              end_hour: item.end_hour,
              id: item.id,
              lesson: {
                end_date: item.end_date,
                start_date: item.start_date,
                id: item.lesson_id,
                instrument: instruments[item.instrument_id],
                student_info: `${item.first_name} ${item.last_name}`,
                teacher: {
                  id: item.teacher_profile_id,
                  avatar: item.avatar,
                  first_name: item.first_name,
                  last_name: item.last_name,
                  phone: "4004004004"
                }
              },
              start_hour: item.start_hour,
              type: item.status,
              zoom_meeting: null
            }
          })
          resolve(responseData)
        }
      }
    )
  })
}


const cancelALessonSchedule = (id, reason, role) => {
  return new Promise((resolve, reject) => {
    query(
      `UPDATE public.schedule
      set status = $1,
      reason = $3,
      cancelled_by = $4
      WHERE id = $2 RETURNING *`,
      ["cancelled", id, reason, role],
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

const suspendLessonSchedule = (start_date, end_date, reason, lesson_id, role) => {
  return new Promise((resolve, reject) => {
    query(
      `UPDATE public.schedule
      set status = $4,
      reason = $3,
      cancelled_by = $6
      WHERE lesson_id = $5 and lesson_date BETWEEN $1 and $2 `,
      [start_date, end_date, reason, "cancelled", lesson_id, role],
      (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve(true)
        }
      }
    )
  })
}

const getUpcomingLesson = (lesson_id) => {
  return new Promise((resolve, reject) => {
    query(
      `
      SELECT 
      s.*, 
      to_char(s.lesson_date, 'YYYY-MM-DD') as date, 
      l.end_date, l.start_date, 
      l.id AS lesson_id, l.instrument_id
      FROM public.schedule AS s
      INNER JOIN public.lesson AS l ON s.lesson_id = l.id
      WHERE s.lesson_id = $1 and s.lesson_date > NOW() and s.status = 'booked'
      ORDER BY s.lesson_date ASC LIMIT 1`,
      // SELECT s.*, to_char(lesson_date, 'YYYY-MM-DD') as date FROM public.schedule as s
      // INNER JOIN public.lesson as l ON l.id = s.lesson_id
      // WHERE lesson_id = $1 and lesson_date > NOW() and status = 'booked' ORDER BY lesson_date ASC LIMIT 1`,
      [lesson_id],
      (error, results) => {
        if (error) {
          reject(error)
        } else {
          const item = results.rows[0]
          const responseData = {
            date: item.date,
            end_hour: item.end_hour,
            id: item.id,
            lesson: {
              end_date: item.end_date,
              start_date: item.start_date,
              id: item.lesson_id,
              instrument: instruments[item.instrument_id],
            },
            start_hour: item.start_hour,
            type: item.status,
            // zoom_meeting: "123",
            room_id: item.room_id
          }
          resolve(responseData)
        }
      }
    )
  })
}

const updateScheduleInvoiceUrl = (url, payment_intent) => {
  return new Promise((resolve, reject) => {
    query(
      `
      UPDATE public.schedule
      SET invoice_url = $1
      WHERE payment_intent = $2 RETURNING *`,
      [url, payment_intent],
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

const getInvoiceForStudentByMonth = (student_id, date) => {
  const startDate = date + '-01'
  const endDate = moment(startDate).endOf('month').format('YYYY-MM-DD')
  console.log({ startDate, endDate, student_id })
  return new Promise((resolve, reject) => {
    query(
      `
      SELECT
      s.id,
      s.start_hour,
      s.end_hour,
      to_char(s.lesson_date, 'YYYY-MM-DD') as lesson_date,
      s.invoice_url,
      p.first_name,
      p.last_name,
      pr.gross_price
      FROM public.schedule AS s
      INNER JOIN lesson AS l ON s.lesson_id = l.id
      INNER JOIN profile AS p ON l.teacher_id = p.id
      INNER JOIN pricing as pr ON l.pricing_id = pr.id
      WHERE l.student_id = $1 AND s.lesson_date BETWEEN $2 AND $3 AND s.invoice_url IS NOT NULL`,
      [student_id, startDate, endDate],
      (error, results) => {
        if (error) {
          reject(error)
        } else {
          console.log(results.rows)
          resolve(results.rows)
        }
      }
    )
  })
}

const getScheduleDateForParticularDateOfTeacher = (date, lesson_ids) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT s.*, to_char(s.lesson_date, 'YYYY-MM-DD') as date, l.end_date, l.start_date, l.id AS lesson_id, l.instrument_id , b.teacher_profile_id,
      b.teacher_profile_id,
      p.first_name, p.last_name, p.avatar
      FROM public.schedule AS s
      INNER JOIN public.lesson AS l ON s.lesson_id = l.id
      INNER JOIN public.booking as b ON l.booking_id = b.id
      INNER JOIN public.profile as p ON b.teacher_profile_id = p.id
      WHERE s.lesson_date =$1 and s.lesson_id = ANY($2)
      ORDER BY s.lesson_date ASC`,
      [date, lesson_ids],
      (error, results) => {
        if (error) {
          reject(error)
        } else {
          const responseData = results.rows.map(item => {
            return {
              date: item.date,
              end_hour: item.end_hour,
              id: item.id,
              lesson: {
                end_date: item.end_date,
                start_date: item.start_date,
                id: item.lesson_id,
                instrument: instruments[item.instrument_id],
                student_info: `${item.first_name} ${item.last_name}`,
                teacher: {
                  id: item.teacher_profile_id,
                  avatar: item.avatar,
                  first_name: item.first_name,
                  last_name: item.last_name,
                  phone: "4004004004"
                }
              },
              start_hour: item.start_hour,
              type: item.status,
              zoom_meeting: null
            }
          })
          resolve(responseData)
        }
      }
    )
  })
}

const rescheduleLessonSchedule = (schedule_id, lesson_date, start_hour, end_hour) => {
  console.log({ schedule_id, lesson_date, start_hour, end_hour })
  return new Promise((resolve, reject) => {
    query(
      `UPDATE public.schedule
      SET lesson_date = $1,
      start_hour = $2,
      end_hour = $3,
      status = $4
      WHERE id = $5
      RETURNING *`,
      [lesson_date, start_hour, end_hour, "rescheduled", schedule_id],
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
  createScheduleForLesson,
  getScheduleDateInMonthForTeacher,
  cancelALessonSchedule,
  suspendLessonSchedule,
  getScheduleDateInMonthForStudent,
  getUpcomingLesson,
  updateScheduleInvoiceUrl,
  getInvoiceForStudentByMonth,
  getScheduleDateForParticularDateOfTeacher,
  rescheduleLessonSchedule
}
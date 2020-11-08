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

const getScheduleDateInMonth = (date) => {
  const startOfMonth = date + '-01'
  const endOfMonth = moment(startOfMonth).endOf('month').format('YYYY-MM-DD');
  console.log(startOfMonth, endOfMonth)
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
      WHERE s.lesson_date between $1 AND $2 AND m.type = $3 AND M.tag = $4`,
      [startOfMonth, endOfMonth, "image", "avatar"],
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
                // teacher: {
                //   id: item.teacher_profile_id,
                //   avatar: "https://www.homemuse.io/api/v1/medias/MDY1MQMzE6NgMDI",
                //   first_name: "Phi",
                //   last_name: "Nguyen",
                //   phone: "4004004004"
                // },
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
module.exports = { createScheduleForLesson, getScheduleDateInMonth }
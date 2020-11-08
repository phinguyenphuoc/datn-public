const { query } = require('../config')
const moment = require('moment')

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

module.exports = { createScheduleForLesson }
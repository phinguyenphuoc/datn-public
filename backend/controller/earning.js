const { getProfileByUserId } = require('../access/common')
const { getRecentEarning, getPeriodEarning } = require('../access/invoice')
const { getActiveTeacherLesson } = require('../access/lesson')
const moment = require('moment')

const getRecentEarningAPI = async (req, res) => {
  const { sub } = req.body
  const profile = await getProfileByUserId(sub)
  const start_date = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD')
  const end_date = moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD')
  const payment_date = moment().endOf('month').format('YYYY-MM-DD')
  const earning = await getRecentEarning(profile.id, start_date, end_date)
  console.log(earning)
  let responseData = {
    start_date,
    end_date,
    payment_date,
    lessons_given: 0,
    turnover: 0
  };
  if (earning) {
    responseData = {
      start_date,
      end_date,
      payment_date,
      lessons_given: earning.total_lesson.length,
      turnover: earning.amount
    }
  }

  res.status(200).json(responseData)
}

const getPeriodEarningAPI = async (req, res) => {
  try {
    const { sub } = req.body
    const { date } = req.query
    const start_date = date + "-01";
    const end_date = moment(start_date).endOf('month').format('YYYY-MM-DD')
    const profile = await getProfileByUserId(sub)
    const activeLessons = await getActiveTeacherLesson(profile.id)
    const lesson_ids = activeLessons.map(item => item.id)
    const earnings = await getPeriodEarning(lesson_ids, start_date, end_date)
    res.status(200).json({
      status: "OK",
      earnings: earnings.map(item => {
        return {
          ...item,
          earned: item.status === 'cancelled' ? 0 : item.earned
        }
      })
    })
  } catch (err) {
    res.status(500).json({
      status: "FAILED"
    })
  }

}

module.exports = {
  getRecentEarningAPI,
  getPeriodEarningAPI
}
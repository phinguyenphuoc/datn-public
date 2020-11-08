const { getScheduleDateInMonth } = require('../access/schedule')

const getSchedulesAPI = async (req, res) => {
  try {
    const { sub } = req.body
    const { date } = req.query
    const schedules = await getScheduleDateInMonth(date)

    res.status(200).json({
      status: "OK",
      schedules: schedules
    })
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      error: error.message
    })
  }

}

module.exports = { getSchedulesAPI }
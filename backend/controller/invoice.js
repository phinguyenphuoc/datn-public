const { getTeacherEarning } = require('../access/invoice')
const { getProfileByUserId } = require('../access/common');

const getTeacherEarningAPI = async (req, res) => {
  const { sub } = req.body
  const { date } = req.query
  const profile = await getProfileByUserId(sub)
  const receipts = await getTeacherEarning(profile.id, date)
  res.status(200).json({
    status: "OK",
    receipts: receipts
  })
}

module.exports = { getTeacherEarningAPI }
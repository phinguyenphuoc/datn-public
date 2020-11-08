const { reportProblem } = require('../access/support')

const reportProblemAPI = async (req, res) => {
  try {
    const { lesson_id, issues, lesson_info, comment } = req.body;
    await reportProblem({ lesson_id, issues, lesson_info, comment })
    res.status(200).json({
      status: "OK"
    })
  } catch (error) {
    res.status(500).json({
      status: "FAILED"
    })
  }
}

module.exports = { reportProblemAPI }
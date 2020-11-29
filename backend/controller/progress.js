const { addReport } = require('../access/progress')
const { getProfileByUserId } = require('../access/common');
const { getLessonOfPairStudentAndTeacher } = require('../access/lesson')

const addProgressReportAPI = async (req, res) => {
  const { sub, progress_report } = req.body
  const { profile_id: student_profile_id } = req.query
  const { bad_comment, comment, good_comment, level, rate_percentage, reported_date, title } = progress_report
  const teacher_profile = await getProfileByUserId(sub)
  const lesson = await getLessonOfPairStudentAndTeacher(teacher_profile.id, student_profile_id)
  console.log(lesson)
  console.log({ bad_comment, comment, good_comment, level, rate_percentage, reported_date, title })
  const report = await addReport({ bad_comment, comment, good_comment, level, rate_percentage, reported_date, title, lesson_id: lesson.id })
  res.status(200).json({
    status: "OK"
  })
}

module.exports = { addProgressReportAPI }
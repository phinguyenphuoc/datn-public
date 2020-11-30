const { addReport, getProgress } = require('../access/progress')
const { getProfileByUserId } = require('../access/common');
const { getLessonOfPairStudentAndTeacher, getActiveStudentLesson } = require('../access/lesson');

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

const getStudentProgressReportAPI = async (req, res) => {
  try {
    const { sub } = req.body
    const { last } = req.query
    console.log({ last })
    const student_profile = await getProfileByUserId(sub)
    const lessons = await getActiveStudentLesson(student_profile.id)
    const lesson_ids = lessons.map(item => item.id)
    console.log({ lesson_ids })
    const progresses = await getProgress(lesson_ids)
    const responseData = progresses.map(item => {
      return {
        comment: item.comment,
        teacher: {
          first_name: item.first_name,
          last_name: item.last_name,
          avatar: item.avatar
        },
        pieces: [{
          title: item.title,
          rate: 3,
          bad_comment: item.bad_comment,
          good_comment: item.good_comment,
          rate_percentage: item.rate_percentage,
        }],
        id: item.id,
        lesson_id: item.lesson_id,
        level: item.level,
        reported_date: item.reported_date,

      }
    })
    res.status(200).json({
      status: "OK",
      progress_reports: responseData
    })
  } catch (err) {
    res.status(500).json({
      status: "FAILED",
      message: err.message
    })
  }
}

module.exports = { addProgressReportAPI, getStudentProgressReportAPI }
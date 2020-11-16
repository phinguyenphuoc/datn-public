const {
  getScheduleDateInMonthForTeacher,
  getScheduleDateInMonthForStudent,
  cancelALessonSchedule,
  suspendLessonSchedule,
  getUpcomingLesson,
  getInvoiceForStudentByMonth
} = require('../access/schedule')
const { getProfileByUserId } = require('../access/common');
const {
  getActiveStudentLesson,
  getActiveTeacherLesson,
  getLessonOfPairStudentAndTeacher
} = require('../access/lesson')
const getSchedulesAPI = async (req, res) => {
  try {
    const { sub, role } = req.body
    const { date } = req.query
    let lessons = []
    let schedules = []
    const profile = await getProfileByUserId(sub)
    const profile_id = profile.id
    if (role === "student") {
      lessons = await getActiveStudentLesson(profile_id)
      const lesson_ids = lessons.map(lesson => lesson.id)
      schedules = await getScheduleDateInMonthForStudent(date, lesson_ids)
    } else {
      lessons = await getActiveTeacherLesson(profile_id)
      const lesson_ids = lessons.map(lesson => lesson.id)
      schedules = await getScheduleDateInMonthForTeacher(date, lesson_ids)
    }
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

const suspendLessonAPI = async (req, res) => {
  try {
    const { cancel, role } = req.body
    const { id } = req.params
    const { start_date, end_date, message } = cancel
    if (role === "student") {
      await suspendLessonSchedule(start_date, end_date, "student cancel this lesson", id, role)
    } else {
      await suspendLessonSchedule(start_date, end_date, message, id, role)
    }
    res.status(200).json({
      status: "OK"
    })
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: error.message
    })
  }
}

const cancelLessonAPI = async (req, res) => {
  try {
    const { cancel, role } = req.body
    const { id } = req.params
    if (role === "student") {
      await cancelALessonSchedule(id, "student cancel this lesson", role)
      res.send({
        status: "OK"
      })
    } else {
      const { message, recurrence } = cancel
      if (recurrence === "one") {
        await cancelALessonSchedule(id, message, role)
        res.send({
          status: "OK"
        })
      }
    }
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: error.message
    })
  }
}

const getUpcomingLessonAPI = async (req, res) => {
  try {
    const { profile_id } = req.query
    const { sub, role } = req.body
    const user_profile = await getProfileByUserId(sub)
    let lesson
    if (role === "student") {
      lesson = await getLessonOfPairStudentAndTeacher(profile_id, user_profile.id) // profile_id gui len la cua teacher
    } else {
      lesson = await getLessonOfPairStudentAndTeacher(user_profile.id, profile_id) // profile_id gui len la cua student
    }
    const upcomingLesson = await getUpcomingLesson(lesson.id)
    res.status(200).json({
      status: "OK",
      schedules: [{ ...upcomingLesson, zoom_meeting: "123", instrument: "piano" }]
    })
  } catch (error) {
    res.status(500).json({
      status: "FAIL",
      error: error.message
    })
  }
}

const getStudentInvoicesAPI = async (req, res) => {
  const { sub } = req.body
  const { date } = req.query
  console.log({ sub, date })
  const profile = await getProfileByUserId(sub)
  const result = await getInvoiceForStudentByMonth(profile.id, date)
  res.status(200).json({
    status: "OK",
    invoices: result
  })
}

module.exports = {
  getSchedulesAPI,
  suspendLessonAPI,
  cancelLessonAPI,
  getUpcomingLessonAPI,
  getStudentInvoicesAPI
}
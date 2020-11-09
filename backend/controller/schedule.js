const {
  getScheduleDateInMonthForTeacher,
  getScheduleDateInMonthForStudent,
  cancelALessonSchedule,
  suspendLessonSchedule
} = require('../access/schedule')
const { getProfileByUserId } = require('../access/common');
const { getActiveStudentLesson, getActiveTeacherLesson } = require('../access/lesson')
const getSchedulesAPI = async (req, res) => {
  try {
    const { sub, role } = req.body
    const { date } = req.query
    let lessons = []
    let schedules = []
    const profile = await getProfileByUserId(sub)
    const profile_id = profile.id
    console.log("profile_id", profile_id)
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
module.exports = {
  getSchedulesAPI,
  suspendLessonAPI,
  cancelLessonAPI
}
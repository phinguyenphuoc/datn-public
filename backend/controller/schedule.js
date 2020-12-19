const {
  getScheduleDateInMonthForTeacher,
  getScheduleDateInMonthForStudent,
  cancelALessonSchedule,
  suspendLessonSchedule,
  getUpcomingLesson,
  getInvoiceForStudentByMonth,
  getScheduleDateForParticularDateOfTeacher,
  rescheduleLessonSchedule,
  getStudentEmailByScheduleId,
  getTeacherEmailByScheduleId,
  cancelAllLessonSchedule
} = require('../access/schedule')
const { getProfileByUserId } = require('../access/common');
const {
  getActiveStudentLesson,
  getActiveTeacherLesson,
  getLessonOfPairStudentAndTeacher,
  cancelClass
} = require('../access/lesson')

const sendMail = require('../utils/email');
const moment = require('moment')

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
      if (date.length === 10) {

      } else {
        schedules = await getScheduleDateInMonthForStudent(date, lesson_ids)
      }
    } else {
      lessons = await getActiveTeacherLesson(profile_id)
      const lesson_ids = lessons.map(lesson => lesson.id)
      if (date.length === 10) {
        schedules = await getScheduleDateForParticularDateOfTeacher(date, lesson_ids)
      } else {
        schedules = await getScheduleDateInMonthForTeacher(date, lesson_ids)
      }
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
  // Send email
  try {
    const { cancel, role, sub } = req.body
    const { id } = req.params
    const { start_date, end_date, message } = cancel
    const profile = await getProfileByUserId(sub)
    if (role === "student") {
      const schedule = await suspendLessonSchedule(start_date, end_date, "student cancel this lesson", id, role)
      const teacherEmail = await getTeacherEmailByScheduleId(schedule.id)
      console.log("teacherEmail", teacherEmail);
      sendMail(
        teacherEmail,
        'Cancel Lesson',
        `Lesson with Student ${profile.first_name} ${profile.last_name} from ${start_date} to ${end_date} has been cancelled`
      )
    } else {
      const schedule = await suspendLessonSchedule(start_date, end_date, message, id, role)
      const studentEmail = await getStudentEmailByScheduleId(schedule.id)
      console.log("studentEmail", studentEmail);
      sendMail(
        studentEmail,
        'Cancel Lesson',
        `Lesson with Teacher ${profile.first_name} ${profile.last_name} from ${start_date} to ${end_date} has been cancelled`
      )
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
  // Send email
  try {
    const { cancel, role, sub } = req.body
    const { id } = req.params
    const profile = await getProfileByUserId(sub)
    if (role === "student") {
      const schedule = await cancelALessonSchedule(id, "student cancel this lesson", role)
      const teacherEmail = await getTeacherEmailByScheduleId(schedule.id)
      console.log("teacherEmail", teacherEmail);
      sendMail(
        teacherEmail,
        'Cancel Lesson',
        `Lesson with Student ${profile.first_name} ${profile.last_name} at ${moment(schedule.lesson_date).format('YYYY-MM-DD')} ${schedule.start_hour}-${schedule.end_hour} has been cancelled`
      )
      res.send({
        status: "OK"
      })
    } else {
      const { message, recurrence } = cancel
      if (recurrence === "one") {
        const schedule = await cancelALessonSchedule(id, message, role)
        const studentEmail = await getStudentEmailByScheduleId(schedule.id)
        console.log("studentEmail", studentEmail);
        sendMail(
          studentEmail,
          'Cancel Lesson',
          `Lesson with Teacher ${profile.first_name} ${profile.last_name} at ${moment(schedule.lesson_date).format('YYYY-MM-DD')} ${schedule.start_hour}-${schedule.end_hour} has been cancelled`
        )
        res.send({
          status: "OK"
        })
      } else {
        const schedule = await cancelAllLessonSchedule(id, message, role)
        await cancelClass(schedule.lesson_id)
        const studentEmail = await getStudentEmailByScheduleId(schedule.id)
        sendMail(
          studentEmail,
          'Cancel Class',
          `Class with Teacher ${profile.first_name} ${profile.last_name} has been cancelled by your teacher with reason ${message}`
        )
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
  const profile = await getProfileByUserId(sub)
  const result = await getInvoiceForStudentByMonth(profile.id, date)
  res.status(200).json({
    status: "OK",
    invoices: result
  })
}

const rescheduleScheduleAPI = async (req, res) => {
  try {
    const { schedule_id } = req.params
    const { sub, schedule } = req.body
    const profile = await getProfileByUserId(sub);

    const { lesson_date, start_hour, end_hour } = schedule;
    const scheduleUpdated = await rescheduleLessonSchedule(schedule_id, lesson_date, start_hour, end_hour)
    const studentEmail = await getStudentEmailByScheduleId(scheduleUpdated.id)
    sendMail(
      studentEmail,
      'Reschedule Lesson',
      `Lesson with teacher ${profile.first_name} ${profile.last_name} has been rescheduled to ${lesson_date} ${start_hour}-${end_hour}`
    )
    res.status(200).json({
      status: "OK"
    })
  } catch (err) {
    res.status(500).json({
      status: "FAILED",
      error: err.message
    })
  }


}
module.exports = {
  getSchedulesAPI,
  suspendLessonAPI,
  cancelLessonAPI,
  getUpcomingLessonAPI,
  getStudentInvoicesAPI,
  rescheduleScheduleAPI
}
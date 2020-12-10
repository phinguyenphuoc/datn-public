const { bookingALesson, getSetupBooking } = require('../access/booking');
const { getProfileByUserId, getEmailOfProfile } = require('../access/common');
const sendMail = require('../utils/email');

const instruments = [
  "",
  'piano',
  'guitar',
  'violin',
  'cello',
  'ukulele',
  'flute',
  'saxophone',
  'bass guitar',
  'viola',
  'voice',
  'trumpet',
  'drums',
  'bassoon',
  'trombone',
  'upright bass',
  'music theory',
  'composition',
  'french horn'
]

const registerPendingStudentAPI = async (req, res) => {
  try {
    const { teacher_profile_id, lessonType, instrument, level, duration, price, description, sub } = req.body
    const studentProfile = await getProfileByUserId(sub);
    const student_profile_id = studentProfile.id;
    await bookingALesson({ teacher_profile_id, lessonType, instrument, level, duration, price, description, student_profile_id })
    const teacherEmail = await getEmailOfProfile(teacher_profile_id)
    console.log("teacherEmail", teacherEmail)
    sendMail(teacherEmail, "New Student Booking", "A new student has just booked your class, please go to your dashboard for more details");
    res.status(200).json({
      status: "OK",
      message: "Booking a lesson successfully"
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: "FAILED",
      message: error.message
    })
  }
}

const getSetupBookingAPI = async (req, res) => {
  const { lesson_id } = req.params
  console.log({ lesson_id })
  const booking = await getSetupBooking(lesson_id)
  const response = {
    approve: booking.approve,
    description: booking.description,
    id: booking.id,
    instrument_id: booking.instrument_id,
    level: booking.level,
    instrument: instruments[booking.instrument_id],
    student_profile_id: booking.student_profile_id,
    teacher_profile_id: booking.teacher_profile_id,
    student: {
      first_name: booking.first_name,
      last_name: booking.last_name,
      avatar: booking.avatar,
      age: 18,
      phone: booking.phone_number,
      id: booking.id
    }
  }
  res.status(200).json({
    status: "OK",
    booking: response
  })
}

module.exports = {
  registerPendingStudentAPI,
  getSetupBookingAPI
}
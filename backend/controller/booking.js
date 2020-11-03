const { bookingALesson } = require('../access/booking');
const { getProfileByUserId } = require('../access/common');

const registerPendingStudentAPI = async (req, res) => {
  try {
    const { teacher_profile_id, lessonType, instrument, level, duration, price, description, sub } = req.body
    const studentProfile = await getProfileByUserId(sub);
    const student_profile_id = studentProfile.id;
    await bookingALesson({ teacher_profile_id, lessonType, instrument, level, duration, price, description, student_profile_id })
    res.status(200).json({
      status: "OK",
      message: "Booking a lesson successfully"
    })
  } catch (error) {
    res.status(400).json({
      status: "FAILED",
      message: error.message
    })
  }


}
module.exports = { registerPendingStudentAPI }
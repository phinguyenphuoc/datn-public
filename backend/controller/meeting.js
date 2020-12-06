const {
  getMeetingRoomStudentInfo,
  getMeetingRoomTeacherInfo
} = require('../access/schedule');

const getMeetingRoomInformationAPI = async (req, res) => {
  const { roomId } = req.query;
  let student, teacher;
  await Promise.all([
    getMeetingRoomStudentInfo(roomId),
    getMeetingRoomTeacherInfo(roomId)
  ])
    .then(results => {
      student = results[0];
      teacher = results[1];
    })
  res.status(200).json({
    status: "OK",
    student,
    teacher
  })
}

module.exports = { getMeetingRoomInformationAPI }
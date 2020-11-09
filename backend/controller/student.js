const { getStudentProfile } = require("../access/student");
const { getListTeacherForStudentFromBooking } = require('../access/booking')
const { getMedias, getPricing, getSkills } = require('../access/common')
const { getProfileByUserId, updateGeneralStudentInfo } = require('../access/common');
const { uploadImageS3 } = require('../utils/s3image');
const { handleUpdateProfileAvatar } = require('../access/media');

const getStudentProfileAPI = async (req, res) => {
  const profile = await getStudentProfile(req.body)
  const id = profile.id
  await Promise.all([getMedias([id]), getPricing([id]), getSkills([id])])
    .then(results => {
      profile.medias = results[0]
      profile.pricing = results[1]
      profile.skills = results[2]
      profile.avatar = profile.medias[0].url
    })
    .catch(err => console.log(err))
  res.status(200).json({
    status: "OK",
    students: [profile]
  })
}

const getTeacherProfileForStudentAPI = async (req, res) => {
  try {
    const { sub } = req.body
    const student_profile = await getProfileByUserId(sub)
    const student_profile_id = student_profile.id
    const teachersProfile = await getListTeacherForStudentFromBooking(student_profile_id)
    res.status(200).json({
      status: "OK",
      teachers: teachersProfile
    })
  } catch (error) {
    res.status(500).json({
      status: "FAIL",
      error: error.message
    })
  }
}

const getParentProfileAPI = async (req, res) => {
  console.log("req.body", req.body)
  const profile = await getStudentProfile(req.body)
  const id = profile.id
  await Promise.all([getMedias([id]), getPricing([id]), getSkills([id])])
    .then(results => {
      profile.medias = results[0]
      profile.pricing = results[1]
      profile.skills = results[2]
      profile.avatar = profile.medias[0].url
    })
    .catch(err => console.log(err))
  res.status(200).json({
    status: "OK",
    profile: profile
  })
}

const updateStudentGeneralInfoAPI = async (req, res) => {
  try {
    const { sub, phone_number, address, city, first_name, last_name } = req.body
    const student_profile = await getProfileByUserId(sub)
    const student_profile_id = student_profile.id
    await updateGeneralStudentInfo(student_profile_id, phone_number, address, city, first_name, last_name)
    await Promise.all([getMedias([student_profile_id]), getPricing([student_profile_id]), getSkills([student_profile_id])])
      .then(results => {
        student_profile.medias = results[0]
        student_profile.pricing = results[1]
        student_profile.skills = results[2]
        student_profile.avatar = student_profile.medias[0].url
      })
      .catch(err => console.log(err))
    res.status(200).json({
      status: "OK",
      profile: student_profile
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "FAIL",
      error: error.message
    })
  }
}

const changeStudentProfileAvatar = async (req, res) => {
  const { sub, avatar } = req.body
  const { data } = avatar
  const profile = await getProfileByUserId(sub)
  const student_profile_id = profile.id
  const imageUrl = await uploadImageS3(data)
  await handleUpdateProfileAvatar(student_profile_id, imageUrl)
  res.status(200).json({
    status: "OK",
    media: {
      url: imageUrl
    }
  })
}

module.exports = {
  getStudentProfileAPI,
  getTeacherProfileForStudentAPI,
  getParentProfileAPI,
  updateStudentGeneralInfoAPI,
  changeStudentProfileAvatar
}
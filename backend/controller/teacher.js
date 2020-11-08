const { getTeacherPendingBooking, getBookingInformation, approveBooking, getListStudentFromBooking } = require("../access/booking");
const { listTeacher, getTeacherProfile, getMedias, getPricing, getSkills } = require('../access/teacher');
const { getProfileByUserId } = require('../access/common');
const { createLesson, getActiveTeacherLesson } = require('../access/lesson');
const { createScheduleForLesson } = require('../access/schedule');

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



const listTeacherAPI = async (req, res) => {
  const profiles = await listTeacher()
  const listProfileId = profiles.map(profile => profile.id)
  let medias, pricing, skills
  await Promise.all([getMedias(listProfileId), getPricing(listProfileId), getSkills(listProfileId)])
    .then(results => {
      medias = results[0]
      pricing = results[1]
      skills = results[2]
    })
    .catch(err => console.log(err))

  medias.forEach(media => {
    const item = profiles.find(profile => profile.id === media.profile_id)
    if (item) {
      const arrMedias = []
      media.types.forEach((type, index) => {
        arrMedias.push({
          details: null,
          name: "abc.jpg",
          tag: media.tags[index],
          type,
          url: media.urls[index]
        })
      })
      item.medias = arrMedias
    }
  })
  pricing.forEach(price => {
    const item = profiles.find(profile => profile.id === price.profile_id)
    if (item) {
      const arrPricing = []
      price.gross_prices.forEach((gross_price, index) => {
        arrPricing.push({
          gross_price,
          duration: price.durations[index],
          id: price.ids[index]
        })
      })
      item.pricings = arrPricing
    }
  })

  skills.forEach(skill => {
    const item = profiles.find(profile => profile.id === skill.profile_id)
    if (item) {
      const arrSkill = []
      skill.instruments.forEach((id, index) => {
        arrSkill.push({
          instrument: instruments[id],
          level: skill.levels[index],
          instrument_id: skill.instruments[index]
        })
      })
      item.skills = arrSkill
    }
  })
  res.status(200).json({
    status: "OK",
    teachers: profiles
  })
}

const getTeacherProfileAPI = async (req, res) => {
  const profile = await getTeacherProfile(req.body)
  const id = profile.id
  await Promise.all([getMedias([id]), getPricing([id]), getSkills([id])])
    .then(results => {
      profile.medias = results[0]
      profile.pricing = results[1]
      profile.skills = results[2]
    })
    .catch(err => console.log(err))
  res.status(200).json({
    status: "OK",
    teachers: [profile]
  })
}

const getPendingBookingsAPI = async (req, res) => {
  try {
    console.log("Get here")
    const { sub } = req.body;
    const teacherProfile = await getProfileByUserId(sub);
    const teacher_profile_id = teacherProfile.id;
    const pendingBooking = await getTeacherPendingBooking({ teacher_profile_id })
    res.status(200).json({
      status: "OK",
      bookings: pendingBooking
    })
  } catch (error) {
    console.log("error", error)
    res.status(500).json({
      status: "FAILED",
      message: error.message
    })
  }
}

const getFrequency = (frequency) => {
  switch (frequency) {
    case "one_time":
      return 1
    default:
      return 1
  }
}
const createLessonAPI = async (req, res) => {
  try {
    const { sub, booking, lesson, schedule } = req.body;
    const booking_id = booking.id
    const { start_date, end_date, duration, frequency } = lesson
    const freqNumber = getFrequency(frequency)
    const { start_hour, end_hour } = schedule
    const teacher_profile = await getProfileByUserId(sub)
    const teacher_profile_id = teacher_profile.id
    const bookingInfo = await getBookingInformation(booking_id, teacher_profile_id)
    const lessonCreated = await createLesson({
      booking_id: bookingInfo.id,
      pricing_id: bookingInfo.price_id,
      start_date: start_date,
      end_date: end_date,
      instrument_id: bookingInfo.instrument_id,
      trial: false,
      frequency: freqNumber,
      language: "english",
      status: "active",
      teacher_id: teacher_profile_id
    })
    await createScheduleForLesson({ lesson_id: lessonCreated.id, start_date, end_date, start_hour, end_hour })
    await approveBooking(booking_id)
    res.status(200).json({
      status: "OK",
      lesson: lessonCreated
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "FAILED",
      message: error.message
    })
  }
}

const getActiveLessonAPI = async (req, res) => {
  try {
    const { sub } = req.body
    const teacher_profile = await getProfileByUserId(sub)
    const teacher_profile_id = teacher_profile.id
    const lessons = await getActiveTeacherLesson(teacher_profile_id)
    res.status(200).json({
      status: "OK",
      lessons: lessons
    })
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: error.message
    })
  }
}

const getStudentsOfTeacherAPI = async (req, res) => {
  try {
    const { sub } = req.body;
    const teacher_profile = await getProfileByUserId(sub)
    const teacher_profile_id = teacher_profile.id
    const lessonsActive = await getActiveTeacherLesson(teacher_profile_id)
    const booking_ids = lessonsActive.map(item => item.booking_id)
    console.log(booking_ids)
    const students = await getListStudentFromBooking({ booking_ids })
    res.status(200).json({
      status: "OK",
      students: students
    })
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: error.message
    })
  }

}

module.exports = { listTeacherAPI, getTeacherProfileAPI, getPendingBookingsAPI, createLessonAPI, getActiveLessonAPI, getStudentsOfTeacherAPI }
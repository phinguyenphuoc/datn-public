const { getTeacherPendingBooking, getBookingInformation, approveBooking, getListStudentFromBooking } = require("../access/booking");
const { listTeacher, getTeacherProfile, getMedias, getPricing, getSkills } = require('../access/teacher');
const { getProfileByUserId, updateGeneralInfo, updateGeneralTeacherInfo, getAllInstruments } = require('../access/common');
const { createLesson, getActiveTeacherLesson, getListStudentOfTeacher } = require('../access/lesson');
const { createScheduleForLesson } = require('../access/schedule');
const { insertOrUpdatePricing } = require('../access/pricing');
// const { insertOrUpdateSkill } = require('../access/skill');
const { handleUpdateProfileAvatar } = require('../access/media');
const { getCustomerPayment } = require('../access/customer');

const { uploadImageS3 } = require('../utils/s3image');

const stripe = require('stripe')('sk_test_51HmJteHcZqoAfgJmAngCsK8vkon8zGmfqvCcPS5q286GRxIfxr8E0qjLACyttQwMsN3CLDcLWK4BnMCG3IiBhSXv00dMMjH21w');

const moment = require('moment')

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
  let pricing, skills
  await Promise.all([getPricing(listProfileId), getSkills(listProfileId)])
    .then(results => {
      pricing = results[0]
      skills = results[1]
    })
    .catch(err => console.log(err))

  // medias.forEach(media => {
  //   const item = profiles.find(profile => profile.id === media.profile_id)
  //   if (item) {
  //     const arrMedias = []
  //     media.types.forEach((type, index) => {
  //       arrMedias.push({
  //         details: null,
  //         name: "abc.jpg",
  //         tag: media.tags[index],
  //         type,
  //         url: media.urls[index]
  //       })
  //     })
  //     item.medias = arrMedias
  //   }
  // })
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
    console.log({ sub, booking, lesson, schedule })
    const booking_id = booking.id
    const { start_date, end_date, month, frequency } = lesson
    const freqNumber = getFrequency(frequency)
    const { start_hour, end_hour } = schedule
    const teacher_profile = await getProfileByUserId(sub)
    const teacher_profile_id = teacher_profile.id
    const bookingInfo = await getBookingInformation(booking_id, teacher_profile_id)
    const endDate = moment(start_date).add(month, 'month').format('YYYY-MM-DD')
    const lessonCreated = await createLesson({
      booking_id: bookingInfo.id,
      pricing_id: bookingInfo.price_id,
      start_date: start_date,
      end_date: endDate,
      instrument_id: bookingInfo.instrument_id,
      trial: false,
      frequency: freqNumber,
      language: "english",
      status: "active",
      teacher_id: teacher_profile_id,
      student_id: bookingInfo.student_profile_id
    })
    for (let i = 0; i < schedule.length; i++) {
      const item = schedule[i];
      await createScheduleForLesson({
        lesson_id: lessonCreated.id,
        start_date: item.lesson_date,
        end_date: endDate,
        start_hour: item.start_hour,
        end_hour: item.end_hour
      })
    }
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
    const students1 = await getListStudentOfTeacher(teacher_profile_id)
    const a = students1.map(student => {
      return {
        avatar: student.avatar,
        city: student.city,
        first_name: student.first_name,
        id: student.id,
        last_name: student.last_name,
        phone: student.phone_number,
        instrument_learning: instruments[student.instrument_ids[0]],
        address: student.address
      }
    })


    // const students = await getListStudentFromBooking({ booking_ids })
    res.status(200).json({
      status: "OK",
      students: a
    })
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: error.message
    })
  }

}

const getTeacherProfileDashboardTeacherAPI = async (req, res) => {
  const profile = await getTeacherProfile(req.body)
  const id = profile.id
  let medias, pricing, skills
  await Promise.all([getMedias([id]), getPricing([id]), getSkills([id])])
    .then(results => {
      medias = results[0]
      pricing = results[1]
      skills = results[2]
    })
    .catch(err => console.log(err))

  medias.forEach(media => {
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
    profile.medias = arrMedias
    // profile.avatar = arrMedias[0].url
  })
  pricing.forEach(price => {
    const arrPricing = []
    price.gross_prices.forEach((gross_price, index) => {
      arrPricing.push({
        gross_price,
        net_price: gross_price,
        duration: price.durations[index],
        id: price.ids[index],
        visible: price.enabled[index]
      })
    })
    profile.pricings = arrPricing
  })

  skills.forEach(skill => {
    const arrSkill = []
    skill.instruments.forEach((id, index) => {
      arrSkill.push({
        instrument: instruments[id],
        level: skill.levels[index],
        instrument_id: skill.instruments[index]
      })
    })
    profile.skills = arrSkill
  })
  res.status(200).json({
    status: "OK",
    profile: {
      ...profile,
      teaching_type: { data: ["online"] },
      teaching_experience: { data: "5", formatted_data: "5 years" }
    }
  })
}

const updateTeacherGeneralInfoAPI = async (req, res) => {
  try {
    const { sub, phone, address, profile } = req.body
    const teacher_profile = await getProfileByUserId(sub)
    const teacher_profile_id = teacher_profile.id
    if (phone && address) {
      await updateGeneralInfo(teacher_profile_id, phone, address)
    } else {
      const { about, background, experience, pickup_line, medias, pricings, skills } = profile
      const image = medias[0].data
      await updateGeneralTeacherInfo({ about, background, experience, pickup_line, id: teacher_profile_id })
      const imageUrl = await uploadImageS3(image)
      await Promise.all([handleUpdateProfileAvatar(teacher_profile_id, imageUrl), insertOrUpdatePricing(pricings, teacher_profile_id)])
    }
    res.status(200).json({
      status: "OK"
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "FAIL",
      error: error.message
    })
  }
}

const getStripeDashBoardLinkAPI = async (req, res) => {
  const { sub } = req.body
  const customerPayment = await getCustomerPayment(sub)
  console.log(customerPayment)
  const link = await stripe.accounts.createLoginLink(customerPayment.customer_id);
  res.status(200).json({
    status: "OK",
    link: link.url
  })
}

module.exports = {
  listTeacherAPI,
  getTeacherProfileAPI,
  getPendingBookingsAPI,
  createLessonAPI,
  getActiveLessonAPI,
  getStudentsOfTeacherAPI,
  getTeacherProfileDashboardTeacherAPI,
  updateTeacherGeneralInfoAPI,
  getStripeDashBoardLinkAPI
}
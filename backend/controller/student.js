const { getStudentProfile } = require("../access/student");
const { getListTeacherForStudentFromBooking } = require('../access/booking')
const { getMedias, getPricing, getSkills } = require('../access/common')
const { getProfileByUserId, updateGeneralStudentInfo } = require('../access/common');
const { uploadImageS3 } = require('../utils/s3image');
const { handleUpdateProfileAvatar } = require('../access/media');
const { getCustomerPayment, createCustomerObj, updateCustomerPaymentMethod } = require('../access/customer');

const stripe = require('stripe')('sk_test_51HmJteHcZqoAfgJmAngCsK8vkon8zGmfqvCcPS5q286GRxIfxr8E0qjLACyttQwMsN3CLDcLWK4BnMCG3IiBhSXv00dMMjH21w');

const getStudentProfileAPI = async (req, res) => {
  const profile = await getStudentProfile(req.body)
  const id = profile.id
  await Promise.all([getMedias([id]), getPricing([id]), getSkills([id])])
    .then(results => {
      const media = results[0]
      const avatar = (media && media[0] && media[0].url) ? media[0].url : ""
      profile.medias = results[0]
      profile.pricing = results[1]
      profile.skills = results[2]
      profile.avatar = avatar
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

const getStudentCardInfoAPI = async (req, res) => {
  const { sub } = req.body
  const customerPayment = getCustomerPayment(sub)
  // if (customerPayment && customerPayment.id) {
  res.status(200).json({
    status: "OK",
    card_info: {
      last4: "1234",
      name: "Phi Nguyen",
      exp_month: "12",
      exp_year: "2022",

    }
  })
  // } else {
  //   res.status(404).json({
  //     status: "CARD_INFO_NOT_FOUND"
  //   })
  // }
}

const getOrSetUpCardForStudentAPI = async (req, res) => {
  const { sub, email } = req.body
  const profile = await getProfileByUserId(sub)
  const customerPayment = await getCustomerPayment(sub)
  console.log("customerPayment", customerPayment)
  if (!customerPayment) {
    // Create stripe customer
    const customer = await stripe.customers.create({
      email: email
    })
    await createCustomerObj(customer.id, profile.id)
    const intent = await stripe.setupIntents.create({
      customer: customer.id,
    });
    res.status(200).json({
      status: "OK",
      card_setup: {
        client_secret: intent.client_secret
      }
    })
  } else {
    const intent = await stripe.setupIntents.create({
      customer: customerPayment.customer_id,
    });
    res.status(200).json({
      status: "OK",
      card_setup: {
        client_secret: intent.client_secret
      }
    })
  }
}

const saveStudentCardApi = async (req, res) => {
  try {
    const { payment_method_id, sub } = req.body
    const customerPayment = await getCustomerPayment(sub)
    const customer_id = customerPayment.customer_id
    await stripe.paymentMethods.attach(payment_method_id, {
      customer: customer_id,
    });
    await stripe.customers.update(customer_id, {
      invoice_settings: {
        default_payment_method: payment_method_id
      },
    })
    await updateCustomerPaymentMethod(customer_id, payment_method_id, "card")
    const paymentMethod = await stripe.paymentMethods.retrieve(payment_method_id)
    res.status(200).json({
      status: "OK",
      card_save: {
        card_info: {
          last4: paymentMethod.card.last4,
          exp_month: paymentMethod.card.exp_month,
          exp_year: paymentMethod.card.exp_year
        }
      }
    })
  } catch (error) {
    res.status(500).json({
      status: "FAIL",
      error: error.message
    })
  }
}
module.exports = {
  getStudentProfileAPI,
  getTeacherProfileForStudentAPI,
  getParentProfileAPI,
  updateStudentGeneralInfoAPI,
  changeStudentProfileAvatar,
  getStudentCardInfoAPI,
  getOrSetUpCardForStudentAPI,
  saveStudentCardApi
}
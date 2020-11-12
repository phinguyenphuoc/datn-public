const { query } = require('../config')
const { getCustomerPayment, createCustomerObj } = require('../access/customer')
const stripe = require('stripe')('sk_test_51HmJteHcZqoAfgJmAngCsK8vkon8zGmfqvCcPS5q286GRxIfxr8E0qjLACyttQwMsN3CLDcLWK4BnMCG3IiBhSXv00dMMjH21w');

const getUserProfile = (sub) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT * FROM profile 
      WHERE user_id = $1`,
      [sub],
      (err, results) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          resolve(results.rows[0])
        }
      }
    )
  })
}

const getUserMedia = (profileId) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT * FROM media 
      WHERE profile_id = $1`,
      [profileId],
      (err, results) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          resolve(results.rows)
        }
      }
    )
  })
}

const getUserPricing = (profileId) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT * FROM media 
      WHERE profile_id = $1`,
      [profileId],
      (err, results) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          resolve(results.rows)
        }
      }
    )
  })
}

const getUserSkill = (profileId) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT * FROM skill 
      WHERE profile_id = $1`,
      [profileId],
      (err, results) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          resolve(results.rows)
        }
      }
    )
  })
}


const getUserProfileApi = async (req, res) => {
  const { sub, email, role } = req.body
  const Profile = await getUserProfile(sub)
  const profileId = Profile.id
  const media = await getUserMedia(profileId)
  let payment = await getCustomerPayment(sub)

  // First time login
  if (!payment) {
    const customer = await stripe.customers.create({
      email: email
    })
    payment = await createCustomerObj(customer.id, profileId)
  }

  const responseData = {
    status: "OK",
    user_avatar: media[0].url,
    user_first_name: Profile.first_name,
    user_last_name: Profile.last_name,
    user_login: email,
    user_payment_updated: !!payment.payment_source,
    user_roles: [role]
  }

  // console.log('role === "student" && !payment', !!(role === "student" && !payment))
  if (role === "student" && !payment.payment_source) {
    const intent = await stripe.setupIntents.create({
      customer: payment.customer_id
    });
    responseData.client_secret = intent.client_secret
  }

  res.status(200).json(responseData)
}
module.exports = getUserProfileApi
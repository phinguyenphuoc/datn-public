const { query } = require('../config')

const createProfile = (user_id, address, first_name, last_name, phone_number, city, background) => {
  return new Promise((resolve, reject) => {
    query(
      `INSERT INTO public.profile(user_id, address, first_name, last_name, phone_number, city, background) 
      VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [user_id, address, first_name, last_name, phone_number, city, background],
      (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve(results.rows[0])
        }
      }
    )
  })
}

const getUserIdByProfileId = (profileId) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT user_id FROM profile WHERE id = $1`,
      [profileId],
      (error, results) => {
        if (error) {
          reject(error)
        } else {
          if (results.rows[0] && results.rows[0].user_id) {
            resolve(results.rows[0].user_id)
          } else {
            resolve(null)
          }
        }
      }
    )
  })
}

module.exports = { createProfile, getUserIdByProfileId }
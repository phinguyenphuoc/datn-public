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

const updateProfileAvatar = (profile_id, avatar) => {
  return new Promise((resolve, reject) => {
    query(
      `UPDATE public.profile 
      SET avatar = $2
      WHERE id = $1 RETURNING *`,
      [profile_id, avatar],
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results.rows[0])
        }
      }
    )
  })
}
module.exports = {
  createProfile,
  getUserIdByProfileId,
  updateProfileAvatar
}
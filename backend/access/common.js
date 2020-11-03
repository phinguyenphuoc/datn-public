const { query } = require('../config')
const getMedias = (listProfileId) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT type, tag, url 
        FROM media 
        WHERE profile_id = ANY ($1)`,
      [listProfileId],
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results.rows)
        }
      }
    )
  })
}

const getPricing = (listProfileId) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT gross_price, duration, enabled
        FROM pricing WHERE profile_id = ANY ($1)`,
      [listProfileId],
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results.rows)
        }
      }
    )
  })
}

const getSkills = (listProfileId) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT instrument_id, level, week_frequency
        FROM skill WHERE profile_id = ANY ($1)`,
      [listProfileId],
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results.rows)
        }
      }
    )
  })
}

const getProfileByUserId = (sub) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT * from profile where user_id = $1`,
      [sub],
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
module.exports = { getMedias, getPricing, getSkills, getProfileByUserId }
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

const updateGeneralInfo = (id, phone, address) => {
  return new Promise((resolve, reject) => {
    query(
      `UPDATE  public.profile 
      SET phone_number = $2,
      address = $3
      WHERE id = $1`,
      [id, phone, address],
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      }
    )
  })
}

const updateGeneralStudentInfo = (student_profile_id, phone_number, address, city, first_name, last_name) => {
  return new Promise((resolve, reject) => {
    query(
      `UPDATE public.profile 
      SET phone_number = $2,
      address = $3,
      city = $4,
      first_name = $5,
      last_name = $6
      WHERE id = $1`,
      [student_profile_id, phone_number, address, city, first_name, last_name],
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      }
    )
  })
}

const updateGeneralTeacherInfo = ({ about, background, experience, pickup_line, id }) => {
  return new Promise((resolve, reject) => {
    query(
      `UPDATE  public.profile 
      SET about = $1,
      background = $2,
      experience = $3,
      pickup_line = $4
      WHERE id = $5`,
      [about, background, experience, pickup_line, id],
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      }
    )
  })
}

const getAllInstruments = () => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT * FROM instrument`,
      (err, results) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          const responseData = results.rows.map(item => {
            return {
              id: item.id,
              name: item.name
            }
          })
          resolve(responseData)
        }
      }
    )
  })
}

module.exports = {
  getMedias,
  getPricing,
  getSkills,
  getProfileByUserId,
  updateGeneralInfo,
  updateGeneralTeacherInfo,
  getAllInstruments,
  updateGeneralStudentInfo
}
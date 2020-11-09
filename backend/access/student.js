const { query } = require('../config')

const updateStudentProfile = ({ sub, first_name, last_name, phone_number, address }) => {
  return new Promise((resolve, reject) => {
    query(
      `UPDATE public.profile 
        SET first_name = $2,
        last_name = $3,
        phone_number = $4,
        city = $5
        WHERE user_id = $1 AND roles @> ARRAY['student'] RETURNING *`,
      [sub, first_name, last_name, phone_number, address],
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

const updateUserAvatar = (profile_id, url) => {
  return new Promise((resolve, reject) => {
    query(
      `INSERT INTO public.media(profile_id, url, type, tag)
        VALUES($1, $2, $3, $4) 
        ON CONFLICT (profile_id) 
        DO UPDATE 
        SET url = $2,
        type = $3,
        tag = $4 
        RETURNING *`,
      [profile_id, url, "image", "avatar"],
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

const getStudentProfile = ({ sub }) => {
  console.log(sub)
  return new Promise((resolve, reject) => {
    query(
      `SELECT * FROM profile WHERE user_id = $1 `, //AND roles @> ARRAY['student']
      [sub],
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          const responseData = results.rows[0]
          resolve(responseData)
        }
      }
    )
  })
}

module.exports = { updateStudentProfile, updateUserAvatar, getStudentProfile }
const { query } = require('../config')

const postAssistance = (profile_id, message) => {
  return new Promise((resolve, reject) => {
    query(
      `INSERT INTO public.assistance(profile_id, message) VALUES($1, $2) RETURNING *`,
      [profile_id, message],
      (error, results) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(results.rows[0])
        }
      }
    )
  })
}

module.exports = postAssistance
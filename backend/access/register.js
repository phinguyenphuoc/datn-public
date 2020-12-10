const { query } = require('../config')

const createRegister = (email, first_name, last_name, phone_number, address, instrument_ids) => {
  return new Promise((resolve, reject) => {
    query(
      `INSERT INTO public.register(email, first_name, last_name, phone_number, address, instrument_ids)
      VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
      [email, first_name, last_name, phone_number, address, instrument_ids],
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

module.exports = createRegister
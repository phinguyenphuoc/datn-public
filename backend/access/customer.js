const { query } = require('../config')

const getCustomerPayment = (sub) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT c.* FROM public.customer as c
      INNER JOIN public.profile as p on c.profile_id = p.id
      WHERE p.user_id = $1`,
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

module.exports = { getCustomerPayment }
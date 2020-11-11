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

const createCustomerObj = (customer_id, profile_id) => {
  return new Promise((resolve, reject) => {
    query(
      `INSERT INTO public.customer(customer_id, profile_id) VALUES($1, $2) RETURNING *`,
      [customer_id, profile_id],
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

const updateCustomerPaymentMethod = (customer_id, payment_source, info) => {
  return new Promise((resolve, reject) => {
    query(
      `UPDATE public.customer
      SET payment_source = $2,
      info = $3
      WHERE customer_id = $1 RETURNING *`,
      [customer_id, payment_source, info],
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
  getCustomerPayment,
  createCustomerObj,
  updateCustomerPaymentMethod
}
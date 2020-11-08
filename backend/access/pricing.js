const { query } = require('../config')

const insertOrUpdatePricing = (pricings, profile_id) => {
  let valuesString = "VALUES"
  pricings.forEach(price => {
    valuesString += `(${profile_id}, ${price.net_price}, '${price.duration}', ${price.visible}),`
  })
  valuesString = valuesString.slice(0, -1)
  return new Promise((resolve, reject) => {
    query(
      `INSERT INTO pricing (profile_id, gross_price, duration, enabled) ${valuesString}
      ON CONFLICT (profile_id, duration) DO UPDATE 
      SET gross_price = excluded.gross_price,
      enabled = excluded.enabled
      RETURNING *`,
      (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve(results.rows)
        }
      }
    )
  })
}

module.exports = {
  insertOrUpdatePricing
}


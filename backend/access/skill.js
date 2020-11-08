const { query } = require('../config')

const insertOrUpdateSkill = (instrument_ids, profile_id) => {
  let valuesString = "VALUES"
  instrument_ids.forEach(id => {
    valuesString += `(${profile_id}, ${id}, 'advanced'),`
  })
  valuesString = valuesString.slice(0, -1)
  return new Promise((resolve, reject) => {
    query(
      `INSERT INTO public.skill (profile_id, instrument_id, level) ${valuesString}`,
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
  insertOrUpdateSkill
}


const { query } = require('../config')

const listTeacher = () => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT * FROM profile WHERE roles @> '{teacher}'`,
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          const responseData = results.rows.map(item => {
            return {
              ...item,
              tag: `${item.first_name}-${item.last_name}`,
              rating: 5,
              city: item.city,
              member_since: "2020-02-29",
              teaching_type: { data: ["online"] }
            }
          })
          resolve(responseData)
        }
      }
    )
  })
}

const getTeacherProfile = ({ sub }) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT * FROM profile WHERE user_id = $1 AND roles @> ARRAY['teacher']`,
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

const getMedias = (listProfileId) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT profile_id, 
        ARRAY_AGG(type) as types, 
        ARRAY_AGG(tag) AS tags, 
        ARRAY_AGG(url) AS urls 
        FROM media 
        WHERE profile_id = ANY ($1)
        GROUP BY profile_id`,
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
      `SELECT profile_id,
        ARRAY_AGG(id) AS ids,
        ARRAY_AGG(gross_price) AS gross_prices, 
        ARRAY_AGG(duration) AS durations, 
        ARRAY_AGG(enabled) AS enabled
        FROM pricing WHERE profile_id = ANY ($1)
        GROUP BY profile_id`,
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
      `SELECT profile_id,
        ARRAY_AGG(id) AS ids,
        ARRAY_AGG(instrument_id) AS instruments, 
        ARRAY_AGG(level) AS levels, 
        ARRAY_AGG(week_frequency) AS week_frequencies
        FROM skill WHERE profile_id = ANY ($1)
        GROUP BY profile_id`,
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

module.exports = { listTeacher, getTeacherProfile, getMedias, getPricing, getSkills }

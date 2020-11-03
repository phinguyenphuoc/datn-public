const { query } = require('../config')

const instruments = [
  "",
  'piano',
  'guitar',
  'violin',
  'cello',
  'ukulele',
  'flute',
  'saxophone',
  'bass guitar',
  'viola',
  'voice',
  'trumpet',
  'drums',
  'bassoon',
  'trombone',
  'upright bass',
  'music theory',
  'composition',
  'french horn'
]

const listTeacher = () => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT * FROM profile`,
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          const responseData = results.rows.map(item => {
            return {
              ...item,
              tag: `${item.first_name}-${item.last_name}`,
              rating: 5,
              city: item.address,
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

const listTeacherAPI = async (req, res) => {
  const profiles = await listTeacher()
  const listProfileId = profiles.map(profile => profile.id)
  let medias, pricing, skills
  await Promise.all([getMedias(listProfileId), getPricing(listProfileId), getSkills(listProfileId)])
    .then(results => {
      medias = results[0]
      pricing = results[1]
      skills = results[2]
    })
    .catch(err => console.log(err))

  medias.forEach(media => {
    const item = profiles.find(profile => profile.id === media.profile_id)
    if (item) {
      const arrMedias = []
      media.types.forEach((type, index) => {
        arrMedias.push({
          details: null,
          name: "abc.jpg",
          tag: media.tags[index],
          type,
          url: media.urls[index]
        })
      })
      item.medias = arrMedias
    }
  })
  pricing.forEach(price => {
    const item = profiles.find(profile => profile.id === price.profile_id)
    if (item) {
      const arrPricing = []
      price.gross_prices.forEach((gross_price, index) => {
        arrPricing.push({
          gross_price,
          duration: price.durations[index],
          id: price.ids[index]
        })
      })
      item.pricings = arrPricing
    }
  })

  skills.forEach(skill => {
    const item = profiles.find(profile => profile.id === skill.profile_id)
    if (item) {
      const arrSkill = []
      skill.instruments.forEach((id, index) => {
        arrSkill.push({
          instrument: instruments[id],
          level: skill.levels[index],
          instrument_id: skill.instruments[index]
        })
      })
      item.skills = arrSkill
    }
  })
  res.status(200).json({
    status: "OK",
    teachers: profiles
  })
}

const getTeacherProfileAPI = async (req, res) => {
  const profile = await getTeacherProfile(req.body)
  const id = profile.id
  await Promise.all([getMedias([id]), getPricing([id]), getSkills([id])])
    .then(results => {
      profile.medias = results[0]
      profile.pricing = results[1]
      profile.skills = results[2]
    })
    .catch(err => console.log(err))
  res.status(200).json({
    status: "OK",
    teachers: [profile]
  })
}

module.exports = { listTeacherAPI, getTeacherProfileAPI }
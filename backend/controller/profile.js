const { query } = require('../config')

const getUserProfile = (sub) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT * FROM profile 
      WHERE user_id = $1`,
      [sub],
      (err, results) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          resolve(results.rows[0])
        }
      }
    )
  })
}

const getUserMedia = (profileId) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT * FROM media 
      WHERE profile_id = $1`,
      [profileId],
      (err, results) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          resolve(results.rows)
        }
      }
    )
  })
}

const getUserPricing = (profileId) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT * FROM media 
      WHERE profile_id = $1`,
      [profileId],
      (err, results) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          resolve(results.rows)
        }
      }
    )
  })
}

const getUserSkill = (profileId) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT * FROM skill 
      WHERE profile_id = $1`,
      [profileId],
      (err, results) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          resolve(results.rows)
        }
      }
    )
  })
}


const getUserProfileApi = async (req, res) => {
  const Profile = await getUserProfile(req.body.sub)
  const profileId = Profile.id

  await Promise.all([getUserMedia(profileId), getUserPricing(profileId), getUserSkill(profileId)])
    .then(results => {
      Profile.medias = results[0]
      Profile.pricing = results[1]
      Profile.skills = results[2]
    })
  res.status(200).json(Profile)
}
module.exports = getUserProfileApi
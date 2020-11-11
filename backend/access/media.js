const { query } = require('../config')
const { deleteImageS3 } = require('../utils/s3image');

const getProfileAvatar = (profile_id) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT *
        FROM media 
        WHERE profile_id = $1 and type = $2 and tag = $3`,
      [profile_id, "image", "avatar"],
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

const updateProfileAvatar = (profile_id, url) => {
  return new Promise((resolve, reject) => {
    query(
      `UPDATE media 
      SET url = $4
      WHERE profile_id = $1 and type = $2 and tag = $3 RETURNING *`,
      [profile_id, "image", "avatar", url],
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

const insertProfileAvatar = (profile_id, url) => {
  return new Promise((resolve, reject) => {
    query(
      `INSERT INTO media(profile_id, type, tag, url)
      VALUES($1,$2,$3,$4) RETURNING *`,
      [profile_id, "image", "avatar", url],
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

const handleUpdateProfileAvatar = async (profile_id, url) => {
  const hasAvatar = await getProfileAvatar(profile_id)
  if (hasAvatar && hasAvatar.id) {
    deleteImageS3(hasAvatar.url)
    return await updateProfileAvatar(profile_id, url)
  } else {
    return await insertProfileAvatar(profile_id, url)
  }
}

module.exports = { handleUpdateProfileAvatar }
const { query } = require('../config')
const { deleteImageS3 } = require('../utils/s3image');

const getProfileAvatar = (profile_id) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT avatar
      FROM public.profile 
      WHERE id = $1`,
      [profile_id],
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results.rows[0].avatar)
        }
      }
    )
  })
}

const updateProfileAvatar = (profile_id, url) => {
  return new Promise((resolve, reject) => {
    query(
      `UPDATE public.profile 
      SET avatar = $2
      WHERE id = $1 RETURNING *`,
      [profile_id, url],
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
  const avatar = await getProfileAvatar(profile_id)
  if (avatar) {
    deleteImageS3(avatar)
    return await updateProfileAvatar(profile_id, url)
  } else {
    return await updateProfileAvatar(profile_id, url)
  }
}

module.exports = { handleUpdateProfileAvatar }
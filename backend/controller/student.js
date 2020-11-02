const { query } = require('../config')
const getS3 = require('../aws-s3');
const s3 = getS3();
const fs = require('fs');

const updateStudentProfile = ({ sub, first_name, last_name, phone_number, address }) => {
  return new Promise((resolve, reject) => {
    query(
      `UPDATE public.profile 
      SET first_name = $2,
      last_name = $3,
      phone_number = $4,
      address = $5
      WHERE user_id = $1 RETURNING *`,
      [sub, first_name, last_name, phone_number, address],
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

const updateUserAvatar = (profile_id, url) => {
  return new Promise((resolve, reject) => {
    query(
      `INSERT INTO public.media(profile_id, url, type, tag)
      VALUES($1, $2) RETURNING *`,
      [profile_id, url, "image", "avatar"],
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



const updateStudentProfileAPI = async (req, res) => {
  try {
    const profile = await updateStudentProfile(req.body);
    const params = {
      ACL: 'public-read',
      Bucket: 'musicalelearning.media',
      Body: fs.createReadStream(req.file.path),
      Key: `userAvatar/${req.file.originalname}`
    };

    s3.upload(params, async function (err, data) {
      if (err) {
        console.log('Error occured while trying to upload to S3 bucket', err);
      }

      if (data) {
        console.log("Data", data)
        fs.unlinkSync(req.file.path); // Empty temp folder
        await updateUserAvatar(profile.id, data.Location)
        res.send({
          status: "OK",
          message: "Update profile successfully"
        })
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: err.message
    })
  }

}

const addStudentProfileAPI = async (req, res) => {
  console.log(req.file)
  var params = {
    ACL: 'public-read',
    Bucket: 'musicalelearning.media',
    Body: fs.createReadStream(req.file.path),
    Key: `userAvatar/${req.file.originalname}`
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.log('Error occured while trying to upload to S3 bucket', err);
    }

    if (data) {
      fs.unlinkSync(req.file.path); // Eawaitmpty temp folder
      // await updateUserAvatar()
      res.send(data)
    }
  });
}

module.exports = { updateStudentProfileAPI, addStudentProfileAPI }
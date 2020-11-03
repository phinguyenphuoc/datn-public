const { query } = require('../config')
const getS3 = require('../aws-s3');
const s3 = getS3();
const fs = require('fs');
const { updateStudentProfile, updateUserAvatar, getStudentProfile } = require("../access/student");
const { getMedias, getPricing, getSkills } = require('../access/common')

const updateStudentProfileAPI = async (req, res) => {
  try {
    console.log(req.body)
    await updateStudentProfile(req.body)

    getStudentProfileAPI(req, res)
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message
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

const getStudentProfileAPI = async (req, res) => {
  const profile = await getStudentProfile(req.body)
  const id = profile.id
  await Promise.all([getMedias([id]), getPricing([id]), getSkills([id])])
    .then(results => {
      profile.medias = results[0]
      profile.pricing = results[1]
      profile.skills = results[2]
      profile.avatar = profile.medias[0].url
    })
    .catch(err => console.log(err))
  res.status(200).json({
    status: "OK",
    profile: profile
  })
}

const uploadStudentAvatarAPI = async (req, res) => {
  console.log("req.file", req.file)
  const profile = await getStudentProfile(req.body)
  try {
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
      status: "FAILED",
      message: error.message
    })
  }
}

module.exports = { updateStudentProfileAPI, addStudentProfileAPI, getStudentProfileAPI, uploadStudentAvatarAPI }
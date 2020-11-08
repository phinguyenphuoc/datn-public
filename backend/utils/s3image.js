const getS3 = require('../aws-s3');
const s3 = getS3();
const { v4: uuidv4 } = require('uuid');

const uploadImageS3 = (image) => {
  return new Promise((resolve, reject) => {
    const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    const type = image.split(';')[0].split('/')[1];
    const params = {
      ACL: 'public-read',
      Key: `userAvatar/${uuidv4()}.${type}`,
      Body: base64Data,
      Bucket: 'musicalelearning.media',
      ContentEncoding: 'base64',
      ContentType: `image/${type}`
    };
    s3.upload(params, function (err, data) {
      if (err) {
        console.log('Error uploading data: ', err);
        reject(err)
      } else {
        console.log('successfully uploaded the image!', data.Location);
        resolve(data.Location)
      }
    });
  })
}

const deleteImageS3 = (imageUrl) => {
  return new Promise((resolve, reject) => {
    const Keys = imageUrl.split("/")
    const key = Keys[Keys.length - 1]
    var params = { Bucket: 'musicalelearning.media', Key: `userAvatar/${key}` };
    s3.deleteObject(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
        reject(err)
      } else {
        resolve(true)
      }
    });
  })
}
module.exports = { uploadImageS3, deleteImageS3 }
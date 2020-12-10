const AWS = require('aws-sdk')
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2'
})
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
const { createProfile } = require('../access/profile')


const cognitoSignUpUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const params = {
      ClientId: process.env.ClientId, /* required */
      Password: password, /* required */
      Username: email, /* required */
      UserAttributes: [
        {
          Name: 'email', /* required */
          Value: email
        },
      ],
    };
    cognitoidentityserviceprovider.signUp(params, (err, data) => {
      if (err) {
        console.log(err, err.stack)
        reject(err)
      } else {
        console.log(data)
        resolve(data.UserSub)
      }
    });
  })
}

const addUserToGroupStudent = (email) => {
  return new Promise((resolve, reject) => {
    const params = {
      GroupName: 'student',
      UserPoolId: process.env.UserPoolId,
      Username: email
    };
    cognitoidentityserviceprovider.adminAddUserToGroup(params, function (err, data) {
      if (err) {
        console.log(err, err.stack)
        reject(err)
      } else {
        resolve("Add user to student group: ", data)
      }
    });
  })
}
const signUpApi = async (req, res) => {
  try {
    const { email, password, address, first_name, last_name, phone_number, city, background, zip } = req.body
    const userId = await cognitoSignUpUser(email, password)
    await addUserToGroupStudent(email)
    const profile = await createProfile(userId, [address, city, zip], first_name, last_name, phone_number, city, background, email)
    res.status(200).json({
      status: "SIGN_UP_SUCCEED",
      email: email
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: "SIGN_UP_ERROR",
      message: "User already exist"
    })
  }
}

module.exports = signUpApi
const CronJob = require("cron").CronJob;
const { query } = require("./config");
const moment = require('moment')
const axios = require('axios');
const { reject } = require("lodash");

const apiKeySid = 'SKPw1DOyTfOeb2lzyjUSE9s1sFSAc2zkV'
const apiKeySecret = 'dUZ4OUswZ3dDRWpHMnc4SUUzVkt6aXg3NFVxMjIwMg=='

const getAccessToken = () => {
  var now = Math.floor(Date.now() / 1000);
  var exp = now + 3600;

  var header = { cty: "stringee-api;v=1" };
  var payload = {
    jti: apiKeySid + "-" + now,
    iss: apiKeySid,
    exp: exp,
    rest_api: true
  };

  var jwt = require('jsonwebtoken');
  var token = jwt.sign(payload, apiKeySecret, { algorithm: 'HS256', header: header })
  return token;
}

const generateRoomId = (accessToken, fullName) => {
  return new Promise((resolve, reject) => {
    axios({
      headers: {
        "Content-Type": "application/json",
        "X-Stringee-Auth": accessToken
      },
      method: "POST",
      url: 'https://api.stringee.com/v1/room2/create',
      data: {
        name: fullName,
        uniqueName: fullName
      }
    })
      .then(result => {
        // console.log(result)
        resolve(result.data)
      })
      .catch(err => {
        console.log("generate room err: ", err.message)
        reject(err)
      })
  })
}


const getNext48HoursLessonUpcoming = (dateString) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT
      s.id as schedule_id,
      to_char(s.lesson_date,'YYYY-MM-DD') as lesson_date,
      s.start_hour,
      s.end_hour,
      p.user_id,
      p.id,
      p.first_name,
      p.last_name
      FROM public.schedule as s
      INNER JOIN public.lesson as l ON l.id = s.lesson_id
      INNER JOIN public.profile as p ON p.id = l.teacher_id
      WHERE s.lesson_date >= $1 ORDER BY s.lesson_date ASC LIMIT 10`,
      [dateString],
      (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result.rows)
        }
      }
    )
  })
}

const getValidDuration = (start_hour, date) => {
  console.log(moment(`${date} ${start_hour}`, 'YYYY-MM-DD HH:mm'), start_hour, date)
  const diffTime = moment.duration(moment(`${date} ${start_hour}`, 'YYYY-MM-DD HH:mm').diff(moment())).asMinutes()
  console.log("diffTime", diffTime)
  return diffTime < 30
}

const updateLessonRoomId = (schedule_id, roomId) => {
  return new Promise((resolve, reject) => {
    query(
      `UPDATE public.schedule 
      set room_id = $2
      WHERE id = $1 RETURNING *`,
      [schedule_id, roomId],
      (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result.rows[0])
        }
      }
    )
  })
}

const jobGenerateClassRoom = () => {
  shouldStart = false;
  const crawl = new CronJob(
    '0 0 */1 * * *',
    async function () {
      console.log('You will see this message every hour - generate class room', new Date());
      // if (0) {
      //   crawl.stop();
      // }
      const dateNow = new Date()
      const date = dateNow.getDate() > 9 ? dateNow.getDate() : `0${dateNow.getDate()}`
      const month = (dateNow.getMonth() + 1) > 9 ? (dateNow.getMonth() + 1) : `0${(dateNow.getMonth() + 1)}`
      const year = dateNow.getFullYear()
      const dateString = `${year}-${month}-${date}`;
      const classRoom = await getNext48HoursLessonUpcoming(dateString)

      const validRooms = classRoom.filter(item => {
        return getValidDuration(item.start_hour, item.lesson_date)
      })
      console.log("validRooms", validRooms)

      for (let i = 0; i < validRooms.length; i++) {
        const item = validRooms[i]
        const uniqueName = `${item.first_name}_${item.last_name}_${new Date().getTime()}`
        const accessToken = getAccessToken(item.user_id);
        const roomObj = await generateRoomId(accessToken, uniqueName)
        console.log({ roomObj })
        await updateLessonRoomId(item.schedule_id, roomObj.roomId)
      }

    },
    null,
    true,
    'America/Los_Angeles'
  );
};

module.exports = { jobGenerateClassRoom }
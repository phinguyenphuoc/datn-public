const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()
const app = express();
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(cors(({ credentials: true, origin: 'http://localhost:3000' })));
const router = require("./routes/index");


// import { listTeacherAPI } from "./controller/teacher";
const {
  listTeacherAPI,
  getTeacherProfileAPI,
  getPendingBookingsAPI,
  createLessonAPI,
  getActiveLessonAPI,
  getStudentsOfTeacherAPI,
  getTeacherProfileDashboardTeacherAPI,
  updateTeacherGeneralInfoAPI,
  getStripeDashBoardLinkAPI
} = require('./controller/teacher')
const instrumentsApi = require('./controller/instrument')
const getUserProfileApi = require('./controller/profile')
const {
  getStudentProfileAPI,
  getTeacherProfileForStudentAPI,
  getParentProfileAPI,
  updateStudentGeneralInfoAPI,
  changeStudentProfileAvatar,
  getStudentCardInfoAPI,
  getOrSetUpCardForStudentAPI,
  saveStudentCardApi
} = require('./controller/student');
const { registerPendingStudentAPI } = require('./controller/booking');
const {
  getSchedulesAPI,
  suspendLessonAPI,
  cancelLessonAPI,
  getUpcomingLessonAPI
} = require('./controller/schedule');
const { reportProblemAPI } = require('./controller/support');
const { jobChargeMoneyStudent } = require('./cronjob')
app.use('/', router)
app.get('/', (req, res) => {
  res.send('welcome')
})
app.get('/teachers/profiles', listTeacherAPI) // show all teacher

app.get('/instruments', instrumentsApi)

app.get('/profile', getUserProfileApi)

/* --- BOOKING API --- */

app.post('/register_pending_student', registerPendingStudentAPI) // Booking


/* --- Teacher API ---*/
app.get('/teacher/profile', getTeacherProfileDashboardTeacherAPI)

app.put('/teacher/profile', updateTeacherGeneralInfoAPI)// Update general info for teacher

app.post('/teacher/lessons/:id/suspend', suspendLessonAPI)

app.post('/teacher/lessons/cancel_schedule/:id', cancelLessonAPI)

app.get('/teacher/students/profiles', getStudentsOfTeacherAPI)

app.get('/teacher/bookings/pending', getPendingBookingsAPI)

app.post('/teacher/lessons', createLessonAPI)

app.get('/teacher/active-lessons', getActiveLessonAPI)

app.get('/teacher/earnings/current_details', (req, res) => {
  res.status(200).json({
    end_date: "2020-11-11",
    lessons_given: 0,
    payment_date: "2020-11-16",
    start_date: "2020-11-01",
    status: "OK",
    turnover: 0
  })
})
//  stripe 
app.get('/teacher/connect_stripe', getStripeDashBoardLinkAPI)

/* ---STUDENT API --- */
app.get('/student/teachers/profile', getTeacherProfileForStudentAPI)  //getTeacherProfileAPI)

app.put('/students/profile', updateStudentGeneralInfoAPI) // Update general info for student

app.get('/students/profile', getStudentProfileAPI) // return array students: [students]

app.get('/student/profile', getParentProfileAPI) // return profile: profile

app.post('/student/profile/avatar', changeStudentProfileAvatar) // Update student avatar

app.post('/student/lessons/cancel_schedule/:id', cancelLessonAPI)

app.post('/student/lessons/:id/suspend', suspendLessonAPI)

app.get('/student/customer/card_info', getStudentCardInfoAPI)

app.get('/student/customer/card_setup', getOrSetUpCardForStudentAPI)

app.post('/student/customer/card_save', saveStudentCardApi)

/* --- SCHEDULE API --- */
app.get('/schedules?:date', getSchedulesAPI)

app.get('/schedules/upcoming?:profile_id', getUpcomingLessonAPI)

//  REPORT API
app.post('/supports/report', reportProblemAPI)

// CALL SCOCC
app.get('/answer_url', async (req, res) => {
  console.log(req.query);
  const { from,
    to,
    fromInternal,
    userId,
    projectId,
    custom,
    callId,
    videocall
  } = req.query
  res.status(200).json([
    {
      "action": "connect",
      "from": {
        "type": "internal",
        "number": from,
        "alias": from
      },

      "to": {
        "type": "internal",//internal: app-to-app call type
        "number": to,//make a call to user_2
        "alias": to,
      },

      "customData": "test-custom-data",
      "continueOnFail": false,
      "timeout": 45
    }
  ])
})

app.listen(3002, () => {
  console.log(`Server listening on port 3002`);
});

// jobChargeMoneyStudent()
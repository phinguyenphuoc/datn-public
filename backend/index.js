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
  updateTeacherGeneralInfoAPI
} = require('./controller/teacher')
const instrumentsApi = require('./controller/instrument')
const getUserProfileApi = require('./controller/profile')
const {
  getStudentProfileAPI,
  getTeacherProfileForStudentAPI,
  getParentProfileAPI,
  updateStudentGeneralInfoAPI,
  changeStudentProfileAvatar
} = require('./controller/student');
const { registerPendingStudentAPI } = require('./controller/booking');
const {
  getSchedulesAPI,
  suspendLessonAPI,
  cancelLessonAPI
} = require('./controller/schedule');
const { reportProblemAPI } = require('./controller/support');

app.use('/', router)
app.get('/', (req, res) => {
  res.send('welcome')
})
app.get('/teachers/profiles', listTeacherAPI)

app.get('/instruments', instrumentsApi)

app.get('/profile', getUserProfileApi)

app.get('/student/teachers/profile', getTeacherProfileForStudentAPI)  //getTeacherProfileAPI)

app.get('/teacher/profile', getTeacherProfileDashboardTeacherAPI)

app.put('/teacher/profile', updateTeacherGeneralInfoAPI)// Update general info for teacher

app.put('/students/profile', updateStudentGeneralInfoAPI) // Update general info for student

app.get('/students/profile', getStudentProfileAPI) // return array students: [students]

app.get('/student/profile', getParentProfileAPI) // return profile: profile

app.post('/student/profile/avatar', changeStudentProfileAvatar) // Update student avatar

app.post('/register_pending_student', registerPendingStudentAPI)

app.get('/teacher/bookings/pending', getPendingBookingsAPI)

app.post('/teacher/lessons', createLessonAPI)

app.get('/teacher/active-lessons', getActiveLessonAPI)

app.get('/schedules?:date', getSchedulesAPI)

app.get('/teacher/students/profiles', getStudentsOfTeacherAPI)

app.post('/supports/report', reportProblemAPI)

app.post('/teacher/lessons/cancel_schedule/:id', cancelLessonAPI)

app.post('/student/lessons/cancel_schedule/:id', cancelLessonAPI)

app.post('/teacher/lessons/:id/suspend', suspendLessonAPI)

app.post('/student/lessons/:id/suspend', suspendLessonAPI)

app.listen(3002, () => {
  console.log(`Server listening on port 3002`);
});

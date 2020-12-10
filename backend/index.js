const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(cors());
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
const { registerPendingStudentAPI, getSetupBookingAPI } = require('./controller/booking')
const {
  getSchedulesAPI,
  suspendLessonAPI,
  cancelLessonAPI,
  getUpcomingLessonAPI,
  getStudentInvoicesAPI,
  rescheduleScheduleAPI
} = require('./controller/schedule');
const { reportProblemAPI } = require('./controller/support');
const { getTeacherEarningAPI } = require('./controller/invoice');
const { getMeetingRoomInformationAPI } = require('./controller/meeting');
const postAssistanceAPI = require('./controller/assistance')
const signUpApi = require('./controller/signup');
const { getRecentEarningAPI, getPeriodEarningAPI } = require('./controller/earning')
const { addProgressReportAPI, getStudentProgressReportAPI } = require('./controller/progress')
const { postReviewAPI, getReviewAPI } = require('./controller/review')

const { createProfile, getUserIdByProfileId } = require('./access/profile')
const { updateScheduleInvoiceUrl } = require('./access/schedule')
const createRegister = require('./access/register')


const { jobChargeMoneyStudent } = require('./cronjob')
const { jobPayoutMoneyToTeacher } = require('./payTeacher')
const { jobGenerateClassRoom } = require('./generateClassRoom');
const skill = require('./access/skill');

app.use('/api', router)
app.get('/api', (req, res) => {
  res.send('welcome')
})
app.get('/api/teachers/profiles', listTeacherAPI) // show all teacher

app.get('/api/instruments', instrumentsApi)

app.get('/api/profile', getUserProfileApi)


// register teacher
app.post('/api/register_pending_teacher', async (req, res) => {
  try {
    const { profile, user, skillset } = req.body;
    const { email } = user;
    const { first_name, last_name, phone, address } = profile;
    const instrument_ids = skillset.map(item => item.instrument);
    await createRegister(email, first_name, last_name, phone, address, instrument_ids)
    res.status(200).json({
      status: "OK"
    })
  } catch (err) {
    res.status(200).json({
      status: "OK"
    })
  }

});
/* --- BOOKING API --- */

app.post('/api/register_pending_student', registerPendingStudentAPI) // Booking


/* --- Teacher API ---*/
app.get('/api/teacher/profile', getTeacherProfileDashboardTeacherAPI)

app.put('/api/teacher/profile', updateTeacherGeneralInfoAPI)// Update general info for teacher

app.post('/api/teacher/lessons/:id/suspend', suspendLessonAPI)

app.post('/api/teacher/lessons/cancel_schedule/:id', cancelLessonAPI)

app.get('/api/teacher/students/profiles', getStudentsOfTeacherAPI)

app.get('/api/teacher/bookings/pending', getPendingBookingsAPI)

app.post('/api/teacher/lessons', createLessonAPI)

app.get('/api/teacher/active-lessons', getActiveLessonAPI)

app.get('/api/teacher/lessons/:lesson_id/setup_booking', getSetupBookingAPI)

app.post('/api/teacher/lessons/makeup_schedule/:schedule_id', rescheduleScheduleAPI)

app.get('/api/teacher/earnings/current_details', getRecentEarningAPI)

app.post('/api/teacher/students/progress_reports', addProgressReportAPI)
//  stripe 
app.get('/api/teacher/connect_stripe', getStripeDashBoardLinkAPI)

/* ---STUDENT API --- */
app.get('/api/student/teachers/profile', getTeacherProfileForStudentAPI)  //getTeacherProfileAPI)

app.put('/api/students/profile', updateStudentGeneralInfoAPI) // Update general info for student

app.get('/api/students/profile', getStudentProfileAPI) // return array students: [students]

app.get('/api/student/profile', getParentProfileAPI) // return profile: profile

app.post('/api/student/profile/avatar', changeStudentProfileAvatar) // Update student avatar

app.post('/api/student/lessons/cancel_schedule/:id', cancelLessonAPI)

app.post('/api/student/lessons/:id/suspend', suspendLessonAPI)

app.get('/api/student/customer/card_info', getStudentCardInfoAPI)

app.get('/api/student/customer/card_setup', getOrSetUpCardForStudentAPI)

app.post('/api/student/customer/card_save', saveStudentCardApi)

app.get('/api/students/progress_reports', getStudentProgressReportAPI)

/* --- SCHEDULE API --- */
app.get('/api/schedules?:date', getSchedulesAPI)

app.get('/api/schedules/upcoming?:profile_id', getUpcomingLessonAPI)

/* ---- Invoices ---*/

app.get('/api/student/invoices?:date', getStudentInvoicesAPI)

app.get('/api/teacher/earnings/receipts?:date', getTeacherEarningAPI)

app.get('/api/teacher/earnings', getPeriodEarningAPI)

//  REPORT API
app.post('/api/supports/report', reportProblemAPI)

app.post('/api/supports/assistance', postAssistanceAPI)

// REVIEW API

app.post('/api/reviews', postReviewAPI)

app.get('/api/reviews', getReviewAPI)

// Meeting

app.get('/api/meeting', getMeetingRoomInformationAPI)

app.post('/api/signup', signUpApi)

app.post('/api/hooks', async (req, res) => {
  // Handle the event
  const event = req.body
  switch (event.type) {
    case 'charge.succeeded': {
      console.log("vao day roi>>>>>>>>")
      const data = event.data.object
      const invoiceUrl = data.receipt_url
      const payment_intent = data.payment_intent
      const succeed = await updateScheduleInvoiceUrl(invoiceUrl, payment_intent)
      if (!succeed) {
        console.log("retry")
        return res.status(400).json(false)
      }
      console.log("ok ok >>>>>>>>")

      break;
    }

    case 'payment_intent.payment_failed': {
      console.log("invoice payment failed: ", event);
      // handle next payment period fail; 
      break;
    }
  }
  res.status(200).json(true)
})

app.listen(3002, () => {
  console.log(`Server listening on port 3002`);
});

jobChargeMoneyStudent()
jobPayoutMoneyToTeacher()
jobGenerateClassRoom()
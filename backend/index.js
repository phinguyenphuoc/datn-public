const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()
const app = express();
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 100000, limit: '50mb' }));
app.use(cors(({ credentials: true, origin: 'http://localhost:3000' })));
const router = require("./routes/index");


// import { listTeacherAPI } from "./controller/teacher";
const { listTeacherAPI, getTeacherProfileAPI, getPendingBookingsAPI } = require('./controller/teacher')
const instrumentsApi = require('./controller/instrument')
const getUserProfileApi = require('./controller/profile')
const { updateStudentProfileAPI, addStudentProfileAPI, getStudentProfileAPI, uploadStudentAvatarAPI } = require('./controller/student');
const { registerPendingStudentAPI } = require('./controller/booking');

app.use('/', router)
app.get('/', (req, res) => {
  res.send('welcome')
})
app.get('/teachers/profiles', listTeacherAPI)

app.get('/instruments', instrumentsApi)

app.get('/profile', getUserProfileApi)

app.get('/teachers/profile', getTeacherProfileAPI)

app.get('/students/profile', getStudentProfileAPI)


app.put('/students/profile', updateStudentProfileAPI)

app.post('/students/profile', addStudentProfileAPI)

app.post('/student/profile/avatar', upload.single('profileImage'), uploadStudentAvatarAPI)

app.post('/register_pending_student', registerPendingStudentAPI)

app.get('/teachers/pending_bookings', getPendingBookingsAPI)

app.listen(3002, () => {
  console.log(`Server listening on port 3002`);
});

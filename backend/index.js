const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 100000, limit: '50mb' }));
app.use(cors(({ credentials: true, origin: 'http://localhost:3000' })));

// import { listTeacherAPI } from "./controller/teacher";
const listTeacherAPI = require('./controller/teacher')
const instrumentsApi = require('./controller/instrument')
app.get('/', (req, res) => {
  res.send('welcome')
})
app.get('/teachers/profiles', listTeacherAPI)

app.get('/instruments', instrumentsApi)

app.listen(3002, () => {
  console.log(`Server listening on port 3002`);
});

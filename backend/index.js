const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 100000, limit: '50mb' }));
app.use(cors());

// import { listTeacherAPI } from "./controller/teacher";
const listTeacherAPI = require('./controller/teacher')

app.get('/', (req, res) => {
  res.send('welcome')
})
app.get('/profiles', listTeacherAPI)

app.listen(3002, () => {
  console.log(`Server listening on port 3002`);
});

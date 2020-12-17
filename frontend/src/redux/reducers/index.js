import { combineReducers } from "redux";

import modalMessage from "./modalMessage";
import student from "./student";
import teachers from "./teachers";
import teacher from "./teacher";
import login from "./login";
import parent from "./parent";
import help from "./help";
import global from "./global";
import reportProblem from "./reportProblem";
import instruments from "./instruments";
import reviews from "./reviews";
import meeting from "./meeting";

export default combineReducers({
  modalMessage,
  student,
  teachers,
  teacher,
  login,
  parent,
  help,
  global,
  reportProblem,
  instruments,
  reviews,
  meeting
});

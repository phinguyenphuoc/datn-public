import { combineReducers } from "redux";

import modalMessage from "./modalMessage";
import student from "./student";
import teachers from "./teachers";
import teacher from "./teacher";
import contactUs from "./contactUs";
import login from "./login";
import forgotPassword from "./forgotPassword";
import resetPassword from "./resetPassword";
import checkPasswordResetCode from "./checkPasswordResetCode";
import updatePassword from "./updatePassword";
import parent from "./parent";
import stickers from "./stickers";
import help from "./help";
import global from "./global";
import reportProblem from "./reportProblem";
import instruments from "./instruments";
import reviews from "./reviews";
import articles from "./articles";

export default combineReducers({
  modalMessage,
  student,
  teachers,
  teacher,
  contactUs,
  login,
  forgotPassword,
  resetPassword,
  checkPasswordResetCode,
  updatePassword,
  parent,
  stickers,
  help,
  global,
  reportProblem,
  instruments,
  reviews,
  articles,
});

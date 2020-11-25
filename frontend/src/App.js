import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import HomePage from "./containers/HomePage";
import About from "./containers/About";
import HowItWorksPage from "./containers/HowItWorksPage";
import Teachers from "./containers/Teachers";
import TeachWithUsPage from "./containers/TeachWithUsPage";
import LogIn from "./containers/LogIn";
import ForgotPassword from "./containers/ForgotPassword";
import SignUp from "./containers/SignUp";
import ResetPassword from "./containers/ResetPassword";
import ContactUs from "./containers/ContactUs";
import { ModalMessage } from "./components/common";
import Logout from "./containers/Logout";
import {
  Home,
  ProfileParent,
  UserStudent,
  PaymentPage,
  ProgressReport,
  ProgressHistory,
  OldProgressReport,
  Profiles,
} from "./containers/dashboard/parent";
import {
  HomeTeacher,
  BookALesson,
  EarningsDetails,
  EarningPage,
  ProfileTeacher,
  MyStudentPage,
  ProgressReportForm,
  ProgressReportTeacher,
  Meeting
} from "./containers/dashboard/teacher";
import {
  withAuth,
  withLayout,
  withLayoutDashboard,
  withLayoutTeachWithUs,
  withLayoutNoFooter,
  withLayoutDashboardVer2,
} from "./HOCs";
import { USER_ROLE_TEACHER, USER_ROLE_PARENT } from "./utils/constants";
import Teacher from "./containers/Teacher";
// import ReactGA from "react-ga";
// import { hotjar } from "react-hotjar";
// import { GA_TRACKING_ID, HJID, HJSV, HJENABLED } from "./config.js";
import ConfirmSignUp from "./containers/ConfirmSignUp";

// ReactGA.initialize(GA_TRACKING_ID);
// if (HJENABLED === "true") {
//   hotjar.initialize(HJID, HJSV);
// }

function ScrollToTop(props) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    // ReactGA.pageview(window.location.pathname + window.location.search);
  }, [props.location]);

  return props.children;
}

const ScrollToTopRouter = withRouter(ScrollToTop);

function App() {
  return (
    <Router>
      <ScrollToTopRouter>
        <Switch>
          <Route path="/about" exact component={withLayout(About)} />
          <Route
            path="/how-it-works"
            exact
            component={withLayout(HowItWorksPage)}
          />
          <Route
            path="/teachers"
            exact
            component={withLayoutNoFooter(Teachers, true, "teachers")}
          />
          <Route
            path="/teachers/:teacherTag"
            exact
            component={withLayoutNoFooter(Teacher)}
          />
          <Route
            path="/teach-with-us"
            exact
            component={withLayoutTeachWithUs(TeachWithUsPage)}
          />
          <Route path="/login" exact component={withLayout(LogIn)} />
          <Route
            path="/forgot-password"
            exact
            component={withLayout(ForgotPassword)}
          />
          <Route
            path="/signup"
            exact
            component={withLayout(SignUp)}
          />
          <Route
            path="/confirm-signup"
            exact
            component={withLayout(ConfirmSignUp)}
          />
          <Route
            path="/reset-password"
            exact
            component={withLayout(ResetPassword)}
          />
          <Route path="/logout" component={Logout} exact />
          <Route path="/contact-us" exact component={withLayout(ContactUs)} />Articles
          {/* Dashboard Pages for teacher */}
          <Route
            path="/dashboard/teacher"
            component={withAuth(withLayoutDashboard(HomeTeacher), [
              USER_ROLE_TEACHER,
            ])}
            exact
          />
          <Route
            path="/dashboard/teacher/meeting/:room"
            component={withAuth(withLayoutDashboard(Meeting), [
              USER_ROLE_TEACHER,
            ])}
            exact
          />
          <Route
            path="/dashboard/teacher/my-students-page"
            exact
            component={withAuth(withLayoutDashboard(MyStudentPage), [
              USER_ROLE_TEACHER,
            ])}
          />
          <Route
            path="/dashboard/teacher/my-students-page/progress-report-form"
            exact
            component={withAuth(withLayoutDashboard(ProgressReportForm), [
              USER_ROLE_TEACHER,
            ])}
          />
          <Route
            path="/dashboard/teacher/my-students-page/progress-report"
            exact
            component={withAuth(withLayoutDashboard(ProgressReportTeacher), [
              USER_ROLE_TEACHER,
            ])}
          />
          <Route
            path="/dashboard/teacher/new-lesson"
            exact
            component={withAuth(withLayoutDashboard(BookALesson), [
              USER_ROLE_TEACHER,
            ])}
          />
          {/* This route has some sub routes */}
          <Route
            path="/dashboard/teacher/profile"
            component={withAuth(withLayoutDashboard(ProfileTeacher), [
              USER_ROLE_TEACHER,
            ])}
          />
          <Route
            path="/dashboard/teacher/earnings"
            exact
            component={withAuth(withLayoutDashboard(EarningPage), [
              USER_ROLE_TEACHER,
            ])}
          />
          <Route
            path="/dashboard/teacher/earnings/earnings-details"
            exact
            component={withAuth(withLayoutDashboard(EarningsDetails), [
              USER_ROLE_TEACHER,
            ])}
          />
          {/* Dashboard Pages for parent */}
          <Route
            path="/dashboard/student"
            component={withAuth(withLayoutDashboard(Home), [USER_ROLE_PARENT])}
            exact
          />
          <Route
            path="/dashboard/student/meeting/:room"
            component={withAuth(withLayoutDashboard(Meeting), [
              USER_ROLE_PARENT,
            ])}
            exact
          />
          <Route
            path="/dashboard/student/progress-report"
            component={withAuth(withLayoutDashboard(ProgressReport), [
              USER_ROLE_PARENT,
            ])}
            exact
          />
          <Route
            path="/dashboard/student/progress-report/history"
            component={withAuth(withLayoutDashboard(ProgressHistory), [
              USER_ROLE_PARENT,
            ])}
            exact
          />
          <Route
            path="/dashboard/student/progress-report/history/:dateReport"
            component={withAuth(withLayoutDashboard(OldProgressReport), [
              USER_ROLE_PARENT,
            ])}
            exact
          />
          <Route
            path="/dashboard/student/profile/users/:userId"
            component={withAuth(withLayoutDashboard(UserStudent), [
              USER_ROLE_PARENT,
            ])}
            exact
          />
          <Route
            path="/dashboard/student/payment"
            component={withAuth(withLayoutDashboard(PaymentPage), [
              USER_ROLE_PARENT,
            ])}
            exact
          />
          <Route
            path="/dashboard/student/profile"
            component={withAuth(withLayoutDashboard(ProfileParent), [
              USER_ROLE_PARENT,
            ])}
          />
          {/* Dashboardver2 parent profiles */}
          <Route
            path="/dashboardver2/student/profiles"
            component={withAuth(
              withLayoutDashboardVer2(Profiles, true, "profiles"),
              [USER_ROLE_PARENT]
            )}
          />
          {/* Homepage */}
          <Route path="/" component={withLayout(HomePage)} />
        </Switch>
      </ScrollToTopRouter>
      <ModalMessage />
    </Router>
  );
}

export default App;

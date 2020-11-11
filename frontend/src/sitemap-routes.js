import React from 'react';
import { Route } from 'react-router';

import {
    BrowserRouter as Router,
    Switch,
    withRouter,
} from "react-router-dom";

export default (
    <Router>
        <Switch>
            <Route path="/about" />
            <Route
                path="/how-it-works"
            />
            <Route
                path="/teachers"
            />
            <Route
                path="/teachers/:teacherTag"
            />
            <Route
                path="/teach-with-us"
            />
            <Route path="/login" />
            <Route
                path="/forgot-password"
            />
            <Route
                path="/reset-password"
            />
            <Route path="/logout" />
            <Route path="/contact-us" />
            {/* <Route path="/faq" /> */}
            <Route path="/privacy" />
            <Route path="/terms" />
            {/* Dashboard Pages for teacher */}
            <Route
                path="/dashboard/teacher"
            />
            <Route
                path="/dashboard/teacher/my-students-page"
            />
            <Route
                path="/dashboard/teacher/my-students-page/progress-report-form"
            />
            <Route
                path="/dashboard/teacher/my-students-page/progress-report"
            />
            <Route
                path="/dashboard/teacher/new-lesson"
            />
            {/* This route has some sub routes */}
            <Route
                path="/dashboard/teacher/profile"
            />
            <Route
                path="/dashboard/teacher/earnings"
            />
            <Route
                path="/dashboard/teacher/earnings/earnings-details"
            />
            {/* Dashboard Pages for parent */}
            <Route
                path="/dashboard/parent"
            />
            <Route
                path="/dashboard/student/progress-report"
            />
            <Route
                path="/dashboard/student/progress-report/history"
            />
            <Route
                path="/dashboard/student/progress-report/history/:dateReport"
            />
            <Route
                path="/dashboard/student/profile/users/:userId"
            />
            <Route
                path="/dashboard/student/payment"
            />
            <Route
                path="/dashboard/student/profile"
            />
            {/* Homepage */}
            <Route path="/" />
        </Switch>
    </Router>
);

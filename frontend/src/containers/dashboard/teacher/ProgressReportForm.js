import React from "react";
import { useLocation, Redirect } from "react-router-dom";
import {
  Banner,
  Form,
} from "../../../components/dashboard/teacher/progressReportForm";
import { useHistory } from "react-router-dom";
import { progressReport } from "../../../redux/actions/teacher";
import { openModalMessage } from "../../../redux/actions/modalMessage";

function ProgressReportForm(props) {
  const location = useLocation();

  const history = useHistory();

  if (!location.state || !location.state.dataStudent) {
    return <Redirect to="/dashboard/teacher/my-students-page" />;
  }
  const studentSelect = location.state.dataStudent;
  const profile_id =
    location.state && location.state.dataStudent && studentSelect.id;

  const handleSubmitProgressReportForm = (formData) => {
    if (
      location.state &&
      location.state.dataStudent &&
      location.state.dataStudent.id
    ) {
      progressReport(profile_id, formData, () => {
        openModalMessage({
          title: "Progress report",
          body: <p>Your progress report has been added successfully.</p>,
        });
        history.push("/dashboard/teacher/my-students-page");
      });
    }
  };
  return (
    <>
      <Banner dataStudentSelect={studentSelect} />
      <Form
        dataStudentSelect={studentSelect}
        handleSubmit={handleSubmitProgressReportForm}
      />
    </>
  );
}

export default ProgressReportForm;

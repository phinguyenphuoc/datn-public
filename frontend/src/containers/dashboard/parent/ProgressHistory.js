import React from "react";
import { History } from "../../../components/dashboard/parent/progress";
import { useLocation, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getStudentProgressReport } from "../../../redux/actions/parent";

function ProgressHistory(props) {
  const storeStudentProgressReports = useSelector(
    (store) => store.parent.dataStudentProgressReport
  );
  const location = useLocation();

  React.useEffect(() => {
    if (
      location.state &&
      location.state.progress &&
      location.state.progress.student &&
      location.state.progress.student.id
    ) {
      getStudentProgressReport(location.state.progress.student.id);
    }
  }, [location]);

  if (!location.state || !location.state.progress.student) {
    return <Redirect to="/dashboard/parent" />;
  }

  return (
    <>
      <History
        studentProgressReport={storeStudentProgressReports}
        dataStudent={
          location.state &&
          location.state.progress &&
          location.state.progress.student
        }
      />
    </>
  );
}

export default ProgressHistory;

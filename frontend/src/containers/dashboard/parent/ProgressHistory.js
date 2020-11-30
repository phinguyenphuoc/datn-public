import React from "react";
import { History } from "../../../components/dashboard/parent/progress";
import { useLocation, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getStudentProgressReport } from "../../../redux/actions/parent";
import { getAuth } from "../../../utils/helpers";

function ProgressHistory(props) {
  const storeStudentProgressReports = useSelector(
    (store) => store.parent.dataStudentProgressReport
  );
  const location = useLocation();
  const auth = getAuth()
  console.log({
    storeStudentProgressReports,
    state: location.state
  })
  React.useEffect(() => {
    // if (
    //   location.state &&
    //   location.state.progress &&
    //   location.state.progress.student &&
    //   location.state.progress.student.id
    // ) {
    getStudentProgressReport(auth.user_profile_id);
    // }
  }, []);

  // if (!location.state || !location.state.progress.student) {
  //   return <Redirect to="/dashboard/student" />;
  // }

  return (
    <>
      <History
        studentProgressReport={storeStudentProgressReports}
      />
    </>
  );
}

export default ProgressHistory;

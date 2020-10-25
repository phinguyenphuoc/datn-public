import React from "react";
import { useLocation, Redirect } from "react-router-dom";
import {
  Banner,
  Form,
} from "../../../components/dashboard/teacher/progressReport";
import { useSelector } from "react-redux";
import { getProgressReportItem } from "../../../redux/actions/teacher";

function ProgressReportTeacher(props) {
  const location = useLocation();

  const storeProgressReport = useSelector(
    (store) => store.teacher.dataProgressReportItem
  );

  React.useEffect(() => {
    if (
      location.state &&
      location.state.progressReport &&
      location.state.progressReport.id
    ) {
      // getProgressReportItem(location.state.progressReport.id);
    }
  }, [location]);

  if (!location.state || !location.state.progressReport) {
    return <Redirect to="/dashboard/teacher/my-students-page" />;
  }
  return (
    <>
      <Banner dataProgress={storeProgressReport.data} />
      <Form dataProgress={storeProgressReport.data} />
    </>
  );
}

export default ProgressReportTeacher;

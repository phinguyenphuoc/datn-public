import React from "react";
import {
  Banner,
  ProgressInfo,
  Pieces,
} from "../../../components/dashboard/parent/oldProgress";
import { useLocation, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getStudentProgressReportItem } from "../../../redux/actions/parent";

function ProgressReport(props) {
  const location = useLocation();
  const storeProgressReportItem = useSelector(
    (store) => store.parent.dataProgressReportItem
  );

  React.useEffect(() => {
    if (
      location.state &&
      location.state.studentProgress &&
      location.state.studentProgress.id
    ) {
      getStudentProgressReportItem(location.state.studentProgress.id);
    }
  }, [location]);
  if (!location.state || !location.state.progress) {
    return <Redirect to="/dashboard/parent" />;
  }

  return (
    <>
      <Banner dataProgressReport={storeProgressReportItem.data} />
      <ProgressInfo dataProgressReport={storeProgressReportItem.data} />
      <Pieces dataProgressReport={storeProgressReportItem.data} />
    </>
  );
}

export default ProgressReport;

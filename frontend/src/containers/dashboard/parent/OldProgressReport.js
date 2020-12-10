import React from "react";
import {
  Banner,
  ProgressInfo,
  Pieces,
} from "../../../components/dashboard/parent/oldProgress";
import { useLocation, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getStudentProgressReportItem } from "../../../redux/actions/parent";
import _ from "lodash"
function ProgressReport(props) {
  const location = useLocation();
  const storeProgressReportItem = useSelector(
    (store) => store.parent.dataProgressReportItem
  );

  React.useEffect(() => {
    if (
      props.match &&
      props.match.params &&
      props.match.params.id
    ) {
      getStudentProgressReportItem(props.match.params.id);
    }
  }, [location]);

  if (!location.state || !location.state.progress) {
    return <Redirect to="/dashboard/student" />;
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

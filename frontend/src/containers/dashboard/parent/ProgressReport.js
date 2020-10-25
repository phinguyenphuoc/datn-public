import React from "react";
import {
  Banner,
  ProgressInfo,
  Pieces,
} from "../../../components/dashboard/parent/progress";
import { useLocation, Redirect } from "react-router-dom";

function ProgressReport(props) {
  const location = useLocation();
  if (!location.state || !location.state.progress) {
    return <Redirect to="/dashboard/parent" />;
  }
  const progressReportSelect = location.state.progress;
  return (
    <>
      <Banner dataProgressReport={progressReportSelect} />
      <ProgressInfo dataProgressReport={progressReportSelect} />
      <Pieces dataProgressReport={progressReportSelect} />
    </>
  );
}

export default ProgressReport;

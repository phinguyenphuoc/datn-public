import React from "react";
import { Earnings } from "../../../components/dashboard/teacher/earnings";
import { getEarningCurrentDetails } from "../../../redux/actions/teacher";
import { useSelector } from "react-redux";

function EarningPage(props) {
  const storeEarningCurrentDetails = useSelector(
    (store) => store.teacher.earningCurrentDetails
  );

  React.useEffect(() => {
    if (
      !Object.keys(storeEarningCurrentDetails.data).length &&
      !storeEarningCurrentDetails.loading
    ) {
      getEarningCurrentDetails();
    }
  }, [storeEarningCurrentDetails]);

  return (
    <>
      <Earnings storeEarningCurrentDetails={storeEarningCurrentDetails} />
    </>
  );
}

export default EarningPage;

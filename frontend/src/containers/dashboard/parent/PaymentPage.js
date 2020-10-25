import React from "react";
import {
  Payment,
  ModalCardUpdated,
} from "../../../components/dashboard/parent/payment";
import { useSelector } from "react-redux";
import { getCardInfo } from "../../../redux/actions/parent";

function PaymentPage(props) {
  const [openModalCardUpdated, setOpenModalCardUpdated] = React.useState(false);

  React.useEffect(() => {
    getCardInfo();
  }, []);

  const storeCardInfo = useSelector((store) => store.parent.cardInfo);
  const handleModalCardUpdated = (e) => {
    if (e) {
      e.preventDefault();
    }
    setOpenModalCardUpdated(!openModalCardUpdated);
  };

  return (
    <>
      <Payment
        handleToggleModalCardUpdated={handleModalCardUpdated}
        storeCardInfo={storeCardInfo}
      />
      <ModalCardUpdated
        isOpen={openModalCardUpdated}
        handleToggle={handleModalCardUpdated}
      />
    </>
  );
}

export default PaymentPage;

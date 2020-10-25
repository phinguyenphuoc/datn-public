import React from "react";
import styled from "styled-components";
import { ModalHeader, ModalBody } from "reactstrap";
import { Modal } from "../../../common";
import tick from "../../../../assets/images/tick-CC-welcome.svg";

const StyledModal = styled(Modal)`
  && {
    max-width: 620px;
    width: 100%;
    margin: 0 auto;
    padding: 15px;
    .modal-content {
      box-shadow: 5px 5px 95px rgba(0, 0, 0, 0.5);
      border-radius: 6px;
      border: none;
    }
    .modal-header {
      background: #ffffff;
      border-bottom: none;
      padding: 0 10px;
      .close {
        opacity: 1;
        span {
          color: #6254e8;
          font-size: 45px;
          font-weight: 400;
        }
      }
    }
    .modal-body {
      padding: 20px 30px 80px;
      text-align: center;
      h4 {
        color: #08135a;
        font-size: 30px;
        margin: 10px 0;
        line-height: 32px;
      }
      .modal__text {
        color: #08135a;
        font-size: 18px;
        line-height: 20px;
        margin: 0 auto;
        font-weight: 500;
      }
      .tick {
        width: 110px;
        height: 110px;
      }
    }
    @media only screen and (max-width: 600px) {
      .modal-body {
        .modal__text {
          font-size: 16px;
        }
        h4 {
          font-size: 26px;
          line-height: 30px;
        }
      }
    }
    @media only screen and (max-width: 535px) {
      .modal-body {
        padding: 0 20px 40px;
        .modal__text {
          font-size: 15px;
        }
        h4 {
          font-size: 24px;
        }
        .tick {
          width: 90px;
          height: 90px;
        }
      }
    }
  }
`;

const ModalStripeSuccess = ({ isOpen, handleToggle }) => {
  return (
    <StyledModal
      isOpen={isOpen}
      toggle={handleToggle}
      wrapClassName="wrap-modalDashboard"
      id="modal-zoom"
      centered
    >
      <ModalHeader toggle={handleToggle}></ModalHeader>
      <ModalBody>
        <img src={tick} alt="tick" className="tick" />
        <h4>Payment methods successfully set!</h4>
        <div className="modal__text">
          You are now able to accept payments from your students.
        </div>
      </ModalBody>
    </StyledModal>
  );
};

export default ModalStripeSuccess;

import React from "react";
import styled from "styled-components";
import { ModalHeader, ModalBody } from "reactstrap";
import { Modal } from "../../../common";
import { Link } from "react-router-dom";

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
      padding: 5px 20px 0;
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
      padding: 15px 40px 75px;
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
        line-height: 28px;
        margin: 0 auto;
        font-weight: 500;
        a {
          color: #6254e8;
          transition: 0.3s ease;
          &:hover {
            color: #f6732f;
          }
        }
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
          line-height: 20px;
        }
        h4 {
          font-size: 22px;
        }
      }
    }
  }
`;

const ModalStripeWrong = ({ isOpen, handleToggle }) => {
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
        <h4>Something went wrong</h4>
        <div className="modal__text">
          Sorry, something went wrong while trying to set your payment methods.
          <br />
          Please try again or contact us <Link to="/contact-us">here</Link>
        </div>
      </ModalBody>
    </StyledModal>
  );
};

export default ModalStripeWrong;

import React from "react";
import styled from "styled-components";
import { ModalHeader, ModalBody } from "reactstrap";
import { Modal } from "../../../common";
import logo from "../../../../assets/images/logoZoom.svg";
import zoom from "../../../../assets/images/zoom.svg";
import camera from "../../../../assets/images/cameraZoom.svg";
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
      padding: 0 30px 15px;
      text-align: center;
      .modal__logo {
        display: flex;
        justify-content: center;
        align-items: baseline;
        margin-bottom: 30px;
        p {
          color: rgba(0, 0, 0, 0.5);
          font-size: 30px;
          line-height: 34px;
          font-weight: 500;
          margin: 0 15px;
        }
      }
      h4 {
        color: #08135a;
        font-size: 30px;
        margin: 10px 0 40px;
        line-height: 32px;
      }
      .modal__text {
        color: #08135a;
        font-size: 18px;
        line-height: 30px;
        max-width: 440px;
        margin: 0 auto 35px;
        font-weight: 500;
        text-align: left;
      }
      .logo {
        width: 66px;
        height: 44px;
      }
      .zoom {
        width: 89px;
        height: 20px;
      }
      .tick {
        width: 110px;
        height: 110px;
      }
      .camera {
        width: 48px;
        height: 48px;
      }
    }
    @media only screen and (max-width: 500px) {
      .modal-body {
        .modal__text {
          font-size: 16px;
          line-height: 24px;
        }
        .modal__logo,
        h4,
        .modal__text {
          margin-bottom: 20px;
        }
        h4 {
          font-size: 26px;
        }
      }
    }
    @media only screen and (max-width: 400px) {
      .modal-body {
        padding: 0 20px 15px;
        .modal__text {
          font-size: 15px;
          line-height: 22px;
        }
        h4 {
          font-size: 24px;
          margin: 0 0 20px;
        }
        .tick {
          width: 90px;
          height: 90px;
        }
      }
    }
  }
`;

const ModalZoomSuccess = ({ isOpen, handleToggle }) => {
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
        <div className="modal__logo">
          <img src={logo} alt="logo" className="logo" />
          <p>&</p>
          <img src={zoom} alt="zoom" className="zoom" />
        </div>
        <img src={tick} alt="tick" className="tick" />
        <h4>Account successfully linked!</h4>
        <div className="modal__text">
          You can now start your online lessons directly from your dashboard by
          clicking on.
          <img src={camera} alt="camera" className="camera" />
        </div>
      </ModalBody>
    </StyledModal>
  );
};

export default ModalZoomSuccess;

import React from "react";
import styled from "styled-components";
import { ModalHeader, ModalBody } from "reactstrap";
import { Modal } from "../../../common";
import logo from "../../../../assets/images/logoZoom.svg";
import zoom from "../../../../assets/images/zoom.svg";
import addZoom from "../../../../assets/images/addZoomBtn.svg";
import zoomBtn from "../../../../assets/images/zoomBtn.svg";
// import { ZOOM_CLIENT_ID, DOMAIN } from "../../../../config";

const StyledModal = styled(Modal)`
  && {
    max-width: 640px;
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
      padding: 10px 20px 15px;
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
      .modal__text {
        color: #08135a;
        font-size: 18px;
        line-height: 30px;
        max-width: 520px;
        margin: 0 auto 30px;
        font-weight: 500;
      }
      .logo {
        width: 66px;
        height: 44px;
      }
      .zoom {
        width: 89px;
        height: 20px;
      }
      a {
        width: 100%;
      }
      .btn__zoom {
        background: #2d8cff;
        border-radius: 25px;
        border: none;
        height: 44px;
        width: 100%;
        max-width: 195px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto 30px;
        transition: 0.3s ease;
        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 8px 0 #124f99;
        }
        span {
          font-size: 18px;
          line-height: 30px;
          margin: 0 15px;
          color: #ffffff;
          font-weight: 500;
        }
        .addZoom {
          width: 30px;
          height: 19px;
        }
        .zoom_text {
          width: 66px;
          height: 15px;
        }
      }
    }
    @media only screen and (max-width: 500px) {
      .modal-body {
        .modal__text {
          font-size: 16px;
          line-height: 24px;
        }
        .modal__logo,
        .btn__zoom,
        .modal__text {
          margin-bottom: 20px;
        }
      }
    }
    @media only screen and (max-width: 370px) {
      .modal-body {
        .modal__text {
          font-size: 15px;
          line-height: 22px;
        }
      }
    }
  }
`;

const ModalZoom = ({ isOpen, handleToggle }) => {
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
        <div className="modal__text">
          HOMEMUSE uses ZOOM meetings for online music lessons. Click on the
          link below and follow the instructions to link ZOOM to your account.{" "}
        </div>
        {/* <a
          href={`https://zoom.us/oauth/authorize?client_id=${ZOOM_CLIENT_ID}&response_type=code&redirect_uri=${DOMAIN}/dashboard/teacher/profile/homemuse-profile&state=zoom_auth`}
        > */}
        <button className="btn__zoom">
          <img src={addZoom} alt="addZoom" className="addZoom" />
          <span>Add</span>
          <img src={zoomBtn} alt="zoom" className="zoom_text" />
        </button>
        {/* </a> */}
      </ModalBody>
    </StyledModal>
  );
};

export default ModalZoom;

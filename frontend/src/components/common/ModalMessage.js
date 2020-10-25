import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import logo from "../../assets/images/logo_message.svg";
import fly from "../../assets/images/fly.svg";
import { closeModalMessage } from "../../redux/actions/modalMessage";

const StyledModal = styled(Modal)`
  && {
    overflow: hidden;
    max-width: 470px;
    width: 100%;
    padding: 15px;
    margin: 0 auto;
    position: absolute;
    transform: translate(-50%, -50%) !important;
    top: calc(50% - 40px);
    left: 50%;
    .modal-content {
      border: none;
      background-color: transparent;
    }
    .modal-header {
      background: transparent;
      opacity: 0.95;
      padding-left: 0;
      .close {
        padding-right: 0;
        span {
          font-size: 43px;
          color: #6254e8;
          font-weight: 400;
          text-shadow: none;
        }
      }
    }
    .model-background {
      background: #fff;
    }

    .modal-body {
      text-align: center;
      padding: 20% 0 0;
      margin: 10% 5% 0;
      background: url(${fly}) no-repeat 0% 0% / 32%;
      h2 {
        font-size: 23px;
        font-weight: 600;
        margin-bottom: 4%;
      }
      p {
        font-size: 18px;
      }
    }
    .modal-footer {
      border: none;
    }
    @media only screen and (max-width: 400px) {
      .modal-body {
        h2 {
          font-size: 18px;
        }
        p {
          font-size: 16px;
          margin-bottom: 3%;
        }
      }
    }
  }
`;

const ModalMessage = () => {
  const storeModalMessage = useSelector((store) => store.modalMessage);

  React.useEffect(() => {
    if (storeModalMessage.open && storeModalMessage.data.timeout) {
      const timer = setTimeout(() => {
        closeModalMessage();
      }, storeModalMessage.data.timeout);
      return () => clearTimeout(timer);
    }
  });

  return (
    <StyledModal
      isOpen={storeModalMessage.open}
      toggle={closeModalMessage}
      wrapClassName="wrap-modal"
    >
      <ModalHeader toggle={closeModalMessage}></ModalHeader>
      <div className="model-background">
        <ModalBody>
          <div className="modal__text">
            <h2 className="modal__text__title">
              {storeModalMessage.data.title}
            </h2>
            {storeModalMessage.data.body || null}
          </div>
        </ModalBody>
        <ModalFooter>
          <img src={logo} alt="logo" />
        </ModalFooter>
      </div>
    </StyledModal>
  );
};

export default ModalMessage;

import React from "react";
import styled from "styled-components";
import Modal from "@material-ui/core/Modal";
import tick from "../../../../assets/images/tick-message.svg";

const StyledModal = styled(Modal)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    > div:first-child {
      background-color: rgba(0, 0, 0, 0.22) !important;
    }
    .modal-message {
      max-width: 500px;
      border: none;
      background: #f6732f;
      border-radius: 15px;
      outline: none;
    }
    .modal-header {
      position: relative;
      border-bottom: none;
      .modal-title {
        position: initial;
      }
      button {
        border: none;
        background: transparent;
        color: #fff;
        font-size: 45px;
        position: absolute;
        right: 10px;
        top: 5px;
      }
    }
    .modal-body {
      text-align: center;
      padding: 20px 20px 50px;
      color: #ffffff;
      margin-top: 20px;
      img {
        width: 90px;
        height: 90px;
      }
      h2 {
        font-size: 27px;
        margin-bottom: 0;
      }
    }
    .modal-footer {
      border: none;
      justify-content: center;
      padding: 30px 20px;
      a,
      button {
        border: none;
        border-radius: 25px;
        padding: 2px 8px;
        font-size: 12px;
        line-height: 34px;
        background: #fff;
        color: #fff;
        font-weight: 500;
        transition: 0.3s ease;
        border-radius: 30px;
        width: 100%;
        text-align: center;
        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 8px 0 #6a2704;
        }
      }
      .bt-finish {
        max-width: 82px;
        margin-right: 10px;
        color: #f6732f;
      }
      .bt-continue {
        max-width: 210px;
        background: transparent;
        border: 1px solid #ffffff;
      }
    }
    @media only screen and (max-width: 435px) {
      .modal-body {
        margin-top: 0;
        h2 {
          font-size: 21px;
        }
        p {
          font-size: 10px;
        }
      }
    }
    @media only screen and (max-width: 383px) {
      .modal-footer {
        padding: 0px 20px 30px;
        .bt-finish {
          margin-right: 0;
        }
      }
      .modal-body {
        padding: 4px 20px 20px;
      }
    }
  }
`;

const ModalMessageBookLesson = ({
  isOpen,
  handleToggle,
  handleNextBooking,
  OPTIONS_STUDENT,
}) => {
  return (
    <StyledModal
      open={isOpen}
      onClose={handleToggle}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
    >
      <div className="modal-message">
        <div className="modal-header">
          <button onClick={handleToggle}>×</button>
        </div>
        <div className="modal-body">
          <img src={tick} alt="tick" />
          <div className="modal__text">
            <h2 className="modal__text__title">Lesson successfuly booked</h2>
            <p>This lesson is now added to your calendar. </p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="bt-finish" onClick={handleToggle}>
            Finish
          </button>
          {OPTIONS_STUDENT.length > 1 && (
            <button className="bt-continue" onClick={handleNextBooking}>
              Continue with next booking
            </button>
          )}
        </div>
      </div>
    </StyledModal>
  );
};

export default ModalMessageBookLesson;

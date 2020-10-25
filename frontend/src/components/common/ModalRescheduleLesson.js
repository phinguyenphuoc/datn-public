import React from "react";
import styled from "styled-components";
import { ModalHeader, ModalBody, Form } from "reactstrap";
import { Modal, FormGroup } from "../common";
import { isEmpty } from "validator";

const StyledModal = styled(Modal)`
  && {
    max-width: 780px;
    width: 100%;
    top: 50%;
    transform: translateY(-50%) !important;
    margin: 0 auto;
    padding: 15px;
    .modal-header {
      background: rgba(20, 30, 98, 0.03);
      position: relative;
      border-bottom: 2px solid rgba(3, 9, 48, 0.15);
      height: 107px;
      &__text {
        position: absolute;
        text-align: center;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        p {
          font-size: 21px;
          color: #08135a;
          font-weight: 400;
          margin-bottom: 0;
        }
      }
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
      text-align: center;
      padding: 30px 15px;
      form {
        .form__text {
          margin-bottom: 4%;
          h3 {
            color: #6254e8;
            font-size: 16px;
            max-width: 400px;
            margin: 0 auto;
            margin-bottom: 2%;
          }
          p {
            color: #505050;
            font-size: 16px;
          }
        }
        .form-group {
          margin-bottom: 4%;
        }
        .textarea {
          border-radius: 4px;
          font-size: 14px;
          height: 150px;
          max-width: 630px;
          margin: 0 auto;
          resize: none;
          &:placeholder {
            color: #6b7cb7;
          }
        }
        button {
          border-radius: 40px;
          height: 40px;
          width: calc(100% - 30px);
          border: none;
          font-size: 12px;
          transition: 0.3s ease;
          color: #fff;
          margin: 5px 15px;
          &:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 8px 0 #2d20a7;
          }
        }
        .button-back {
          background: #6254e8;
          max-width: 90px;
        }
        .button-request {
          background: #ffffff;
          max-width: 250px;
          min-width: 205px
          border: 1px solid #6254e8;
          color: #6254e8;
          white-space: nowrap;
        }
      }
    }
    @media only screen and (max-width: 365px) {
      transform: none !important;
      top: 0;
      .modal-header__text p {
        font-size: 18px;
      }
      .modal-body {
        padding: 20px 15px;
        form {
        .checkbox {
          font-size: 12px;
        }
        .form__text {
          h3,
          p {
            font-size: 14px;
          }
        }
        .textarea {
          font-size: 12px;
          height: 120px;
        }
      }
    }
    } 
    @media only screen and (max-width: 1400px) {
      margin: 10% auto;
    }
  }
`;

const ModalRescheduleLesson = ({
  isOpen,
  handleToggle,
  placeholder1,
  placeholder2,
}) => {
  const [error, setError] = React.useState({});
  const [form, setForm] = React.useState({
    reason: "",
    message: "",
  });

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const errorState = validate();
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }
    // const formData = {
    //   reason: form.reason,
    //   message: form.reason,
    // };
    // console.log("formData", formData);
  };

  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.reason)) {
      errorState.reason = "Please fill out this field ";
    }
    if (isEmpty(form.message)) {
      errorState.message = "Please fill out this field ";
    }

    return errorState;
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleFocus = (event) => {
    setError({
      ...error,
      [event.target.name]: "",
    });
  };
  return (
    <StyledModal
      isOpen={isOpen}
      toggle={handleToggle}
      wrapClassName="wrap-modalDashboard"
      id="modal-reschedule-lesson"
    >
      <ModalHeader toggle={handleToggle}>
        <div className="modal-header__text">
          <p>Reschedule a lesson</p>
        </div>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmitForm}>
          <div className="form__text">
            <h3>The following lesson will be rescheduled</h3>
            <p>Piano Class with Léa lou on May, 16th 2020 at 4.10pm</p>
          </div>
          <FormGroup
            propsInput={{
              type: "textarea",
              name: "reason",
              placeholder: placeholder1,
              className: "textarea",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.reason,
            }}
            error={error.reason}
          />
          <FormGroup
            propsInput={{
              type: "textarea",
              name: "message",
              placeholder: placeholder2,
              className: "textarea",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.message,
            }}
            error={error.message}
          />
          <div className="button-group">
            <button className="button-back fw-500" onClick={handleToggle}>
              Back
            </button>
            <button className="button-request fw-500">
              Request for a makeup lesson
            </button>
          </div>
        </Form>
      </ModalBody>
    </StyledModal>
  );
};

export default ModalRescheduleLesson;

import React from "react";
import styled from "styled-components";
import { ModalHeader, ModalBody, Form } from "reactstrap";
import { Modal, FormGroup, FormBox } from "../common";
import { isEmpty } from "validator";
import Rating from '@material-ui/lab/Rating';
import { useSelector } from "react-redux";

const StyledModal = styled(Modal)`
  .rating-block {
    display: flex;
    align-item: center;
    margin: 10px 44px;
  }
  .form-box {
    max-width: 450px !important;
    margin: auto !important;
  }
  && {
    max-width: 580px;
    width: 100%;
    margin: 0 auto;
    padding: 15px;
    .modal-header {
      background: rgba(20, 30, 98, 0.03);
      position: relative;
      border-bottom: 2px solid rgba(3, 9, 48, 0.15);
      height: 185px;
      .modal-title {
        display: flex;
        padding: 20px 15px;
      }

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
        h3 {
          color: #6254e8;
          font-size: 16px;
          max-width: 400px;
          margin: 0 auto;
          line-height: 30px;
          margin-bottom: 24px;
        }
        .textarea {
          border-radius: 4px;
          font-size: 14px;
          height: 150px;
          max-width: 430px;
          margin: 0 auto;
          color: #08135a
          resize: none;
          &:placeholder {
            color: #6b7cb7;
          }
        }
        button {
          background: #fd7e14;
          border-radius: 40px;
          height: 40px;
          max-width: 160px;
          width: 50%;
          border: none;
          font-size: 12px;
          transition: 0.3s ease;
          color: #fff;
          margin-top: 10px;
          &:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 8px 0 #d69777;
          }
          &[disabled] {
            pointer-events: none;
            background: #908e8e;
          }
        }
      }
    }
    @media only screen and (max-width: 480px) {
      .modal-header {
        height: 160px;
      }
      .modal-body {
        padding: 20px 15px;
    }
      .modal-header__text {
        left: 56%;
        p {
          font-size: 18px;
        }
      }
    }
    @media only screen and (max-width: 350px) {
      .modal-body form h3 {
        font-size: 13px;
      }
    }
  }
`;

const ModalComment = ({ isOpen, handleToggle, onSubmit, loading }) => {
  const [error, setError] = React.useState({});
  const [comment, setComment] = React.useState("");
  const [rating, setRating] = React.useState(5);
  const teacherStore = useSelector(store => store.parent.teachers);

  const TEACHER_OPTIONS = teacherStore.data.map(item => {
    return {
      value: item.id,
      label: `${item.first_name} ${item.last_name}`
    }
  })
  const [selectTeacher, setSelectTeacher] = React.useState({
    value: undefined,
    label: "Select teacher"
  })

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const errorState = validate();
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }
    const formData = {
      comment: comment,
      teacher_profile_id: selectTeacher.value,
      rating,
    };
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(comment)) {
      errorState.comment = "Please fill out this field ";
    }
    if (selectTeacher.value === undefined) {
      errorState.teacher = "Please select a teacher";
    }

    return errorState;
  };

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleFocus = (event) => {
    setError({
      ...error,
      [event.target.name]: "",
    });
  };

  const handleSelect = (value) => {
    setSelectTeacher(value)
  }

  const handleFocusTeacher = () => {
    setError({
      ...error,
      teacher: ""
    })
  }
  return (
    <StyledModal
      isOpen={isOpen}
      toggle={handleToggle}
      wrapClassName="wrap-modalDashboard"
      id="modal-assistance"
      centered
    >
      <ModalHeader toggle={handleToggle}>
        <div className="modal-header__text">
          <p>Leave a review for your teacher</p>
        </div>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmitForm}>
          <h3>
            This review will be displayed in your teacher's profile
          </h3>
          <FormBox
            propsInput={{
              name: "teacher",
              onChange: handleSelect,
              onFocus: handleFocusTeacher,
              value: selectTeacher,
              options: TEACHER_OPTIONS,
            }}
            variant="SingleSelectLabel"
            label="Select Teacher"
            error={error.teacher}
          />
          <div className="rating-block">
            <label>Rate your teacher from 1-5 star:    </label>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </div>
          <FormGroup
            propsInput={{
              type: "textarea",
              name: "comment",
              placeholder: "Please share your thought about your teacher",
              className: "textarea",
              onChange: handleChange,
              onFocus: handleFocus,
              value: comment,
            }}
            error={error.comment}
          />
          <button className="fw-500" disabled={loading}>
            Send
          </button>
        </Form>
      </ModalBody>
    </StyledModal>
  );
};

export default ModalComment;

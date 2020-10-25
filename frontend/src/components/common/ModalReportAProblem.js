import React from "react";
import styled from "styled-components";
import { ModalHeader, ModalBody, Form } from "reactstrap";
import { Modal, FormGroup } from "../common";
import moment from "moment";
import { formatTime2 } from "../../utils/helpers";
import { isEmpty } from "validator";

const StyledModal = styled(Modal)`
  && {
    max-width: 780px;
    width: calc(100% - 1rem);
    .modal-header {
      background: rgba(20, 30, 98, 0.03);
      position: relative;
      border-bottom: none;
      height: 107px;
      &__text {
        position: absolute;
        text-align: center;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        width: 100%;
        p {
          font-size: 21px;
          color: #08135a;
          font-weight: 400;
          margin-bottom: 0;
        }
      }
      .close {
        opacity: 1;
        position: relative;
        z-index: 1000;
        span {
          color: #6254e8;
          font-size: 45px;
          font-weight: 400;
        }
      }
    }
    .modal-body {
      text-align: center;
      padding: 0;
      .form__text {
        margin-bottom: 4%;
        p {
          margin: 0;
          background: red;
          background: #f6732f;
          color: #ffffff;
          padding: 10px;
          font-size: 16px;
          span {
            text-transform: capitalize;
          }
        }
      }
      form {
        max-width: 630px;
        margin: 0 auto;
        padding: 0 15px 20px;
        .select-problem {
          text-align: left;
          margin-bottom: 20px;
          h4 {
            color: #08135a;
            font-size: 16px;
            margin-bottom: 15px;
          }
          p {
            font-size: 14px;
            color: #08135a;
          }
        }
        .form-group {
          margin-bottom: 4%;
        }
        .textarea {
          border-radius: 4px;
          font-size: 14px;
          height: 142px;
          max-width: 630px;
          margin: 0 auto;
          resize: none;
          &:placeholder {
            color: #979797;
          }
        }
        .checkbox {
          display: block;
          position: relative;
          padding-left: 45px;
          cursor: pointer;
          user-select: none;
          .input_checkbox {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
            &:checked ~ .checkmark:after {
              display: block;
            }
            &:checked ~ .checkmark {
              background: #54c052;
              border: none;
            }
          }
          .checkmark {
            position: absolute;
            left: 10px;
            top: 3px;
            height: 19px;
            width: 19px;
            background-color: #fff;
            border: 1px solid rgba(0, 0, 0, 0.5);
            border-radius: 100%;
            &:after {
              content: "";
              position: absolute;
              display: none;
              border: 2px solid #fff;
              border-radius: 100%;
              top: 3px;
              left: 3px;
              width: 13px;
              height: 13px;
            }
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
          margin: 5px 10px;
          font-weight: bold;
          &:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 8px 0 #2d20a7;
          }
        }
        .button-back {
          max-width: 90px;
          background: #ffffff;
          color: #6254e8;
          border: 1px solid #6254e8;
        }
        .button-send {
          background: #6254e8;
          width: 160px;
          white-space: nowrap;
        }
      }
    }
    @media only screen and (max-width: 365px) {
      .modal-header__text p {
        font-size: 18px;
      }
      .modal-body {
        .form__text {
          p {
            font-size: 13px;
            line-height: 19px;
          }
        }
        form {
          .checkbox {
            font-size: 12px;
          }
          .textarea {
            font-size: 12px;
            height: 110px;
          }
        }
      }
    }
    @media only screen and (max-width: 500px) {
      .modal-body form .select-problem p {
        font-size: 12px;
        margin-bottom: 10px;
      }
    }
  }
  .error {
    color: #dc3545;
  }
`;

const ModalReportAProblem = ({
  isOpen,
  handleToggle,
  problems,
  data,
  handleSubmit,
}) => {
  const [error, setError] = React.useState({});
  const [errorIssues, setErrorIssues] = React.useState("");
  const [form, setForm] = React.useState({
    comment: "",
    issues: "",
  });

  const lesson_info_Teacher =
    data && data.lesson && data.lesson.student
      ? `${data.lesson.instrument} class with ${
          data.lesson.student.first_name
        } ${data.lesson.student.last_name} on ${moment(data.date).format(
          "MMM, Do YYYY"
        )} at ${formatTime2(data.start_hour)}`
      : null;
  const lesson_info_Parent =
    data && data.lesson && data.lesson.teacher
      ? `${data.lesson.instrument} class with ${
          data.lesson.teacher.first_name
        } ${data.lesson.teacher.last_name} on ${moment(data.date).format(
          "MMM, Do YYYY"
        )} at ${formatTime2(data.start_hour)}`
      : null;

  React.useEffect(() => {
    if (!isOpen) {
      setForm({ comment: "", issues: "" });
      setErrorIssues("");
      setError({});
    }
  }, [isOpen]);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    if (!form.issues) {
      setErrorIssues("Please choose at least 1 option");
    }
    const errorState = validate();
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }

    const formData = {
      report: {
        lesson_info:
          data && data.lesson && data.lesson.student
            ? lesson_info_Teacher
            : lesson_info_Parent,
        comment: form.comment,
        issues: [form.issues],
      },
    };
    handleSubmit(formData);
  };

  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.comment)) {
      errorState.comment = "Please fill out this field ";
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
  const handleFocusIssues = () => {
    setErrorIssues("");
  };
  const handleBack = (e) => {
    e.preventDefault();
    handleToggle();
  };
  return (
    <StyledModal
      isOpen={isOpen}
      toggle={handleToggle}
      wrapClassName="wrap-modalDashboard"
      id="modal-report-a-problem"
      centered
    >
      <ModalHeader toggle={handleToggle}>
        <div className="modal-header__text">
          <p>Report a problem</p>
        </div>
      </ModalHeader>
      <ModalBody>
        <div className="form__text">
          {data && data.lesson && data.lesson.student && (
            <p>
              <span>{data.lesson.instrument}</span> Class with
              <span>{`
                ${data.lesson.student.first_name} ${data.lesson.student.last_name}`}</span>{" "}
              on{" "}
              {`${moment(data.date).format("MMM, Do YYYY")} at ${formatTime2(
                data.start_hour
              )}`}
            </p>
          )}
          {data && data.lesson && data.lesson.teacher && (
            <p>
              <span>{data.lesson.instrument}</span> Class with
              <span>{`
                ${data.lesson.teacher.first_name} ${data.lesson.teacher.last_name}`}</span>{" "}
              on{" "}
              {`${moment(data.date).format("MMM, Do YYYY")} at ${formatTime2(
                data.start_hour
              )}`}
            </p>
          )}
        </div>
        <Form onSubmit={handleSubmitForm}>
          <div className="select-problem">
            <h4>Select problem to report</h4>
            {problems &&
              problems.map((item, index) => (
                <label className="price checkbox" key={item}>
                  <input
                    name="issues"
                    type="radio"
                    className="input_checkbox"
                    onChange={handleChange}
                    onFocus={handleFocusIssues}
                    value={item}
                  />
                  <span className="checkmark"></span>
                  <p>{item}</p>
                </label>
              ))}
            <div className="error">{errorIssues}</div>
          </div>
          <FormGroup
            propsInput={{
              type: "textarea",
              name: "comment",
              placeholder: "Add a comment...",
              className: "textarea",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.comment,
            }}
            error={error.comment}
          />

          <div className="button-group">
            <button className="button-back fw-500" onClick={handleBack}>
              Back
            </button>
            <button className="button-send fw-500">Send</button>
          </div>
        </Form>
      </ModalBody>
    </StyledModal>
  );
};

export default ModalReportAProblem;

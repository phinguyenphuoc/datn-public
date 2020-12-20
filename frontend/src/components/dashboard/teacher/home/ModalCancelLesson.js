import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { ModalHeader, ModalBody, Form } from "reactstrap";
import { Modal, FormGroup } from "../../../common";
import classNames from "classnames";
import { Collapse } from "@material-ui/core";
import moment from "moment";
import { isEmpty } from "validator";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import { formatTime2, formatPhoneNumber } from "../../../../utils/helpers";

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
        width: 100%;
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
        padding: 0 20px 20px;
        text-align: left;
        max-width: 680px;
        margin: 0 auto;
        color: #08135a;
        .--text {
          color: #08135a;
          font-size: 16px;
          margin-bottom: 15px;
          font-weight: 500;
        }
        .form_-inner {
          margin-bottom: 20px;
        }
        .option_item {
          margin-bottom: 10px;
        }
        .collapse_item {
          border: 1px solid #d8d8d8;
          border-top: none;
          border-radius: 4px;
          padding: 20px 15px;
          text-align: center;
        }
        .option1 {
          text-align: left;
          p,
          h4 {
            font-size: 16px;
            span {
              font-weight: 500;
            }
          }
          h4 {
            margin-bottom: 20px;
          }
        }
        .option2 {
          .form-group {
            margin-bottom: 20px;
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
          h4 {
            font-size: 14px;
            text-align: left;
            margin: 0;
          }
          .cancel_checkbox {
            display: block;
            position: relative;
            text-align: left;
            padding: 5px 0 5px 40px;
            cursor: pointer;
            & > * {
              display: inline-block;
            }
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
            p {
              margin: 0;
              font-size: 16px;
              line-height: 18px;
              font-weight: 500;
            }
            .checkmark {
              position: absolute;
              left: 10px;
              height: 20px;
              width: 20px;
              background-color: #fff;
              border: 2px solid #b5beec;
              border-radius: 100%;
              &:after {
                content: "";
                position: absolute;
                display: none;
                border: 2px solid #fff;
                border-radius: 100%;
                top: 3px;
                left: 3px;
                width: 14px;
                height: 14px;
              }
            }
          }
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
        .option3 {
          p {
            font-size: 14px;
            text-align: left;
            line-height: 20px;
            margin-bottom: 25px;
          }
          .form-group {
            margin-bottom: 0px;
          }
          .form_to {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 24px;
            p {
              margin: 0 10px;
              font-weight: 500;
            }
            .--to {
              margin: 0 10px 0 25px;
            }
            > div {
              display: flex;
              align-items: center;
              justify-content: center;
              .MuiFormControl-root {
                max-width: 170px;
                margin: 0;
              }
              svg {
                color: #6254e8;
              }
            }
          }
          .suspension {
            margin-bottom: 15px;
            h5 {
              color: #f6732f;
              font-size: 12px;
              margin-bottom: 3px;
            }
            div {
              color: #ffffff;
              font-size: 14px;
              background: #f6732f;
              border-radius: 50px;
              padding: 3px 15px;
              display: inline-block;
            }
          }
          .textarea {
            height: 100px;
          }
          h4 {
            font-size: 14px;
            text-align: left;
            margin: 0;
          }
        }
        .bt-group {
          text-align: center;
        }
        .--bt {
          border-radius: 40px;
          height: 40px;
          border: none;
          font-size: 12px;
          transition: 0.3s ease;
          color: #fff;
          margin: 5px 10px;
          display: inline-block;
          padding: 0 20px;
          &:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 8px 0 #2d20a7;
          }
        }
        .button-back {
          background: #6254e8;
          padding: 0 25px;
        }
        .button-cancel {
          background: #ffffff;
          border: 1px solid #6254e8;
          color: #6254e8;
          padding: 0 45px;
        }
        .bt_make-up-lesson {
          background: #6254e8;
          font-size: 14px;
          margin: 0 auto;
        }
      }
    }
    .checkbox {
      display: block;
      position: relative;
      cursor: pointer;
      user-select: none;
      background: #f3f5ff;
      border-radius: 4px;
      padding: 20px 0 20px 50px;
      margin: 0;
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
      p {
        margin: 0;
        font-size: 16px;
        line-height: 18px;
        font-weight: 500;
      }
      .checkmark {
        position: absolute;
        left: 15px;
        height: 20px;
        width: 20px;
        background-color: #fff;
        border: 2px solid #b5beec;
        border-radius: 100%;
        &:after {
          content: "";
          position: absolute;
          display: none;
          border: 2px solid #fff;
          border-radius: 100%;
          top: 3px;
          left: 3px;
          width: 14px;
          height: 14px;
        }
      }
    }
    @media only screen and (max-width: 600px) {
      .modal-body {
        .form__text p,
        form .--text {
          font-size: 14px;
        }
        form {
          .option1 {
            p,
            h4 {
              font-size: 14px;
              line-height: 18px;
            }
            h4 {
              margin-bottom: 16px;
            }
          }
          .option3 {
            p {
              font-size: 13px;
              line-height: 18px;
              margin-bottom: 20px;
            }
            .textarea {
              height: 120px;
            }
            .form_to {
              display: block;
              > div:first-child {
                margin-bottom: 15px;
              }
              .--to {
                margin: 0 10px 0 30px;
              }
            }
          }
          .textarea {
            font-size: 13px;
            line-height: 18px;
          }
        }
      }
      .checkbox {
        padding: 15px 0 15px 50px;
        p {
          font-size: 14px;
        }
      }
    }
    @media only screen and (max-width: 400px) {
      .modal-header__text p {
        font-size: 20px;
      }
      .modal-body {
        .form__text {
          p {
            font-size: 13px;
            line-height: 19px;
          }
        }
        form {
          .option1 {
            p,
            h4 {
              font-size: 13px;
              line-height: 17px;
            }
            h4 {
              margin-bottom: 16px;
            }
          }
          .bt_make-up-lesson {
            font-size: 12px;
          }
          .option2 {
            h4 {
              font-size: 12px;
            }
          }
          .textarea {
            font-size: 12px;
            padding: 8px 15px;
            height: 121px;
          }
          .option3 {
            p {
              font-size: 12px;
              line-height: 16px;
              margin-bottom: 15px;
            }
            .suspension div {
              font-size: 12px;
              padding: 3px 13px;
            }
          }
        }
      }
      .checkbox {
        p {
          font-size: 13px;
        }
      }
    }
  }
  .error {
    width: 100%;
    font-size: 12px;
    color: #dc3545;
  }
  .-is-active {
    background: #6254e8 !important;
    p {
      color: #ffffff !important;
    }
  }
`;

const materialTheme = createMuiTheme({
  overrides: {
    MuiDialogActions: {
      root: {
        backgroundColor: "#f0f3ff",
      },
    },
  },
});

const OPTION_1 = "Reschedule this lesson";
const OPTION_2 = "Cancel this lesson without rescheduling";
const OPTION_3 = "Suspend this lesson";

const CANCELLATION_RECURRENCY = {
  one: "This lesson only",
  many: "This and all following lessons"
};

const ModalCancelLesson = ({ isOpen, handleToggle, data, handleCancel, handleSuspend }) => {
  const [error, setError] = React.useState({});
  const [errorOption, setErrorOption] = React.useState("");
  const [form, setForm] = React.useState({
    reason: "",
    explain: "",
    comment: "",
  });

  const [errorDate, setErrorDate] = React.useState("");

  const [selectedDateFrom, setSelectedDateFrom] = React.useState(
    moment(data.date)
  );
  const [selectedDateTo, setSelectedDateTo] = React.useState(moment(data.date));

  React.useEffect(() => {
    if (data.date) {
      setSelectedDateFrom(moment(data.date));
      setSelectedDateTo(moment(data.date));
    }
  }, [data.date]);

  React.useEffect(() => {
    if (moment(selectedDateFrom).isAfter(moment(selectedDateTo))) {
      setSelectedDateTo(selectedDateFrom);
    }
  }, [selectedDateFrom, selectedDateTo]);

  const handleDateChangeFrom = (date) => {
    setSelectedDateFrom(date);
  };
  const handleDateChangeTo = (date) => {
    setSelectedDateTo(date);
  };
  React.useEffect(() => {
    if (!isOpen) {
      setForm({ reason: "", explain: "", comment: "" });
      setErrorOption("");
      setError({});
    }
  }, [isOpen]);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const errorState = validate();
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }
    if (!form.reason) {
      return setErrorOption("Please choose at least 1 option");
    }
    let formData = {};
    if (form.reason === OPTION_2) {
      formData = {
        cancel: {
          message: form.explain,
          recurrence: form.cancel_recurrency || Object.keys(CANCELLATION_RECURRENCY)[0]
        },
      };
      if (!errorDate) {
        handleCancel(formData);
      }
    } else {
      formData = {
        cancel: {
          message: form.comment,
          start_date: moment(selectedDateFrom).format("YYYY-MM-DD"),
          end_date: moment(selectedDateTo).format("YYYY-MM-DD"),
        },
      };
      if (!errorDate) {
        handleSuspend(formData);
      }
    }
  };

  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.explain) && form.reason === OPTION_2) {
      errorState.explain = "Please fill out this field ";
    }
    if (isEmpty(form.comment) && form.reason === OPTION_3) {
      errorState.comment = "Please fill out this field ";
    }
    return errorState;
  };

  const handleCheckbox = (event) => {
    setForm({
      ...form,
      reason: event.target.value,
    });
    setErrorOption("");
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

  const handleError = (error) => {
    setErrorDate(error);
  };

  const handleBack = (e) => {
    e.preventDefault();
    handleToggle();
  };

  const showFromToTime = () => {
    const fromMonth = moment(selectedDateFrom).format("MM");
    const fromYear = moment(selectedDateFrom).format("YYYY");
    const fromFormat = moment(selectedDateFrom).format("D MMM YYYY");
    const toMonth = moment(selectedDateTo).format("MM");
    const toYear = moment(selectedDateTo).format("YYYY");
    const toFormat = moment(selectedDateTo).format("D MMM YYYY");
    let showFrom = "";
    if (fromFormat === toFormat) {
      return toFormat;
    } else if (fromMonth === toMonth && fromYear === toYear) {
      showFrom = moment(selectedDateFrom).format("D");
    } else if (fromYear === toYear) {
      showFrom = moment(selectedDateFrom).format("D MMM");
    } else {
      showFrom = fromFormat;
    }
    return `${showFrom} - ${toFormat}`;
  };

  const history = useHistory();
  const goToBookLesson = () => {
    history.push(
      `/dashboard/teacher/new-lesson?lessonId=${data.lesson.id}&scheduleId=${data.id}`
    );
  };

  return (
    <StyledModal
      isOpen={isOpen}
      toggle={handleToggle}
      wrapClassName="wrap-modalDashboard"
      id="modal-cancel-lesson"
      centered
    >
      <ModalHeader toggle={handleToggle}>
        <div className="modal-header__text">
          <p>Cancel a lesson</p>
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
        </div>
        <Form onSubmit={handleSubmitForm}>
          <div className="--text">What would you like to do?</div>
          <div className="form_-inner">
            <div className="option_item">
              <label
                className={classNames("checkbox", {
                  "-is-active": form.reason === OPTION_1,
                })}
              >
                <input
                  type="radio"
                  className="input_checkbox"
                  name="reason"
                  onChange={handleCheckbox}
                  checked={form.reason === OPTION_1}
                  value={OPTION_1}
                />
                <span className="checkmark"></span>
                <p>{OPTION_1}</p>
              </label>
              <Collapse
                in={form.reason === OPTION_1}
                timeout="auto"
                unmountOnExit
              >
                <div className="collapse_item">
                  <div className="option1">
                    <p>
                      Student phone number:{" "}
                      {data && data.lesson && data.lesson.student && (
                        <a href={"tel:" + data.lesson.student.phone}>
                          {formatPhoneNumber(data.lesson.student.phone)}
                        </a>
                      )}
                    </p>
                    <h4>
                      Please call or text your student to set a time for a
                      reschedule lesson
                    </h4>
                    <p>
                      Once you’ve both agreed on a new time slot, click on the
                      button below to book and confirm your new lesson.
                    </p>
                  </div>
                  <button
                    className="--bt bt_make-up-lesson"
                    onClick={goToBookLesson}
                  >
                    Reschedule
                  </button>
                </div>
              </Collapse>
            </div>
            <div className="option_item">
              <label
                className={classNames("checkbox", {
                  "-is-active": form.reason === OPTION_2,
                })}
              >
                <input
                  type="radio"
                  className="input_checkbox"
                  name="reason"
                  onChange={handleCheckbox}
                  checked={form.reason === OPTION_2}
                  value={OPTION_2}
                />
                <span className="checkmark"></span>
                <p>{OPTION_2}</p>
              </label>
              <Collapse
                in={form.reason === OPTION_2}
                timeout="auto"
                unmountOnExit
              >
                <div className="collapse_item option2">
                  {Object.keys(CANCELLATION_RECURRENCY).map((item, index) => (
                    <label className="cancel_checkbox" key={item}>
                      <input
                        name="cancel_recurrency"
                        type="radio"
                        className="input_checkbox"
                        onChange={handleChange}
                        onFocus={handleFocus}
                        value={item}
                      />
                      <span className="checkmark"></span>
                      <p>{CANCELLATION_RECURRENCY[item]}</p>
                    </label>
                  ))}
                  <FormGroup
                    propsInput={{
                      type: "textarea",
                      name: "explain",
                      placeholder:
                        "Write a kind word to your student to explain the reason of this cancellation",
                      className: "textarea",
                      onChange: handleChange,
                      onFocus: handleFocus,
                      value: form.explain,
                    }}
                    error={error.explain}
                  />
                </div>
              </Collapse>
            </div>
            <div className="option_item">
              <label
                className={classNames("checkbox", {
                  "-is-active": form.reason === OPTION_3,
                })}
              >
                <input
                  type="radio"
                  className="input_checkbox"
                  name="reason"
                  onChange={handleCheckbox}
                  checked={form.reason === OPTION_3}
                  value={OPTION_3}
                />
                <span className="checkmark"></span>
                <p>{OPTION_3}</p>
              </label>
              <Collapse
                in={form.reason === OPTION_3}
                timeout="auto"
                unmountOnExit
              >
                <div className="collapse_item option3">
                  <p>
                    All the lessons scheduled between these dates will be
                    canceled.
                  </p>
                  <div className="form_to">
                    <div>
                      <p>From:</p>
                      <ThemeProvider theme={materialTheme}>
                        <KeyboardDatePicker
                          margin="normal"
                          format="DD/MM/YYYY"
                          value={selectedDateFrom}
                          onChange={handleDateChangeFrom}
                          minDate={moment().add(2, "day")}
                          maxDate={moment(new Date()).add(1, "years")}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          emptyLabel="sfdf"
                        />
                      </ThemeProvider>
                    </div>
                    <div>
                      <p className="--to">To:</p>
                      <ThemeProvider theme={materialTheme}>
                        <KeyboardDatePicker
                          margin="normal"
                          format="DD/MM/YYYY"
                          value={selectedDateTo}
                          onChange={handleDateChangeTo}
                          minDate={selectedDateFrom}
                          maxDate={moment(new Date()).add(1, "years")}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          onError={handleError}
                        />
                      </ThemeProvider>
                    </div>
                  </div>
                  <div className="suspension">
                    <h5>Suspension period</h5>
                    <div>{showFromToTime()}</div>
                  </div>
                  <FormGroup
                    propsInput={{
                      type: "textarea",
                      name: "comment",
                      placeholder:
                        "Write a kind word to your student to explain the reason of this suspension ( e. g. going on a trip...)",
                      className: "textarea",
                      onChange: handleChange,
                      onFocus: handleFocus,
                      value: form.comment,
                    }}
                    error={error.comment}
                  />
                </div>
              </Collapse>
            </div>
            <div className="error">{errorOption}</div>
          </div>
          {!(form.reason === OPTION_1) && (
            <div className="bt-group">
              <button className=" --bt button-back fw-500" onClick={handleBack}>
                Back
              </button>
              <button className="--bt button-cancel fw-500">Confirm</button>
            </div>
          )}
        </Form>
      </ModalBody>
    </StyledModal>
  );
};

export default ModalCancelLesson;

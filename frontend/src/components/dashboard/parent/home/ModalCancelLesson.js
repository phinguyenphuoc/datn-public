import React from "react";
import styled from "styled-components";
import { ModalHeader, ModalBody, Form } from "reactstrap";
import { Modal } from "../../../common";
import classNames from "classnames";
import { Collapse } from "@material-ui/core";
import moment from "moment";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { formatTime2 } from "../../../../utils/helpers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

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
          padding: 20px 15px 10px;
        }
        .--info-cancel {
          background: rgba(220, 53, 69, 0.1);
          border: 1px solid rgba(220, 53, 69, 0.8);
          padding: 15px 15px 5px;
          border-radius: 5px;
        }
        .option1 {
          h5 {
            font-size: 15px;
            border-bottom: 1px solid;
            width: fit-content;
          }
          p {
            font-size: 12px;
            line-height: 20px;
            margin-bottom: 10px;
          }
          .cancelation {
            border-bottom: 1px solid #b5beec;
          }
        }
        .option2 {
          p {
            font-size: 12px;
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
            text-align: center;
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
          .--info-cancel {
            .--text-op2 {
              margin-bottom: 10px;
            }
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
          padding: 0 25px;
          &:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 8px 0 #2d20a7;
          }
        }
        .button-back {
          background: #6254e8;
        }
        .button-cancel {
          background: #ffffff;
          border: 1px solid #6254e8;
          color: #6254e8;
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
          }
          .option2 {
            p {
              margin-bottom: 20px;
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
            h5 {
              font-size: 13px;
            }
            p {
              font-size: 10px;
              line-height: 16px;
            }
          }
          .option2 {
            .option2 p {
              font-size: 10px;
              line-height: 16px;
            }
            .suspension div {
              font-size: 12px;
              padding: 3px 13px;
            }
            .form_to {
              > div:first-child {
                margin-bottom: 10px;
              }
              input {
                font-size: 13px;
              }
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

const OPTION_1 = "Cancel this lesson";
const OPTION_2 = "Suspend this lesson";

const ModalCancelLesson = ({ isOpen, handleToggle, data, handleSubmit }) => {
  const [errorOption, setErrorOption] = React.useState("");
  const [form, setForm] = React.useState({
    reason: "",
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
      setForm({ reason: "" });
      setErrorOption("");
    }
  }, [isOpen]);

  const handleSubmitForm = (event) => {
    event.preventDefault();

    if (!form.reason) {
      return setErrorOption("Please choose at least 1 option");
    }
    const formData = {
      cancel: {
        start_date: moment(selectedDateFrom).format("YYYY-MM-DD"),
        end_date: moment(selectedDateTo).format("YYYY-MM-DD"),
      },
    };
    if (!errorDate) {
      handleSubmit(formData, form);
    }
  };

  const handleCheckbox = (event) => {
    setForm({
      ...form,
      reason: event.target.value,
    });
    setErrorOption("");
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

  const handleError = (error) => {
    setErrorDate(error);
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
          {data && data.lesson && data.lesson.teacher && (
            <p>
              <span>{data.lesson.instrument}</span> Class with Teacher
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
                <div className="collapse_item option1">
                  <div className="cancelation">
                    <h5>LESSON CANCELLATION POLICIES</h5>
                    <p>
                      - Cancellation of a lesson must be AT LEAST 48 hours prior
                      to the scheduled lesson. If you cancel too late, you will
                      be charged in full amount for the lesson.
                    </p>
                    <p>
                      - No shows or failure to notify the teacher within 48
                      hours is considered a forfeited lesson. - There are NO
                      refunds on unused or canceled lessons.
                    </p>
                  </div>
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
                  <p>
                    If you want to suspend because you are going away for
                    vacation or for any other reason, please indicate here. All
                    the lessons scheduled between these dates will be
                    automatically canceled. An email notification will be sent
                    to your teacher.
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
                          minDate={moment(new Date()).add(3, "days")}
                          maxDate={moment(new Date()).add(1, "years")}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
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
                </div>
              </Collapse>
            </div>
            <div className="error">{errorOption}</div>
          </div>
          <div className="bt-group">
            <button className=" --bt button-back fw-500" onClick={handleBack}>
              Back
            </button>
            <button className="--bt button-cancel fw-500">
              Cancel this lesson{" "}
            </button>
          </div>
        </Form>
      </ModalBody>
    </StyledModal>
  );
};

export default ModalCancelLesson;

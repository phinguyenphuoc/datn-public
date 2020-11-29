import React, { useState } from "react";
import styled from "styled-components";
import { TimePicker } from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import classNames from "classnames";
import moment from "moment";
import arrow from "../../../../assets/images/arrowwhite.svg";
import { DatePicker } from "../../../common";
import lock from "../../../../assets/images/lock.svg";
import { formatTime1, formatTime2 } from "../../../../utils/helpers";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import _ from "lodash"

const StyledStep2 = styled.section`
  margin-bottom: auto;
  .Step2__inner {
    max-width: 800px;
    margin: 0 auto 10%;
  }
  .select-date-time {
    display: flex;
    justify-content: space-between;
    h4 {
      font-size: 12px;
      text-align: left;
    }
    .select-date {
      width: 65%;
      background: #ffffff;
      box-shadow: 0px 5px 25px rgba(98, 84, 232, 0.2);
      border-radius: 4px;
      padding: 30px;
      h4 {
        margin-bottom: 15px;
      }
     
    }
    .select-time {
      width: 33%;
      background: #ffffff;
      box-shadow: 0px 5px 25px rgba(98, 84, 232, 0.2);
      border-radius: 4px;
      padding: 30px;
      h3 {
        color: #6254e8;
        font-size: 18px;
        font-weight: 600;
      }
      p {
        color: #6254e8;
      }
      .pick-a-date {
        background: #f2f4fd;
        border-radius: 4px;
        padding: 20px 15px;
        font-size: 14px;
        color: #6b7cb7;
        margin-bottom: 15px;
        max-height: 200px;
        overflow-y: auto;
        ::-webkit-scrollbar {
          width: 6px;
        }
        .time-and-student {
          text-align: left;
          color: #000000;
          font-weight: bold;
          font-size: 12px;
          margin-bottom: 8px;
          line-height: 17px;
          .--name {
            font-weight: 400;
            text-transform: capitalize;
          }
          .dot {
            position: relative;
            top: -2px;
          }
        }
      }
      .select-a-time {
        > div {
          background: #f2f4fd;
          border-radius: 4px;
          padding: 20px 20px;
          font-size: 14px;
          color: #6b7cb7;
          margin-bottom: 15px;
          .MuiInput-underline:before {
            border-bottom: none !important;
          }
          input {
            width: 100%;
            max-width: 100px;
            min-width: 90px
            border: 1px solid #b5beec;
            border-radius: 4px;
            padding: 9px 5px 9px;
            background: url(${lock}) no-repeat 92% 50% / 14px;
          }
        }
      }
      .select-a-lesson {
        > div {
          background: #f2f4fd;
          border-radius: 4px;
          padding: 20px 20px;
          font-size: 14px;
          color: #6b7cb7;
          p {
            color: #08135a;
            margin-bottom: 0;
            font-size: 12px;
          }
        }
      }
    }
  }
  .button-next {
    box-shadow: 0px 5px 25px rgba(98, 84, 232, 0.2);
    border-radius: 4px;
    background: #ffff;
    margin: 5% 0;
    padding: 5% 10%;
  }
  .find {
    border: none;
    border-radius: 25px;
    padding: 3px 8px 3px 25px;
    font-size: 12px;
    color: #ffffff;
    line-height: 34px;
    font-weight: 500;
    transition: 0.3s ease;
    background: #6254e8;
    border-radius: 30px;
    opacity: 0.4;
    max-width: 100px;
    width: 100%;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 8px 0 #6556f8;
    }
    span {
      padding: 7px 7px;
      border-radius: 100%;
      width: 30px;
      height: 30px;
      margin-left: 5px;
      background: #3e32b6;
      display: inline-flex;
      justify-content: center;
      align-content: center;
      img {
        margin-top: 1px;
        width: 12px;
        height: 12px;
      }
    }
  }
  .back {
    padding: 3px 25px;
    background: #ffffff;
    color: #6254e8;
    border: 1px solid #6254e8;
    margin-right: 10px;
    opacity: 1;
  }
  .checkbox {
    display: block;
    position: relative;
    padding-left: 40px;
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
      left: calc(50% - 45px);
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
  .one-time-lesson {
    margin-bottom: 15px;
    .checkbox {
      padding-left: 50px;
      color: #08135A;
      font-size: 14px;
      margin-top: 10px;
      .input_checkbox {
        &:checked ~ .checkmark {
          border: 2px solid #b5beec;
        }
      }
      .checkmark {
        left: calc(50% - 57px);
        border-radius: 0;
        &:after {
          content: "";
          border: none;
        }
      }
    }
    p {
      color: #08135A;
      font-size: 14px;
      line-height: 18px;
      text-align: left;
      width: fit-content;
      margin: 0 auto;
      span {
        font-weight: 600;
      }
    }
    .trial-lesson {
      display: flex;
      justify-content: center;
      align-items: center;
      .trial-lesson__inner {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      h5 {
        color: #F6732F;
        font-size: 14px;
        margin: 0;
      }
      .checkbox .checkmark {
        left: calc(50% - 18px);
        border-radius: 0;
      }
      p {
        text-transform: uppercase;
        color: #000000;
      }
    }
  }
  @media only screen and (max-width: 820px) {
    .select-date-time {
      flex-direction: column;
      .select-date,
      .select-time {
        width: 100%;
      }
      .select-date {
        margin-bottom: 30px;
        > div {
          max-width: 460px;
          margin: 0 auto;
        }
      }
    }
    .button-next {
      padding: 5% 30px;
    }
  }
  @media only screen and (max-width: 550px) {
    .one-time-lesson {
      p, .trial-lesson h5 {
        font-size:12px;
      }
    }
  }
  @media only screen and (max-width: 450px) {
    .select-date-time .select-date {
      padding: 20px 10px;
    }
    .one-time-lesson .trial-lesson {
      display: block;
    }
  }
  .opacity {
    opacity: 1;
  }
  .error {
    width: 100%;
    font-size: 12px;
    color: #dc3545;
    line-height: 15px;
    margin-top: 5px;
  }
`;

const StyledErrorPanel = styled.div`
  padding-left: 25px;
  color: #dc3545;
  font-size: 12px;
  margin-bottom: 15px;
  span {
    margin-left: 10px;
    vertical-align: middle;
  }
  .warning-info {
    width: 220px;
    text-align: left;
    margin: 0 auto;
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

function Step2({
  handleBack,
  handleNext,
  studentSelected,
  storeBookLesson,
  storeBookLesson2,
  handleCheckbox,
  handleClickDate,
  onTimeChange,
  onTimeChange2,
  form,
  error,
  errorTime,
  errorDate,
  dataSchedulesFiltered,
  dataSchedulesFiltered2,
  dataSetupBooking,
  errorTrial,
  handleSelectTotalMonth,
  handleClickDate2
}) {
  const [oneMore, setOneMore] = useState(false)

  const minDate2 = moment(storeBookLesson.date).startOf("week").format('yyyy-MM-DD')
  const maxDate2 = moment(storeBookLesson.date).endOf("week").format('yyyy-MM-DD')

  return (
    <StyledStep2>
      <div className="container">
        <div className="Step2__inner">
          <form onSubmit={handleNext}>
            <div className="select-date-time">
              <div className="select-date">
                <h4>Select a date</h4>
                <DatePicker
                  // autoOk
                  variant="static"
                  openTo="date"
                  orientation="portrait"
                  onChange={handleClickDate}
                  isSetColorSelectedDate={false}
                  dateClicked={storeBookLesson.date}
                  value={storeBookLesson.date}
                  onClickDate={handleClickDate}
                  minDate={new Date()}
                />
                <div className="error">{errorDate}</div>
              </div>
              <div className="select-time">
                <h3>
                  {storeBookLesson.date &&
                    moment(storeBookLesson.date).format("MMM Do YYYY")}
                </h3>
                <p>{storeBookLesson.date && "Classes confirmed on this day"}</p>
                <div className="pick-a-date">
                  {dataSchedulesFiltered && dataSchedulesFiltered.length ? (
                    <div>
                      {dataSchedulesFiltered.map((item) => {
                        return (
                          <div key={`${item.id}`} className="time-and-student">
                            {formatTime1(item.start_hour)}
                            {" - "}
                            {formatTime2(item.end_hour)}{" "}
                            <span className="dot">.</span>{" "}
                            {/* <span className="--name">{`${item.lesson.student.first_name}`}</span> */}
                            <span className="--name">{`${item.lesson.student_info}`}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                      <div className="--content">
                        {storeBookLesson.date ? (
                          <div>
                            No classes
                            <br />
                          scheduled yet
                          </div>
                        ) : (
                            "Pick a date to check your availabilities"
                          )}
                      </div>
                    )}
                </div>
                <div className="select-a-time">
                  <h4>Select a time</h4>
                  <div>
                    <ThemeProvider theme={materialTheme}>
                      <TimePicker
                        autoOk
                        onChange={onTimeChange}
                        value={storeBookLesson.time}
                        minutesStep={5}
                      />
                    </ThemeProvider>
                    <div className="error">{errorTime}</div>
                  </div>
                </div>
                <div className="select-a-lesson">
                  <h4>Select a lesson duration</h4>
                  <div>
                    <label className="price checkbox">
                      <input
                        type="radio"
                        className="input_checkbox"
                        name="duration"
                        onChange={handleCheckbox}
                        checked={form.duration === "30"}
                        value="30"
                      />
                      <span className="checkmark"></span>
                      <p>30 minutes</p>
                    </label>
                    <label className="price checkbox">
                      <input
                        type="radio"
                        className="input_checkbox"
                        checked={form.duration === "45"}
                        value="45"
                        name="duration"
                        onChange={handleCheckbox}
                      />
                      <span className="checkmark"></span>
                      <p>45 minutes</p>
                    </label>
                    <label className="price checkbox">
                      <input
                        type="radio"
                        className="input_checkbox"
                        checked={form.duration === "60"}
                        value="60"
                        name="duration"
                        onChange={handleCheckbox}
                      />
                      <span className="checkmark"></span>
                      <p>60 minutes</p>
                    </label>
                    <div className="error">{error}</div>
                  </div>
                </div>
                {/* Select total month */}
                <div className="select-a-lesson">
                  <h4>Select total month</h4>
                  <div>
                    <input
                      type="number"
                      name="month"
                      defaultValue="12"
                      style={{ width: "50%" }}
                      onChange={handleSelectTotalMonth}
                    />
                    <div className="error">{error}</div>
                  </div>
                </div>
              </div>
            </div>



            {/* 2222222 */}
            {oneMore && storeBookLesson.date && (
              <div className="select-date-time" style={{ marginTop: 20 }}>
                <div className="select-date">
                  <h4>Select a date</h4>
                  <DatePicker
                    id="2"
                    variant="static"
                    openTo="date"
                    orientation="portrait"
                    onChange={handleClickDate2}
                    isSetColorSelectedDate={false}
                    dateClicked={storeBookLesson2.date}
                    value={storeBookLesson2.date}
                    onClickDate={handleClickDate2}
                    minDate={minDate2 || moment().startOf("week").format('yyyy-MM-DD')}
                    maxDate={maxDate2 || moment().endOf("week").format('yyyy-MM-DD')}
                  />
                  <div className="error">{errorDate}</div>
                </div>
                <div className="select-time">
                  <h3>
                    {storeBookLesson2.date &&
                      moment(storeBookLesson2.date).format("MMM Do YYYY")}
                  </h3>
                  <p>{storeBookLesson2.date && "Classes confirmed on this day"}</p>
                  <div className="pick-a-date">
                    {dataSchedulesFiltered2 && dataSchedulesFiltered2.length ? (
                      <div>
                        {dataSchedulesFiltered2.map((item) => {
                          return (
                            <div key={`${item.id}`} className="time-and-student">
                              {formatTime1(item.start_hour)}
                              {" - "}
                              {formatTime2(item.end_hour)}{" "}
                              <span className="dot">.</span>{" "}
                              {/* <span className="--name">{`${item.lesson.student.first_name}`}</span> */}
                              <span className="--name">{`${_.get(item, "lesson.student_info", "")}`}</span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                        <div className="--content">
                          {storeBookLesson.date ? (
                            <div>
                              No classes
                              <br />
                          scheduled yet
                            </div>
                          ) : (
                              "Pick a date to check your availabilities"
                            )}
                        </div>
                      )}
                  </div>
                  <div className="select-a-time">
                    <h4>Select a time</h4>
                    <div>
                      <ThemeProvider theme={materialTheme}>
                        <TimePicker
                          autoOk
                          onChange={onTimeChange2}
                          value={storeBookLesson2.time}
                          minutesStep={5}
                        />
                      </ThemeProvider>
                      <div className="error">{errorTime}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {(storeBookLesson.date && !dataSetupBooking) && <button
              className="find"
              type="button"
              style={{ width: "auto", marginTop: 10, maxWidth: 300, padding: "3px 8px", opacity: 1 }}
              onClick={() => setOneMore(!oneMore)}
            >
              {oneMore ? 'Remove' : 'Add one more date (max: 2 date/week)'}
            </button>
            }
            <div className="button-next">
              <p>
                <span>NOTE:</span> The lesson is set automatically to
              repeat every week at the same day and time. For a{" "}
              </p>
              {(error !== "" ||
                errorTime !== "" ||
                errorDate !== "") && (
                  <StyledErrorPanel>
                    {[error, errorTime, errorDate, errorTrial].map(
                      (errorInfo, index) => {
                        return errorInfo !== "" ? (
                          <div key={index}>
                            <div className="warning-info">
                              <ErrorOutlineIcon />
                              <span>{errorInfo}</span>
                            </div>
                          </div>
                        ) : (
                            " "
                          );
                      }
                    )}
                  </StyledErrorPanel>
                )}
              <button className="find back" onClick={handleBack}>
                Back
              </button>
              <button
                className={classNames("find", {
                  opacity:
                    storeBookLesson.date &&
                    storeBookLesson.time &&
                    form.duration,
                })}
                onClick={handleNext}
              >
                Next
                <span>
                  <img src={arrow} alt="arrow" />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </StyledStep2>
  );
}

export default Step2;

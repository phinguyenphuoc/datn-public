import React from "react";
import styled from "styled-components";
import tick from "../../../../assets/images/tick.svg";
import moment from "moment";
import InfoStudent from "./InfoStudent";

const StyledStep3 = styled.section`
  margin-bottom: auto;
  .Step3__inner {
    max-width: 800px;
    margin: 0 auto 10%;
    background: #ffffff;
    padding: 40px 5%;
    box-shadow: 0px 5px 25px rgba(98, 84, 232, 0.2);
    border-radius: 4px;
    .react-single-select-container {
      width: 100%;
      > div {
        border-radius: 4px;
      }
    }
    .student-info {
      margin: 0% 0 4%;
    }
  }
  h5 {
    font-size: 14px;
    text-align: left;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .date-and-time {
    background: #f2f4fd;
    text-align: left;
    padding: 30px 15px;
    .--item {
      display: flex;
      align-items: center;
      max-width: 500px;
      margin: 0 auto;
      width: calc(100% - 10px);
    }
    h3,
    p {
      font-size: 14px;
      color: #08135a;
    }
    h3 {
      width: 35%;
      text-align: left;
      margin-right: 10px;
      font-weight: 600;
    }
    p {
      width: 65%;
      margin-bottom: 10px;
    }
  }
  .confirm {
    border: none;
    border-radius: 25px;
    padding: 5px 8px 5px 25px;
    font-size: 12px;
    color: #ffffff;
    line-height: 30px;
    font-weight: 500;
    transition: 0.3s ease;
    background: #6254e8;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-content: center;
    margin: 20px auto 0;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 8px 0 #6556f8;
    }
    &[disabled] {
      background: #ced7ff;
      pointer-events: none;
      span {
        background: #b4bff1;
      }
    }
    span {
      padding: 7px 7px;
      border-radius: 100%;
      display: inline-flex;
      width: 30px;
      height: 30px;
      justify-content: center;
      margin-left: 5px;
      background: #3e32b6;
      img {
        margin-bottom: 3px;
        width: 15px;
        height: 15px;
      }
    }
  }
  @media only screen and (max-width: 610px) {
    .date-and-time {
      p,
      h3 {
        font-size: 12px;
      }
    }
  }
  @media only screen and (max-width: 410px) {
    .date-and-time {
      p,
      h3 {
        font-size: 10px;
      }
    }
  }
  .edit {
    color: #08135a;
    border-bottom: 1px solid;
    max-width: 30px;
    margin: 0 0 0 calc(100% - 40px);
    cursor: pointer;
    transition: 0.3s ease;
    font-size: 14px;
    &:hover {
      color: #f6732f;
    }
  }
  @media only screen and (max-width: 450px) {
    .edit {
      font-size: 12px;
    }
  }
`;

function Step3({
  storeBookLesson,
  storeBookLesson2,
  studentSelected,
  timeLesson,
  timeLesson2,
  handleClickEdit2,
  handleClickEdit1,
  handleConfirm,
  isOnetimeLesson,
  isTrialLesson,
  dataSetupBooking,
  isSubmitting,
}) {
  return (
    <StyledStep3>
      <div className="container">
        <div className="Step3__inner">
          <h5>Selected student</h5>
          <InfoStudent
            step={3}
            studentSelected={
              dataSetupBooking && Object.keys(dataSetupBooking).length
                ? dataSetupBooking
                : studentSelected
            }
            handleClickEdit={handleClickEdit1}
          />
          <h5>Selected date and time</h5>
          <div className="date-and-time">
            <div className="--item">
              <h3>Start date</h3>
              <p>
                {storeBookLesson.date &&
                  moment(storeBookLesson.date).format("MMM Do YYYY")}
              </p>
            </div>
            <div className="--item">
              <h3>Day</h3>
              <p>
                {storeBookLesson.date &&
                  moment(storeBookLesson.date).format("dddd")}
              </p>
            </div>
            <div className="--item">
              <h3>Time</h3>
              <p>{timeLesson}</p>
            </div>
            {timeLesson2 && storeBookLesson2.date && (
              <>
                <div className="--item">
                  <h3>Day</h3>
                  <p>
                    {storeBookLesson2.date &&
                      moment(storeBookLesson2.date).format("dddd")}
                  </p>
                </div>
                <div className="--item">
                  <h3>Time</h3>
                  <p>{timeLesson2}</p>
                </div>
              </>
            )}
            <div className="--item">
              <h3>Frequency</h3>
              <p>
                {isOnetimeLesson ? "One-time lesson" : "Repeat every week"}
                {isTrialLesson === "true" ? " (Applying 50% off)" : ""}
              </p>
            </div>
            <div className="edit" onClick={handleClickEdit2}>
              Edit
            </div>
          </div>
          <button
            className="confirm"
            onClick={handleConfirm}
            disabled={isSubmitting}
          >
            Confirm
            <span>
              <img src={tick} alt="tick" />
            </span>
          </button>
        </div>
      </div>
    </StyledStep3>
  );
}

export default Step3;

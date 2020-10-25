import React from "react";
import styled from "styled-components";
import classNames from "classnames";
import { ChevronRight } from "../../../common/icons";
import { Link } from "react-router-dom";
import moment from "moment";
import step1 from "../../../../assets/images/step-student.svg";
import step2 from "../../../../assets/images/book-lesson.svg";
import step3 from "../../../../assets/images/confirmed.svg";

const StyledSteps = styled.section`
  margin-bottom: 5%;
  .mystudent__inner__text {
    display: flex;
    align-items: center;
    font-size: 16px;
    padding: 25px 10px;
    margin-bottom: 2%;
    .text-color {
      color: #6254e8;
      font-weight: 500;
    }
    .arrow {
      margin: 0 15px;
      font-size: 12px;
      svg {
        font-size: 12px;
      }
    }
    a {
      color: #082487;
      :hover {
        color: #6254e8;
      }
    }
    p {
      margin: 0;
    }
  }
  .inner {
    display: flex;
    max-width: 570px;
    margin: 0 auto 40px;
    position: relative;
    justify-content: space-between;
  }
  .step__item {
    color: #b4bff1;
    position: relative;
    &__icon {
      background: #ced7ff;
      border: 2px solid #b4bff1;
      width: 40px;
      height: 40px;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    p {
      position: absolute;
      font-size: 14px;
      width: 150px;
      left: -55px;
      font-weight: 500;
      cursor: pointer;
      padding-top: 6px;
    }
    .--date-time {
      width: 200px;
      left: -78px;
    }
  }
  .active {
    .step__item__icon {
      background: #f6732f;
      border: 2px solid #db5f1e;
    }
    p {
      color: #f6732f;
    }
  }
  .completed {
    .step__item__icon {
      background: #c3e4ca;
      border: 2px solid #80ce82;
    }
    p {
      color: #80ce82;
      text-transform: capitalize;
    }
  }
  .borderCompleted {
    background: #80ce82;
  }

  span {
    width: calc(50% - 75px);
    height: 2px;
    background: #b4bff1;
    position: absolute;
    top: 35px;
  }
  .border1 {
    left: 55px;
  }
  .border2 {
    right: 55px;
  }

  @media only screen and (max-width: 660px) {
    .step__item p {
      font-size: 12px;
      width: 100px;
      left: -35px;
    }
    .step__item:first-of-type p {
      left: -20px;
    }
  }
  @media only screen and (max-width: 420px) {
    .step__item .--date-time {
      width: 115px;
      left: -40px;
    }
  }
`;

function Steps({
  step,
  handleStep1,
  handleStep2,
  handleStep3,
  student,
  storeBookLesson,
}) {
  return (
    <StyledSteps>
      <div className="container">
        <div className="mystudent__inner__text">
          <Link to="/dashboard/teacher">Home</Link>
          <p className="arrow">
            <ChevronRight />
          </p>
          <p className="text-color">New lesson</p>
        </div>
        <div className="inner">
          <div
            className={classNames("step__item", {
              active: step === 1,
              completed: step > 1,
            })}
            onClick={handleStep1}
          >
            <div className="step__item__icon">
              <img src={step1} alt="step1" />
            </div>
            <p>{student.label || "Select a student"}</p>
          </div>

          <span
            className={classNames("border1", {
              borderCompleted: step > 1,
            })}
          ></span>
          <div
            className={classNames("step__item", {
              active: step === 2,
              completed: step > 2,
            })}
            onClick={handleStep2}
          >
            <div className="step__item__icon">
              <img src={step2} alt="step2" />
            </div>
            <p className="--date-time">
              {storeBookLesson.date && storeBookLesson.time
                ? moment(storeBookLesson.date).format("MMM Do YYYY") +
                  ", " +
                  moment(storeBookLesson.time).format("h:mma")
                : "Pick a date and time"}
            </p>
          </div>
          <span
            className={classNames("border2", {
              borderCompleted: step > 2,
            })}
          ></span>
          <div
            className={classNames("step__item", {
              active: step === 3,
            })}
            onClick={handleStep3}
          >
            <div className="step__item__icon">
              <img src={step3} alt="step3" />
            </div>
            <p>Confirm</p>
          </div>
        </div>
      </div>
    </StyledSteps>
  );
}

export default Steps;

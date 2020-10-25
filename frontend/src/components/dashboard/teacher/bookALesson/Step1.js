import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FormGroup, Loading } from "../../../common";
import arrow from "../../../../assets/images/arrowwhite.svg";
import InfoStudent from "./InfoStudent";

const StyledStep1 = styled.section`
  margin-bottom: auto;
  .step1__inner {
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
    &__no-data {
      text-align: left;
      h2 {
        font-size: 21px;
        line-height: 28px;
        color: #6b7cb7;
        margin: 0 0 12px;
      }
      p {
        font-size: 14px;
        line-height: 18px;
        color: #6b7cb7;
      }
    }
  }

  .find {
    border: none;
    padding: 3px 8px 3px 25px;
    font-size: 12px;
    color: #ffffff;
    line-height: 34px;
    font-weight: 500;
    transition: 0.3s ease;
    background: #6254e8;
    border-radius: 30px;
    margin-top: 20px;
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
    &[disabled] {
      background: #ced7ff;
      pointer-events: none;
      span {
        background: #b4bff1;
      }
    }
  }
  .cancel {
    padding: 3px 25px;
    background: #ffffff;
    color: #6254e8;
    border: 1px solid #6254e8;
    margin-right: 10px;
  }
`;

function Step1({
  handleNext,
  onChangeStudent,
  student,
  error,
  handleFocus,
  OPTIONS_STUDENT,
  studentSelected,
  isLoading,
  dataSetupBooking,
}) {
  return (
    <StyledStep1>
      <div className="container">
        <form className="step1__inner">
          {isLoading ? (
            <Loading />
          ) : OPTIONS_STUDENT.length ? (
            <>
              {OPTIONS_STUDENT.length > 1 && (
                <FormGroup
                  propsInput={{
                    name: "student",
                    placeholder: "With whom are you booking a lesson with?",
                    options: OPTIONS_STUDENT,
                    onChange: onChangeStudent,
                    onFocus: handleFocus,
                    value: Object.keys(student).length ? student : null,
                  }}
                  variant="SingleSelect"
                  error={error.student}
                />
              )}
              {student.value && (
                <InfoStudent
                  studentSelected={
                    dataSetupBooking && Object.keys(dataSetupBooking).length
                      ? dataSetupBooking
                      : studentSelected
                  }
                />
              )}
            </>
          ) : (
            <div className="step1__inner__no-data">
              <h2>NO NEW STUDENTS YET</h2>
              <p>Students who have made a lesson request will appear here</p>
            </div>
          )}
          {student.value && (
            <Link to="/dashboard/teacher" className="cancel find">
              Cancel
            </Link>
          )}
          <button
            className="find"
            onClick={handleNext}
            disabled={!student.value}
          >
            Next
            <span>
              <img src={arrow} alt="arrow" />
            </span>
          </button>
        </form>
      </div>
    </StyledStep1>
  );
}

export default Step1;

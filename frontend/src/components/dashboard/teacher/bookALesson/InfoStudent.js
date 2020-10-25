import React from "react";
import styled from "styled-components";
import avatarDefault from "../../../../assets/images/avatar-picture.svg";
import moment from "moment";
import { formatPhoneNumber } from "../../../../utils/helpers";

const StyledInfoStudent = styled.section`
  .student-info {
    background: #f2f4fd;
    border-radius: 4px;
    padding: 30px 15px;
    margin: 4% 0;
    font-size: 14px;
    img {
      border-radius: 100%;
      width: 110px;
      height: 110px;
      margin-bottom: 15px;
    }
    h2 {
      font-size: 21px;
      text-transform: capitalize;
    }
    p {
      color: #b5beec;
      margin-bottom: 10px;
      text-transform: capitalize;
    }
    h4 {
      color: #857aec;
      font-size: 12px;
      font-weight: 400;
      margin-bottom: 25px;
    }
    .student-info__item {
      display: flex;
      align-items: center;
      max-width: 500px;
      margin: 0 auto;
      width: calc(100% - 10px);
      h3,
      p {
        font-size: 14px;
        color: #08135a;
        text-align: left;
        text-transform: none;
      }
      h3 {
        width: 35%;
        text-align: left;
        margin-right: 10px;
        font-weight: 600;
      }
      p {
        width: 65%;
      }
    }
  }
  @media only screen and (max-width: 610px) {
    .student-info .student-info__item {
      p,
      h3 {
        font-size: 12px;
      }
    }
  }
  @media only screen and (max-width: 410px) {
    .student-info {
      h2 {
        font-size: 20px;
      }
      .student-info__item {
        p,
        h3 {
          font-size: 10px;
        }
      }
    }
  }
  @media only screen and (max-width: 370px) {
    .student-info .student-info__item {
      display: block;
      h3,
      p {
        width: 100%;
      }
      p {
        margin-left: 20px;
      }
    }
  }
`;

function InfoStudent({ handleNext, step, studentSelected, handleClickEdit }) {
  const student = studentSelected.student || {};
  return (
    <StyledInfoStudent>
      <div className="student-info">
        <img src={student.avatar || avatarDefault} alt="" />
        <h2>{`${student.first_name} ${student.last_name}`}</h2>
        <p>{studentSelected.instrument}</p>
        <h4>{`Member since ${moment(student.member_since).format(
          "MMMM YYYY"
        )}`}</h4>
        <div className="student-info__item">
          <h3>Age</h3>
          {student.age && <p>{student.age.formatted_data}</p>}
        </div>
        {student.is_parent && (
          <div className="student-info__item">
            <h3>Email address</h3>
            <p>{student.email}</p>
          </div>
        )}
        {student.address && (
          <div className="student-info__item">
            <h3>Home address</h3>
            <p>
              {student.address[0]} {student.address[1]} {student.address[2]}{" "}
              {student.address[3]} {student.address[4]}
            </p>
          </div>
        )}
        <div className="student-info__item">
          <h3>Phone number</h3>
          <p>{formatPhoneNumber(student.phone)}</p>
        </div>
        {step === 3 ? (
          <div className="edit" onClick={handleClickEdit}>
            Edit
          </div>
        ) : (
          ""
        )}
      </div>
    </StyledInfoStudent>
  );
}

export default InfoStudent;

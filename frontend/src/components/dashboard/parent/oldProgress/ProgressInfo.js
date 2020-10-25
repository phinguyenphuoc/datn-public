import React from "react";
import styled from "styled-components";
import avatarDefault from "../../../../assets/images/avatar-picture.svg";
import moment from "moment";

const StyledProgressInfo = styled.section`
  .progress-nfo__inner {
    margin: 0 16px 30px;
    display: flex;
    justify-content: space-between;
    color: #08135a;
    > div {
      background: #ffffff;
      box-shadow: 0px 5px 25px rgba(98, 84, 232, 0.203944);
      border-radius: 4px;
      padding: 25px;
      h4 {
        font-size: 14px;
        text-align: left;
        font-weight: bold;
        margin-bottom: 20px;
      }
      .--contain {
        display: flex;
        align-items: center;
        img {
          width: 135px;
          height: 135px;
          border-radius: 100%;
        }
        .text {
          text-align: left;
          margin: 0 0 0 20px;
          p {
            margin-bottom: 10px;
            line-height: 22px;
          }
          p:last-child {
            margin-bottom: 0px;
          }
          span {
            font-weight: bold;
          }
        }
      }
    }
    .student-info {
      width: 40%;
    }
    .comment-teacher {
      width: calc(60% - 30px);
    }
  }
  @media only screen and (max-width: 1230px) {
    .progress-nfo__inner {
      > div {
        padding: 20px;
        .--contain {
          .text p {
            font-size: 13px;
          }
          img {
            width: 120px;
            height: 120px;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 1115px) {
    .progress-nfo__inner {
      .student-info {
        width: 45%;
      }
      .comment-teacher {
        width: calc(55% - 30px);
      }
    }
  }
  @media only screen and (max-width: 1000px) {
    .progress-nfo__inner {
      flex-direction: column;
      .student-info {
        width: 100%;
        margin-bottom: 20px;
      }
      .comment-teacher {
        width: 100%;
      }
    }
  }
  @media only screen and (max-width: 626px) {
    .progress-nfo__inner {
      margin: 0 0 30px;
    }
  }
  @media only screen and (max-width: 500px) {
    .progress-nfo__inner {
      > div {
        padding: 20px;
        h4 {
          font-size: 13px;
        }
        .--contain {
          flex-direction: column;
          .text {
            margin: 15px 0 0 0;
            p {
              font-size: 10px;
              line-height: 20px;
              margin-bottom: 5px;
            }
          }
        }
      }
    }
  }
`;

function ProgressInfo({ dataProgressReport }) {
  const dataInfoStudent = dataProgressReport.student || {};
  return (
    <StyledProgressInfo>
      <div className="container">
        <div className="progress-nfo__inner">
          <div className="student-info">
            <h4>Student information</h4>
            <div className="student-info__items --contain">
              <div className="--avatar">
                <img
                  src={dataInfoStudent.avatar || avatarDefault}
                  alt="student"
                />
              </div>
              <div className="text">
                <p>
                  Student’s name: <span>{dataInfoStudent.name}</span>
                </p>
                <p>
                  Instrument: <span>{dataInfoStudent.instrument}</span>
                </p>
                <p>
                  Join Homemuse in:{" "}
                  <span>
                    {moment(dataInfoStudent.start_date).format("MMMM, YYYY")}
                  </span>
                </p>
                <p>
                  Music Instructor: <span>{dataInfoStudent.instructor}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="comment-teacher">
            <h4>Comments and advices from my teacher</h4>
            <div className="comment-teacher__items --contain">
              <div className="--avatar">
                <img
                  src={
                    dataProgressReport.teacher &&
                    dataProgressReport.teacher.avatar
                      ? dataProgressReport.teacher.avatar
                      : avatarDefault
                  }
                  alt="teacher"
                />
              </div>
              <div className="text">
                <p>{dataProgressReport.comment}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledProgressInfo>
  );
}

export default ProgressInfo;

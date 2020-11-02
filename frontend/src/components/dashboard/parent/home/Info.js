import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { Loading, NoData } from "../../../common";
import avatarDefault from "../../../../assets/images/avatar-picture.svg";
import student_bg from "../../../../assets/images/bg-info-student.svg";
import musical from "../../../../assets/images/bg-musical-progress.svg";
import moderato from "../../../../assets/images/moderato.svg";
import star from "../../../../assets/images/star.svg";
import arrow from "../../../../assets/images/arrow-icon.svg";
import img from "../../../../assets/images/users-avatar.svg";

const StyledInfo = styled.section`
  margin-bottom: 30px;
  font-size: 14px;
  .info__inner {
    display: flex;
    justify-content: space-between;
    color: #ffffff;
    margin: 16px 0;
  }
  .info__student {
    width: 27%;
    background: url(${student_bg})  #f6732f no-repeat center / 695px;
    padding: 20px 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    h4 {
      font-size: 14px;
      margin-bottom: 10px;
      text-transform: capitalize;
    }
    h4:first-child {
      margin-bottom: 15px;
    }
    p {
      margin: 0;
      text-transform: capitalize;
    }
    .--info {
      img {
        border: 6px solid #ffffff;
        border-radius: 100%;
        margin-bottom: 10px;
        width: 75px;
        height: 75px;
      }
    }
    
    @media only screen and (max-width: 1040px) {
      padding: 30px 10px;
    }
    .loader {
      margin: 30px;
      .loader-outter {
        border: 4px solid #ffffff;
        border-left-color: transparent;
        border-bottom: 0;
      }
      .loader-inner {
        border: 4px solid #ffffff;
        border-right: 0;
        border-top-color: transparent;
      }
    }
   }
  .musical {
    width: calc(73% - 25px);
    background: url(${musical}) #08135a no-repeat 101% 100% / 50%;
    padding: 15px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    position: relative;
      &__left {
        display: flex;
        align-items: center;
        color: #ffffff;
        width: 100%;
        > img {
          width: 20%;
        }
      }
      &__text {
        text-align: left;
        margin-left: 20px;
        h3,
         .text-border1 {
          margin-bottom: 10px;
        }
        h3 {
          font-size: 21px;
        }
        h4 {
          font-size: 14px;
          font-weight: 400;
          margin-bottom: 15px;
        }
        span {
          font-weight: 400;
        }
        .text-border1 {
          width: 48px;
          height: 2px;
          background: #ffffff;
        }
        .report {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          h4 {
            color: #F6732F;
            font-size: 14px;
            margin: 0;
          }
          svg {
            margin: 0 7px;
          }
        }
        .star img {
          width: 25px;
          margin-right: 3px;
        }
        button {
          background: #6254e8;
          border-radius: 30px;
          border: none;
          color: #fff;
          font-size: 12px;
          padding: 5px 5px 5px 22px;
          display: flex;
          align-items: center;
          max-width: 180px;
          transition: 0.3s ease;
          &:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 8px 0 #2d20a7;
          }
          span {
            background: #3e32b6;
            border-radius: 100%;
            padding: 7px;
            display: inline-flex;
            margin-left: 10px;
            img {
              width: 16px;
              height: 16px;
            }
          }
        }
      }
    }
  }
  .item {
    box-shadow: 0px 5px 25px rgba(98, 84, 232, 0.203944);
    border-radius: 4px;
    min-height: 229px;
  }
  @media only screen and (max-width: 1000px) {
    .musical__text {
      h3, text-border1 {
        margin-bottom: 5px;
      }
      h3 {
      font-size: 18px;
      }
      h4, .report {
        margin-bottom: 10px;
      }
    }
  }
  @media only screen and (max-width: 750px) {
    .info__inner {
      flex-direction: column;
      margin: 0;
    }
    .item {
      width: 100%;
      margin: 10px auto;
    }
    .info__student {
      background-size: 795px;
    }
  }
  @media only screen and (max-width: 600px) {
    .musical {
      background: #08135a;
    }
    .musical__left {
      flex-direction: column;
          > img {
        margin-bottom: 15px;
        width: 100px;
      }
    }
    .musical__text {
      margin-left: 0;
      text-align: center;
      .text-border1 {
        margin: 0 auto 10px;
      }
      .report {
        justify-content: center;
      }
      button {
       margin: 0 auto;
      }
    }
  }
  @media only screen and (max-width: 400px) {
    .musical__text {
      h3 {
        font-size: 16px;
      }
      h4 {
        font-size: 12px;
      }
    } 
  }
  .--instrument {
    display: inline-flex;
  }
  .NoData {
    margin: 30px 0 20px;
    
  }
  .no_progress_report {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: absolute;
    left: 0;
    top: 0;
    padding: 28px 10px 0 50px;
    &__divider {
      width: 47px;
      height: 2px;
      background: #fff;
      margin: 0 0 24px;
    }
    h1, h2 {
      font-size: 21px;
      line-height: 28px;
      color: #fff;
      margin: 0 0 12px;
    }
    h1 {
      color: rgba(255, 255, 255, 0.5);
    }
    @media (max-width: 480px) {
      padding: 10px;
      position: relative;
      h1, h2 {
        font-size: 20px;
      }
    }
  }
`;

function Info({ dataTeachers, handleClick, dataProgressReports }) {
  const isLoadingTeachers = dataTeachers.loading;
  const isLoadingProgressReports = dataProgressReports.loading;
  const history = useHistory();
  const oldHistoryState = history.location.state ? history.location.state : {};

  const handleclickProgressReport = (item = {}) => () => {
    history.push("/dashboard/student/progress-report", {
      ...oldHistoryState,
      progress: item,
    });
  };

  return (
    <StyledInfo>
      <div className="container">
        <div className="info__inner">
          <div className="info__student item ">
            <h4>My teacher</h4>
            {isLoadingTeachers ? (
              <Loading />
            ) : dataTeachers.data.length ? (
              <div
                className="--info"
                onClick={handleClick(dataTeachers.data[0])}
              >
                <img
                  src={dataTeachers.data[0].avatar || avatarDefault}
                  alt="student"
                />
                <h4>{`${dataTeachers.data[0].first_name} ${dataTeachers.data[0].last_name}`}</h4>
                <div className="--instrument">
                  {dataTeachers.data[0].skills &&
                    dataTeachers.data[0].skills.length &&
                    dataTeachers.data[0].skills.map((item, index) => {
                      if (index === 0) {
                        return <p key={`skills-${index}`}>{item.instrument}</p>;
                      } else {
                        return (
                          <p
                            key={`skills-${index}`}
                          >{`, ${item.instrument}`}</p>
                        );
                      }
                    })}
                </div>
              </div>
            ) : (
                  <NoData noDataText="NO TEACHER YET" noDataImage={img} />
                )}
          </div>
          <div className="musical item">
            {isLoadingProgressReports ? (
              <Loading />
            ) : dataProgressReports.data.length &&
              dataProgressReports.data[0] ? (
                  <div className="musical__left">
                    <img src={moderato} alt="" />
                    <div className="musical__text">
                      <h3>Musical progress report</h3>
                      <p className="text-border1"></p>
                      <h4>
                        {dataProgressReports.data[0].student &&
                          `${dataProgressReports.data[0].student.name} . ${moment(
                            dataProgressReports.data[0].reported_date
                          ).format("MMMM, YYYY")}`}
                      </h4>
                      <div className="report">
                        <div className="star">
                          {dataProgressReports.data[0].rating === 1 ? (
                            <img src={star} alt="start" />
                          ) : dataProgressReports.data[0].rating === 2 ? (
                            <>
                              <img src={star} alt="start" />
                              <img src={star} alt="start" />
                            </>
                          ) : dataProgressReports.data[0].rating === 3 ? (
                            <>
                              <img src={star} alt="start" />
                              <img src={star} alt="start" />
                              <img src={star} alt="start" />
                            </>
                          ) : (
                                  <>
                                    <img src={star} alt="start" />
                                    <img src={star} alt="start" />
                                    <img src={star} alt="start" />
                                    <img src={star} alt="start" />
                                  </>
                                )}
                        </div>
                      </div>
                      <Link to="/dashboard/student/progress-report">
                        <button
                          className="fw-500"
                          onClick={handleclickProgressReport(
                            dataProgressReports.data[0]
                          )}
                        >
                          See my progress
                      <span>
                            <img src={arrow} alt="" />
                          </span>
                        </button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="no_progress_report">
                    <h2>Musical progress report</h2>
                    <div className="no_progress_report__divider" />
                    <h1>NO PROGRESS REPORT YET</h1>
                  </div>
                )}
          </div>
        </div>
      </div>
    </StyledInfo>
  );
}

export default Info;

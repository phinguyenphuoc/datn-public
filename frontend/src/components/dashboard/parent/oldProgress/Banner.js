import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ChevronRight } from "../../../common/icons";
import dashboard from "../../../../assets/images/banner-progress.svg";
import moderato from "../../../../assets/images/moderato.svg";
import star from "../../../../assets/images/star.svg";
import human from "../../../../assets/images/human.svg";
import { useHistory } from "react-router-dom";
// import print from "../../../../assets/images/print.svg";
import moment from "moment";

const StyledBanner = styled.section`
  background: #fff5f0;
  .progress-header {
    display: flex;
    justify-content: space-between;
    margin: 20px 16px;
  }
  .Banner__text {
    display: flex;
    align-items: center;
    font-size: 16px;
    margin-bottom: 15px;
    flex-wrap: wrap;
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
  .button-group {
    > a {
      margin: 0 0 10px 20px;
    }
    button {
      background: #6254e8;
      border-radius: 30px;
      border: none;
      color: #fff;
      font-size: 12px;
      padding: 6px 5px 6px 29px;
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
        margin-left: 13px;
        img {
          width: 16px;
          height: 16px;
        }
      }
    }
    .bt-print {
      background: #f6732f;
      padding: 6px 5px 6px 24px;
      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 8px 0 #d69777;
      }
      span {
        background: #cc571b;
        margin-left: 9px;
      }
    }
  }
  .Banner__progress {
    background: url(${dashboard}) #08135a no-repeat 0% 99% / 100%;
    padding: 15px 20px;
    box-shadow: 0px 5px 25px rgba(98, 84, 232, 0.203944);
    border-radius: 4px;
    margin: 0 16px 30px;
    position: relative;
    &__left {
      display: flex;
      align-items: center;
      color: #ffffff;
      width: 100%;
      > img {
        width: 17%;
      }
    }
    &__text {
      text-align: left;
      margin-left: 20px;
      h3,
      .text-border1,
      h4 {
        margin-bottom: 15px;
      }
      h3 {
        font-size: 29px;
      }
      h4 {
        font-size: 21px;
        font-weight: 400;
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
          color: #f6732f;
          font-size: 21px;
          margin: 0;
        }
        svg {
          margin: 0 7px;
          width: 12px;
          height: 24px;
        }
      }
      .star img {
        width: 25px;
        margin-right: 3px;
      }
    }
    .human {
      position: absolute;
      bottom: -20%;
      right: 0;
      width: 11%;
    }
  }
  @media only screen and (max-width: 920px) {
    .Banner__progress__text {
      h3,
      h4 {
        margin-bottom: 10px;
      }
      h4 {
        font-size: 16px;
      }
      h3 {
        font-size: 21px;
      }
    }
  }
  @media only screen and (max-width: 730px) {
    .Banner__progress__text {
      h3,
      h4,
      p {
        margin-bottom: 5px;
      }
      h4,
      .report {
        h4 {
          font-size: 14px;
        }
        svg {
          width: 9px;
          height: 14px;
        }
      }
      h3 {
        font-size: 19px;
      }
    }
  }
  @media only screen and (max-width: 640px) {
    .progress-header {
      margin: 20px 0px;
    }
  }
  @media only screen and (max-width: 626px) {
    .Banner__progress__text {
      text-align: center;
      margin-left: 0;
      h4,
      .report h4 {
        font-size: 11px;
      }
      h3 {
        font-size: 16px;
      }
      .text-border1 {
        display: flex;
        margin: 8px auto;
      }
      .text-border2 {
        display: none;
      }
      h4 {
        margin-bottom: 5px;
      }
      h3,
      p {
        margin-bottom: 8px;
      }
      .report {
        justify-content: center;
      }
    }
    .Banner__text {
      font-size: 13px;
    }
    .progress-header {
      flex-direction: column;
    }
    .button-group {
      > a:first-child {
        margin: 0 0 10px;
      }
    }
    .Banner__progress {
      background: #08135a;
      margin: 0 0px 20px;
      .human {
        display: none;
      }
    }

    .Banner__progress__left {
      display: block;
      > img {
        width: 30%;
        margin-bottom: 10px;
      }
    }
  }
  @media only screen and (max-width: 400px) {
    .button-group {
      > a {
        width: 100%;
        margin: 0 0 10px;
      }
      button {
        margin: 0 auto;
      }
    }
    .Banner__text {
      font-size: 12px;
      .arrow {
        margin: 0 9px;
        svg {
          width: 8px;
        }
      }
    }
  }
`;

function Banner({ dataProgressReport }) {
  const history = useHistory();

  return (
    <StyledBanner>
      <div className="container">
        <div className="progress-header">
          <div className="Banner__text">
            <Link to="/dashboard/parent">Home</Link>
            <p className="arrow">
              <ChevronRight />
            </p>
            <Link
              to={{
                ...history.location,
                pathname: "/dashboard/parent/progress-report/",
              }}
            >
              {dataProgressReport.student &&
                `My progress: ${dataProgressReport.student.name}`}
            </Link>
            <p className="arrow">
              <ChevronRight />
            </p>
            <Link
              to={{
                ...history.location,
                pathname: "/dashboard/parent/progress-report/history",
              }}
            >
              History
            </Link>
            <p className="arrow">
              <ChevronRight />
            </p>
            <div className="text-color">
              {moment(dataProgressReport.reported_date).format("MMMM YYYY")}
            </div>
          </div>
          <div className="button-group">
            {/* <Link to="/dashboard/parent/progress-report/print">
              <button className="fw-500 bt-print">
                Print my report
                <span>
                  <img src={print} alt="" />
                </span>
              </button>
            </Link> */}
          </div>
        </div>
        <div className="Banner__progress">
          <div className="Banner__progress__left">
            <img src={moderato} alt="" />
            <div className="Banner__progress__text">
              <h3>Musical progress report</h3>
              <h4>
                {moment(dataProgressReport.reported_date).format("MMMM, YYYY")}
              </h4>
              <p className="text-border1"></p>
              <div className="report">
                <div className="star">
                  {dataProgressReport.rating === 1 ? (
                    <img src={star} alt="start" />
                  ) : dataProgressReport.rating === 2 ? (
                    <>
                      <img src={star} alt="start" />
                      <img src={star} alt="start" />
                    </>
                  ) : dataProgressReport.rating === 3 ? (
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
            </div>
          </div>
          <img className="human" src={human} alt="human" />
        </div>
      </div>
    </StyledBanner>
  );
}

export default Banner;

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import { ChevronRight } from "../../../common/icons";
import dashboard from "../../../../assets/images/banner-progress.svg";
import arrow from "../../../../assets/images/arrow-progress.svg";
import human from "../../../../assets/images/human.svg";

const StyledBanner = styled.section`
  background: #fff5f0;
  .banner__text {
    display: flex;
    align-items: center;
    font-size: 16px;
    padding: 25px 15px;
    margin-bottom: 2%;
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
  .banner__progress {
    background: url(${dashboard}) #08135a no-repeat 0% 110% / 100%;
    padding: 3% 15px;
    box-shadow: 0px 5px 25px rgba(98, 84, 232, 0.203944);
    border-radius: 4px;
    margin: 0 15px 2%;
    position: relative;
    &__left {
      display: flex;
      align-items: center;
      color: #ffffff;
      img {
        width: 16%;
      }
    }
    &__text {
      text-align: left;
      margin-left: 20px;
      h3,
      h4 {
        margin-bottom: 15px;
      }
      h4 {
        font-size: 18px;
      }
      span {
        font-weight: 400;
        text-transform: capitalize;
      }
      .text-border1,
      .text-border2 {
        width: 48px;
        height: 2px;
        background: #ffffff;
      }
      .text-border1 {
        display: none;
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
    .banner__progress__text {
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
    .banner__progress__text {
      h3,
      h4,
      p {
        margin-bottom: 5px;
      }
      h4 {
        font-size: 14px;
      }
      h3 {
        font-size: 18px;
      }
    }
  }
  @media only screen and (max-width: 640px) {
    .banner__progress__text {
      h4 {
        font-size: 11px;
      }
      h3 {
        font-size: 16px;
      }
    }
    .banner__text {
      font-size: 13px;
      .arrow {
        svg {
          width: 8px;
        }
      }
    }
  }
  @media only screen and (max-width: 560px) {
    .banner__progress {
      background: #08135a;
      margin: 0 0px 2%;
      .human {
        display: none;
      }
    }
    .banner__progress__left {
      display: block;
      img {
        width: 30%;
        margin-bottom: 10px;
      }
    }
    .banner__progress__text {
      text-align: center;
      margin-left: 0;
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
    }
    .banner__text {
      font-size: 10px;
      padding: 25px 0px;
    }
  }
  @media only screen and (max-width: 380px) {
    .banner__text {
      font-size: 10px;
      padding: 25px 0px;
      .arrow {
        margin: 0 7px;
        svg {
          width: 7px;
        }
      }
    }
  }
`;

function Banner({ dataProgress }) {
  return (
    <StyledBanner>
      <div className="container">
        <div className="banner__text">
          <Link to="/dashboard/teacher">Home</Link>
          <p className="arrow">
            <ChevronRight />
          </p>
          <Link to="/dashboard/teacher/my-students-page">My students</Link>
          <p className="arrow">
            <ChevronRight />
          </p>
          <p className="text-color">
            {dataProgress.student &&
              `Progress report: ${dataProgress.student.name} (${moment(
                dataProgress.reported_date
              ).format("MMMM, YYYY")})`}
          </p>
        </div>
        <div className="banner__progress">
          <div className="banner__progress__left">
            <img src={arrow} alt="" />
            <div className="banner__progress__text">
              <h3>Progress report form</h3>
              <p className="text-border1"></p>
              <h4>
                Date:{" "}
                <span>
                  {moment(dataProgress.reported_date).format("MMMM, YYYY")}
                </span>
              </h4>
              <p className="text-border2"></p>
              <h4>
                Student name:{" "}
                <span>
                  {dataProgress &&
                    dataProgress.student &&
                    dataProgress.student.name}
                </span>
              </h4>
            </div>
          </div>
          <img className="human" src={human} alt="human" />
        </div>
      </div>
    </StyledBanner>
  );
}

export default Banner;

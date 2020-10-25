import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";
import { Loading, NoData } from "../../../common";
import moment from "moment";
import avatarDefault from "../../../../assets/images/avatar-picture.svg";
import student_bg from "../../../../assets/images/student-bg.svg";
import money from "../../../../assets/images/money.svg";
import teacher from "../../../../assets/images/background-info.svg";
import earning from "../../../../assets/images/earning-bg.svg";
import noStudents from "../../../../assets/images/users-avatar.svg";
import noEarnings from "../../../../assets/images/no-earnings.svg";
import { getAuth } from "../../../../utils/helpers";

const StyledInfo = styled.section`
  margin-bottom: 20px;
  font-size: 14px;
  .info__inner {
    display: flex;
    justify-content: space-between;
    color: #ffffff;
    margin: 16px 0;
  }
  .info__teacher {
    width: 27%;
    background: url(${teacher}) #6254e8 no-repeat center / 695px;
    padding: 20px;
    p {
      font-weight: 500;
      margin-bottom: 40px;
      text-transform: capitalize;
    }
    img {
      border: 7px solid #ffffff;
      border-radius: 100%;
      width: 100px;
      height: 100px;
    }
  }
  .list-students {
    width: 42%;
    padding: 20px;
    background: url(${student_bg}) #08135a no-repeat center / 670px;
    &__header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      p {
        font-weight: 500;
      }
      a {
        color: #ffffff;
        border-bottom: 1px solid;
        font-size: 12px;
        transition: 0.3s ease;
        &:hover {
          color: #f78036;
        }
      }
    }
    &__body {
      width: 85%;
      margin: 0 auto;
      .slide {
        cursor: pointer;
        &:focus {
          outline: none;
        }
        p {
          padding-top: 4px;
          text-transform: capitalize;
        }
        img {
          margin: 5px auto;
          border: 7px solid;
          border-radius: 100%;
          width: 95px;
          height: 95px;
        }
      }
      .loader {
        margin: 25px 0 60px;
      }

      .slick-arrow {
        &:before {
          color: #ffffff;
          font-size: 36px;
        }
        &:hover {
          &:before {
            color: #6254e8;
          }
        }
      }
      .slick-prev {
        left: -14%;
        top: calc(50% - 13px);
      }
      .slick-next {
        right: -14%;
        top: calc(50% - 13px);
      }
    }
    @media only screen and (max-width: 900px) {
      &__header {
        margin-bottom: 0;
      }
      .NoData {
        margin-top: 20px;
      }
    }
  }
  .rate {
    width: 27%;
    background: url(${earning}) #34a465 no-repeat center / 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    .rate__text {
      margin-bottom: 30px;
    }
    .money {
      display: flex;
      justify-content: center;
    }
    p {
      margin: 0 0 0 10px;
      font-size: 43px;
    }
    a {
      color: #ffffff;
      border-bottom: 1px solid;
      font-size: 12px;
      transition: 0.3s ease;
      position: absolute;
      top: 20px;
      right: 20px;
      &:hover {
        color: #f78036;
      }
    }
    @media only screen and (max-width: 1040px) {
      padding: 30px 10px;
    }
    @media only screen and (max-width: 900px) {
      img {
        width: 50px;
      }
      p {
        font-size: 27px;
      }
    }
  }
  .item {
    box-shadow: 0px 5px 25px rgba(98, 84, 232, 0.203944);
    border-radius: 4px;
    min-height: 229px;
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
    .rate {
      background-size: 117%;
      padding: 50px 10px;
    }
    .list-students {
      background-size: 125%;
    }
  }
  @media only screen and (max-width: 510px) {
    .list-students {
      background-size: 170%;
    }
  }
  @media only screen and (max-width: 400px) {
    .rate {
      background-size: 150%;
    }
    .list-students {
      background-size: 224%;
    }
  }
`;

function Info({ handleClick, dataStudents, storeEarningCurrentDetails }) {
  const [settings, setSettings] = React.useState({
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  });

  const isLoadingStudents = dataStudents.loading;
  const isLoadingEaringCurrentDetails = storeEarningCurrentDetails.loading;
  React.useLayoutEffect(() => {
    function slides() {
      if (window.innerWidth <= 370) {
        setSettings({ ...settings, slidesToShow: 1 });
      } else if (window.innerWidth <= 520) {
        setSettings({ ...settings, slidesToShow: 2 });
      } else if (window.innerWidth <= 750) {
        setSettings({ ...settings, slidesToShow: 3 });
      } else if (window.innerWidth <= 1040) {
        setSettings({ ...settings, slidesToShow: 2 });
      } else if (window.innerWidth > 1040) {
        setSettings({ ...settings, slidesToShow: 3 });
      }
    }
    window.addEventListener("resize", slides);
    slides();
    return () => window.removeEventListener("resize", slides);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const auth = getAuth();

  return (
    <StyledInfo>
      <div className="container">
        <div className="info__inner">
          <div className="info__teacher item">
            <p>{`Welcome ${auth.user_first_name}!`}</p>
            <img src={auth.user_avatar || avatarDefault} alt="info" />
          </div>
          <div className="list-students item">
            <div className="list-students__inner">
              <div className="list-students__header">
                <p>My students</p>
                <div className="link">
                  {dataStudents.data.length ? (
                    <Link to="/dashboard/teacher/my-students-page">
                      see list
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
              <div className="list-students__body">
                {isLoadingStudents ? (
                  <Loading />
                ) : dataStudents.data.length ? (
                  <Slider {...settings}>
                    {dataStudents.data.map((item, index) => (
                      <article
                        className="slide"
                        onClick={handleClick(item)}
                        key={`${auth.first_name}-${index}`}
                      >
                        <img src={item.avatar || avatarDefault} alt="student" />
                        <p>{`${item.first_name} ${item.last_name}`}</p>
                      </article>
                    ))}
                  </Slider>
                ) : (
                  <NoData
                    noDataText="NO STUDENTS YET"
                    noDataImage={noStudents}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="rate item">
            {isLoadingEaringCurrentDetails ? (
              <Loading />
            ) : Object.keys(storeEarningCurrentDetails.data).length ? (
              <>
                <div className="link">
                  {dataStudents.data.length ? (
                    <Link to="/dashboard/teacher/earnings">see more</Link>
                  ) : (
                    <div />
                  )}
                </div>
                <div className="rate__text">
                  From{" "}
                  <span className="fw-500">
                    {moment(storeEarningCurrentDetails.data.start_date).format(
                      "MM/DD/YYYY"
                    )}
                  </span>{" "}
                  to{" "}
                  <span className="fw-500">
                    {moment(storeEarningCurrentDetails.data.end_date).format(
                      "MM/DD/YYYY"
                    )}
                  </span>
                </div>
                <div className="money">
                  <img src={money} alt="money" />
                  <p>{`$${storeEarningCurrentDetails.data.turnover}`}</p>
                </div>
              </>
            ) : (
              <NoData noDataText="NO EARNINGS YET" noDataImage={noEarnings} />
            )}
          </div>
        </div>
      </div>
    </StyledInfo>
  );
}

export default Info;

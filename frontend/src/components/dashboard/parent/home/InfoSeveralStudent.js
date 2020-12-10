import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";
import moment from "moment";
import { Loading, NoData } from "../../../common";
import student_bg from "../../../../assets/images/bg-info-student.svg";
import musical_bg from "../../../../assets/images/student-bg.svg";
import moderato from "../../../../assets/images/moderato-student.svg";
import star from "../../../../assets/images/star.svg";
import imgNoDataTeacher from "../../../../assets/images/noTeacher.svg";
import imgNoDataProgress from "../../../../assets/images/no-data-progress.svg";
import avatarDefault from "../../../../assets/images/avatar-picture.svg";

const StyledInfoSeveralStudent = styled.section`
  margin-bottom: 30px;
  font-size: 14px;
  .info__inner {
    display: flex;
    justify-content: space-between;
    color: #ffffff;
    margin: 16px 0;
  }
  .list-students {
    width: 39%;
    padding: 20px;
    background: url(${student_bg}) #f6732f no-repeat center / 695px;
    h4 {
      font-size: 14px;
      margin-bottom: 5px;
      text-transform: capitalize;
    }
    &__header {
      h4 {
        text-align: left;
        margin-bottom: 10px;
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
        img {
          border: 6px solid #ffffff;
          border-radius: 100%;
          margin: 0 auto 10px
          width: 80px;
          height: 80px;
        }
      }
      p {
        font-size: 12px;
        text-transform: capitalize;
        margin: 0;
      }
      .loader-1 {
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
    @media only screen and (max-width: 900px) {
      &__header {
        margin-bottom: 0;
      }
    }
  }
  
  .musical {
    width: calc(61% - 25px);
    background: url(${musical_bg}) #08135a no-repeat center / 900px;
    padding: 22px 20px 30px;
    &__header {
      h4 {
        text-align: left;
        margin-bottom: 20px;
        font-size: 14px;
      }
    }
    &__body {
      width: 85%;
      margin: 0 auto;
      .slide {
        cursor: pointer;
        background: #6254E8;
        border: 6px solid #FFFFFF;
        box-sizing: border-box;
        box-shadow: 0px 5px 25px rgba(98, 84, 232, 0.203944);
        border-radius: 4px;
        margin: 0 10px;
        max-width: 267px;
        padding: 15px;
        &:focus {
          outline: none;
        }
      }
      .--slide__inner {
        display: flex;
        color: #ffffff;
        align-items: center;
        img {
          width: 70px;
          height: 70px;
        }
        .musical__text {
          text-align: left;
          margin: 0 0 0 10px;
          overflow: hidden;
          h4,h3 {
            font-size: 14px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .star {
            display: flex;
            img {
              margin-right: 5px;
              width: 15px;
              height: 15px;
            }
          }
          .text-border1 {
            width: 48px;
            height: 2px;
            background: #ffffff;
            margin: 8px 0;
          }
          span, h4{
            font-weight: 400;
            text-transform: capitalize;
          }
        }
      }
    }
    
  }
  .item {
    box-shadow: 0px 5px 25px rgba(98, 84, 232, 0.203944);
    border-radius: 4px;
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
  @media only screen and (max-width: 1000px) {
    .item {
      width: calc(50% - 12.5px)
    }
    
  }
  @media only screen and (max-width: 870px) {
    .musical__body .slide {
      max-width: 250px;
  }
  }
  @media only screen and (max-width: 765px) {
    .info__inner {
      flex-direction: column;
      margin: 0;
    }
    .item {
      width: 100%;
      margin: 10px auto;
      background-size: 800px;
    }
    .info__student {
      background-size: 795px;
    }
  }

  
  @media only screen and (max-width: 380px) {
    .musical__body {
      .slide {
        max-width: 180px;
    }
      .--slide__inner {
        flex-direction: column;
        .musical__text {
          text-align: center;
          margin: 10px 0 0 0;
          h4 {
            margin-bottom: 5px;
          }
          .star {
            justify-content: center;
          }
          .text-border1 {
            margin: 6px auto;
          }
        }
      }
    }
  }
  .--instrument {
    display: inline-flex;
  }
  .NoData {
    margin: 30px 0 20px;
  }
  .loader {
    margin: 34px !important;
  }
  .musical__body .NoData img {
    height: 70px;
  }
`;

function InfoSeveralStudent({
  handleToggleModal,
  handleClick,
  dataTeachers,
  dataProgressReports,
}) {
  const isLoadingTeachers = dataTeachers.loading;
  const isLoadingProgressReports = dataProgressReports.loading;

  const [settings, setSettings] = React.useState({
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  });
  const [settingsSeveral, setSettingsSeveral] = React.useState({
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  });
  React.useLayoutEffect(() => {
    function slides() {
      if (window.innerWidth <= 370) {
        setSettings({ ...settings, slidesToShow: 1 });
      } else if (window.innerWidth <= 520) {
        setSettings({ ...settings, slidesToShow: 2 });
      } else if (window.innerWidth <= 765) {
        setSettings({ ...settings, slidesToShow: 3 });
      } else if (window.innerWidth <= 1240) {
        setSettings({ ...settings, slidesToShow: 2 });
      } else if (window.innerWidth > 1240) {
        setSettings({ ...settings, slidesToShow: 3 });
      }
      if (window.innerWidth <= 1240) {
        setSettingsSeveral({ ...settingsSeveral, slidesToShow: 1 });
      } else if (window.innerWidth > 1240) {
        setSettingsSeveral({ ...settingsSeveral, slidesToShow: 2 });
      }
    }
    window.addEventListener("resize", slides);
    slides();
    return () => window.removeEventListener("resize", slides);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const history = useHistory();
  const oldHistoryState = history.location.state ? history.location.state : {};

  const handleclickProgressReport = (item = {}) => () => {
    history.push("/dashboard/student/progress-report", {
      ...oldHistoryState,
      progress: item,
    });
  };

  return (
    <StyledInfoSeveralStudent>
      <div className="container">
        <div className="info__inner">
          <div className="list-students item">
            <div className="list-students__header">
              <h4>My teacher</h4>
            </div>
            <div className="list-students__body">
              {isLoadingTeachers ? (
                <Loading />
              ) : dataTeachers.data.length ? (
                <Slider {...settings}>
                  {dataTeachers.data.map((item, index) => (
                    <article
                      className="slide"
                      onClick={handleClick(item)}
                      key={`ex-${index}`}
                    >
                      <img src={item.avatar || avatarDefault} alt="avatar" />
                      <h4>{`${item.first_name} ${item.last_name}`}</h4>
                      <div>
                        {item.skills &&
                          item.skills.length &&
                          item.skills.map((item, index) => {
                            if (index === 0) {
                              return (
                                <span key={`skills-${index}`}>{item.instrument}</span>
                              );
                            } else {
                              return (
                                <span
                                  key={`skills-${index}`}
                                >{`, ${item.instrument}`}</span>
                              );
                            }
                          })}
                      </div>
                    </article>
                  ))}
                </Slider>
              ) : (
                    <NoData
                      noDataText="NO TEACHERS YET"
                      noDataImage={imgNoDataTeacher}
                    />
                  )}
            </div>
          </div>
          <div className="musical item">
            <div className="musical__header">
              <h4>My musical progress reports</h4>
            </div>
            <div className="musical__body">
              {isLoadingProgressReports ? (
                <Loading />
              ) : dataProgressReports.data.length || true ? (
                <Slider {...settingsSeveral}>
                  {dataProgressReports.data.map((item, index) => (
                    <article
                      className="slide "
                      onClick={handleclickProgressReport(item)}
                      key={`progress-${index}`}
                    >
                      <div className=" --slide__inner">
                        <img src={moderato} alt="" />
                        <div className="musical__text">
                          <h4>
                            {moment(item.reported_date).format("MMMM, YYYY")}
                          </h4>
                          <p className="text-border1"></p>
                          <h3>
                            Teacher:{" "}
                            <span>{`${item.teacher.first_name} ${item.teacher.last_name}`}</span>
                          </h3>
                        </div>
                      </div>
                    </article>
                  ))}
                </Slider>
              ) : (
                    <NoData
                      noDataText="NO PROGRESS REPORTS YET"
                      noDataImage={imgNoDataProgress}
                    />
                  )}
            </div>
          </div>
        </div>
      </div>
    </StyledInfoSeveralStudent>
  );
}

export default InfoSeveralStudent;

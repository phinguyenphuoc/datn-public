import React, { useState } from "react";
import { Tooltip } from "reactstrap";
// import Photo from "./Photo";
import Reviews from "./Reviews";
import TeacherCard from "./TeacherCard";
import { Loading } from "../common";
import { getReview } from "../../redux/actions/reviews";
import { useSelector } from "react-redux";

function TeacherInfo({ data, isLoadingTeacher, handleClickButtonContact }) {
  const [tooltipOnLineOpen, setTooltipOnLineOpen] = useState(false);
  const [tooltipInPersonOpen, setTooltipInPersonOpen] = useState(false);
  const teacherId = data.id || "";
  const storeReviews = useSelector((store) => store.reviews);
  const dataReview = storeReviews.data[teacherId] || [];

  React.useEffect(() => {
    if (teacherId) {
      getReview(teacherId);
    }
  }, [teacherId]);

  const toggleOnLIne = () => setTooltipOnLineOpen(!tooltipOnLineOpen);
  const toggleInPerson = () => setTooltipInPersonOpen(!tooltipInPersonOpen);

  // show English as default
  const dataLanguages =
    data.languages
      ? data.languages
      : ["English"];

  return (
    <section className="teacher__info">
      {isLoadingTeacher ? (
        <Loading />
      ) : (
          <div className="teacher__info__inner ds-primary">
            <div className="teacher__info__inner__left">
              {data.about && (
                <div className="about">
                  <p className="text--xxlarge title">About</p>
                  <p className="text--large ">{data.about}</p>
                </div>
              )}

              <div className="languages-and-availability">
                <div className="languages">
                  <p className="text--xxlarge title">Languages</p>
                  {dataLanguages.map((item) => (
                    <button className="button button--primary" key={item}>
                      <i className={`flag flag--${item}`} />
                      {item}
                    </button>
                  ))}
                </div>
                <div className="availability">
                  <p className="text--xxlarge title">Availability</p>
                  <div className="availability__item">
                    <div>
                      <button
                        className="button button--primary"
                        id={`Online-${data.id}`}
                      >
                        <span className="icon-camera white"></span>
                      Online lesson
                    </button>
                      <Tooltip
                        placement="top"
                        isOpen={tooltipOnLineOpen}
                        target={`Online-${data.id}`}
                        toggle={toggleOnLIne}
                        className="tooltip-styte"
                      >
                        This teacher is offering online lessons
                    </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overview">
                <p className="text--xxlarge title">Overview</p>
                <div className="overview__inner">
                  <div>
                    <p className="text--large">Experience</p>
                    {data.experience &&
                      data.experience.map((item, index) => (
                        <div className="availability__item" key={index}>
                          <span></span>
                          <p key={index}>{item}</p>
                        </div>
                      ))}
                  </div>
                  <div>
                    <p className="text--large">Background</p>
                    {data.background &&
                      data.background.map((item, index) => (
                        <div className="availability__item" key={index}>
                          <span></span>
                          <p key={index}>{item}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/* <Photo /> */}
              <Reviews data={data} dataReview={dataReview} />
            </div>
            <div className="teacher__info__inner__right ">
              <TeacherCard data={data} dataReview={dataReview} onClickButton={handleClickButtonContact} />
            </div>
          </div>
        )}
    </section>
  );
}

export default TeacherInfo;

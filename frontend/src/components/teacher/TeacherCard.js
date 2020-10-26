import React from "react";
import star from "../../assets/images/rate.png";
import { RATE_DURATIONS } from "../../utils/constants";
import defaultAvatar from "../../assets/images/avatar-picture.svg";
import HomemuseCertified from "../../assets/images/HomemuseCertified.svg";
import { useSelector } from "react-redux";
import _ from "lodash";
const TeacherCard = ({ data, dataReview, onClickButton }) => {
  const storeGlobal = useSelector((store) => store.global);
  const [rateDurations, setRateDurations] = React.useState({});

  let totalScore = 0;
  dataReview.forEach((item) => {
    totalScore += parseFloat(item.rating);
  });

  const averageScore =
    totalScore === 0
      ? 0
      : Math.round((totalScore / dataReview.length) * 10) / 10;

  React.useEffect(() => {
    if (data.pricings && data.pricings.length) {
      const rateDurations = {};
      const sortedPricings = data.pricings.sort((a, b) =>
        a.duration > b.duration ? 1 : -1
      );
      sortedPricings.forEach(
        (price) => (rateDurations[price.duration] = price.gross_price)
      );
      setRateDurations(rateDurations);
    }
  }, [data]);
  return (
    <div
      className="teacher__card radius-l sticky"
      style={{ top: storeGlobal.heightHeader + 45 }}
    >
      <img
        src={_.get(data, "medias[0].url", null) || defaultAvatar}
        alt={data.first_name}
        className="teacher__card__avatar"
      />
      <img
        src={HomemuseCertified}
        alt=""
        className="teacher__card__certified"
      />
      <div className="teacher__card__info">
        <p className="text--xlarge">{data.first_name}</p>
        <div className="list--instruments">
          {data.skills &&
            data.skills.map((item, index) => (
              <span className="badge" key={index}>
                {item.instrument}
              </span>
            ))}
        </div>
        <div className="rating-and-location">
          {averageScore > 0 && (<div>
            <img src={star} alt="" className="star" />
            <p>
              {averageScore} <span>({dataReview.length} {dataReview.length > 1 ? 'reviews' : 'review'})</span>
            </p>
          </div>)}
          <div>
            <span className="icon-map-pin"></span>
            <p>{data.city}</p>
          </div>
        </div>
        <p className="primary pickup-line">{data.pickup_line}</p>
      </div>
      <div className="teacher__card__pricing">
        {data.teaching_trial_discount &&
          !!data.teaching_trial_discount.data &&
          data.teaching_trial_discount.data !== "0" && (
            <p className="discount">{`${data.teaching_trial_discount.data}% off on your first lesson !`}</p>
          )}
        <div className="pricing">
          {Object.keys(rateDurations).length &&
            Object.keys(rateDurations).map((key) => (
              <div key={`pricings-${key}`}>
                <p>
                  {RATE_DURATIONS[key]}
                  {"min lesson "}
                </p>
                <span>${rateDurations[key]}</span>
              </div>
            ))}
        </div>

        <button
          className="button button--secondary"
          onClick={onClickButton}
        >{`Contact ${data.first_name}`}</button>
      </div>
    </div>
  );
};

export default TeacherCard;

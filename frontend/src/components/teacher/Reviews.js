import React from "react";
import classNames from "classnames";
import star from "../../assets/images/rate.png";
import defaultAvatar from "../../assets/images/avatar-picture.svg";

const Reviews = ({ data }) => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 3;

  const handleSeeMore = () => {
    setPage(page + 1);
  };

  let totalScore = 0;

  const dataReview = [
    {
      reviewer: {
        name: "Phi Nguyen"
      },
      rating: 5,
      comment: "Great teacher, very good"
    },
    {
      reviewer: {
        name: "Nguyen Phuoc Phi"
      },
      rating: 4,
      comment: "Not too good"
    },
  ]

  dataReview.forEach((item) => {
    totalScore += parseFloat(item.rating);
  });

  const averageScore =
    totalScore === 0
      ? 0
      : Math.round((totalScore / dataReview.length) * 10) / 10;

  const remainingReviews = dataReview.length - rowsPerPage * page;
  const dataReviewShowing =
    remainingReviews > 0 ? dataReview.slice(0, rowsPerPage * page) : dataReview;

  return (
    <div
      className="reviews"
      style={{ display: dataReview.length === 0 ? "none" : "block" }}
    >
      <div className="reviews__info">
        <p className="text--xxlarge title">Reviews</p>
        <p className="text--large name">
          {`${data.first_name} ${data.last_name}. has been rated`}{" "}
          <img src={star} alt="" /> {averageScore}
        </p>
        <p className="text--small">based on {dataReview.length} {dataReview.length > 1 ? 'reviews' : 'review'}</p>
      </div>

      {dataReviewShowing.map((item, index) => (
        <div className="review__item" key={index}>
          <div className="avatar">
            <img
              src={
                item.reviewer && item.reviewer.avatar
                  ? item.reviewer.avatar
                  : defaultAvatar
              }
              alt=""
            />
            <p>{item.reviewer ? item.reviewer.name : ""}</p>
          </div>
          <div className="rating">
            <span
              className={classNames("icon-star", {
                "icon--star--yellow": item.rating >= 1,
              })}
            />
            <span
              className={classNames("icon-star", {
                "icon--star--yellow": item.rating >= 2,
              })}
            />
            <span
              className={classNames("icon-star", {
                "icon--star--yellow": item.rating >= 3,
              })}
            />
            <span
              className={classNames("icon-star", {
                "icon--star--yellow": item.rating >= 4,
              })}
            />
            <span
              className={classNames("icon-star", {
                "icon--star--yellow": item.rating >= 5,
              })}
            />
            <p>{`${item.rating} / 5`}</p>
          </div>
          <p>{item.comment}</p>
        </div>
      ))}

      {remainingReviews > 0 && (
        <div className="button__show">
          <button className="button button--primary" onClick={handleSeeMore}>
            Show all reviews (+{remainingReviews})
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;

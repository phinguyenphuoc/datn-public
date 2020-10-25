import React from "react";
import styled from "styled-components";
import { formatRate } from "../../utils/helpers";
import { OnlineLesson, TravelLesson /* Rating */ } from "../common/icons";
import { useSelector } from "react-redux";

const StyledCard = styled.div`
  float: left;
  width: 33.33%;
  text-align: center;
  margin: 16px 0;
  @media only screen and (max-width: 1040px) {
    width: 50%;
  }
  @media only screen and (max-width: 680px) {
    width: 80%;
    margin: 16px auto;
  }
  @media only screen and (max-width: 500px) {
    width: 100%;
  }
  .teachers__card {
    &__inner {
      border-radius: 7px;
      background: #ffffff;
      margin: 0 16px;
      padding: 4% 5%;
      transition: 0.5s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      &:hover {
        background: #08135a;
        .teachers__card__text h1,
        .teachers__card__text p,
        .teachers__card__footer p,
        .teachers__card__text-description {
          color: #fff;
        }
      }
    }

    &__avatar {
      position: relative;
      margin-bottom: 25px;
      &__img {
        max-width: 180px;
        width: 45vw;
        border-radius: 100%;
      }
      &__lessons {
        position: absolute;
        z-index: 1;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 50%);
        display: flex;
        div {
          margin-left: 2px;
          margin-right: 2px;
        }
      }
    }

    &__text {
      h1 {
        margin: 0px;
        color: #08135a;
        transition: 0.5s ease;
        font-size: 21px;
        text-transform: capitalize;
      }
      h3 {
        color: #b5beec;
        font-weight: 200;
        font-size: 14px;
        margin-bottom: 5%;
        transition: 0.5s ease;
        text-transform: capitalize;
      }
      &-description {
        position: relative;
        padding-left: 20px;
        padding-right: 20px;
        margin-bottom: 4%;
        &:before {
          transition: 0.5s ease;
          position: absolute;
          top: -15px;
          left: 0px;
          font-size: 36px;
          content: open-quote;
        }
        &:after {
          transition: 0.5s ease;
          position: absolute;
          top: -15px;
          right: 0px;
          font-size: 36px;
          content: close-quote;
        }
        & > p {
          color: #08135a;
          transition: 0.5s ease;
          font-size: 16px;
          line-height: 25px;
          display: inline;
          text-overflow: ellipsis;
          -webkit-line-clamp: 3; /* number of lines to show */
          -webkit-box-orient: vertical;
        }
      }
    }

    &__rating {
      display: flex;
    }

    &__body {
      text-align: center;
      margin-bottom: 0;
      div {
        border-radius: 16px;
        background: #dce0f6;
        color: #6254e8;
        padding: 5px 13px;
        margin: 0 5px 10px;
        display: inline-block;
      }
    }

    &__footer {
      p {
        transition: 0.5s ease;
        color: #08135a;
        font-size: 12px;
        margin-bottom: 5px;
      }
      h1 {
        color: #f6732f;
        font-size: 21px;
        margin: 0;
      }
    }
  }
`;

function Card({
  id,
  image,
  name,
  position,
  description,
  skills,
  pricings,
  onClick,
  teachingDistance,
  teachingType,
  rating,
}) {
  const storeInstruments = useSelector(
    (store) => store.instruments.data.instruments
  );

  const optionInstruments = storeInstruments
    ? storeInstruments.map((item, index) => {
        return {
          value: item.name,
          label: item.name.charAt(0).toUpperCase() + item.name.slice(1),
        };
      })
    : [];

  const convertedInstruments = optionInstruments
    ? optionInstruments.reduce(
        (options, item) => ({ ...options, [item.value]: item.label }),
        {}
      )
    : [];

  return (
    <StyledCard onClick={onClick}>
      <div className="teachers__card__inner">
        <div className="teachers__card__avatar">
          <img className="teachers__card__avatar__img" src={image} alt={name} />
          <div className="teachers__card__avatar__lessons">
            {teachingType.data &&
              teachingType.data.includes("online") && (
              <OnlineLesson type="card"></OnlineLesson>
            )}
            {teachingType.data &&
              teachingType.data.includes("in-person") && (
              <TravelLesson
                type="card"
                distance={teachingDistance}
              ></TravelLesson>
            )}
          </div>
        </div>
        <div className="teachers__card__text">
          <h1>{name}</h1>
          <h3>{position}</h3>
          {/* <div className="teachers__card__rating">
            <Rating rating={rating} type="card"></Rating>
          </div> */}
          {description && (
            <div className="teachers__card__text-description">
              <p>{description}</p>
            </div>
          )}
        </div>
        <div className="teachers__card__body">
          {skills &&
            skills.length > 0 &&
            skills.map((skill) => (
              <div key={`${id}-${skill.instrument}`}>
                {convertedInstruments[skill.instrument]}
              </div>
            ))}
        </div>
        <div className="teachers__card__footer">
          <p>Starting at</p>
          <h1>{formatRate(pricings)}</h1>
        </div>
      </div>
    </StyledCard>
  );
}

export default Card;

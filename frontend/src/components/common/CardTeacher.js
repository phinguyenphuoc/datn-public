import React, { useState } from "react";
import { formatRate } from "../../utils/helpers";
import { Tooltip } from "reactstrap";
import { useSelector } from "react-redux";

function CardTeacher({
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
  teachingDiscount,
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

  const [tooltipOnLineOpen, setTooltipOnLineOpen] = useState(false);
  const [tooltipInPersonOpen, setTooltipInPersonOpen] = useState(false);

  const toggleOnLIne = () => setTooltipOnLineOpen(!tooltipOnLineOpen);
  const toggleInPerson = () => setTooltipInPersonOpen(!tooltipInPersonOpen);

  return (
    <div onClick={onClick} className="card__teacher">
      <div className="card__teacher__inner radius-l">
        <div className="card__teacher__inner__avatar">
          <img
            className="card__teacher__inner__avatar__img"
            src={image}
            alt={name}
          />
          <div className="card__teacher__inner__avatar__instruments">
            {skills &&
              skills.length > 0 &&
              skills.map((skill) => (
                <div
                  className="text--small background-primary white"
                  key={`${id}-${skill.instrument}`}
                >
                  {convertedInstruments[skill.instrument]}
                </div>
              ))}
          </div>
          <div className="card__teacher__inner__avatar__info white">
            <h4 className="h4">{name}</h4>
            <div className="card__teacher__inner__avatar__info-position">
              <div className="position">
                <span className="icon-map-pin"></span>
                <p className="text--small">{position}</p>
              </div>
              {rating && (
                <div className="star">
                  <span className="icon-star"></span>
                  <p className="text--small">{Math.round(rating * 10) / 10}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="card__teacher__inner__block">
          <div className="card__teacher__inner__text">
            {description && (
              <div className="card__teacher__inner__text-description">
                <p>{description}</p>
              </div>
            )}
          </div>
          <div className="card__teacher__inner__footer">
            <div className="card__teacher__inner__footer__lessons">
              <p className="text--small">Available for</p>
              <div className="tooltip__group">
                {teachingType.data && teachingType.data.includes("online") && (
                  <div className="tooltip__item" id={`TooltipOnline-${id}`}>
                    <span href="#" className="icon-camera primary"></span>
                    <Tooltip
                      placement="top"
                      isOpen={tooltipOnLineOpen}
                      target={`TooltipOnline-${id}`}
                      toggle={toggleOnLIne}
                      className="tooltip__text"
                    >
                      This teacher is offering online lessons
                    </Tooltip>
                  </div>
                )}
                {teachingType.data && teachingType.data.includes("in-person") && (
                  <div className="tooltip__item" id={`TooltipInPerson-${id}`}>
                    <span href="#" className="icon-car primary"></span>
                    <Tooltip
                      placement="top"
                      isOpen={tooltipInPersonOpen}
                      target={`TooltipInPerson-${id}`}
                      toggle={toggleInPerson}
                      className="tooltip__text"
                    >
                      The teacher is traveling to your home (
                      <b>
                        {teachingDistance === null
                          ? "Up to 5miles"
                          : `${teachingDistance.formatted_data}`}
                      </b>{" "}
                      around this location)
                    </Tooltip>
                  </div>
                )}
              </div>
            </div>
            <div className="card__teacher__inner__footer__money">
              <p className="text--small">Starting at</p>
              <h4 className="h4 primary">{formatRate(pricings)}</h4>
              {!!teachingDiscount && teachingDiscount !== "0" && (
                <p className="text--xsmall green">Discount available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardTeacher;

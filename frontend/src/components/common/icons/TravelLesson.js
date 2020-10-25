import React from "react";
import styled from "styled-components";

const ToolTip = styled.div`
  position: relative;
  cursor: pointer;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  span {
    visibility: hidden;
    opacity: 0;
    width: 190px;
    background-color: #f2f4fd;
    color: #6254e8;
    text-align: center;
    padding: 5px 2px;
    position: absolute;
    z-index: 1;
    top: 120%;
    left: ${props => props.type === 'profile' ? "0" : "-75px"};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    transition: opacity 0.5s;
    &:after {
      content: "";
      position: absolute;
      bottom: 98%;
      left: ${props => props.type === 'profile' ? "18px" : "86px"};
      border-width: 7px;
      border-style: solid;
      border-color: transparent transparent #f2f4fd transparent;
    }
  }
  &:hover {
    span {
      visibility: visible;
      opacity: 1;
    }
  }
`;

function TravelLesson({ type, distance }) {
  return (
    <ToolTip type={type}>
      {type === "profile" ? (
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z"
            fill="#B5BEEC"
          />
          <circle cx="25" cy="25" r="19.1176" fill="white" />
          <path
            d="M33.4795 16.1887C33.2344 15.4656 32.5482 14.9509 31.7393 14.9509H18.2589C17.4501 14.9509 16.7761 15.4656 16.5187 16.1887L13.9697 23.5294V33.3333C13.9697 34.0073 14.5212 34.5588 15.1952 34.5588H16.4207C17.0947 34.5588 17.6462 34.0073 17.6462 33.3333V32.1078H32.3521V33.3333C32.3521 34.0073 32.9036 34.5588 33.5776 34.5588H34.8031C35.4771 34.5588 36.0286 34.0073 36.0286 33.3333V23.5294L33.4795 16.1887ZM18.2589 28.4313C17.2418 28.4313 16.4207 27.6102 16.4207 26.5931C16.4207 25.5759 17.2418 24.7548 18.2589 24.7548C19.2761 24.7548 20.0972 25.5759 20.0972 26.5931C20.0972 27.6102 19.2761 28.4313 18.2589 28.4313ZM31.7393 28.4313C30.7222 28.4313 29.9011 27.6102 29.9011 26.5931C29.9011 25.5759 30.7222 24.7548 31.7393 24.7548C32.7565 24.7548 33.5776 25.5759 33.5776 26.5931C33.5776 27.6102 32.7565 28.4313 31.7393 28.4313ZM16.4207 22.3039L18.2589 16.7892H31.7393L33.5776 22.3039H16.4207Z"
            fill="#B5BEEC"
          />
        </svg>
      ) : (
        <svg
          width="35"
          height="36"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z"
            fill="#6254E8"
          />
          <circle cx="14.0001" cy="14" r="10.7059" fill="white" />
          <path
            d="M18.749 9.0657C18.6117 8.66079 18.2274 8.37256 17.7745 8.37256H10.2254C9.77251 8.37256 9.39505 8.66079 9.25094 9.0657L7.82349 13.1765V18.6667C7.82349 19.0441 8.13231 19.3529 8.50976 19.3529H9.19604C9.57349 19.3529 9.88231 19.0441 9.88231 18.6667V17.9804H18.1176V18.6667C18.1176 19.0441 18.4264 19.3529 18.8039 19.3529H19.4902C19.8676 19.3529 20.1764 19.0441 20.1764 18.6667V13.1765L18.749 9.0657ZM10.2254 15.9216C9.65584 15.9216 9.19604 15.4618 9.19604 14.8922C9.19604 14.3226 9.65584 13.8628 10.2254 13.8628C10.7951 13.8628 11.2549 14.3226 11.2549 14.8922C11.2549 15.4618 10.7951 15.9216 10.2254 15.9216ZM17.7745 15.9216C17.2049 15.9216 16.7451 15.4618 16.7451 14.8922C16.7451 14.3226 17.2049 13.8628 17.7745 13.8628C18.3441 13.8628 18.8039 14.3226 18.8039 14.8922C18.8039 15.4618 18.3441 15.9216 17.7745 15.9216ZM9.19604 12.4902L10.2254 9.40197H17.7745L18.8039 12.4902H9.19604Z"
            fill="#6254E8"
          />
        </svg>
      )}
      <span>
        The teacher is traveling to your home (<b>{distance === null ? "Up to 5miles" : `${distance.formatted_data}`}</b> around this location)
      </span>
    </ToolTip>
  );
}

export default TravelLesson;

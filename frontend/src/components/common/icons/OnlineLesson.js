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
    left: ${(props) => (props.type === "profile" ? "0" : "-75px")};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    transition: opacity 0.5s;
    &:after {
      content: "";
      position: absolute;
      bottom: 98%;
      left: ${(props) => (props.type === "profile" ? "18px" : "86px")};
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

function OnlineLesson({ type }) {
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
          <circle cx="25" cy="24.9999" r="19.1176" fill="white" />
          <rect
            x="16.1787"
            y="19.1176"
            width="12.7059"
            height="11.7647"
            fill="#B5BEEC"
          />
          <path
            d="M26.0576 25L33.8223 19.1176V30.8824L26.0576 25Z"
            fill="#B5BEEC"
          />
        </svg>
      ) : (
        <svg
          width="35"
          height="36"
          viewBox="0 0 28 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14 28.0548C21.732 28.0548 28 21.7868 28 14.0548C28 6.32282 21.732 0.0548096 14 0.0548096C6.26801 0.0548096 0 6.32282 0 14.0548C0 21.7868 6.26801 28.0548 14 28.0548Z"
            fill="#F6732F"
          />
          <circle cx="13.9998" cy="14.0548" r="10.7059" fill="white" />
          <rect
            x="9.05884"
            y="10.7607"
            width="7.11529"
            height="6.58824"
            fill="#F6732F"
          />
          <path
            d="M14.593 14.0548L18.9413 10.7607V17.3489L14.593 14.0548Z"
            fill="#F6732F"
          />
        </svg>
      )}

      <span className="tooltiptext">
        This teacher is offering online lessons
      </span>
    </ToolTip>
  );
}

export default OnlineLesson;

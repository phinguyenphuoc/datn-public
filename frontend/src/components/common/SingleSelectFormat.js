import React from "react";
import styled from "styled-components";
import Select from "react-select";

const StyledSingleSelectFormat = styled(Select)`
  && {
    margin: 0 10px 1% 0;
    width: 47%;
    @media screen and (max-width: 500px) {
      width: 100%;
    }
    > div {
      border-radius: 4px;
      input {
        height: 30px !important;
      }
      .react-single-select__value-container {
        padding: 0px 10px;
        > div:last-child {
          padding: 0;
        }
      }
      .react-single-select__placeholder {
        color: #b5beec !important;
        font-size: 12px !important;
      }
      .react-single-select__single-value {
        font-size: 12px;
        text-transform: capitalize;
      }
      .react-single-select__indicator-separator {
        width: 0px;
      }
    }
    .react-single-select__menu {
      overflow: hidden !important;
      max-width: 400px !important;
      z-index: 999;
    }
    .react-single-select__option {
      color: rgba(8, 36, 135, 0.6);
      font-size: 12px;
      text-align: left;
      padding-left: 25px;
      text-transform: capitalize;
    }
    @media only screen and (max-width: 1100px) {
      width: 100%;
    }
  }
`;

function SingleSelectFormat(props) {
  return (
    <StyledSingleSelectFormat
      className="react-single-select-container"
      classNamePrefix="react-single-select"
      {...props}
      maxMenuHeight={500}
    />
  );
}

export default SingleSelectFormat;

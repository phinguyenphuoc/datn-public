import React from "react";
import styled from "styled-components";

const StyledLoading = styled.div`
  && {
    text-align: center;
    .loader {
      position: relative;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin: 44px;
      display: inline-block;
      vertical-align: middle;
    }

    /*LOADER-1*/

    .loader-1 .loader-outter {
      position: absolute;
      border: 4px solid #f6732f;
      border-left-color: transparent;
      border-bottom: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      -webkit-animation: loader-1-outter 1s cubic-bezier(0.42, 0.61, 0.58, 0.41)
        infinite;
      animation: loader-1-outter 1s cubic-bezier(0.42, 0.61, 0.58, 0.41)
        infinite;
    }

    .loader-1 .loader-inner {
      position: absolute;
      border: 4px solid #f6732f;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      left: calc(50% - 20px);
      top: calc(50% - 20px);
      border-right: 0;
      border-top-color: transparent;
      -webkit-animation: loader-1-inner 1s cubic-bezier(0.42, 0.61, 0.58, 0.41)
        infinite;
      animation: loader-1-inner 1s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite;
    }
    @-webkit-keyframes loader-1-outter {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }

    @keyframes loader-1-outter {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
    @keyframes loader-1-inner {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(-360deg);
        transform: rotate(-360deg);
      }
    }
  }
`;

function Loading(props) {
  return (
    <StyledLoading className="wrap_loading">
      <div className="loader loader-1">
        <div className="loader-outter"></div>
        <div className="loader-inner"></div>
      </div>
    </StyledLoading>
  );
}

export default Loading;

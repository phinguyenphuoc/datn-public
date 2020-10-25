import React from "react";
import styled from "styled-components";

const StyledBanner = styled.section`
  overflow: hidden;
  background-color: #f0f3ff;
  .banner__inner {
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    padding: 3% 15px 15px;
  }
  .banner__text {
    max-width: 600px;
    margin: 0 auto;
    h2 {
      font-size: 43px;
      margin-bottom: 8%;
    }
    p {
      font-size: 23px;
      color: #2842b6;
      line-height: 1.2;
    }
    h4 {
      font-size: 21px;
      color: #2842b6;
    }
  }
  @media only screen and (max-width: 850px) {
    .banner__text {
      width: 80%;
      h2 {
        font-size: 36px;
      }

      p {
        font-size: 20px;
      }
      h4 {
        font-size: 18px;
      }
    }
  }
  @media only screen and (max-width: 700px) {
    .banner__inner {
      background: none;
    }
    .banner__text {
      width: 100%;
    }
  }
`;

function Banner(props) {
  return (
    <StyledBanner>
      <div className="container">
        <div className="banner__inner">
          <div className="banner__text">
            <h2 className="fw-600">Privacy Policy</h2>
          </div>
        </div>
      </div>
    </StyledBanner>
  );
}

export default Banner;

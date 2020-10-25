import React from "react";
import styled from "styled-components";
import gauge from "../../assets/images/fill-gauge.svg";

const StyledGauge = styled.div`
  position: absolute;
  top: -51px;
  right: 40px;
  width: 121px;
  height: 121px;
  background: #08135a;
  border-radius: 100%;
  .gauge__img {
    position: absolute;
    top: 40%;
    transform: translate(-50%, -50%);
  }
  .hand {
    position: absolute;
    right: 12%;
    top: 12%;
    transform: rotate(${({ percent }) => 2.55 * percent - 157}deg);
    transform-origin: 50% 61%;
    path:nth-child(2) {
      fill: ${({ percent }) => {
        let color = "#F6732F";
        if (percent >= 70) {
          color = "#54C052";
        } else if (percent >= 60) {
          color = "#7eac49";
        } else if (percent >= 47) {
          color = "#a09b41";
        } else if (percent >= 38) {
          color = "#c38c3a";
        } else if (percent >= 25) {
          color = "#e57b32";
        }
        return color;
      }};
    }
  }
  .gauge__text {
    position: absolute;
    bottom: 13px;
    left: 50%;
    transform: translateX(-50%);

    h3 {
      color: #54c052;
      font-size: 18px;
      margin: 0;
      line-height: 20px;
    }
    p {
      color: #ffffff;
      font-size: 12px;
      margin: 0;
      line-height: 15px;
    }
  }
  @media only screen and (max-width: 720px) {
    width: 84px;
    height: 84px;
    right: 20px;
    top: -35px;
    .gauge__img {
      width: 65px;
    }
    .hand {
      width: 62px;
      top: 0%;
    }
    .gauge__text {
      bottom: 8px;
      h3 {
        font-size: 13px;
      }
      p {
        font-size: 9px;
        line-height: 6px;
      }
    }
  }
`;

function Gauge({ percent = 0 }) {
  return (
    <StyledGauge className="gauge" percent={percent}>
      <div>
        <img className="gauge__img" src={gauge} alt="gauge" />
        {/* <img className="hand" src={hand} alt="hand" /> */}
        <svg
          className="hand"
          xmlns="http://www.w3.org/2000/svg"
          width="90"
          height="69"
          viewBox="0 0 90 69"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M44.1929 35.0507C48.0328 34.5731 51.507 37.5211 51.9527 41.6353C52.3981 45.7492 49.6467 49.4716 45.8072 49.9492C41.9673 50.4271 38.4931 47.4788 38.0473 43.365C37.6016 39.2507 40.353 35.5283 44.1929 35.0507Z"
            fill="white"
          />
          <path
            className="change-fill"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M59.43 18.1658C59.9501 18.4813 60.1473 19.153 59.883 19.7103L48.326 44.0779C47.4752 45.8722 45.3108 46.5393 43.6354 45.5239C41.9596 44.5081 41.4879 42.2415 42.6129 40.6127L57.8917 18.5023C58.2408 17.9971 58.9096 17.8504 59.43 18.1658Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M45.3271 41.0101C46.1498 40.9147 46.8945 41.5042 46.9899 42.3272C47.0853 43.1499 46.4958 43.8944 45.6729 43.9898C44.8502 44.0854 44.1057 43.4957 44.0101 42.673C43.9147 41.85 44.5042 41.1057 45.3271 41.0101Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="34.1347"
              y1="-21.7756"
              x2="-22.8207"
              y2="31.5912"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#54C052" />
              <stop offset="1" stopColor="#F6732F" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="gauge__text">
        <h3>{percent}%</h3>
        <p>completed</p>
      </div>
    </StyledGauge>
  );
}

export default Gauge;

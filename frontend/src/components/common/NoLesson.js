import React from "react";
import styled from "styled-components";
import empty1 from "../../assets/images/nolesson1.svg";
import empty2 from "../../assets/images/nolesson2.svg";
import bg from "../../assets/images/bg-nolesson.svg";

const StyledNoLesson = styled.div`
  background: url(${bg}) no-repeat center/335px;
  height: 350px;
  position: relative;
  > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    .empty {
      margin-bottom: 5px;
      img:first-child {
        margin-right: 5px;
      }
    }
  }
  p {
    position: absolute;
    bottom: 17%;
    font-size: 21px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    color: rgba(8, 19, 90, 0.75);
    margin: 0;
  }
  @media only screen and (max-width: 450px) {
    background-size: 225px;
    height: 250px;
    > div {
      .empty {
        img:first-child {
          width: 30px;
        }
        img:last-child {
          width: 140px;
        }
      }
    }
    p {
      bottom: 19%;
      font-size: 16px;
    }
  }
`;

function NoLesson() {
  return (
    <StyledNoLesson className="NoLesson">
      <div>
        <div className="empty">
          <img src={empty1} alt="empty" />
          <img src={empty2} alt="empty" />
        </div>
        <div className="empty">
          <img src={empty1} alt="empty" />
          <img src={empty2} alt="empty" />
        </div>
        <div className="empty">
          <img src={empty1} alt="empty" />
          <img src={empty2} alt="empty" />
        </div>
      </div>
      <p>No lessons found</p>
    </StyledNoLesson>
  );
}

export default NoLesson;

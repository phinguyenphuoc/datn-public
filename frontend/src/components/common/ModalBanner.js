import React from "react";
import styled from "styled-components";
import bg from "../../assets/images/bg-modal.svg";

const StyledModalBanner = styled.div`
  && {
    .modal_header {
      background: #f2f4fd;
      height: 220px;
      padding: 0 5% 60px;
      position: relative;
      border-radius: 6px 6px 0 0;
      .modal_header__inner {
        background: url(${bg}) #f2f4fd no-repeat center / 96%;
        height: 100%;
        p {
          position: absolute;
          bottom: 0;
          font-size: 29px;
          text-align: center;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          margin-bottom: 24px;
          padding: 0 12px;
        }
      }
    }
    @media only screen and (max-width: 700px) {
      .modal_header {
        .modal_header__inner p {
          font-size: 24px;
        }
      }
    }
    @media only screen and (max-width: 550px) {
      .modal_header {
        height: 180px;
        .modal_header__inner p {
          font-size: 21px;
          line-height: 25px;
          margin-bottom: 20px;
        }
      }
    }
    @media only screen and (max-width: 450px) {
      .modal_header {
        height: 154px;
        padding: 0 5% 52px;
        .modal_header__inner p {
          font-size: 18px;
          line-height: 21px;
        }
      }
    }
  }
`;

function ModalBanner(props) {
  return (
    <StyledModalBanner>
      <div className="modal_header">
        <div className="modal_header__inner">
          <p>Welcome to your Personal Dashboard</p>
        </div>
      </div>
    </StyledModalBanner>
  );
}

export default ModalBanner;

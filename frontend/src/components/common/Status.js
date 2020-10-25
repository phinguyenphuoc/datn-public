import React from "react";
import styled from "styled-components";
import reschedule from "../../assets/images/reschedule.svg";
import cancelled from "../../assets/images/cancelled.svg";
import confirmed from "../../assets/images/confirmed.svg";

const StyledStatus = styled.div`
  && {
    width: 11%;
    height: auto;
    .status {
      border-radius: 4px;
      color: #fff;
      font-size: 9px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      img {
        width: 16px;
        height: 16px;
        margin: 0 auto 5px;
      }
      p {
        font-size: 9px;
        font-weight: 500;
        margin: 0;
        text-transform: capitalize;
      }
    }
    .rescheduled {
      background: #f6732f;
    }
    .booked {
      background: #54c052;
    }
    .cancelled {
      background: #dc3545;
    }
    @media only screen and (max-width: 1150px) {
      .status p {
        font-size: 8px;
      }
    }
    @media only screen and (max-width: 1000px) {
      width: 100%;
      .status {
        width: 100%;
        padding: 5px 10px;
        flex-direction: initial;
        justify-content: flex-start;
        img {
          margin: 0 5px 0 0;
        }
        p {
          font-size: 12px;
        }
      }
    }
    @media only screen and (max-width: 450px) {
      .status {
        p {
          font-size: 10px;
        }
      }
    }
  }
`;

function Status({ type = "" }) {
  return (
    <StyledStatus>
      {type === "rescheduled" && (
        <div className="status rescheduled">
          <img src={reschedule} alt="" />
          <p>{type}</p>
        </div>
      )}
      {type === "cancelled" && (
        <div className="status cancelled">
          <img src={cancelled} alt="" />
          <p>{type}</p>
        </div>
      )}
      {type === "booked" && (
        <div className="status booked">
          <img src={confirmed} alt="" />
          <p>confirmed</p>
        </div>
      )}
    </StyledStatus>
  );
}

export default Status;

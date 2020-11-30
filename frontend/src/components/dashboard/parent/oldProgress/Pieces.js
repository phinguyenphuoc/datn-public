import React from "react";
import styled from "styled-components";
import { Gauge } from "../../../common";
import music from "../../../../assets/images/music2.svg";
import { ThumbsUp, Bells } from "../../../common/icons";

const StyledPieces = styled.section`
  margin-bottom: auto;
  .pieces__inner {
    margin: 0 16px 30px;
    background: #ffffff;
    box-shadow: 0px 5px 25px rgba(98, 84, 232, 0.203944);
    border-radius: 4px;
    padding: 25px;
    color: #08135a;
    h4 {
      font-size: 14px;
      text-align: left;
      font-weight: bold;
      margin-bottom: 0;
    }
    > div:nth-child(2) {
      margin-top: 35px;
    }
    > div {
      margin-top: 70px;
    }
  }

  .--info {
    display: flex;
    .--music {
      background: #6254e8;
      border-radius: 4px 0px 0px 0px;
      width: 70px;
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 24px;
        height: 24px;
      }
    }
    .--time {
      background: #08135a;
      border-radius: 0px 4px 0px 0px;
      width: calc(100% - 70px);
      text-align: left;
      padding: 10px 20px;
      align-items: center;
      display: flex;
      p {
        color: #ffffff;
        font-size: 14px;
        font-weight: 500;
        margin: 0;
      }
    }
  }
  .pieces__item__header {
    position: relative;
  }
  .pieces__item__body {
    background: #f2f4fd;
    border-radius: 4px;
    display: flex;
    padding: 25px 0;
    > div {
      padding: 0 25px;
      width: 50%;
      h4 {
        margin-bottom: 20px;
      }
    }
    .pieces_item {
      display: flex;
      align-items: center;
      .--icon {
        background: #dce0f6;
        width: 80px;
        height: 80px;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        
      }
      .pieces__text {
        width: calc(100% - 80px);
        text-align: left;
        margin: 0 0 0 20px;
        p {
          line-height: 16px;
          margin: 0;
        }
      }
    }
    .good {
      border-right: 2px solid #b5beec;
      &__icon {
        color: #54c052;
      }
    }
  }
  @media only screen and (max-width: 1087px) {
    .pieces__item__body .pieces_item .pieces__text p {
      font-size: 11px;
  }
  }
  @media only screen and (max-width: 967px) {
    .pieces__item__body {
      padding: 0
      flex-direction: column;
      >div {
        width: calc(100% - 40px);
        padding: 15px 0px ;
        margin: 0 20px;
      }
      .good {
        border-bottom: 2px solid #b5beec;
        border-right: none;
      }
    }
  }
  @media only screen and (max-width: 720px) {
    .--info {
      .--music {
        width: 50px;
        height: 50px;
        img {
          width: 20px;
          height: 20px;
        }
      }
      .--time {
        width: calc(100% - 50px);
        p {
        font-size: 12px;
        }
      }
    }
  }
  @media only screen and (max-width: 626px) {
    .pieces__inner {
      margin: 0 0 30px;
    }
  }
  @media only screen and (max-width: 580px) {
    .pieces__inner {
      > div {
        margin-top: 55px;
      }
      > div:nth-child(2) {
        margin-top: 55px;
      }

    }
    .--info {
      .--music {
        display: none;
      }
      .--time {
        width: 100%;
        padding: 16px 20px;
        p {
          font-size: 10px;
          width: calc(100% - 100px);
        }
      }
    }
  }
  @media only screen and (max-width: 500px) {
    .pieces__item__body {
      > div {
        h4 {
          margin-bottom: 8px;
        }
      }
      .pieces_item {
        flex-direction: column;
        .pieces__text {
          width: 100%;
          text-align: left;
          margin: 0;
          p {
            font-size: 12px;
          }
        }
        .--icon {
          display: none;
        }
      }
    }
    .pieces__inner h4 {
      font-size: 13px;
      line-height: 14px;
    }
  }
`;

function Pieces({ dataProgressReport }) {
  return (
    <StyledPieces>
      <div className="container">
        <div className="pieces__inner">
          <h4>Pieces I am currently learning</h4>
          {dataProgressReport.pieces &&
            dataProgressReport.pieces.length &&
            dataProgressReport.pieces.map((item, index) => (
              <div className="pieces__item" key={index}>
                <div className="pieces__item__header">
                  <div className="--info">
                    <div className="--music">
                      <img src={music} alt="music" />
                    </div>
                    <div className="--time">
                      <p>{item.title}</p>
                    </div>
                  </div>
                  <Gauge percent={item.rate_percentage} />
                </div>
                <div className="pieces__item__body">
                  <div className="good">
                    <h4>What’s good ?</h4>
                    <div className="good__contain pieces_item">
                      <div className="good__icon --icon">
                        <ThumbsUp />
                      </div>
                      <div className="pieces__text">
                        <p>{item.good_comment}</p>
                      </div>
                    </div>
                  </div>
                  <div className="missing">
                    <h4>What’s missing ? </h4>
                    <div className="missing__contain pieces_item ">
                      <div className="missing__icon --icon">
                        <Bells />
                      </div>
                      <div className="pieces__text">
                        <p>{item.bad_comment}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </StyledPieces>
  );
}

export default Pieces;

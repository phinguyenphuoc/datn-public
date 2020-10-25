import React from "react";
import styled from "styled-components";
import Slider from "@material-ui/core/Slider";
import { FormGroup } from "../../../common";
import star from "../../../../assets/images/star.svg";
import music from "../../../../assets/images/music2.svg";

const StyledForm = styled.section`
  form {
    background: #ffffff;
    box-shadow: 0px 5px 25px rgba(98, 84, 232, 0.203944);
    border-radius: 4px;
    margin: 10px 15px 4%;
    padding: 25px;

    > div {
      background: #f2f4fd;
      border-radius: 4px;
      padding: 25px
      margin-bottom: 20px;
    }

    h4 {
      font-size: 14px;
      font-weight: 600;
    }
    h4,
    h5,
    p {
      text-align: left;
    }
    .checkbox-ratio {
      display: flex;
      max-width: 350px;
      justify-content: space-between;
      margin: 25px 0 15px;
      img {
        width: 24px;
        height: 24px;
        margin-right: 5px;
      }
    }
    .checkbox {
      display: flex;
      position: relative;
      padding-left: 28px;
      cursor: pointer;
      user-select: none;
      margin: 0 0 10px;
      align-items: center;
      .input_checkbox {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
        &:checked ~ .checkmark:after {
          display: block;
        }
        &:checked ~ .checkmark {
          background: #54c052;
          border: none;
        }
      }
      p {
        margin: 0;
      }
      .checkmark {
        position: absolute;
        left: 0;
        height: 20px;
        width: 20px;
        background-color: #fff;
        border: 2px solid #b5beec;
        border-radius: 100%;
        &:after {
          content: "";
          position: absolute;
          display: none;
          border: 2px solid #fff;
          border-radius: 100%;
          top: 3px;
          left: 3px;
          width: 14px;
          height: 14px;
        }
      }
    }
    textarea,
    input {
      font-size: 12px !important;
      padding: 8px 10px !important;
      resize: none;
      border-radius: 4px !important;
      border: 1px solid #b5beec;
      background: transparent !important;
      color: #08135a !important;
      &::placeholder {
        color: #b5beec !important;
      }
      &:focus {
        box-shadow: none;
        border-color: #b5beec;
      }
    }
    textarea {
      height: 115px;
    }
    h5 {
      font-size: 12px;
      font-weight: 600;
    }
    .piece {
      padding: 3% 0 0;
      > div {
        margin-bottom: 25px;
      }
      > div:first-child {
        position: relative;
        input {
          min-height: 36px;
          max-width: 340px;
        }
      }
      .complete-piece {
        margin-bottom: 50px;
      }
    }
  }
  .MuiSlider-root, .MuiSlider-rail, .MuiSlider-track  {
    height: 8px;
  }
  .MuiSlider-rail, .MuiSlider-track {
    border-radius: 4px;
  }
  .MuiSlider-root {
    &.--good {
      .MuiSlider-thumb {
        background-color: #54c052;
      }
      .MuiSlider-valueLabel span {
        color: #54c052;
      }
      

    }
    span:nth-child(5) {
      transform: translateX(0%) !important;
    }
    span:nth-child(5).--nomarkmax {
      display: none;
    }
    span:nth-child(7) {
      transform: translateX(-95%) !important;
    }
    span:nth-child(7).--nomark {
      display: none;
    }
    .MuiSlider-thumb {
      img {
        width: 24px;
      }
    }
    .MuiSlider-mark {
      width: 0;
    }
    .MuiSlider-track {
      background: linear-gradient(
        270deg,
        rgb(84, 192, 82) 3.86%,
        rgb(246, 115, 47) 99.4%
      );
    }
    .MuiSlider-thumb {
      background: url(${music}) #f6732f no-repeat center / 24px;
      height: 50px;
      width: 50px;
      margin-top: -20px;
      margin-left: -25px;
      "&:focus,&:hover,&$active": {
        box-shadow: inherit;
      }
    }
    .MuiSlider-valueLabel {
      left: calc(-50% + 34px);
      transform: scale(1) translateY(0px) !important;
      span {
        background: none;
        color: #f6732f;
        font-size: 18px;
        font-weight: 600;
      }
    }
    
    @media only screen and (max-width: 600px) {
      .MuiSlider-thumb {
        background-size: 15px;
        height: 35px;
        width: 35px;
        margin-top: -15px;
        margin-left: -17px;
      }
      .MuiSlider-valueLabel {
        left: calc(-50% + 20px);
        span {
          font-size: 16px;
        }
      }
    }
  }
  @media only screen and (max-width: 600px) {
    .checkbox-ratio {
      flex-direction: column;
    }
    form {
      padding: 15px;
      >div {
        padding: 15px;
      }
      margin: 10px 0px 4%;
      h4 {
        font-size: 12px;
      }
      p {
        font-size: 11px;
      }
      h5 {
        font-size: 11px;
      }
    }
  }
  @media only screen and (max-width: 350px) {
    form .piece > div:first-child input {
      font-size: 9px !important;
    }
  }
`;

const marks = [
  {
    value: 0,
    label: "0%",
  },
  {
    value: 100,
    label: "100%",
  },
];

const Form = ({ dataProgress }) => {
  function valuetext(value) {
    return `${value} %`;
  }
  return (
    <StyledForm>
      <div className="container">
        <form>
          <div>
            <h4>General progress of the student for this period of time:</h4>
            <div className="checkbox-ratio">
              <label className=" checkbox">
                <input
                  name="level"
                  type="radio"
                  className="input_checkbox"
                  checked={dataProgress.level === "moderato"}
                  value={"moderato"}
                  readOnly={true}
                />
                <span className="checkmark"></span>
                <p>Moderato</p>
              </label>
              <label className="checkbox">
                <input
                  name="level"
                  type="radio"
                  className="input_checkbox"
                  checked={dataProgress.level === "allegro"}
                  value={"allegro"}
                  readOnly={true}
                />
                <span className="checkmark"></span>
                <p>Allegro</p>
              </label>
              <label className="checkbox">
                <input
                  name="level"
                  type="radio"
                  className="input_checkbox"
                  checked={dataProgress.level === "presto"}
                  value={"presto"}
                  readOnly={true}
                />
                <span className="checkmark"></span>
                <p>Presto</p>
              </label>
            </div>
          </div>
          <div>
            <h4>
              How many stars does the student deserves for this music learning
              period?
            </h4>
            <p>
              This refers to student’s practice, behavior during the lessons…
            </p>
            <div className="checkbox-ratio">
              <label className="checkbox">
                <input
                  name="rating"
                  type="radio"
                  className="input_checkbox"
                  checked={dataProgress.rating === 1}
                  readOnly={true}
                  value={1}
                />
                <span className="checkmark"></span>
                <p>
                  <img src={star} alt="star" />
                </p>
              </label>
              <label className="checkbox">
                <input
                  name="rating"
                  type="radio"
                  className="input_checkbox"
                  checked={dataProgress.rating === 2}
                  value={2}
                  readOnly={true}
                />
                <span className="checkmark"></span>
                <p>
                  <img src={star} alt="star" />
                  <img src={star} alt="star" />
                </p>
              </label>
              <label className="checkbox">
                <input
                  name="rating"
                  type="radio"
                  className="input_checkbox"
                  checked={dataProgress.rating === 3}
                  value={3}
                  readOnly={true}
                />
                <span className="checkmark"></span>
                <p>
                  <img src={star} alt="star" />
                  <img src={star} alt="star" />
                  <img src={star} alt="star" />
                </p>
              </label>
            </div>
          </div>
          <div>
            <h4>
              Comments and tips you would share with your student for his
              improvement (500 characters max):
            </h4>
            <p>
              This general comment will be highlighted and appears on top of the
              progress report
            </p>
            <FormGroup
              propsInput={{
                type: "textarea",
                name: "comment",
                placeholder: "Give your student some feedbacks and tips…",
                value: dataProgress.comment,
                readOnly: true,
              }}
            />
          </div>
          <div>
            <h4>Pieces this student is currently working on (max 8)</h4>
            {dataProgress &&
              dataProgress.pieces &&
              dataProgress.pieces.map((item, index) => (
                <div className="piece" key={index}>
                  <div className="name-piece">
                    <div>
                      <h5>Name of the piece</h5>
                      <FormGroup
                        propsInput={{
                          name: "title",
                          placeholder: "Write here…",
                          value: item.title,
                          readOnly: true,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <h5 className="complete-piece">
                      How complete is the piece?
                    </h5>
                    <Slider
                      aria-label="pretto slider"
                      valueLabelDisplay="on"
                      marks={marks}
                      getAriaValueText={valuetext}
                      value={item.rate.value}
                      classes={{
                        root: item.rate.value >= 50 ? "--good" : "",
                        markLabel:
                          item.rate.value > 98
                            ? "--nomark"
                            : item.rate.value < 3
                            ? "--nomarkmax"
                            : "",
                      }}
                    />
                  </div>
                  <div>
                    <h5>What’s good? (500 characters max)</h5>
                    <FormGroup
                      propsInput={{
                        type: "textarea",
                        name: "good_comment",
                        placeholder: "Write here…",
                        value: item.good_comment,
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div>
                    <h5>What’s missing? (500 characters max)</h5>
                    <FormGroup
                      propsInput={{
                        type: "textarea",
                        name: "bad_comment",
                        placeholder: "Write here…",
                        value: item.bad_comment,
                        readOnly: true,
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </form>
      </div>
    </StyledForm>
  );
};

export default Form;

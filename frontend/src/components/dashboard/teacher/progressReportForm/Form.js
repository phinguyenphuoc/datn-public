import React from "react";
import styled from "styled-components";
import Slider from "@material-ui/core/Slider";
import { isEmpty } from "validator";
import moment from "moment";
import { useSelector } from "react-redux";
import { FormGroup } from "../../../common";
import star from "../../../../assets/images/star.svg";
import addfile from "../../../../assets/images/add-file.svg";
import music from "../../../../assets/images/music2.svg";
import RemoveIcon from "@material-ui/icons/Remove";

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
      background: transparent;
      color: #08135a !important;
      &::placeholder {
        color: #b5beec !important;
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
  .find {
    border: none;
    border-radius: 25px;
    padding: 3px 8px 3px 20px;
    font-size: 12px;
    color: #ffffff;
    line-height: 34px;
    font-weight: 500;
    transition: 0.3s ease;
    background: #f6732f;
    border-radius: 30px;
    margin: 10px 0;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 8px 0 #d69777;
    }
    &[disabled] {
      pointer-events: none;
      background: #868383;
      span {
        background: transparent;
      }
    }
    span {
      padding: 7px 7px;
      border-radius: 100%;
      max-height: 30px;
      max-width: 30px;
      margin-left: 5px;
      background: #db5f1e;
      img {
        margin-bottom: 3px;
        width: 16px;
        height: 12px;
      }
    }
  }
  .button-piece {
    background: #6254e8;
    &:hover {
      box-shadow: 0 4px 8px 0 #6556f8;
    }
    span {
      background: #3e32b6;
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
  .error {
    width: 100%;
    font-size: 12px;
    color: #dc3545;
    text-align: left;
  }
  .invalid-feedback {
    padding: 0 10px;
    text-align: left;
  }
  .bt-delete {
    position: absolute;
    top: 20px;
    right: 0px;
    background: #9f9f9f;
    color: #fff;
    border: none;
    border-radius: 100%;
    width: 37px;
    height: 37px;
    transition: 0.3s ease;
    @media (max-width: 500px) {
      width: 34px;
      height: 34px;
      top: -14px;
    }
    &:hover { 
      background: #626060;
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

const Form = ({ handleSubmit, dataStudentSelect }) => {
  const [error, setError] = React.useState({});
  const [form, setForm] = React.useState({
    level: "",
    rating: null,
    comment: "",
    listPieces: [
      {
        title: "",
        rate_percentage: 10,
        good_comment: "",
        bad_comment: "",
      },
    ],
  });
  const [errorLevel, setErrorLevel] = React.useState("");
  function valuetext(value) {
    return `${value} %`;
  }

  const storeProgressReport = useSelector(
    (store) => store.teacher.progressReport
  );
  const isSubmitting = storeProgressReport.loading;

  const handleSubmitForm = (event) => {
    event.preventDefault();
    let isValid = true;

    const errorState = validate();
    if (Object.keys(errorState).length > 0) {
      isValid = false;
      setError(errorState);
    }
    if (!form.level) {
      isValid = false;
      setErrorLevel("Please choose at least 1 option");
    }
    const pieces = {
      title: form.listPieces[0].title,
      rate_percentage: form.listPieces[0].rate_percentage,
      good_comment: form.listPieces[0].good_comment,
      bad_comment: form.listPieces[0].bad_comment,
    };
    const formData = {
      progress_report: {
        skill_id:
          dataStudentSelect &&
          dataStudentSelect.skills &&
          dataStudentSelect.skills[0].id,
        reported_date: moment().format("YYYY-MM-DD"),

        level: form.level,
        rating: parseInt(form.rating),
        comment: form.comment,
        ...pieces,
      },
    };
    if (isValid) {
      handleSubmit(formData);
    }
  };

  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.comment)) {
      errorState.comment = "Please fill out this field ";
    }
    const listPieces = {};
    form.listPieces.forEach((item, index) => {
      if (!item.title) {
        listPieces[`title-${index}`] = "Name of the piece is required ";
      }
      if (!item.good_comment) {
        listPieces[`good_comment-${index}`] = "Please fill out this field ";
      }
      if (!item.bad_comment) {
        listPieces[`bad_comment-${index}`] = "Please fill out this field ";
      }
    });
    if (Object.keys(listPieces).length) {
      errorState.listPieces = listPieces;
    }

    return errorState;
  };

  const handleCheckboxLevel = (event) => {
    setForm({
      ...form,
      level: event.target.value,
    });
    setErrorLevel("");
  };


  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleFocus = (event) => {
    setError({
      ...error,
      [event.target.name]: "",
    });
  };

  const handleAddChildren = (e) => {
    e.preventDefault();
    const listPieces = [
      ...form.listPieces,
      {
        title: "",
        rate_percentage: 10,
        good_comment: "",
        bad_comment: "",
      },
    ];
    setForm({ ...form, listPieces });
  };

  const handleDeleteChildren = (index) => (e) => {
    e.preventDefault();
    const listPieces = form.listPieces;
    listPieces.splice(index, 1);
    setForm({ ...form, listPieces });
  };

  const handleChangeInputChildren = (index) => (e) => {
    e.preventDefault();
    let pieceData = [...form.listPieces].splice(index, 1)[0];
    pieceData[e.target.name] = e.target.value;
    const listPieces = form.listPieces.map((item, itemIndex) =>
      itemIndex === index ? pieceData : item
    );
    setForm({ ...form, listPieces });
  };

  const handleChangePiece = (index) => (e, value) => {
    e.preventDefault();
    let pieceData = [...form.listPieces].splice(index, 1)[0];
    pieceData.rate_percentage = value;
    const listPieces = form.listPieces.map((item, itemIndex) =>
      itemIndex === index ? pieceData : item
    );
    setForm({ ...form, listPieces });
  };

  const handleFocusInput = () => {
    setError({
      ...error,
      listPieces: {},
    });
  };
  return (
    <StyledForm>
      <div className="container">
        <form onSubmit={handleSubmitForm}>
          <div>
            <h4>General progress of the student for this period of time:</h4>
            <div className="checkbox-ratio">
              <label className=" checkbox">
                <input
                  name="level"
                  type="radio"
                  className="input_checkbox"
                  onChange={handleCheckboxLevel}
                  checked={form.level === "moderato"}
                  value={"moderato"}
                />
                <span className="checkmark"></span>
                <p>Moderato</p>
              </label>
              <label className="checkbox">
                <input
                  name="level"
                  type="radio"
                  className="input_checkbox"
                  onChange={handleCheckboxLevel}
                  checked={form.level === "allegro"}
                  value={"allegro"}
                />
                <span className="checkmark"></span>
                <p>Allegro</p>
              </label>
              <label className="checkbox">
                <input
                  name="level"
                  type="radio"
                  className="input_checkbox"
                  onChange={handleCheckboxLevel}
                  checked={form.level === "presto"}
                  value={"presto"}
                />
                <span className="checkmark"></span>
                <p>Presto</p>
              </label>
            </div>
            <div className="error">{errorLevel}</div>
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
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.comment,
                disabled: isSubmitting,
                maxLength: "500",
              }}
              error={error.comment}
            />
          </div>
          <div>
            <h4>Pieces this student is currently working on (max 8)</h4>
            {!!form.listPieces.length && (
              <div>
                {form.listPieces.map((item, index) => {
                  const errorMessage =
                    error.listPieces && error.listPieces[`title-${index}`]
                      ? error.listPieces[`title-${index}`]
                      : "";
                  const errorMessageGoodComment =
                    error.listPieces &&
                      error.listPieces[`good_comment-${index}`]
                      ? error.listPieces[`good_comment-${index}`]
                      : "";
                  const errorMessagebadComment =
                    error.listPieces && error.listPieces[`bad_comment-${index}`]
                      ? error.listPieces[`bad_comment-${index}`]
                      : "";
                  return (
                    <div key={`piece__item-${index}`}>
                      <div>
                        <div className="piece">
                          <div className="name-piece">
                            <div>
                              <h5>Name of the piece</h5>
                              <FormGroup
                                propsInput={{
                                  name: "title",
                                  placeholder: "Write here…",
                                  onChange: handleChangeInputChildren(index),
                                  onFocus: handleFocusInput,
                                  value: item.title,
                                  disabled: isSubmitting,
                                }}
                                error={errorMessage}
                              />
                            </div>
                            {index > 0 && (
                              <button
                                className="bt-delete"
                                onClick={handleDeleteChildren(index)}
                              >
                                <RemoveIcon />
                              </button>
                            )}
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
                              onChange={handleChangePiece(index)}
                              value={item.rate_percentage}
                              classes={{
                                root:
                                  item.rate_percentage >= 50 ? "--good" : "",
                                markLabel:
                                  item.rate_percentage > 98
                                    ? "--nomark"
                                    : item.rate_percentage < 3
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
                                onChange: handleChangeInputChildren(index),
                                onFocus: handleFocusInput,
                                value: item.good_comment,
                                disabled: isSubmitting,
                                maxLength: "500",
                              }}
                              error={errorMessageGoodComment}
                            />
                          </div>
                          <div>
                            <h5>What’s missing? (500 characters max)</h5>
                            <FormGroup
                              propsInput={{
                                type: "textarea",
                                name: "bad_comment",
                                placeholder: "Write here…",
                                onChange: handleChangeInputChildren(index),
                                onFocus: handleFocusInput,
                                value: item.bad_comment,
                                disabled: isSubmitting,
                                maxLength: "500",
                              }}
                              error={errorMessagebadComment}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {/* <button
              className="find button-piece"
              onClick={handleAddChildren}
              disabled={isSubmitting}
            >
              Add a piece{" "}
              <span>
                <img src={addfile} alt="addfile" />
              </span>
            </button> */}
          </div>
          <button className="find" disabled={isSubmitting}>
            Send the progress report{" "}
            <span>
              <img src={addfile} alt="addfile" />
            </span>
          </button>
        </form>
      </div>
    </StyledForm>
  );
};

export default Form;

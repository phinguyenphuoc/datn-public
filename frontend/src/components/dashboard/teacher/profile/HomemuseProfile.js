import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Form } from "reactstrap";
import { isEmpty } from "validator";
import { components } from "react-select";
import { FormGroup } from "../../../common";
import AvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
import save from "../../../../assets/images/save.svg";
import addfile from "../../../../assets/images/add-file.svg";
import Slider from "@material-ui/core/Slider";
import avatar from "../../../../assets/images/avatar-picture.svg";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import zoom from "../../../../assets/images/zoom.svg";
import { OPTIONS_LANGUAGES } from "../../../../utils/constants";

const StyledHomemuseProfile = styled.section`
  .form-info {
    color: #08135a;
    padding: 30px 20px 10px;
    .form__item {
      float: left;
      width: 50%;
      text-align: left;
    }
    h2 {
      text-align: left;
      font-size: 24px;
      line-height: 20px;
      font-weight: 600;
      margin: 0 10px 15px 10px;
    }
    h2.have-border {
      padding-top: 20px;
      border-top: 1px solid rgba(181, 190, 236, 0.8);
    }
    h3 {
      margin: 0 10px;
      font-size: 12px;
      font-weight: 600;
      text-align: left;
    }
    .form-group {
      margin: 0 10px 15px;
      input,
      textarea {
        font-size: 12px;
        padding: 8px 10px;
        &::placeholder {
          color: #b5beec;
        }
      }
      input {
        min-height: 36px;
      }
      input.teaching_experience {
        width: 100px;
      }
    }
    .form__about-me {
      display: flex;
    }
    .form__about-me.bg-and-ep {
      margin-bottom: 20px;
      .form-group {
        margin: 0 10px 5px;
      }
    }
    .form__lessons {
      display: flex;
      .price {
        display: flex;
        margin: 0 11px 5px;
        height: 36px;
        p {
          margin: 7px 5px;
          font-size: 12px;
        }
        .form-group {
          width: 50%;
          margin: 0 0 0 20px;
        }
      }
      .form__item {
        margin-bottom: 15px;
      }
      .form__item.lesson-type {
        display: flex;
        input {
          width: 100px;
        }
      }
      .link_zoom {
        display: flex;
        align-items: baseline;
        .zoom_img {
          width: 40px;
          height: 9px;
        }
        span {
          color: #54c052;
          font-weight: 500;
          text-shadow: 0 0;
          margin: 0 3px;
        }
      }
    }
    .form__lessons.trial__lesson {
      display: block;
      margin-bottom: 20px;
    }
    .react-select__control {
      border-radius: 4px;
      min-height: 34px;
      padding: 0;
    }

    .react-select__menu h3,
    .react-select__control .react-select__multi-value__label {
      font-size: 14px !important;
    }
    .react-select__placeholder {
      font-size: 12px !important;
      padding-left: 0px !important;
      color: #b5beec;
    }
    .react-select__value-container {
      padding: 0px 10px !important;
      > div:last-child {
        margin: 0;
        padding-bottom: 0;
        padding-top: 0;
      }
      .react-single-select__input,
      .react-select__input {
        height: 34px;
      }
    }
    .react-select__option {
      color: #08135a !important;
      font-size: 12px !important;
    }
    .reactselect__indicator-separator {
      width: 0px;
    }
    .react-select__indicator {
      padding: 7px;
    }
    .react-select__control .react-select__multi-value {
      padding: 1px 23px 1px 16px;
      margin: 2px 10px 2px 0;
      text-transform: capitalize;
    }
    .react-select__control .react-select__multi-value__label {
      padding: 1px;
      font-size: 12px !important;
    }
    .form__medias {
      width: 100%;
      margin-bottom: 20px;
      max-width: 350px;
    }
    @media only screen and (max-width: 750px) {
      .form__lessons {
        display: block;
        .form__item {
          float: inherit;
          width: 100%;
        }
      }
    }
    @media only screen and (max-width: 500px) {
      padding: 30px 10px 10px;
      .form__about-me {
        display: block;
        .form__item {
          float: inherit;
          width: 100%;
        }
      }
      .form__lessons .form__item.lesson-type {
        display: block;
      }
    }
  }

  .find {
    border: none;
    padding: 3px 8px 3px 20px;
    font-size: 12px;
    color: #ffffff;
    line-height: 34px;
    font-weight: 500;
    transition: 0.3s ease;
    background: #54c052;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 8px 0 #2d972b;
    }
    &[disabled] {
      background: #717272;
      pointer-events: none;
      span {
        background: #4d4d4d;
      }
    }
    span {
      padding: 7px 7px;
      border-radius: 100%;
      margin-left: 5px;
      background: #2d972b;
      display: inline-flex;
      img {
        width: 16px;
        height: 16px;
      }
    }
  }
  .checkbox {
    display: block;
    position: relative;
    padding-left: 35px;
    cursor: pointer;
    user-select: none;
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
    .checkmark {
      position: absolute;
      top: 7px;
      left: 0;
      height: 20px;
      width: 20px;
      background-color: #fff;
      border: 2px solid #b5beec;
      &:after {
        content: "";
        position: absolute;
        display: none;
        border: 2px solid #fff;
        top: 3px;
        left: 3px;
        width: 14px;
        height: 14px;
      }
    }
  }
  .invalid-feedback {
    text-align: left;
    padding: 0 12px;
  }
  .price .invalid-feedback {
    position: relative;
    left: calc(-100% - 35px);
    width: calc(200% + 35px);
    background-color: white;
  }
  .error {
    color: #dc3545;
    font-size: 12px;
    padding: 0 0px 0 22px;
    text-align: left;
  }
  .photo {
    margin-bottom: 25px;
    position: relative;
    background: #f2f4fd;
    border: 1px dashed #b5beec;
    border-radius: 4px;
    padding: 20px 10px;
    margin: 0 10px 10px;
    h3 {
      text-align: center;
    }
    p {
      margin: 5px;
    }
    canvas {
      width: 240px !important;
      height: 240px !important;
    }
    .input_file {
      margin: 0 auto;
      display: block !important;
      position: absolute;
      left: 50%;
      bottom: 57px;
      transform: translateX(-61%);
      opacity: 0;
      cursor: pointer;
      height: 50px;
    }
    .support-file {
      font-size: 10px;
      color: #b5beec;
      font-weight: 400;
      line-height: 14px;
    }
    .add_file {
      padding: 3px 6px 3px 27px;
      line-height: 34px;
      font-weight: 500;
      background: #6254e8;
      border-radius: 30px;
      border: none;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      &: hover {
        transform: none;
        box-shadow: none;
      }
      &[disabled] {
        background: #717272;
        pointer-events: none;
        span {
          background: #4d4d4d;
        }
      }
      span {
        padding: 9px 9px;
        border-radius: 100%;
        margin-left: 9px;
        background: #3e32b6;
        display: inline-flex;
        img {
          height: 12px;
        }
      }
    }
    .zoom {
      display: flex;
      width: 240px;
      margin: 0 auto;
      p {
        margin: 3px 12px 3px 0;
        font-weight: 400;
      }
    }
    @media only screen and (max-width: 400px) {
      canvas {
        width: 210px !important;
        height: 210px !important;
      }
      .zoom {
        width: 210px;
      }
    }
    @media only screen and (max-width: 370px) {
      .zoom {
        width: 80%;
      }
    }
  }
`;

const StyledErrorPanel = styled.div`
  padding-left: 25px;
  color: #dc3545;
  font-size: 12px;
  text-align: left;
  span {
    margin-left: 10px;
    vertical-align: middle;
  }
`;

function HomemuseProfile({
  handleSubmit,
  setOpenModalZoom,
  isHasConferencingTools,
}) {
  const storeTeacherProfile = useSelector((store) => store.teacher.profile);
  const storeTeacherUpdateProfile = useSelector(
    (store) => store.teacher.updateProfile
  );
  const isSubmitting = storeTeacherUpdateProfile.loading;
  const [errorlessonType, setErrorlessonType] = React.useState("");
  const [errorProfilePicture, setErrorProfilePicture] = React.useState("");
  const [error, setError] = React.useState({});
  const [scale, setScale] = React.useState(1);
  const [form, setForm] = React.useState({
    pickUpLine: "",
    about: "",
    instruments: [],
    languages: [{ value: "English", label: "English" }],
    visible_30: false,
    visible_45: false,
    visible_60: false,
    trialLesson: false,
    pricePer30: "",
    pricePer45: "",
    pricePer60: "",
    distance: "",
    background1: "",
    background2: "",
    background3: "",
    experience1: "",
    experience2: "",
    experience3: "",
    teaching_experience: "",
    teachingTrialDiscount: 0,
    in_person: false,
    online: false,
    image: storeTeacherProfile.data.avatar || avatar,
    nameImage:
      storeTeacherProfile.data.medias &&
        storeTeacherProfile.data.medias.length &&
        storeTeacherProfile.data.medias[0].name
        ? storeTeacherProfile.data.medias[0].name
        : "default_avatar.jpg",
  });

  const storeInstruments = useSelector(
    (store) => store.instruments.data.instruments
  );

  const optionInstruments = storeInstruments
    ? storeInstruments.map((item, index) => {
      return {
        value: item.name,
        label: item.name.charAt(0).toUpperCase() + item.name.slice(1),
      };
    })
    : [];

  const isConferencingTools =
    storeTeacherProfile.data &&
    storeTeacherProfile.data.conferencing_tools &&
    storeTeacherProfile.data.conferencing_tools.includes("zoom");

  React.useEffect(() => {
    let visible_30 = false;
    let pricePer30 = "";
    let visible_45 = false;
    let pricePer45 = "";
    let visible_60 = false;
    let pricePer60 = "";
    storeTeacherProfile.data.pricings.forEach((item) => {
      if (item.duration === "30_min" && item.visible === true) {
        visible_30 = item.visible;
        pricePer30 = item.net_price;
      }
      if (item.duration === "45_min" && item.visible === true) {
        visible_45 = item.visible;
        pricePer45 = item.net_price;
      }
      if (item.duration === "60_min" && item.visible === true) {
        visible_60 = item.visible;
        pricePer60 = item.net_price;
      }
    });

    const background =
      storeTeacherProfile.data.background &&
        storeTeacherProfile.data.background.length >= 3
        ? storeTeacherProfile.data.background
        : ["", "", ""];
    const experience =
      storeTeacherProfile.data.experience &&
        storeTeacherProfile.data.experience.length >= 3
        ? storeTeacherProfile.data.experience
        : ["", "", ""];
    const in_person =
      storeTeacherProfile.data.teaching_type &&
        storeTeacherProfile.data.teaching_type.data &&
        storeTeacherProfile.data.teaching_type.data.length &&
        storeTeacherProfile.data.teaching_type.data.includes("in-person")
        ? true
        : false;
    const online =
      storeTeacherProfile.data.teaching_type &&
        storeTeacherProfile.data.teaching_type.data &&
        storeTeacherProfile.data.teaching_type.data.length &&
        storeTeacherProfile.data.teaching_type.data.includes("online")
        ? true
        : false;
    setForm({
      ...form,
      pickUpLine: storeTeacherProfile.data.pickup_line || "",
      about: storeTeacherProfile.data.about || "",
      trialLesson:
        storeTeacherProfile.data.teaching_trial_discount &&
          storeTeacherProfile.data.teaching_trial_discount.data === "50"
          ? true
          : false,
      instruments:
        storeTeacherProfile.data.skills.map((item) => ({
          label: item.instrument,
          value: item.instrument,
        })) || [],
      languages:
        storeTeacherProfile.data.teaching_language &&
          storeTeacherProfile.data.teaching_language.data
          ? storeTeacherProfile.data.teaching_language.data.map((item) => ({
            label: item,
            value: item,
          }))
          : [{ value: "English", label: "English" }],
      visible_30,
      pricePer30,
      visible_45,
      pricePer45,
      visible_60,
      pricePer60,
      background1: background[0],
      background2: background[1],
      background3: background[2],
      experience1: experience[0],
      experience2: experience[1],
      experience3: experience[2],
      distance:
        storeTeacherProfile.data.teaching_distance &&
          storeTeacherProfile.data.teaching_distance.data
          ? storeTeacherProfile.data.teaching_distance.data
          : "",
      teaching_experience:
        storeTeacherProfile.data.teaching_experience &&
          storeTeacherProfile.data.teaching_experience.data
          ? storeTeacherProfile.data.teaching_experience.data
          : "",
      in_person,
      online,
      image: storeTeacherProfile.data.avatar || form.image,
      nameImage:
        storeTeacherProfile.data.medias.length &&
          storeTeacherProfile.data.medias[0].name
          ? storeTeacherProfile.data.medias[0].name
          : "default_avatar.jpg",
    });
    setScale(1);
    // eslint-disable-next-line
  }, [storeTeacherProfile]);

  const imageRef = React.useRef(null);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    let isValid = true;
    const errorState = validate();
    if (!form.in_person && !form.online) {
      isValid = false;
      setErrorlessonType("Please choose at least 1 lesson type");
    }
    if (form.image === avatar) {
      isValid = false;
      setErrorProfilePicture("Please add a profile picture");
    }
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }
    const instruments = form.instruments.map((item) => item.value);
    let instrumentsRemoved = [];
    storeTeacherProfile.data.skills.forEach((item) => {
      if (!instruments.includes(item.instrument)) {
        return instrumentsRemoved.push({ id: item.id, _destroy: "1" });
      }
    });
    const languages = form.languages.map((item) => item.value);
    let languagesRemoved = [];
    if (
      storeTeacherProfile.data.teaching_language &&
      storeTeacherProfile.data.teaching_language.data
    ) {
      storeTeacherProfile.data.teaching_language.data.forEach((item) => {
        if (!languages.includes(item)) {
          return languagesRemoved.push({ id: item.id, _destroy: "1" });
        }
      });
    }
    let teaching_type = [];
    if (form.in_person === true && form.online === true) {
      teaching_type = ["in-person", "online"];
    } else if (form.in_person === true) {
      teaching_type = ["in-person"];
    } else if (form.online === true) {
      teaching_type = ["online"];
    }
    const pricings = [
      {
        net_price: form.pricePer60,
        duration: "60_min",
        visible: form.visible_60,
      },
      {
        net_price: form.pricePer45,
        duration: "45_min",
        visible: form.visible_45,
      },
      {
        net_price: form.pricePer30,
        duration: "30_min",
        visible: form.visible_30,
      },
    ];

    const formData = {
      profile: {
        pickup_line: form.pickUpLine,
        about: form.about,
        background: [form.background1, form.background2, form.background3],
        experience: [form.experience1, form.experience2, form.experience3],
        teaching_distance: form.distance,
        teaching_experience: form.teaching_experience,
        teaching_type,
        teaching_trial_discount: form.trialLesson ? 50 : 0,
        skills: [
          ...form.instruments.map((item) => ({
            instrument: item.value,
          })),
          ...instrumentsRemoved,
        ],
        teaching_language: [
          ...form.languages.map((item) => item.value),
          ...instrumentsRemoved,
        ],
        pricings: pricings.filter((pricing) => pricing.net_price !== ""),
        medias: [
          {
            name: form.nameImage,
            tag: "avatar",
            data: imageRef.current.getImageScaledToCanvas().toDataURL(),
          },
        ],
      },
    };
    if (isValid) {
      handleSubmit(formData);
    }
  };

  const validate = () => {
    const errorState = {};
    // check validate

    if (isEmpty(form.pickUpLine)) {
      errorState.pickUpLine = "Pick up line is required ";
    }
    if (isEmpty(form.about)) {
      errorState.about = "Intro is required ";
    }
    if (
      !(
        (form.visible_30 && form.pricePer30) ||
        (form.visible_45 && form.pricePer45) ||
        (form.visible_60 && form.pricePer60)
      )
    ) {
      errorState.price = "Please set at least 1 price";
    } else if (
      (form.visible_30 && !form.pricePer30) ||
      (form.visible_45 && !form.pricePer45) ||
      (form.visible_60 && !form.pricePer60)
    ) {
      errorState.price = "Please enter price for selected durations";
    }
    if (
      isEmpty(form.background1) ||
      isEmpty(form.background2) ||
      isEmpty(form.background3)
    ) {
      errorState.background = "Please fill out all Background fields";
    }
    if (
      isEmpty(form.experience1) ||
      isEmpty(form.experience2) ||
      isEmpty(form.experience3)
    ) {
      errorState.experience = "Please fill out all Experience fields";
    }
    if (!form.instruments || form.instruments.length === 0) {
      errorState.instruments = "At least one instrument is required ";
    }
    return errorState;
  };

  const handleChange = (event) => {
    if (
      [
        "pricePer30",
        "pricePer45",
        "pricePer60",
        "distance",
        "teaching_experience",
      ].includes(event.target.name)
    ) {
      event.target.value = Math.abs(event.target.value);
    }
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleFocus = (event) => {
    let name = event.target.name;
    if (name.includes("experience") && !name.includes("_experience")) {
      name = "experience";
    } else if (name.includes("background")) {
      name = "background";
    } else if (name.includes("price")) {
      name = "price";
    }

    setError({
      ...error,
      [name]: "",
    });
  };

  const handleStringTrim = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value.trim() });
  };

  const handleChangeInstruments = (value) => {
    setForm({ ...form, instruments: value });
  };

  const handleFocusInstruments = () => {
    setError({
      ...error,
      instruments: "",
    });
  };

  const handleChangeLanguages = (value) => {
    setForm({ ...form, languages: value ? value : [] });
  };

  const handleFocusLanguages = () => {
    setError({
      ...error,
      languages: "",
    });
  };
  const handleCheckbox = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCheckboxLessonType = (event) => {
    const { name, checked } = event.target;
    if (name === "online" && checked && !isHasConferencingTools) {
      // open popup
      return setOpenModalZoom(true);
    }
    setForm({
      ...form,
      [event.target.name]: event.target.checked,
    });
    setErrorlessonType("");
  };

  const handleDrop = (dropped) => {
    setForm({
      ...form,
      image: dropped[0],
      nameImage: dropped[0].name,
    });
    setErrorProfilePicture("");
  };

  const handleChangeScale = (e, value) => {
    setScale(value);
  };
  return (
    <StyledHomemuseProfile>
      <Form className="form-info" onSubmit={handleSubmitForm}>
        <h2>About me</h2>
        <div className="form__about-me">
          <div className="form__item pick-up">
            <h3>Pick-up line (50 characters max)</h3>
            <FormGroup
              propsInput={{
                name: "pickUpLine",
                placeholder: "Ex: I am looking forward to teaching you!",
                onChange: handleChange,
                onFocus: handleFocus,
                onBlur: handleStringTrim,
                value: form.pickUpLine,
                disabled: isSubmitting,
                maxLength: "50",
              }}
              error={error.pickUpLine}
            />
          </div>
        </div>
        <div className="form__intro">
          <h3>Intro (300 characters max)</h3>
          <FormGroup
            propsInput={{
              name: "about",
              type: "textarea",
              placeholder:
                "Students will read your profile to get a sense of who you are as a teacher and as a person. You'll want to mention your experience and teaching philosophies, but don't forget to include a few notes about your personality and teaching style. ",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.about,
              disabled: isSubmitting,
              maxLength: "300",
            }}
            error={error.about}
          />
        </div>
        <div className="form__about-me">
          <div className="form__item instrument">
            <h3>Instruments</h3>
            <FormGroup
              propsInput={{
                name: "instruments",
                placeholder: "Instruments",
                onChange: handleChangeInstruments,
                onFocus: handleFocusInstruments,
                value: form.instruments,
                options: optionInstruments,
              }}
              variant="MutiSelect"
              error={error.instruments}
            />
          </div>
          <div className="form__item instrument">
            <h3>languages</h3>
            <FormGroup
              propsInput={{
                name: "languages",
                placeholder: "languages",
                onChange: handleChangeLanguages,
                onFocus: handleFocusLanguages,
                value: form.languages,
                options: OPTIONS_LANGUAGES,
                components: {
                  MultiValueLabel: (props) => {
                    return (
                      <div className="option-language">
                        <i className={`flag flag--${props.data.value}`} />
                        <components.MultiValueLabel {...props} />
                      </div>
                    );
                  },
                },
              }}
              variant="MutiSelect"
              error={error.languages}
            />
          </div>
        </div>
        <div className="form__about-me bg-and-ep">
          <div className="background wrap form__item">
            <h3>Background (130 characters max)</h3>
            <FormGroup
              propsInput={{
                name: "background1",
                placeholder: "Tell something about your background.",
                onChange: handleChange,
                onFocus: handleFocus,
                onBlur: handleStringTrim,
                value: form.background1,
                disabled: isSubmitting,
                maxLength: "130",
              }}
              error={error.background}
              showErrorMessage={false}
            />
            <FormGroup
              propsInput={{
                name: "background2",
                placeholder: "Tell something about your background.",
                onChange: handleChange,
                onFocus: handleFocus,
                onBlur: handleStringTrim,
                value: form.background2,
                disabled: isSubmitting,
                maxLength: "130",
              }}
              error={error.background}
              showErrorMessage={false}
            />
            <FormGroup
              propsInput={{
                name: "background3",
                placeholder: "Tell something about your background.",
                onChange: handleChange,
                onFocus: handleFocus,
                onBlur: handleStringTrim,
                value: form.background3,
                disabled: isSubmitting,
                maxLength: "130",
              }}
              error={error.background}
            />
          </div>
          <div className="experience wrap form__item">
            <h3>Experience (130 characters max)</h3>
            <FormGroup
              propsInput={{
                name: "experience1",
                placeholder: "Tell something about your experience.",
                onChange: handleChange,
                onFocus: handleFocus,
                onBlur: handleStringTrim,
                value: form.experience1,
                disabled: isSubmitting,
                maxLength: "130",
              }}
              error={error.experience}
              showErrorMessage={false}
            />
            <FormGroup
              propsInput={{
                name: "experience2",
                placeholder: "Tell something about your experience.",
                onChange: handleChange,
                onFocus: handleFocus,
                onBlur: handleStringTrim,
                value: form.experience2,
                disabled: isSubmitting,
                maxLength: "130",
              }}
              error={error.experience}
              showErrorMessage={false}
            />
            <FormGroup
              propsInput={{
                name: "experience3",
                placeholder: "Tell something about your experience.",
                onChange: handleChange,
                onFocus: handleFocus,
                onBlur: handleStringTrim,
                value: form.experience3,
                disabled: isSubmitting,
                maxLength: "130",
              }}
              error={error.experience}
            />
          </div>
        </div>
        <h2 className="have-border">Lessons</h2>
        <div className="form__lessons">
          <div className="form__item">
            <div className="form__item__inner">
              <h3>Durations & prices</h3>
              <label className="price checkbox">
                <input
                  checked={form.visible_30}
                  type="checkbox"
                  className="input_checkbox"
                  name="visible_30"
                  onChange={handleCheckbox}
                />
                <span className="checkmark"></span>
                <p>30 minutes</p>
                <FormGroup
                  propsInput={{
                    name: "pricePer30",
                    type: "number",
                    placeholder: "$75",
                    onChange: handleChange,
                    onFocus: handleFocus,
                    value: form.pricePer30,
                    disabled: isSubmitting,
                    min: 0,
                  }}
                  error={error.price}
                  showErrorMessage={false}
                />
              </label>
              <label className="price checkbox">
                <input
                  checked={form.visible_45}
                  type="checkbox"
                  className="input_checkbox"
                  name="visible_45"
                  onChange={handleCheckbox}
                />
                <span className="checkmark"></span>
                <p>45 minutes</p>
                <FormGroup
                  propsInput={{
                    name: "pricePer45",
                    type: "number",
                    placeholder: "$75",
                    onChange: handleChange,
                    onFocus: handleFocus,
                    value: form.pricePer45,
                    disabled: isSubmitting,
                    min: 0,
                  }}
                  error={error.price}
                  showErrorMessage={false}
                />
              </label>
              <label className="price checkbox">
                <input
                  checked={form.visible_60}
                  type="checkbox"
                  className="input_checkbox"
                  name="visible_60"
                  onChange={handleCheckbox}
                />
                <span className="checkmark"></span>
                <p>60 minutes</p>
                <FormGroup
                  propsInput={{
                    name: "pricePer60",
                    type: "number",
                    placeholder: "$75",
                    onChange: handleChange,
                    onFocus: handleFocus,
                    value: form.pricePer60,
                    disabled: isSubmitting,
                    min: 0,
                  }}
                  error={error.price}
                />
              </label>
            </div>
          </div>
          <div className="form__item lesson-type">
            <div className="form__item__inner">
              <h3>Lesson type</h3>
              <label className="price checkbox">
                <input
                  checked={form.in_person}
                  type="checkbox"
                  className="input_checkbox"
                  name="in_person"
                  onChange={handleCheckboxLessonType}
                />
                <span className="checkmark"></span>
                <p>In-person</p>
              </label>
              <label className="price checkbox">
                <input
                  checked={form.online}
                  type="checkbox"
                  className="input_checkbox"
                  name="online"
                  onChange={handleCheckboxLessonType}
                />
                <span className="checkmark"></span>
                {/* {isConferencingTools ? (
                  <p className="link_zoom">
                    Online <span>Account linked with</span>{" "}
                    <img src={zoom} alt="zoom" className="zoom_img" />
                  </p>
                ) : (
                  <p>Online</p>
                )} */}
                <p>Online</p>
              </label>
              {isConferencingTools && (<p className="link_zoom">
                <span>Account linked with</span>{" "}
                <img src={zoom} alt="zoom" className="zoom_img" />
              </p>)}
              <div className="error">{errorlessonType}</div>
            </div>
          </div>
        </div>
        <h2 className="have-border">Medias</h2>
        <div className="form__medias">
          <div className="photo-and-video">
            <h3>Profile picture</h3>
            <div className="photo">
              <h3>Drag and drop files here</h3>
              <Dropzone
                onDrop={handleDrop}
                noClick
                noKeyboard
                style={{ width: "300px", height: "300px" }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <AvatarEditor
                      ref={imageRef}
                      width={300}
                      height={300}
                      image={form.image}
                      scale={scale}
                      crossOrigin="anonymous"
                    />
                    <div className="zoom">
                      <p>Zoom:</p>
                      <Slider
                        value={scale}
                        onChange={handleChangeScale}
                        aria-labelledby="range-slider"
                        min={1}
                        max={2}
                        step={0.01}
                      />
                    </div>
                    <p>OR</p>
                    <button className="add_file" disabled={isSubmitting}>
                      Add a file
                      <span>
                        <img src={addfile} alt="addfile" />
                      </span>
                    </button>
                    <input {...getInputProps()} className="input_file" />
                    <div className="support-file">
                      Supported files <br />
                      .png, .jpg, .svg
                    </div>
                  </div>
                )}
              </Dropzone>
            </div>
            {/* <div className="error">{errorProfilePicture}</div> */}
          </div>
        </div>
        {(Object.keys(error).length > 0 ||
          errorProfilePicture !== "" ||
          errorlessonType !== "") && (
            <StyledErrorPanel>
              {Object.keys(error).map((errorName, index) => {
                return error[errorName] !== "" ? (
                  <div key={index}>
                    <ErrorOutlineIcon />
                    <span>{error[errorName]}</span>
                  </div>
                ) : (
                    " "
                  );
              })}
              {errorProfilePicture && (
                <div>
                  <ErrorOutlineIcon />
                  <span>{errorProfilePicture}</span>
                </div>
              )}
              {errorlessonType && (
                <div>
                  <ErrorOutlineIcon />
                  <span>{errorlessonType}</span>
                </div>
              )}
            </StyledErrorPanel>
          )}
        <button className="find" disabled={isSubmitting}>
          Save my changes
          <span>
            <img src={save} alt="save" />
          </span>
        </button>
      </Form>
    </StyledHomemuseProfile>
  );
}

export default HomemuseProfile;

import React from "react";
import { useSelector } from "react-redux";
import { ModalHeader, ModalBody, Form } from "reactstrap";
import {
  OPTIONS_LEVEL,
  LESSONTYPES,
} from "../../utils/constants";
import { Modal, FormBox } from "../common";

const ModalJoin = ({ isOpen, handleToggle, handleSubmit, data }) => {
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

  const convertedInstruments = optionInstruments
    ? optionInstruments.reduce(
      (options, item) => ({ ...options, [item.value]: item.label }),
      {}
    )
    : [];
  const optionsInstruments = data.skills
    ? data.skills.map((skill) => {
      return {
        value: skill.instrument_id,
        label: convertedInstruments[skill.instrument],
      };
    })
    : [];

  const convertedLessonTypes = LESSONTYPES.reduce(
    (options, item) => ({ ...options, [item.value.toString()]: item.label }),
    {}
  );
  const optionsLessonTypes =
    data.teaching_type && data.teaching_type.data
      ? (data.teaching_type.data.length > 1 ? [LESSONTYPES[0]] : []).concat(
        data.teaching_type.data.map((item) => ({
          value: item,
          label: convertedLessonTypes[item],
        }))
      )
      : LESSONTYPES;

  const storeStudentRegister = useSelector((store) => store.student.register);
  const isSubmitting = storeStudentRegister.loading;

  const FORM_DATA_ITEMS = {
    lessonType: [],
    instrument: "",
    level: "",
    duration: ""
  };

  const [error, setError] = React.useState({});
  const [form, setForm] = React.useState(FORM_DATA_ITEMS);

  React.useEffect(() => {
    // Reset select when close modal
    if (!isOpen) {
      setError({});
      setForm(FORM_DATA_ITEMS);
    }
    /* eslint-disable */
  }, [isOpen]);

  React.useEffect(() => {
    if (storeStudentRegister.error.errors) {
      setError({
        ...error,
        email: storeStudentRegister.error.errors,
      });
    } else {
      setError({
        ...error,
        email: "",
      });
    }
  }, [storeStudentRegister.error]);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const errorState = validate();

    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }

    const formData = {
      teacher_profile_id: data.id,
      lessonType: form.lessonType,
      instrument: form.instrument,
      level: form.level,
      duration: form.duration,
      price: form.duration,
      description: form.description
    };
    handleSubmit(formData);
  };

  const validate = () => {
    const errorState = {};
    // check validate
    if (!form.lessonType || form.lessonType.length === 0) {
      errorState.lessonType = "Lesson type is required ";
    }
    if (!form.instrument) {
      errorState.instrument = "Instrument type is required ";
    }
    if (!form.level) {
      errorState.level = "Level type is required ";
    }
    if (!form.duration) {
      errorState.duration = "Duration type is required ";
    }
    return errorState;
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleStringTrim = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value.trim() });
  };

  const handleChangeLessonTypes = (lessonType) => {
    setForm({ ...form, lessonType: lessonType.value });
  };

  const handleFocusLessonTypes = () => {
    setError({
      ...error,
      lessonType: "",
    });
  };

  const handleFocusInstrument = () => {
    setError({
      ...error,
      instrument: "",
    })
  }

  const handleFocusLevel = () => {
    setError({
      ...error,
      level: "",
    })
  }

  const handleFocusDuration = () => {
    setError({
      ...error,
      duration: "",
    })
  }

  const handleChangeLevel = (level) => {
    setForm({ ...form, level: level.value });
  }

  const handleChangeDuration = (duration) => {
    setForm({ ...form, duration: duration.value });
  }

  const handleChangeInstrument = (instrument) => {
    setForm({ ...form, instrument: instrument.value });
  }

  const durations = data?.pricings ? data.pricings.map(item => {
    return {
      value: item.id,
      label: item.duration.split("_").join(" ")
    }
  }) : [];

  return (
    <Modal
      isOpen={isOpen}
      toggle={handleToggle}
      wrapClassName="wrap-modalJoin"
      id="modal-contact"
      centered
    >
      <ModalHeader
        toggle={handleToggle}
      >{`Contact ${data.first_name}`}</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmitForm}>
          <div className="instrument-and-level">
            <FormBox
              propsInput={{
                name: "lessontypes",
                onChange: handleChangeLessonTypes,
                onFocus: handleFocusLessonTypes,
                // value: form.lessonType,
                options: optionsLessonTypes,
                isDisabled: isSubmitting,
              }}
              variant="SingleSelectLabel"
              error={error.lessonType}
            />
            <FormBox
              propsInput={{
                name: "instrument",
                placeholder: "Instrument",
                onChange: handleChangeInstrument,
                // value: item.instrument,
                onFocus: handleFocusInstrument,
                options: optionsInstruments,
                isDisabled: isSubmitting,
              }}
              variant="SingleSelectInstrument"
              className="--instrument"
              // showErrorMessage={false}
              error={error.instrument}
            />
            <FormBox
              propsInput={{
                name: "level",
                placeholder: "Level",
                onChange: handleChangeLevel,
                // value: form.level,
                onFocus: handleFocusLevel,
                options: OPTIONS_LEVEL,
                isDisabled: isSubmitting,
              }}
              variant="SingleSelect"
              className="--level"
              // showErrorMessage={false}
              error={error.level}
            />
            <FormBox
              propsInput={{
                name: "duration",
                placeholder: "Duration",
                onChange: handleChangeDuration,
                // value: form.duration,
                onFocus: handleFocusDuration,
                options: durations,
                isDisabled: isSubmitting,
              }}
              variant="SingleSelect"
              className="--level"
              // showErrorMessage={false}
              error={error.duration}
            />
          </div>
          <FormBox
            propsInput={{
              type: "textarea",
              name: "description",
              onChange: handleChange,
              onBlur: handleStringTrim,
              value: form.info,
              invalid: false,
              placeholder:
                "Tell us more about you (background, experience, hobbies...)",
              disabled: isSubmitting,
            }}
            label="Your message"
          />
          <div className="modal__button">
            <button
              className="fw-500"
              color="primary"
              disabled={isSubmitting}
              className="button button--primary"
            >
              Send message
            </button>{" "}
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ModalJoin;

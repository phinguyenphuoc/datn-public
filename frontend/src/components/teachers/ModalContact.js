import React from "react";
import { useSelector } from "react-redux";
import { isEmpty, isEmail } from "validator";
import { ModalHeader, ModalBody, Form } from "reactstrap";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import {
  OPTIONS_CLASSES,
  OPTION_ONLY_ME,
  OPTION_ONLY_CHILDREN,
  OPTION_ME_AND_CHILDREN,
  OPTIONS_LEVEL,
  LESSONTYPES,
} from "../../utils/constants";
import { Modal, FormBox } from "../common";
import {
  formatPhoneNumber,
  getPhoneNumberOnlyDigits,
} from "../../utils/helpers";

const ModalJoin = ({ isOpen, handleToggle, handleSubmit }) => {
  const FORM_DATA_ITEMS = {
    firstName: "",
    lastName: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    zip: "",
    phoneNumber: "",
    info: "",
    beneficiary: [],
    lessonType: [],
    listStudents: [],
  };

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

  const storeStudentRegister = useSelector((store) => store.student.register);
  const isSubmitting = storeStudentRegister.loading;

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
    const list_students = [];
    form.listStudents.map((item) => {
      if (item.roles.includes("parent")) {
        return list_students.push({
          roles: item.roles,
          name: form.firstName,
          age: item.age,
          instrument: item.instrument.value,
          level:
            item.level && item.level.value
              ? item.level.value
              : OPTIONS_LEVEL[0].value,
        });
      } else {
        return list_students.push({
          roles: item.roles,
          name: item.name,
          age: item.age,
          instrument: item.instrument.value,
          level:
            item.level && item.level.value
              ? item.level.value
              : OPTIONS_LEVEL[0].value,
        });
      }
    });
    const formData = {
      user: {
        login: form.email,
      },
      profil: {
        first_name: form.firstName,
        last_name: form.lastName,
        phone: getPhoneNumberOnlyDigits(form.phoneNumber),
        address: [form.address1, form.address2, form.city, form.zip],
      },
      extra: {
        beneficiary: form.beneficiary.value,
        lesson_type: form.lessonType.value,
        info: form.info,
      },
      list_students,
    };
    handleSubmit(formData);
  };

  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.firstName)) {
      errorState.firstName = "First name is required ";
    }
    if (isEmpty(form.lastName)) {
      errorState.lastName = "Last name is required ";
    }
    if (!isEmail(form.email)) {
      errorState.email = "Email is required ";
    }
    if (isEmpty(form.city)) {
      errorState.city = "City is required ";
    }
    if (isEmpty(form.address1)) {
      errorState.address1 = "Address 1 is required ";
    }
    if (isEmpty(form.zip)) {
      errorState.zip = "Zip is required ";
    }
    if (isEmpty(form.phoneNumber)) {
      errorState.phoneNumber = "Phone number is required ";
    }
    if (!form.beneficiary || form.beneficiary.length === 0) {
      errorState.beneficiary = "Who will be talking classes is required ";
    }
    if (!form.lessonType || form.lessonType.length === 0) {
      errorState.lessonType = "Lesson type is required ";
    }

    const listStudents = {};
    form.listStudents.forEach((item, index) => {
      const isParent = item.roles.includes("parent");

      if (isParent && (!item.age || !item.instrument.value)) {
        listStudents[`error-${index}`] = "Age and Instrument  are required";
      } else if (
        !isParent &&
        (!item.name || !item.age || !item.instrument.value)
      ) {
        listStudents[`error-${index}`] =
          "Name, Age and Instrument are required";
      }
    });
    if (Object.keys(listStudents).length) {
      errorState.listStudents = listStudents;
    }

    return errorState;
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

  const handleStringTrim = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value.trim() });
  };

  const handleChangeNumber = (e) => {
    const phoneNumber = e.target.value;
    if (phoneNumber.length > 14) {
      return;
    } else if (phoneNumber.length === 4) {
      return setForm({ ...form, phoneNumber });
    }
    setForm({ ...form, phoneNumber: formatPhoneNumber(phoneNumber) });
  };

  const handleChangebeneficiary = (beneficiaryObject) => {
    let listStudents = [];
    if (beneficiaryObject.value === OPTION_ONLY_ME) {
      listStudents = [
        {
          roles: ["parent", "student"],
          name: "",
          age: "",
          instrument: [],
          level: [],
        },
      ];
    } else if (beneficiaryObject.value === OPTION_ME_AND_CHILDREN) {
      listStudents = [
        {
          roles: ["parent", "student"],
          name: "",
          age: "",
          instrument: [],
          level: [],
        },
        {
          roles: ["student"],
          name: "",
          age: "",
          instrument: [],
          level: [],
        },
      ];
    } else if (beneficiaryObject.value === OPTION_ONLY_CHILDREN) {
      listStudents = [
        {
          roles: ["student"],
          name: "",
          age: "",
          instrument: [],
          level: [],
        },
      ];
    }
    setForm({ ...form, beneficiary: beneficiaryObject, listStudents });
  };

  const handleFocusbeneficiary = () => {
    setError({
      ...error,
      beneficiary: "",
    });
  };

  const handleChangeLessonTypes = (lessonType) => {
    setForm({ ...form, lessonType: lessonType });
  };

  const handleFocusLessonTypes = () => {
    setError({
      ...error,
      lessonType: "",
    });
  };

  const handleAddChildren = (e) => {
    e.preventDefault();
    const listStudents = [
      ...form.listStudents,
      {
        roles: ["student"],
        name: "",
        age: "",
        instrument: [],
        level: [],
      },
    ];
    setForm({ ...form, listStudents });
  };

  const handleDeleteChildren = (index) => (e) => {
    e.preventDefault();
    const listStudents = form.listStudents;
    listStudents.splice(index, 1);
    setForm({ ...form, listStudents });
  };

  const handleChangeInputChildren = (index) => (e) => {
    e.preventDefault();
    if (e.target.name === "age") {
      e.target.value = Math.abs(e.target.value);
    }
    let studentData = [...form.listStudents].splice(index, 1)[0];
    studentData[e.target.name] = e.target.value;
    const listStudents = form.listStudents.map((item, itemIndex) =>
      itemIndex === index ? studentData : item
    );

    setForm({ ...form, listStudents });
  };

  const handleStringTrimChildren = (index) => (e) => {
    e.preventDefault();
    let studentData = [...form.listStudents].splice(index, 1)[0];
    studentData[e.target.name] = e.target.value.trim();
    const listStudents = form.listStudents.map((item, itemIndex) =>
      itemIndex === index ? studentData : item
    );

    setForm({ ...form, listStudents });
  };

  const handleChangeInstrumentChildren = (index) => (instrumentObject) => {
    let studentData = [...form.listStudents].splice(index, 1)[0];
    studentData.instrument = instrumentObject;
    const listStudents = form.listStudents.map((item, itemIndex) =>
      itemIndex === index ? studentData : item
    );
    setForm({ ...form, listStudents });
  };

  const handleChangeLevel = (index) => (levelObject) => {
    let studentData = [...form.listStudents].splice(index, 1)[0];
    studentData.level = levelObject;
    const listStudents = form.listStudents.map((item, itemIndex) =>
      itemIndex === index ? studentData : item
    );
    setForm({ ...form, listStudents });
  };

  const handleFocusInput = () => {
    setError({
      ...error,
      listStudents: {},
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={handleToggle}
      wrapClassName="wrap-modalJoin"
      id="modal-contact"
      centered
    >
      <ModalHeader toggle={handleToggle}>Find me a teacher</ModalHeader>
      <ModalBody>
        <p className="text--large">Register today by filling out this form.</p>
        <p className=" text--large margin-b-xl primary">
          We will do our best to find you a great teacher soon!
        </p>
        <Form onSubmit={handleSubmitForm}>
          <div className="modal__input">
            <div className="modal__input__item">
              <FormBox
                propsInput={{
                  name: "firstName",
                  onChange: handleChange,
                  onFocus: handleFocus,
                  onBlur: handleStringTrim,
                  value: form.firstName,
                  disabled: isSubmitting,
                }}
                error={error.firstName}
                variant="InputLabel"
                label="First name"
              />
              <FormBox
                propsInput={{
                  name: "lastName",
                  onChange: handleChange,
                  onFocus: handleFocus,
                  onBlur: handleStringTrim,
                  value: form.lastName,
                  disabled: isSubmitting,
                }}
                error={error.lastName}
                variant="InputLabel"
                label="Last name"
              />
            </div>
            <div className="modal__input__item">
              <FormBox
                propsInput={{
                  name: "phoneNumber",
                  placeholder: "Ex: 123465789",
                  onChange: handleChangeNumber,
                  onFocus: handleFocus,
                  value: form.phoneNumber,
                  disabled: isSubmitting,
                }}
                error={error.phoneNumber}
                variant="InputLabel"
                label="Phone number"
              />
              <FormBox
                propsInput={{
                  name: "email",
                  placeholder: "Ex: my@email.com",
                  onChange: handleChange,
                  onFocus: handleFocus,
                  onBlur: handleStringTrim,
                  value: form.email,
                  disabled: isSubmitting,
                }}
                error={error.email}
                variant="InputLabel"
                label="Email"
              />
            </div>
            <div className="modal__input__item">
              <FormBox
                propsInput={{
                  name: "address1",
                  onChange: handleChange,
                  onFocus: handleFocus,
                  onBlur: handleStringTrim,
                  value: form.address1,
                  disabled: isSubmitting,
                }}
                error={error.address1}
                variant="InputLabel"
                label="Address 1"
              />
              <FormBox
                propsInput={{
                  name: "address2",
                  onChange: handleChange,
                  onFocus: handleFocus,
                  onBlur: handleStringTrim,
                  value: form.address2,
                  disabled: isSubmitting,
                }}
                error={error.address2}
                variant="InputLabel"
                label="Address 2"
              />
            </div>
            <div className="modal__input__item">
              <FormBox
                propsInput={{
                  name: "city",
                  onChange: handleChange,
                  onFocus: handleFocus,
                  onBlur: handleStringTrim,
                  value: form.city,
                  disabled: isSubmitting,
                }}
                error={error.city}
                variant="InputLabel"
                label="City"
              />
              <FormBox
                propsInput={{
                  name: "zip",
                  onChange: handleChange,
                  onFocus: handleFocus,
                  onBlur: handleStringTrim,
                  value: form.zip,
                  disabled: isSubmitting,
                }}
                error={error.zip}
                variant="InputLabel"
                label="ZIP"
              />
            </div>
            <div className="modal__input__item --beneficiary">
              <FormBox
                propsInput={{
                  name: "beneficiary",
                  onChange: handleChangebeneficiary,
                  onFocus: handleFocusbeneficiary,
                  value: form.beneficiary,
                  options: OPTIONS_CLASSES,
                  isDisabled: isSubmitting,
                }}
                variant="SingleSelectLabel"
                label="Who will be taking classes?"
                error={error.beneficiary}
              />
              <FormBox
                propsInput={{
                  name: "lessontypes",
                  onChange: handleChangeLessonTypes,
                  onFocus: handleFocusLessonTypes,
                  value: form.lessonType,
                  options: LESSONTYPES,
                  isDisabled: isSubmitting,
                }}
                variant="SingleSelectLabel"
                label="Lesson type"
                error={error.lessonType}
              />
            </div>
          </div>

          {!!form.listStudents.length && (
            <div className="beneficiary__inner">
              {form.listStudents.map((item, index) => {
                const isParent = item.roles.includes("parent");
                const errorMessage =
                  error.listStudents && error.listStudents[`error-${index}`]
                    ? error.listStudents[`error-${index}`]
                    : "";
                return (
                  <div
                    className="beneficiary__item"
                    key={`beneficiary__item-${index}`}
                  >
                    <div>
                      <div className="name-and-age">
                        <FormBox
                          propsInput={{
                            name: "name",
                            placeholder: isParent
                              ? "First name"
                              : form.beneficiary.value === OPTION_ONLY_CHILDREN
                              ? `Child N. ${index + 1} Name`
                              : `Child N. ${index} Name`,
                            value: isParent ? form.firstName : item.name,
                            disabled: isParent || isSubmitting,
                            onChange: handleChangeInputChildren(index),
                            onFocus: handleFocusInput,
                            onBlur: handleStringTrimChildren(index),
                          }}
                          error={errorMessage}
                          showErrorMessage={false}
                          className="--name"
                        />
                        <FormBox
                          propsInput={{
                            type: "number",
                            name: "age",
                            placeholder: "Age",
                            onChange: handleChangeInputChildren(index),
                            onFocus: handleFocusInput,
                            value: item.age,
                            disabled: isSubmitting,
                            min: 0,
                          }}
                          className="--age"
                          showErrorMessage={false}
                          error={errorMessage}
                        />
                      </div>
                      <div className="instrument-and-level">
                        <FormBox
                          propsInput={{
                            name: "instument",
                            placeholder: "Instrument",
                            onChange: handleChangeInstrumentChildren(index),
                            value: item.instrument,
                            onFocus: handleFocusInput,
                            options: optionInstruments,
                            isDisabled: isSubmitting,
                          }}
                          variant="SingleSelectInstrument"
                          className="--instrument"
                          showErrorMessage={false}
                          error={errorMessage}
                        />
                        <FormBox
                          propsInput={{
                            name: "level",
                            placeholder: "Level",
                            onChange: handleChangeLevel(index),
                            value: item.level,
                            onFocus: handleFocusInput,
                            options: OPTIONS_LEVEL,
                            isDisabled: isSubmitting,
                          }}
                          variant="SingleSelect"
                          className="--level"
                          showErrorMessage={false}
                          error={errorMessage}
                        />
                      </div>
                      {/* actions */}
                      {!isParent && (
                        <div className="bt-group">
                          {form.listStudents.length - 1 === index && (
                            <button
                              className="bt-add"
                              onClick={handleAddChildren}
                            >
                              <AddIcon />
                            </button>
                          )}
                          {((index > 1 &&
                            form.beneficiary.value ===
                              OPTION_ME_AND_CHILDREN) ||
                            (index > 0 &&
                              form.beneficiary.value ===
                                OPTION_ONLY_CHILDREN)) && (
                            <button
                              className="bt-delete"
                              onClick={handleDeleteChildren(index)}
                            >
                              <RemoveIcon />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="error">{errorMessage}</div>
                  </div>
                );
              })}
            </div>
          )}
          <FormBox
            propsInput={{
              type: "textarea",
              name: "info",
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
          {error !== "" && (
            <div className="error__panel">
              {Object.keys(error).map((errorName, index) => {
                return error[errorName] !== "" ? (
                  <div key={index}>
                    {errorName === "listStudents" ? (
                      Object.keys(error[errorName]).map(
                        (studentItem, index) => {
                          return (
                            <div key={index}>
                              <ErrorOutlineIcon />
                              <span>{error[errorName][studentItem]}</span>
                            </div>
                          );
                        }
                      )
                    ) : (
                      <>
                        <ErrorOutlineIcon />
                        <span>{error[errorName]}</span>
                      </>
                    )}
                  </div>
                ) : (
                  " "
                );
              })}
            </div>
          )}
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

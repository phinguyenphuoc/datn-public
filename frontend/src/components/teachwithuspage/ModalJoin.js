import React from "react";
import { useSelector } from "react-redux";
import { isEmpty, isEmail } from "validator";
import { ModalHeader, ModalBody, Form } from "reactstrap";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { getInstruments } from "../../redux/actions/instruments";

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
    instruments: [],
  };

  const [error, setError] = React.useState({});
  const [form, setForm] = React.useState(FORM_DATA_ITEMS);

  const storeInstruments = useSelector(
    (store) => store.instruments.data.instruments
  );

  const optionInstruments = storeInstruments
    ? storeInstruments.map((item, index) => {
      return {
        value: item.id,
        label: item.name.charAt(0).toUpperCase() + item.name.slice(1),
      };
    })
    : [];

  React.useEffect(() => {
    if (!storeInstruments) {
      getInstruments();
    }
  }, [storeInstruments]);

  React.useEffect(() => {
    // Reset select when close modal
    if (!isOpen) {
      setError({});
      setForm(FORM_DATA_ITEMS);
    }
    /* eslint-disable */
  }, [isOpen]);

  const storeTeacherRegister = useSelector((store) => store.teacher.register);
  const isSubmitting = storeTeacherRegister.loading;

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const errorState = validate();

    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }

    // submit
    const formData = {
      user: {
        email: form.email,
      },
      profile: {
        first_name: form.firstName,
        last_name: form.lastName,
        phone: getPhoneNumberOnlyDigits(form.phoneNumber),
        address: [form.address1, form.city, form.zip],
      },
      skillset: form.instruments.map((item) => ({
        instrument: item.value,
      })),
    };
    handleSubmit(formData);
  };

  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.lastName)) {
      errorState.lastName = "Last name is required ";
    }
    if (isEmpty(form.firstName)) {
      errorState.firstName = "First name is required ";
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

  const handleChangeInstruments = (value) => {
    setForm({ ...form, instruments: value });
  };

  const handleFocusInstruments = () => {
    setError({
      ...error,
      instruments: "",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={handleToggle}
      wrapClassName="wrap-modalJoin"
      id="modal-join-our-team"
    >
      <ModalHeader toggle={handleToggle}>Join Platform today</ModalHeader>
      <ModalBody>
        <div className="modal__text">
          <p className="text--large">
            We are looking for talented, highly-motivated and dynamic music
            teachers! Sounds like you? <br /> Go ahead and fill out this form
          </p>
        </div>
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
                error={error.email || storeTeacherRegister.error.errors}
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
                label="Address"
              />
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
            </div>
          </div>
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
          <FormBox
            propsInput={{
              name: "instruments",
              placeholder: "Instruments",
              onChange: handleChangeInstruments,
              onFocus: handleFocusInstruments,
              value: form.instruments,
              options: optionInstruments,
              isDisabled: isSubmitting,
            }}
            variant="MutiSelect"
            error={error.instruments}
            label="Instruments"
          />
          {error !== "" && (
            <div className="error__panel">
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

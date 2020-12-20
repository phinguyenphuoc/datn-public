import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FormBox } from "../common";
import { Form as ReForm } from "reactstrap";
import { isEmpty, isEmail } from "validator";
import {
  formatPhoneNumber,
  getPhoneNumberOnlyDigits,
} from "../../utils/helpers";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const Form = ({ handleSubmit }) => {
  const [error, setError] = React.useState({});
  const [form, setForm] = React.useState({
    email: "",
    password: "",
    lastName: "",
    firstName: "",
    phoneNumber: "",
    city: "",
    address: "",
    zip: ""
  });
  const [errorLogin, setErrorLogin] = React.useState();

  const storeLogin = useSelector((store) => store.login);
  const isSubmitting = storeLogin.loadingSignUp;

  React.useEffect(() => {
    if (storeLogin.error) {
      setErrorLogin(storeLogin.error.message);
    }
  }, [storeLogin]);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const errorState = validate();

    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }

    const formData = {
      email: form.email,
      password: form.password,
      lastName: form.lastName,
      firstName: form.firstName,
      city: form.city,
      address: form.address,
      zip: form.zip,
      phoneNumber: form.phoneNumber
    };

    handleSubmit(formData);
  };

  const validate = () => {
    const errorState = {};
    // check validate
    if (!isEmail(form.email)) {
      errorState.email = "Wrong email";
    }
    if (isEmpty(form.password)) {
      errorState.password = "Wrong password";
    }
    if (isEmpty(form.lastName)) {
      errorState.lastName = "Last name is required ";
    }
    if (isEmpty(form.firstName)) {
      errorState.firstName = "First name is required ";
    }
    if (isEmpty(form.city)) {
      errorState.city = "City is required ";
    }
    if (isEmpty(form.address)) {
      errorState.address = "Address is required ";
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
    setForm({ ...form, [event.target.name]: event.target.value.trim() });
  };

  const handleFocus = (event) => {
    setError({
      ...error,
      [event.target.name]: "",
    });
    setErrorLogin("");
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

  return (
    <section onSubmit={handleSubmitForm} className="login">
      <div className="login__inner" style={{ maxWidth: "550px" }}>
        <ReForm className="radius-l login__inner__form">
          <span className="icon-note-double"></span>
          <span className="icon-note"></span>
          <span className="icon-note note-large"></span>
          <div className="login__inner__form__text">
            <p>Sign up and become our member</p>
            <div className="error">{errorLogin}</div>
          </div>
          <div className="modal__input">
            <div className="modal__input__item flex-justify-between">
              <FormBox
                propsInput={{
                  name: "email",
                  placeholder: "Email",
                  onChange: handleChange,
                  onFocus: handleFocus,
                  value: form.email,
                  disabled: isSubmitting,
                }}
                variant="InputLabel"
                error={error.email}
                label="Email"
              />
              <FormBox
                propsInput={{
                  type: "password",
                  name: "password",
                  placeholder: "Password",
                  onChange: handleChange,
                  onFocus: handleFocus,
                  value: form.password,
                  disabled: isSubmitting,
                }}
                variant="InputLabel"
                error={error.password}
                label="Password"
              />
            </div>
            <div className="modal__input__item flex-justify-between">
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
            <div className="modal__input__item flex-justify-between">
              <FormBox
                propsInput={{
                  name: "phoneNumber",
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
                  name: "address",
                  onChange: handleChange,
                  onFocus: handleFocus,
                  value: form.address,
                  disabled: isSubmitting,
                }}
                error={error.address}
                variant="InputLabel"
                label="Address"
              />
            </div>
            <div className="modal__input__item flex-justify-between">
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
          </div>
          <button disabled={isSubmitting} className="button button--secondary">
            Sign Up
          </button>
        </ReForm>
      </div>
    </section>
  );
};

export default Form;

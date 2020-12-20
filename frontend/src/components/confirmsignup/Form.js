import React from "react";
import { useSelector } from "react-redux";
import { FormBox } from "../common";
import { Form as ReForm } from "reactstrap";
import { isEmpty, isEmail } from "validator";

const Form = ({ handleSubmit, handleFocus, loading, error }) => {
  const storeLogin = useSelector((store) => store.login);
  const defaultEmail = storeLogin.emailSignUp;
  const isSubmitting = loading;
  const [form, setForm] = React.useState({ email: defaultEmail, authCode: "" });

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const errorState = validate();

    const formData = {
      email: form.email,
      authCode: form.authCode,
    };

    handleSubmit(formData);
  };

  const validate = () => {
    const errorState = {};
    // check validate
    if (!isEmail(form.email)) {
      errorState.email = "Wrong email";
    }
    if (isEmpty(form.authCode)) {
      errorState.authCode = "Wrong authCode";
    }
    return errorState;
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value.trim() });
  };

  return (
    <section onSubmit={handleSubmitForm} className="login">
      <div className="login__inner">
        <ReForm className="radius-l login__inner__form">
          <span className="icon-note-double"></span>
          <span className="icon-note"></span>
          <span className="icon-note note-large"></span>
          <div className="login__inner__form__text">
            <p>Sign up and become our member</p>
            <div className="error">{error}</div>
          </div>

          <FormBox
            propsInput={{
              name: "email",
              placeholder: "Email",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.email,
              disabled: isSubmitting,
            }}
            error={error.email}
          />

          <FormBox
            propsInput={{
              type: "authCode",
              name: "authCode",
              placeholder: "Auth Code",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.authCode,
              disabled: isSubmitting,
            }}
            error={error.authCode}
          />
          <button disabled={isSubmitting} className="button button--secondary">
            Confirm
          </button>
        </ReForm>
      </div>
    </section>
  );
};

export default Form;

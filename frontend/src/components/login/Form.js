import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FormBox } from "../common";
import { Form as ReForm } from "reactstrap";
import { isEmpty, isEmail } from "validator";
import ReactGA from "react-ga";

const Form = ({ handleSubmit, errorMessage }) => {
  const [error, setError] = React.useState({});
  const [form, setForm] = React.useState({ email: "", password: "" });
  const [errorLogin, setErrorLogin] = React.useState();

  const storeLogin = useSelector((store) => store.login);
  const isSubmitting = storeLogin.loading;

  const handleSubmitForm = async (event) => {
    ReactGA.event({
      category: "Navigation",
      action: "Navigation to Dashboard at Login Page",
      label: "Click 'Login Button'",
    });

    event.preventDefault();
    const errorState = validate();

    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }

    const formData = {
      login: form.email,
      password: form.password,
    };

    await handleSubmit(formData);
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
  const handleGaTracking = (type) => {
    if (type === "forgot")
      ReactGA.event({
        category: "Navigation",
        action: "Navigation to Forgot Password Page at Login Page",
        label: "Click 'Forgot Password Link'",
      });
    else if (type === "teachers")
      ReactGA.event({
        category: "Navigation",
        action: "Navigation to Teachers Page at Login Page",
        label: "Click 'Find your teachere Link'",
      });
  };

  return (
    <section onSubmit={handleSubmitForm} className="login">
      <div className="login__inner">
        <ReForm className="radius-l login__inner__form">
          <span className="icon-note-double"></span>
          <span className="icon-note"></span>
          <span className="icon-note note-large"></span>
          <div className="login__inner__form__text">
            <p>Log in to your account</p>
            <div className="error">{errorMessage}</div>
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
              type: "password",
              name: "password",
              placeholder: "Password",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.password,
              disabled: isSubmitting,
            }}
            error={error.password}
          />
          <button disabled={isSubmitting} className="button button--secondary">
            Login
          </button>
          <div>
            <Link
              to="/signup"
              className="primary"
            >
              Sign Up
            </Link>
          </div>
          <div>
            <Link
              onClick={() => handleGaTracking("forgot")}
              to="/forgot-password"
              className="primary"
            >
              Forgot Password?
            </Link>
          </div>
        </ReForm>
      </div>
    </section>
  );
};

export default Form;

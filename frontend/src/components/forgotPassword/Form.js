import React from "react";
import { useSelector } from "react-redux";
import { FormBox } from "../common";
import { Form as ReForm } from "reactstrap";
import { isEmail } from "validator";

const Form = ({ handleSubmit }) => {
  const [error, setError] = React.useState({});
  const [form, setForm] = React.useState({ email: "" });
  const [errorForgotPassword, setErrorForgotPassword] = React.useState();

  // const storeForgotPassword = useSelector((store) => store.forgotPassword);
  // const isSubmitting = storeForgotPassword.loading;
  const isSubmitting = false;


  // React.useEffect(() => {
  //   if (storeForgotPassword.error.status === "USER_NOT_FOUND") {
  //     setErrorForgotPassword("Email is not existed, please try again");
  //   }
  // }, [storeForgotPassword]);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const errorState = validate();

    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }

    const formData = {
      login: form.email,
    };

    handleSubmit(formData);
  };

  const validate = () => {
    const errorState = {};
    // check validate
    if (!isEmail(form.email)) {
      errorState.email = "Wrong email";
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
    setErrorForgotPassword("");
  };

  return (
    <section onSubmit={handleSubmitForm} className="forgot-password">
      <div className="forgot-password__inner">
        <ReForm className="radius-l forgot-password__inner__form">
          <span className="icon-note-double"></span>
          <span className="icon-note"></span>
          <span className="icon-note note-large"></span>
          <div className="forgot-password__inner__form__text">
            <h3>Forgot your password?</h3>
            <p>
              Please enter your email address to receive a password Forgot link
            </p>
          </div>
          <div className="error_forgot-password">{errorForgotPassword}</div>
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
          <button disabled={isSubmitting} className="button button--secondary">
            Send Email
          </button>
        </ReForm>
      </div>
    </section>
  );
};

export default Form;

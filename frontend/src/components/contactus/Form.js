import React from "react";
import { useSelector } from "react-redux";
import { Form as ReForm } from "reactstrap";
import { isEmpty, isEmail } from "validator";
import { FormBox } from "../common";

const Form = ({ handleSubmit }) => {
  const [error, setError] = React.useState({});
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    subject: "",
    info: "",
  });

  const storeContactUs = useSelector((store) => store.contactUs.contact);
  const isSubmitting = storeContactUs.loading;

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const errorState = validate();

    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }
    const formData = {
      contact: {
        login: form.email,
        name: form.name,
        subject: form.subject,
        info: form.info,
      },
    };

    handleSubmit(formData);
  };

  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.name)) {
      errorState.name = "Name is required ";
    }
    if (!isEmail(form.email)) {
      errorState.email = "Email is required ";
    }
    if (isEmpty(form.subject)) {
      errorState.subject = "Subject is required ";
    }
    if (isEmpty(form.info)) {
      errorState.info = "Info is required ";
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

  return (
    <section className="contact-us__form">
      <div className="contact-us__form__inner ds-primary">
        <div className="support radius-l">
          <div>
            <span className="dot background-primary"></span>
            <p className="primary">
              Email support hours are 8am - 8pm PST Monday - Sunday
            </p>
            {/* <p className="lime">Actually opened</p> */}
          </div>
          <div>
            <span className="dot background-primary"></span>
            <p className="primary">24 Hours response time</p>
          </div>
        </div>
        <ReForm onSubmit={handleSubmitForm}>
          <FormBox
            propsInput={{
              name: "name",
              placeholder: "Name",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.name,
              disabled: isSubmitting,
            }}
            error={error.name}
            variant="InputLabel"
            label="Your name"
          />
          <FormBox
            propsInput={{
              name: "email",
              placeholder: "Ex: john@xyz.com",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.email,
              disabled: isSubmitting,
            }}
            error={error.email}
            variant="InputLabel"
            label="Your email"
          />
          <FormBox
            propsInput={{
              name: "subject",
              placeholder: "Subject",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.subject,
              disabled: isSubmitting,
            }}
            error={error.subject}
            variant="InputLabel"
            label="Subject"
          />
          <FormBox
            propsInput={{
              type: "textarea",
              name: "info",
              placeholder: "How can we help?",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.info,
              disabled: isSubmitting,
            }}
            variant="InputLabel"
            error={error.info}
            label="Message"
          />
          <div className="btn-wrap">
            <button disabled={isSubmitting} className="button button--primary">
              Send message
            </button>
          </div>
        </ReForm>
      </div>
    </section>
  );
};

export default Form;

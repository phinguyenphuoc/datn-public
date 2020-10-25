import React from "react";
import { Form, Banner } from "../components/contactus";
import { contactUs } from "../redux/actions/contactUs";
import { openModalMessage } from "../redux/actions/modalMessage";

function ContactUs(props) {
  const handleContacus = (formData) => {
    contactUs(formData, () => {
      openModalMessage({
        title: "Thank you!",
        body: (
          <div>
            <p>Your message has been sent</p>
            <p>We will get back to you shortly!</p>
          </div>
        ),
      });
    });
  };

  return (
    <>
      <Banner />
      <Form handleSubmit={handleContacus} />
    </>
  );
}

export default ContactUs;

import React from "react";
import { Form } from "../components/forgotPassword";
import { openModalMessage } from "../redux/actions/modalMessage";
import { forgotPassword } from "../redux/actions/forgotPassword";

function ForgotPassword() {
  const handleForgotPassword = (formData) => {
    forgotPassword(formData, (data) => {
      openModalMessage({
        title: "Email is on its way!",
        body: "",
        timeout: 5000000, // modal always open
      });
      localStorage.setItem("auth", JSON.stringify(data));
    });
  };
  return <Form handleSubmit={handleForgotPassword} />;
}

export default ForgotPassword;

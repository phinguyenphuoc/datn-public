import React from "react";
import { Form } from "../components/forgotPassword";
import { openModalMessage, closeModalMessage } from "../redux/actions/modalMessage";
// import { forgotPassword } from "../redux/actions/forgotPassword";
import { Auth } from "aws-amplify";
// import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function ForgotPassword() {
  closeModalMessage()
  // const history = useHistory();
  const handleForgotPassword = async (formData) => {
    // console.log("formData", formData)
    await Auth.forgotPassword(formData.login)
    // forgotPassword(formData, (data) => {
    openModalMessage({
      title: "Email is on its way!",
      body: <Link to="/reset-password">Reset password now</Link>,
      timeout: 5000000, // modal always open
    });
    //   localStorage.setItem("auth", JSON.stringify(data));
    // });
  };
  return <Form handleSubmit={handleForgotPassword} />;
}

export default ForgotPassword;

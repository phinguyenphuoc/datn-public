import React from "react";
// import { useSelector } from "react-redux";
// import { useLocation, useHistory } from "react-router-dom";
import { Form } from "../components/resetPassword";
import { openModalMessage, closeModalMessage } from "../redux/actions/modalMessage";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";

function ResetPassword() {
  // const location = useLocation();
  // const history = useHistory();
  closeModalMessage();
  const handleResetPassword = async (formData) => {
    console.log(formData);
    const { code, email, new_password } = formData
    await Auth.forgotPasswordSubmit(email, code, new_password)
    openModalMessage({
      title: "Password reset",
      body: <p>We've reset your password successfully, return <Link to="/login">Login</Link> page</p>,
    });
  };
  return (
    <Form handleSubmit={handleResetPassword} />
  )
}

export default ResetPassword;

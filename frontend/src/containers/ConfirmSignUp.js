import React from "react";
import { useHistory } from "react-router-dom";
import { Form } from "../components/confirmsignup";
// import { openModalMessage } from "../redux/actions/modalMessage";
// import { login, updateRememberedPath } from "../redux/actions/login";
// import { USER_ROLE_TEACHER, USER_ROLE_PARENT } from "../utils/constants";
// import { useSelector } from "react-redux";
// import { setAuth } from "../utils/helpers";
import { Auth } from "aws-amplify"

function ConfirmSignUp() {
  const history = useHistory();

  const handleConfirm = async (formData) => {
    const { email, authCode } = formData
    console.log("formData", formData)
    try {
      await Auth.confirmSignUp(email, authCode)
      history.push("/login", { email: email })
    } catch (error) {
      console.log(error)
    }
  };

  return <Form handleSubmit={handleConfirm} />;
}

export default ConfirmSignUp;

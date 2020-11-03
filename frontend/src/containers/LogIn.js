import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "../components/login";
import { closeModalMessage } from "../redux/actions/modalMessage";
import { updateRememberedPath, login as saveUser, startLogin } from "../redux/actions/login";
import { USER_ROLE_TEACHER, USER_ROLE_STUDENT } from "../utils/constants";
import { useSelector } from "react-redux";
import { Auth } from "aws-amplify";

function LogIn() {
  const history = useHistory();
  const storeLogin = useSelector((store) => store.login);
  const [userRole, setUserRole] = useState("")
  const { auth } = storeLogin
  useEffect(() => {
    closeModalMessage();
  }, [])

  useEffect(() => {
    if (auth) {
      if (userRole.includes(USER_ROLE_TEACHER)) {
        history.push("/dashboard/teacher");
      } else if (userRole.includes(USER_ROLE_STUDENT)) {
        history.push("/dashboard/parent");
      } else {
        history.push("/");
      }
    }
  }, [auth])

  const handleLogin = (formData) => {
    const { login, password } = formData;
    startLogin() // Disable button
    Auth.signIn(login, password)
      .then(async user => {
        const user_role = user.signInUserSession.accessToken.payload['cognito:groups'] ? user.signInUserSession.accessToken.payload['cognito:groups'][0] : ['student']
        setUserRole(user_role)
        saveUser() // Get profile and save auth
      })
  };

  return <Form handleSubmit={handleLogin} />;
}

export default LogIn;

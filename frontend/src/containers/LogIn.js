import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "../components/login";
import { closeModalMessage } from "../redux/actions/modalMessage";
import { updateRememberedPath, login as saveUser } from "../redux/actions/login";
import { USER_ROLE_TEACHER, USER_ROLE_STUDENT } from "../utils/constants";
import { useSelector } from "react-redux";
// import { setAuth } from "../utils/helpers";
import { Auth } from "aws-amplify";

function LogIn() {
  const history = useHistory();
  const storeLogin = useSelector((store) => store.login);
  useEffect(() => {
    closeModalMessage();
  }, [])
  const handleLogin = (formData) => {
    const { login, password } = formData;
    Auth.signIn(login, password)
      .then(user => {
        const user_role = user.signInUserSession.accessToken.payload['cognito:groups'][0]
        console.log(user.signInUserSession.accessToken.payload['cognito:groups'])
        // setAuth(user);
        saveUser()
        if (storeLogin.rememberedPath) {
          history.push(storeLogin.rememberedPath);
          updateRememberedPath("");
        }
        else if (user_role.includes(USER_ROLE_TEACHER)) {
          history.push("/dashboard/teacher");
        } else if (user_role.includes(USER_ROLE_STUDENT)) {
          history.push("/dashboard/parent");
        } else {
          history.push("/");
        }
      })
  };

  return <Form handleSubmit={handleLogin} />;
}

export default LogIn;

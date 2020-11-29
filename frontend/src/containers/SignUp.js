import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "../components/signup";
// import { openModalMessage } from "../redux/actions/modalMessage";
import { signup } from "../redux/actions/login";
// import { USER_ROLE_TEACHER, USER_ROLE_PARENT } from "../utils/constants";
import { useSelector } from "react-redux";
// import { setAuth } from "../utils/helpers";

function SignUp() {
  const history = useHistory();
  const storeLogin = useSelector((store) => store.login);
  const { emailSignUp, error } = storeLogin;
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (emailSignUp && !error.message) {
      history.push("/confirm-signup", { email: emailSignUp, password })
    }
  }, [emailSignUp, error])

  const handleSignUp = async (formData) => {
    const { email } = formData
    setPassword(formData.password)
    try {
      // await Auth.signUp(login, password, login)
      await signup(formData)
    } catch (err) {
      console.log(err)
    }
    // login(formData, (data) => {
    //   setAuth(data);
    //   if (storeLogin.rememberedPath) {
    //     history.push(storeLogin.rememberedPath);
    //     updateRememberedPath("");
    //   } else if (data.user_roles.includes(USER_ROLE_TEACHER)) {
    //     history.push("/dashboard/teacher");
    //   } else if (data.user_roles.includes(USER_ROLE_PARENT)) {
    //     history.push("/dashboard/parent");
    //   } else {
    //     history.push("/");
    //   }
    // });
  };

  return <Form handleSubmit={handleSignUp} />;
}

export default SignUp;

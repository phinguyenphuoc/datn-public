import React from "react";
import { useHistory } from "react-router-dom";
import { Form } from "../components/signup";
// import { openModalMessage } from "../redux/actions/modalMessage";
// import { login, updateRememberedPath } from "../redux/actions/login";
// import { USER_ROLE_TEACHER, USER_ROLE_PARENT } from "../utils/constants";
// import { useSelector } from "react-redux";
// import { setAuth } from "../utils/helpers";
import { Auth } from "aws-amplify"

function SignUp() {
  const history = useHistory();
  // const storeLogin = useSelector((store) => store.login);

  const handleSignUp = async (formData) => {
    const { login, password } = formData
    try {
      await Auth.signUp(login, password, login)
      history.push("/confirm-signup", { email: login })
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

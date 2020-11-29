import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "../components/confirmsignup";
// import { openModalMessage } from "../redux/actions/modalMessage";
// import { login, updateRememberedPath } from "../redux/actions/login";
import { USER_ROLE_TEACHER, USER_ROLE_STUDENT } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
// import { setAuth } from "../utils/helpers";
import { Auth } from "aws-amplify"
import { login as saveUser } from "../redux/actions/login";

function ConfirmSignUp(props) {
  const history = useHistory();
  const storeLogin = useSelector((store) => store.login);
  const [userRole, setUserRole] = useState("")
  const { auth } = storeLogin
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");

  useEffect(() => {
    if (auth) {
      if (userRole.includes(USER_ROLE_TEACHER)) {
        history.push("/dashboard/teacher");
      } else if (userRole.includes(USER_ROLE_STUDENT)) {
        history.push("/dashboard/student");
      } else {
        history.push("/");
      }
    }
  }, [auth])

  const { email: globalEmail, password } = props.location.state;
  const handleConfirm = async (formData) => {
    setLoading(true)
    const { email, authCode } = formData
    console.log("formData", formData)
    try {
      await Auth.confirmSignUp(email, authCode)
      if (password && globalEmail) {
        await Auth.signIn(globalEmail, password)
          .then(async user => {
            const user_role = user.signInUserSession.accessToken.payload['cognito:groups'] ? user.signInUserSession.accessToken.payload['cognito:groups'][0] : ['student']
            setUserRole(user_role)
            saveUser() // Get profile and save auth
          })
      } else {
        history.push("/login", { email: email })
      }
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  };

  return <Form handleSubmit={handleConfirm} globalEmail={globalEmail} loading={loading} error={error} handleFocus={() => setError("")} />;
}

export default ConfirmSignUp;

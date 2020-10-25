import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { Form } from "../components/resetPassword";
import { openModalMessage } from "../redux/actions/modalMessage";
import { resetPassword } from "../redux/actions/resetPassword";
import { checkPasswordResetCode } from "../redux/actions/checkPasswordResetCode";

function ResetPassword() {
  const location = useLocation();
  const history = useHistory();
  React.useEffect(() => {
    checkPasswordResetCode({ code: location.search.replace("?code=", "") });
  }, [location]);

  const handleResetPassword = (formData) => {
    resetPassword(formData, (data) => {
      localStorage.setItem("auth", JSON.stringify(data));
      history.push("/dashboard/teacher");
      openModalMessage({
        title: "Password reset",
        body: <p>We've reset your password successfully.</p>,
      });
    });
  };
  const storeCheckPasswordResetCode = useSelector(
    (store) => store.checkPasswordResetCode
  );
  React.useEffect(() => {
    if (
      storeCheckPasswordResetCode.error.status ===
      "PASSWORD_RESET_CODE_IS_NOT_VALID"
    ) {
      openModalMessage({
        title: "Sorry, it seems your reset password code is no longer valid.",
        body: "",
        timeout: 5000,
      });
      history.push("/login");
    }
  }, [storeCheckPasswordResetCode, history]);
  return (
    !storeCheckPasswordResetCode.error.status && (
      <Form handleSubmit={handleResetPassword} />
    )
  );
}

export default ResetPassword;

import React from "react";
import { useHistory } from "react-router-dom";
// import { logout } from "../redux/actions/logout";
import { updateIsBadToken } from "../redux/actions/global";
import { Auth } from "aws-amplify";

function Logout() {
  const history = useHistory();

  React.useEffect(() => {
    const logOut = async () => {
      await Auth.signOut()
      localStorage.removeItem("auth");
      updateIsBadToken(false);
      history.push("/login");
    }
    logOut()
  }, [history]);

  return null;
}

export default Logout;

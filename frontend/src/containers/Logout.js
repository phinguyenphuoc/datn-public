import React from "react";
import { useHistory } from "react-router-dom";
// import { logout } from "../redux/actions/logout";
// import { updateIsBadToken } from "../redux/actions/global";

function Logout() {
  const history = useHistory();

  React.useEffect(() => {
    // logout();
    // localStorage.removeItem("auth");
    // updateIsBadToken(false);
    // history.push("/login");
  }, [history]);

  return null;
}

export default Logout;

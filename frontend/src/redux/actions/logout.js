import request from "../../utils/request";

export function logout() {
  return request()
    .get("/logout")
    .then((response) => {
      // Nothing to do; Browser set cookie to null
    });
}

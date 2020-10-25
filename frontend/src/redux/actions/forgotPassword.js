import * as types from "../constants";
import request from "../../utils/request";
import store from "../store";

export function forgotPassword(data, resolve = () => {}) {
  store.dispatch({
    type: types.FORGOT_PASSWORD,
  });
  return request()
    .post("/send_reset_password_link", data)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.FORGOT_PASSWORD_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.FORGOT_PASSWORD_FAIL,
      });
    });
}

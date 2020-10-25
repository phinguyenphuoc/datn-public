import * as types from "../constants";
import request from "../../utils/request";
import store from "../store";

export function checkPasswordResetCode(data, resolve = () => {}) {
  store.dispatch({
    type: types.CHECK_PASSWORD_RESET_CODE,
  });
  return request()
    .post("/check_password_reset_code", data)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.CHECK_PASSWORD_RESET_CODE_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.CHECK_PASSWORD_RESET_CODE_FAIL,
      });
    });
}

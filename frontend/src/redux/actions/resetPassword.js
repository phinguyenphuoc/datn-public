import * as types from "../constants";
import request from "../../utils/request";
import store from "../store";

export function resetPassword(data, resolve = () => {}) {
  store.dispatch({
    type: types.RESET_PASSWORD,
  });
  return request()
    .post("/reset_password", data)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.RESET_PASSWORD_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.RESET_PASSWORD_FAIL,
      });
    });
}

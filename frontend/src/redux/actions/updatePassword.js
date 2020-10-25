import * as types from "../constants";
import request from "../../utils/request";
import store from "../store";

export function updatePassword(data, resolve = () => {}) {
  store.dispatch({
    type: types.UPDATE_PASSWORD,
  });
  return request()
    .post("/update_password", data)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.UPDATE_PASSWORD_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.UPDATE_PASSWORD_FAIL,
      });
    });
}

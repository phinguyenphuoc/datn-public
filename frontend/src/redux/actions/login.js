import * as types from "../constants";
import request from "../../utils/request";
import store from "../store";

export function login(data, resolve = () => {}) {
  store.dispatch({
    type: types.LOGIN_API,
  });
  return request()
    .post("/login", data)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.LOGIN_API_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.LOGIN_API_FAIL,
      });
    });
}
export function updateRememberedPath(path) {
  store.dispatch({
    type: types.UPDATE_REMEMBERED_PATH,
    payload: path,
  });
}

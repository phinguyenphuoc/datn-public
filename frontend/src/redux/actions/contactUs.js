import * as types from "../constants";
import request from "../../utils/request";
import store from "../store";

export function contactUs(data, resolve = () => {}) {
  store.dispatch({
    type: types.CONTACT_US_API,
  });
  return request()
    .post("/supports/contact", data)
    .then((response) => {
      resolve();
      store.dispatch({
        payload: response.data,
        type: types.CONTACT_US_API_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.CONTACT_US_API_FAIL,
      });
    });
}

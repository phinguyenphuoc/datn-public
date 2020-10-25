import * as types from "../constants";
import request from "../../utils/request";
import store from "../store";

export function postHelp(data, resolve = () => {}) {
  store.dispatch({
    type: types.HELP_REQUEST,
  });
  return request()
    .post("/supports/assistance", data)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.HELP_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.HELP_FAIL,
      });
    });
}

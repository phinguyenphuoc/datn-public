import * as types from "../constants";
import request from "../../utils/request";
import store from "../store";

export function getInstruments(resolve = () => {}) {
  store.dispatch({
    type: types.GET_INSTRUMENTS,
  });
  return request()
    .get("/instruments")
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.GET_INSTRUMENTS_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_INSTRUMENTS_FAIL,
      });
    });
}

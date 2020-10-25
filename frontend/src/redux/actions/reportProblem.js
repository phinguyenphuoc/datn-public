import * as types from "../constants";
import request from "../../utils/request";
import store from "../store";

export function reportProblem(data, resolve = () => {}) {
  store.dispatch({
    type: types.REPORT_PROBLEM,
  });
  return request()
    .post("supports/report", data)
    .then((response) => {
      resolve();
      store.dispatch({
        payload: response.data,
        type: types.REPORT_PROBLEM_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.REPORT_PROBLEM_FAIL,
      });
    });
}

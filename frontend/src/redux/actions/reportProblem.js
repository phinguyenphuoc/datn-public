import * as types from "../constants";
import { request, getHeader } from "../../utils/request";
import store from "../store";

export async function reportProblem(data, resolve = () => { }) {
  const header = await getHeader()
  store.dispatch({
    type: types.REPORT_PROBLEM,
  });
  return request()
    .post("/supports/report", data, header)
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

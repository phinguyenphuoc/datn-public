import * as types from "../constants";
import { request, getHeader } from "../../utils/request";
import store from "../store";

export async function postHelp(data, resolve = () => { }) {
  const header = await getHeader()
  store.dispatch({
    type: types.HELP_REQUEST,
  });
  return request()
    .post("/supports/assistance", data, header)
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

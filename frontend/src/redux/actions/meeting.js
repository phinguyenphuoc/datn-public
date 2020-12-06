import * as types from "../constants";
import store from "../store";
import { request, getHeader } from "../../utils/request";

export async function getMeetingRoom(room_id, resolve = () => { }) {
  const header = await getHeader();
  return request()
    .get(`/meeting?roomId=${room_id}`, header)
    .then((response) => {
      resolve();
      store.dispatch({
        payload: response.data,
        type: types.GET_MEETING_INFO_SUCCESS,
      });
    })
}

import * as types from "../constants";
import { getHeader, request } from "../../utils/request";
import store from "../store";

export function getReview(profileId, resolve = () => { }) {
  store.dispatch({
    type: types.GET_REVIEW,
  });
  return request()
    .get(`/reviews?profile_id=${profileId}`)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: { data: response.data, profileId },
        type: types.GET_REVIEW_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_REVIEW_FAIL,
      });
    });
}

export async function postReview(data, resolve = () => { }) {
  const header = await getHeader();
  store.dispatch({
    type: types.POST_REVIEW,
  });
  return request()
    .post("/reviews", data, header)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.POST_REVIEW_SUCCEED,
      });
    })
}
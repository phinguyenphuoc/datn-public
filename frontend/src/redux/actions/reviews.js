import * as types from "../constants";
import request from "../../utils/request";
import store from "../store";

export function getReview(profileId, resolve = () => {}) {
  store.dispatch({
    type: types.GET_REVIEW,
  });
  return request()
    .get(`/reviews?profil_id=${profileId}`)
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

import * as types from "../constants";
import request from "../../utils/request";
import store from "../store";

export function getStickersInfo(resolve = () => {}) {
  store.dispatch({
    type: types.GET_STICKER,
  });
  return request()
    .get("/medias/stickers")
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.GET_STICKER_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_STICKER_FAIL,
      });
    });
}

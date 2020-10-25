import * as types from "../constants";
import request from "../../utils/request";
import store from "../store";

export function getArticles() {
  store.dispatch({
    type: types.GET_ARTICLES,
  });
  return request()
    .get("/articles")
    .then((response) => {
      store.dispatch({
        payload: response.data,
        type: types.GET_ARTICLES_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_ARTICLES_FAIL,
      });
    });
}

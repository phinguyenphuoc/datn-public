import * as types from "../constants";
import request from "../../utils/request";
import store from "../store";

export function updateIsBadToken(isBadToken) {
  store.dispatch({
    type: types.UPDATE_IS_BAD_TOKEN,
    payload: isBadToken,
  });
}

export function setHeightHeader(height) {
  store.dispatch({
    type: types.SET_HEIGHT_HEADER,
    payload: height,
  });
}

export function setTopHeader(top) {
  store.dispatch({
    type: types.SET_TOP_HEADER,
    payload: top,
  });
}

export function setOpenModalJoinHomemuse(state) {
  store.dispatch({
    type: types.SET_OPEN_MODAL_JOIN_HOMEMUSE,
    payload: state,
  });
}

export function setSizeTeachersFilter(payload) {
  store.dispatch({
    type: types.SET_SIZE_TEACHERS_FILTER,
    payload,
  });
}

export function getAllTeachers(resolve = () => {}) {
  store.dispatch({
    type: types.GET_ALL_TEACHERS,
  });
  return request()
    .get("/teachers/profiles")
    .then((response) => {
      resolve();
      store.dispatch({
        payload: { data: response.data.teachers },
        type: types.GET_ALL_TEACHERS_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_ALL_TEACHERS_FAIL,
      });
    });
}

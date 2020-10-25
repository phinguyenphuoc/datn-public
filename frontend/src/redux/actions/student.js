import * as types from "../constants";
import request from "../../utils/request";
import store from "../store";

export function registerStudent(data, resolve = () => {}) {
  store.dispatch({
    type: types.REGISTER_STUDENT_API,
  });
  return request()
    .post("/register_pending_student", data)
    .then((response) => {
      resolve();
      store.dispatch({
        payload: response.data,
        type: types.REGISTER_STUDENT_API_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.REGISTER_STUDENT_API_FAIL,
      });
    });
}

export function getStudentProfile(resolve = () => {}) {
  store.dispatch({
    type: types.GET_STUDENT_PROFILE,
  });
  return request()
    .get("/parent/students/profiles")
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.GET_STUDENT_PROFILE_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_STUDENT_PROFILE_FAIL,
      });
    });
}

export function updateStudentInfo(data, studentId, resolve = () => {}) {
  if (!studentId) {
    throw new Error("studentId is required!");
  }
  store.dispatch({
    type: types.UPDATE_STUDENT_PROFILE,
  });
  return request()
    .put(`/parent/students/profiles/${studentId}`, data)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data.profil,
        type: types.UPDATE_STUDENT_PROFILE_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.UPDATE_STUDENT_PROFILE_FAIL,
      });
    });
}

export function updateStudenttAvatar(data, studentId, resolve = () => {}) {
  store.dispatch({
    type: types.UPDATE_STUDENT_AVATAR,
  });
  return request()
    .post(`/parent/students/profiles/${studentId}/avatar`, data)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        studentId,
        payload: response.data.media,
        type: types.UPDATE_STUDENT_AVATAR_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.UPDATE_STUDENT_AVATAR_FAIL,
      });
    });
}
export function updateParentAvatarSticker(data, studentId, resolve = () => {}) {
  store.dispatch({
    type: types.UPDATE_STUDENT_AVATAR_STICKER,
  });

  return request()
    .post(`/parent/students/profiles/${studentId}/avatar`, data)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        studentId,
        payload: response.data.media,
        type: types.UPDATE_STUDENT_AVATAR_STICKER_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.UPDATE_STUDENT_AVATAR_STICKER_FAIL,
      });
    });
}

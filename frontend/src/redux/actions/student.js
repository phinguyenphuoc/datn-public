import * as types from "../constants";
import { request, getHeader } from "../../utils/request";
import store from "../store";

export async function registerStudent(data, resolve = () => { }) {
  const header = await getHeader();
  store.dispatch({
    type: types.REGISTER_STUDENT_API,
  });
  return request()
    .post("/register_pending_student", data, header)
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

export async function getStudentProfile(resolve = () => { }) {
  const header = await getHeader();
  store.dispatch({
    type: types.GET_STUDENT_PROFILE,
  });
  return request()
    .get("/students/profile", header)
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

export function updateStudentInfo(data, studentId, resolve = () => { }) {
  if (!studentId) {
    throw new Error("studentId is required!");
  }
  store.dispatch({
    type: types.UPDATE_STUDENT_PROFILE,
  });
  return request()
    .put(`/student/students/profiles/${studentId}`, data)
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

export function updateStudenttAvatar(data, studentId, resolve = () => { }) {
  store.dispatch({
    type: types.UPDATE_STUDENT_AVATAR,
  });
  return request()
    .post(`/student/students/profiles/${studentId}/avatar`, data)
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

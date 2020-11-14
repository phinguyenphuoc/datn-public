import * as types from "../constants";
import store from "../store";
import { Auth } from "aws-amplify"
import { request, getHeader } from "../../utils/request";

export async function login(resolve = () => { }) {
  const user = await Auth.currentSession()
  const headers = await getHeader();
  return request()
    .get("/profile", headers)
    .then((response) => {
      resolve();
      store.dispatch({
        payload: {
          user: user.accessToken.payload,
          profile: response.data
        },
        type: types.LOGIN_API_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_PROFILE_ERROR,
      });
    });
}

export async function signup(data, resolve = () => { }) {
  store.dispatch({
    type: types.SIGN_UP,
  });
  return request()
    .post("/signup", data)
    .then((response) => {
      resolve();
      store.dispatch({
        payload: response.data,
        type: types.SIGN_UP_SUCCESS,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.SIGN_UP_ERROR,
      });
    });
}


export function startLogin() {
  store.dispatch({
    type: types.LOGIN_API
  });
}

export function loginFailed(error) {
  store.dispatch({
    payload: error.data,
    type: types.LOGIN_API_FAIL,
  });
}

export function updateRememberedPath(path) {
  store.dispatch({
    type: types.UPDATE_REMEMBERED_PATH,
    payload: path,
  });
}

export function disableLoading() {
  store.dispatch({
    type: types.DISABLE_LOADING_LOGIN
  })
}
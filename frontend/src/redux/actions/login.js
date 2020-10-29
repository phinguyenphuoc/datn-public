import * as types from "../constants";
import store from "../store";
import { Auth } from "aws-amplify"

export async function login() {
  // const user = await Auth.currentUserInfo()
  const user = await Auth.currentSession()
  store.dispatch({
    payload: user.accessToken.payload,
    type: types.LOGIN_API_SUCCEED,
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

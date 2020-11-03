import * as types from "../constants";
import { setAuth } from "../../utils/helpers";

const initialState = {
  data: {},
  loading: false,
  error: {},
  rememberedPath: "",
  user: {},
  profile: {},
  auth: false
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.LOGIN_API:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.LOGIN_API_SUCCEED:
      const { user, profile } = actions.payload
      const auth = {}
      auth.user_avatar = profile.medias[0].url
      auth.user_first_name = profile.first_name
      auth.user_last_name = profile.last_name
      auth.user_login = user.username
      auth.user_roles = user['cognito:groups'] || ['student']
      auth.user_payment_updated = true
      auth.user_password_updated = true
      auth.status = "OK"
      setAuth(auth)
      return {
        ...state,
        data: user,
        user: user,
        profile: profile,
        loading: false,
        auth: true
      };
    case types.LOGIN_API_FAIL:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    case types.UPDATE_REMEMBERED_PATH:
      return {
        ...state,
        rememberedPath: actions.payload,
      };

    default:
      return state;
  }
} 

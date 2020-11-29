import * as types from "../constants";
import { setAuth } from "../../utils/helpers";

const initialState = {
  data: {},
  loading: false,
  error: {},
  rememberedPath: "",
  user: {},
  profile: {},
  auth: false,
  loadingSignUp: false,
  emailSignUp: ""
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
      auth.user_avatar = profile.user_avatar
      auth.user_first_name = profile.user_last_name
      auth.user_last_name = profile.last_name
      auth.user_login = user.username
      auth.user_roles = user['cognito:groups'] || ['student']
      auth.user_payment_updated = profile.user_payment_updated
      auth.user_password_updated = true
      auth.client_secret = profile.client_secret
      auth.status = "OK"
      auth.user_profile_id = profile.user_profile_id
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

    case types.SIGN_UP:
      return {
        ...state,
        loadingSignUp: true
      }

    case types.SIGN_UP_ERROR:
      return {
        ...state,
        loadingSignUp: false,
        error: actions.payload
      }

    case types.SIGN_UP_SUCCESS:
      return {
        ...state,
        loadingSignUp: false,
        emailSignUp: actions.payload.email,
        error: {}
      }

    case types.DISABLE_LOADING_LOGIN:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
} 

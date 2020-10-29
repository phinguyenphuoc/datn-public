import * as types from "../constants";

const initialState = {
  data: {},
  loading: false,
  error: {},
  rememberedPath: "",
  user: {}
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
      return {
        ...state,
        data: actions.payload,
        user: actions.payload,
        loading: false,
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

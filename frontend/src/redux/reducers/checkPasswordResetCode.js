import * as types from "../constants";

const initialState = {
  data: {},
  loading: false,
  error: {},
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.CHECK_PASSWORD_RESET_CODE:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.CHECK_PASSWORD_RESET_CODE_SUCCEED:
      return {
        ...state,
        data: actions.payload,
        loading: false,
      };
    case types.CHECK_PASSWORD_RESET_CODE_FAIL:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

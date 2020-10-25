import * as types from "../constants";

const initialState = {
  data: {},
  loading: false,
  error: {}
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.UPDATE_PASSWORD:
      return {
        ...state,
        loading: true,
        error: {}
      };
    case types.UPDATE_PASSWORD_SUCCEED:
      return {
        ...state,
        data: actions.payload,
        loading: false
      };
    case types.UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        error: actions.payload,
        loading: false
      };
    default:
      return state;
  }
}

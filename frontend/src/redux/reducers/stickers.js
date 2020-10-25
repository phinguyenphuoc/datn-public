import * as types from "../constants";

const initialState = {
  data: {},
  loading: false,
  error: {}
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_STICKER:
      return {
        ...state,
        loading: true,
        error: {}
      };
    case types.GET_STICKER_SUCCEED:
      return {
        ...state,
        data: actions.payload,
        loading: false
      };
    case types.GET_STICKER_FAIL:
      return {
        ...state,
        error: actions.payload,
        loading: false
      };
    default:
      return state;
  }
}

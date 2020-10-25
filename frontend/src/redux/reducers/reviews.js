import * as types from "../constants";

const initialState = {
  data: {},
  loading: false,
  error: {},
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_REVIEW:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.GET_REVIEW_SUCCEED:
      return {
        ...state,
        data: {
          ...state.data,
          [actions.payload.profileId]: actions.payload.data
            ? actions.payload.data.reviews
            : [],
        },
        loading: false,
      };
    case types.GET_REVIEW_FAIL:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

import * as types from "../constants";

const initialState = {
  contact: {
    data: {},
    loading: false,
    error: {},
  },
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.CONTACT_US_API:
      return {
        ...state,
        contact: {
          ...state.contact,
          loading: true,
          error: {},
        },
      };
    case types.CONTACT_US_API_SUCCEED:
      return {
        ...state,
        contact: {
          ...state.contact,
          data: actions.payload,
          loading: false,
        },
      };
    case types.CONTACT_US_API_FAIL:
      return {
        ...state,
        contact: {
          ...state.contact,
          error: actions.payload,
          loading: false,
        },
      };
    default:
      return state;
  }
}

import * as types from "../constants";

const initialState = {
  student: {},
  teacher: {}
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_MEETING_INFO_SUCCESS:
      return {
        ...state,
        student: actions.payload.student,
        teacher: actions.payload.teacher
      };
    default:
      return state;
  }
} 

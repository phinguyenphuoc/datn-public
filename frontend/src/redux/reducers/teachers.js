import * as types from "../constants";

const initialState = {
  dataFromAPI: [],
  data: [],
  page: 1,
  limit: 8,
  isOutOfTeachers: false,
  loading: false,
  filter: {
    instruments: [],
    location: null,
    lessonType: null,
  },
  apiCalled: false,
  error: {},
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_TEACHERS:
      return {
        ...state,
        ...actions.payload,
        loading: true,
        error: {},
      };
    case types.GET_TEACHERS_SUCCEED:
      return {
        ...state,
        ...actions.payload,
        data:
          actions.payload.page > 1
            ? [...state.data, ...actions.payload.data]
            : [...actions.payload.data],
        loading: false,
        error: {},
      };
    case types.GET_TEACHERS_FAIL:
      return {
        ...state,
        loading: false,
        error: actions.payload.error,
      };
    case types.UPDATE_FILTER_TEACHERS:
      return {
        ...state,
        filter: {
          ...actions.payload,
          instruments: actions.payload.instruments
            ? actions.payload.instruments
            : initialState.filter.instruments,
        },
      };
    // For Real API
    case types.GET_TEACHERS_API:
      return {
        ...state,
        loading: true,
        page: 1,
        limit: actions.payload.limit,
        isOutOfTeachers: false,
        apiCalled: false,
        error: {},
      };
    case types.GET_TEACHERS_API_SUCCEED:
      return {
        ...state,
        ...actions.payload,
        dataFromAPI: actions.payload.data,
        data: actions.payload.data.slice(0, state.limit),
        apiCalled: true,
        loading: false,
      };
    case types.GET_TEACHERS_API_FAIL:
      return {
        ...state,
        loading: false,
        apiCalled: true,
        error: actions.payload,
      };
    case types.SET_NEW_DATA_TEACHERS:
      const datateacherFilter = state.dataFromAPI.filter(
        (item) => item.id.toString() !== actions.payload.id.toString()
      );
      const newDataTeacher = [actions.payload, ...datateacherFilter];
      return {
        ...state,
        dataFromAPI: newDataTeacher,
        data: newDataTeacher.slice(0, state.limit),
      };
    default:
      return state;
  }
}

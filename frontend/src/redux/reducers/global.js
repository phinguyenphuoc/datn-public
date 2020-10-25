import * as types from "../constants";

const initialState = {
  isBadToken: false,
  heightHeader: 0,
  topHeader: 0,
  openModalJoinHomemuse: false,
  teachersFilter: {
    top: 0,
    height: 0,
  },
  allTeachers: {
    data: [],
    dataFilter: {},
    loading: false,
    error: {},
  },
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.UPDATE_IS_BAD_TOKEN:
      return {
        ...state,
        isBadToken: actions.payload,
      };
    case types.SET_HEIGHT_HEADER:
      return {
        ...state,
        heightHeader: actions.payload,
      };
    case types.SET_TOP_HEADER:
      return {
        ...state,
        topHeader: actions.payload,
      };
    case types.SET_OPEN_MODAL_JOIN_HOMEMUSE:
      return {
        ...state,
        openModalJoinHomemuse: actions.payload,
      };
    case types.SET_SIZE_TEACHERS_FILTER:
      return {
        ...state,
        teachersFilter: { ...state.teachersFilter, ...actions.payload },
      };
    case types.GET_ALL_TEACHERS:
      return {
        ...state,
        allTeachers: {
          ...initialState.allTeachers,
          loading: true,
        },
      };
    case types.GET_ALL_TEACHERS_SUCCEED:
      const dataFilter = {};
      actions.payload.data.forEach((item) => {
        item.skills.forEach((skill) => {
          if (dataFilter[skill.instrument]) {
            dataFilter[skill.instrument] = [
              ...dataFilter[skill.instrument],
              item,
            ];
          } else {
            dataFilter[skill.instrument] = [item];
          }
        });
      });
      return {
        ...state,
        allTeachers: {
          ...state.allTeachers,
          data: actions.payload.data,
          loading: false,
          dataFilter,
        },
      };
    case types.GET_ALL_TEACHERS_FAIL:
      return {
        ...state,
        allTeachers: {
          ...state.allTeachers,
          error: actions.payload,
          loading: false,
        },
      };
    default:
      return state;
  }
}

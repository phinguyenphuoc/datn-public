import * as types from "../constants";

const initialState = {
  register: {
    data: {},
    loading: false,
    error: {}
  },
  students: {
    data: [],
    loading: false,
    success: false,
    error: {}
  },
  updateProfile: {
    loading: false,
    error: {}
  },
  updateAvatar: {
    loading: false,
    error: {}
  },
  updateAvatarSticker: {
    loading: false,
    error: {}
  }
};
export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.REGISTER_STUDENT_API:
      return {
        ...state,
        register: {
          ...state.register,
          loading: true,
          error: {}
        }
      };
    case types.REGISTER_STUDENT_API_SUCCEED:
      return {
        ...state,
        register: {
          ...state.register,
          data: actions.payload,
          loading: false
        }
      };
    case types.REGISTER_STUDENT_API_FAIL:
      return {
        ...state,
        register: {
          ...state.register,
          error: actions.payload,
          loading: false
        }
      };
    case types.GET_STUDENT_PROFILE:
      return {
        ...state,
        students: {
          ...state.students,
          loading: true,
          success: false,
          error: {}
        }
      };
    case types.GET_STUDENT_PROFILE_SUCCEED:
      return {
        ...state,
        students: {
          ...state.students,
          data: actions.payload.students,
          success: true,
          loading: false
        }
      };
    case types.GET_STUDENT_PROFILE_FAIL:
      return {
        ...state,
        students: {
          ...state.students,
          error: actions.payload,
          loading: false
        }
      };
    case types.UPDATE_STUDENT_PROFILE:
      return {
        ...state,
        updateProfile: {
          loading: true,
          error: {}
        }
      };
    case types.UPDATE_STUDENT_PROFILE_SUCCEED: {
      const newDataStudents = state.students.data.map(item => {
        if (item.id === actions.payload.id) {
          return actions.payload;
        }
        return item;
      });
      return {
        ...state,
        students: {
          ...state.students,
          data: newDataStudents
        },
        updateProfile: {
          ...state.updateProfile,
          loading: false
        }
      };
    }
    case types.UPDATE_STUDENT_PROFILE_FAIL:
      return {
        ...state,
        updateProfile: {
          error: actions.payload,
          loading: false
        }
      };
    case types.UPDATE_STUDENT_AVATAR:
      return {
        ...state,
        updateAvatar: {
          loading: true,
          error: {}
        }
      };
    case types.UPDATE_STUDENT_AVATAR_SUCCEED:
      const newDataAvatar = state.students.data.map(item => {
        if (item.id.toString() === actions.studentId.toString()) {
          return { ...item, avatar: actions.payload.url };
        }
        return item;
      });
      return {
        ...state,
        students: {
          ...state.students,
          data: newDataAvatar
        },
        updateAvatar: {
          ...state.updateAvatar,
          loading: false
        }
      };

    case types.UPDATE_STUDENT_AVATAR_FAIL:
      return {
        ...state,
        updateAvatar: {
          error: actions.payload,
          loading: false
        }
      };
    case types.UPDATE_STUDENT_AVATAR_STICKER:
      return {
        ...state,
        updateAvatarSticker: {
          loading: true,
          error: {}
        }
      };
    case types.UPDATE_STUDENT_AVATAR_STICKER_SUCCEED:
      const newDataAvatarSticker = state.students.data.map(item => {
        if (item.id.toString() === actions.studentId.toString()) {
          return { ...item, avatar: actions.payload.url };
        }
        return item;
      });
      return {
        ...state,
        students: {
          ...state.students,
          data: newDataAvatarSticker
        },
        updateAvatarSticker: {
          ...state.updateAvatarSticker,
          loading: false
        }
      };

    case types.UPDATE_STUDENT_AVATAR_STICKER_FAIL:
      return {
        ...state,
        updateAvatarSticker: {
          error: actions.payload,
          loading: false
        }
      };
    default:
      return state;
  }
}

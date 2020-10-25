import * as types from "../constants";
import moment from "moment";

const DEFAUT_VALUE_PROFILE = {
  id: "",
  first_name: "",
  last_name: "",
  pickup_line: "",
  background: ["", "", ""],
  experience: ["", "", ""],
  teaching_distance: {},
  teaching_experience: {},
  birth_date: "",
  phone: "",
  email: "",
  address: ["", "", "", ""],
  avatar: "",
  member_since: "",
  skills: [],
  pricings: [],
  medias: [],
  reviews: [],
};

const initialState = {
  register: {
    data: {},
    loading: false,
    error: {},
  },
  profile: {
    data: DEFAUT_VALUE_PROFILE,
    loading: false,
    error: {},
  },
  updateProfile: {
    loading: false,
    error: {},
  },
  updateAvatar: {
    loading: false,
    error: {},
  },
  updateAvatarSticker: {
    loading: false,
    error: {},
  },
  teachers: {
    data: [],
    loading: false,
    error: {},
  },
  schedules: {
    data: [],
    loading: false,
    error: {},
  },
  schedulesUpcomming: {
    data: [],
    loading: false,
    error: {},
  },
  dateSchedule: new Date(),
  dateScheduleSelected: null,
  cardSetup: {
    data: {},
    loading: false,
    error: {},
  },
  cardSave: {
    loading: false,
    success: false,
    error: {},
  },
  cardInfo: {
    data: {},
    loading: false,
    error: {},
  },
  cancelLessonSchedule: {
    data: {},
    loading: false,
    error: {},
  },
  progressReports: {
    data: [],
    loading: false,
    error: {},
  },
  dataStudentProgressReport: {
    data: [],
    loading: false,
    error: {},
  },
  dataProgressReportItem: {
    data: {},
    loading: false,
    error: {},
  },
  datePaymentsInvoices: new Date(),
  paymentsInvoices: {
    data: [],
    loading: false,
    error: {},
  },
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_PARENT_PROFILE:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: true,
          error: {},
        },
      };
    case types.GET_PARENT_PROFILE_SUCCEED:
      return {
        ...state,
        profile: {
          ...state.profile,
          data: actions.payload.profil,
          loading: false,
        },
      };
    case types.GET_PARENT_PROFILE_FAIL:
      return {
        ...state,
        profile: {
          ...state.profile,
          error: actions.payload,
          loading: false,
        },
      };
    case types.UPDATE_PARENT_PROFILE:
      return {
        ...state,
        updateProfile: {
          loading: true,
          error: {},
        },
      };
    case types.UPDATE_PARENT_PROFILE_SUCCEED:
      return {
        ...state,
        profile: {
          ...state.profile,
          data: actions.payload.profil,
        },
        updateProfile: {
          ...state.updateProfile,
          loading: false,
        },
      };
    case types.UPDATE_PARENT_PROFILE_FAIL:
      return {
        ...state,
        updateProfile: {
          error: actions.payload,
          loading: false,
        },
      };
    case types.UPDATE_PARENT_AVATAR:
      return {
        ...state,
        updateAvatar: {
          loading: true,
          error: {},
        },
      };
    case types.UPDATE_PARENT_AVATAR_SUCCEED:
      return {
        ...state,
        profile: {
          ...state.profile,
          data: {
            ...state.profile.data,
            avatar: actions.payload.url,
          },
        },
        updateAvatar: {
          ...state.updateAvatar,
          loading: false,
        },
      };
    case types.UPDATE_PARENT_AVATAR_FAIL:
      return {
        ...state,
        updateAvatar: {
          error: actions.payload,
          loading: false,
        },
      };
    case types.UPDATE_PARENT_AVATAR_STICKER:
      return {
        ...state,
        updateAvatarSticker: {
          loading: true,
          error: {},
        },
      };
    case types.UPDATE_PARENT_AVATAR_STICKER_SUCCEED:
      return {
        ...state,
        profile: {
          ...state.profile,
          data: {
            ...state.profile.data,
            avatar: actions.payload.url,
          },
        },
        updateAvatarSticker: {
          ...state.updateAvatarSticker,
          loading: false,
        },
      };
    case types.UPDATE_PARENT_AVATAR_STICKER_FAIL:
      return {
        ...state,
        updateAvatarSticker: {
          error: actions.payload,
          loading: false,
        },
      };
    case types.GET_TEACHERS_PROFILE:
      return {
        ...state,
        teachers: {
          ...state.teachers,
          loading: true,
          error: {},
        },
      };
    case types.GET_TEACHERS_PROFILE_SUCCEED:
      return {
        ...state,
        teachers: {
          ...state.teachers,
          data: actions.payload.teachers,
          loading: false,
        },
      };
    case types.GET_TEACHERS_PROFILE_FAIL:
      return {
        ...state,
        teachers: {
          ...state.teachers,
          error: actions.payload,
          loading: false,
        },
      };
    case types.GET_SCHEDULES_PARENT:
      return {
        ...state,
        schedules: {
          ...state.schedules,
          loading: true,
          error: {},
        },
      };
    case types.GET_SCHEDULES_PARENT_SUCCEED:
      return {
        ...state,
        schedules: {
          ...state.schedules,
          data: actions.payload.schedules,
          loading: false,
        },
      };
    case types.GET_SCHEDULES_PARENT_FAIL:
      return {
        ...state,
        schedules: {
          ...state.schedules,
          error: actions.payload,
          loading: false,
        },
      };
    case types.GET_SCHEDULES_PARENT_UPCOMMING:
      return {
        ...state,
        schedulesUpcomming: {
          ...state.schedulesUpcomming,
          loading: true,
          error: {},
        },
      };
    case types.GET_SCHEDULES_PARENT_UPCOMMING_SUCCEED:
      return {
        ...state,
        schedulesUpcomming: {
          ...state.schedulesUpcomming,
          data: actions.payload.schedules,
          loading: false,
        },
      };
    case types.GET_SCHEDULES_PARENT_UPCOMMING_FAIL:
      return {
        ...state,
        schedulesUpcomming: {
          ...state.schedulesUpcomming,
          error: actions.payload,
          loading: false,
        },
      };
    case types.UPDATE_PARENT_DATE_SCHEDULE:
      return { ...state, dateSchedule: actions.payload };
    case types.UPDATE_PARENT_DATE_SCHEDULE_SELECTED:
      return { ...state, dateScheduleSelected: actions.payload };
    case types.GET_CARD_SETUP:
      return {
        ...state,
        cardSetup: {
          ...state.cardSetup,
          loading: true,
          error: {},
        },
      };
    case types.GET_CARD_SETUP_SUCCEED:
      return {
        ...state,
        cardSetup: {
          ...state.cardSetup,
          data: actions.payload.card_setup,
          loading: false,
        },
      };
    case types.GET_CARD_SETUP_FAIL:
      return {
        ...state,
        cardSetup: {
          ...state.cardSetup,
          error: actions.payload,
          loading: false,
        },
      };
    case types.POST_CARD_SAVE:
      return {
        ...state,
        cardSave: {
          loading: true,
          success: false,
          error: {},
        },
      };
    case types.POST_CARD_SAVE_SUCCEED:
      return {
        ...state,
        cardInfo: {
          ...state.cardInfo,
          data: actions.payload.card_save.card_info,
        },
        cardSave: {
          ...state.cardSave,
          success: true,
          loading: false,
        },
      };
    case types.POST_CARD_SAVE_FAIL:
      return {
        ...state,
        cardSave: {
          error: actions.payload,
          loading: false,
        },
      };
    case types.RESET_CARD_SAVE_SUCCEED:
      return {
        ...state,
        cardSave: {
          ...state.cardSave,
          success: false,
        },
      };
    case types.GET_CARD_INFO:
      return {
        ...state,
        cardInfo: {
          ...state.cardInfo,
          loading: true,
          error: {},
        },
      };
    case types.GET_CARD_INFO_SUCCEED:
      return {
        ...state,
        cardInfo: {
          ...state.cardInfo,
          data: actions.payload.card_info,
          loading: false,
        },
      };
    case types.GET_CARD_INFO_FAIL:
      return {
        ...state,
        cardInfo: {
          ...state.cardInfo,
          error: actions.payload,
          loading: false,
        },
      };
    case types.CANCEL_LESSON_SCHEDULE_FOR_PARENT:
      return {
        ...state,
        cancelLessonSchedule: {
          ...state.cancelLessonSchedule,
          loading: true,
          error: {},
        },
      };
    case types.CANCEL_LESSON_SCHEDULE_FOR_PARENT_SUCCEED:
      const newData = state.schedules.data.map((item) => {
        if (
          item.id === actions.schedule_id ||
          (item.lesson.id === actions.lesson_id &&
            (moment(actions.data.cancel.start_date).isBefore(
              moment(item.date)
            ) ||
              moment(actions.data.cancel.start_date).isSame(
                moment(item.date)
              )) &&
            (moment(item.date).isBefore(moment(actions.data.cancel.end_date)) ||
              moment(item.date).isSame(moment(actions.data.cancel.end_date))))
        ) {
          return { ...item, type: "cancelled" };
        }
        return item;
      });
      return {
        ...state,
        cancelLessonSchedule: {
          ...state.cancelLessonSchedule,
          data: actions.payload,
          loading: false,
        },
        schedules: {
          ...state.schedules,
          data: newData,
        },
      };
    case types.CANCEL_LESSON_SCHEDULE_FOR_PARENT_FAIL:
      return {
        ...state,
        cancelLessonSchedule: {
          ...state.cancelLessonSchedule,
          error: actions.payload,
          loading: false,
        },
      };
    case types.GET_PROGRESS_REPORT_PARENT:
      return {
        ...state,
        progressReports: {
          ...state.progressReports,
          loading: true,
          error: {},
        },
      };
    case types.GET_PROGRESS_REPORT_PARENT_SUCCEED:
      return {
        ...state,
        progressReports: {
          ...state.progressReports,
          data: actions.payload.progress_reports,
          loading: false,
        },
      };
    case types.GET_PROGRESS_REPORT_PARENT_FAIL:
      return {
        ...state,
        progressReports: {
          ...state.progressReports,
          error: actions.payload,
          loading: false,
        },
      };
    case types.GET_STUDENT_PROGRESS_REPORT_FOR_PARENT:
      return {
        ...state,
        dataStudentProgressReport: {
          ...state.dataStudentProgressReport,
          loading: true,
          error: {},
        },
      };
    case types.GET_STUDENT_PROGRESS_REPORT_FOR_PARENT_SUCCEED:
      return {
        ...state,
        dataStudentProgressReport: {
          ...state.dataStudentProgressReport,
          data: actions.payload.progress_reports,
          loading: false,
        },
      };
    case types.GET_STUDENT_PROGRESS_REPORT_FOR_PARENT_FAIL:
      return {
        ...state,
        dataStudentProgressReport: {
          ...state.dataStudentProgressReport,
          error: actions.payload,
          loading: false,
        },
      };
    case types.GET_PROGRESS_REPORT_ITEM_FOR_PARENT:
      return {
        ...state,
        dataProgressReportItem: {
          ...state.dataProgressReportItem,
          loading: true,
          error: {},
        },
      };
    case types.GET_PROGRESS_REPORT_ITEM_FOR_PARENT_SUCCEED:
      return {
        ...state,
        dataProgressReportItem: {
          ...state.dataProgressReportItem,
          data: actions.payload.progress_report,
          loading: false,
        },
      };
    case types.GET_PROGRESS_REPORT_ITEM_FOR_PARENT_FAIL:
      return {
        ...state,
        dataProgressReportItem: {
          ...state.dataProgressReportItem,
          error: actions.payload,
          loading: false,
        },
      };
    case types.UPDATE_PARENT_DATE_PAYMENTS_INVOICES:
      return { ...state, datePaymentsInvoices: actions.payload };
    case types.GET_PARENT_PAYMENTS_INVOICES:
      return {
        ...state,
        paymentsInvoices: {
          ...state.paymentsInvoices,
          loading: true,
          error: {},
        },
      };
    case types.GET_PARENT_PAYMENTS_INVOICES_SUCCEED:
      return {
        ...state,
        paymentsInvoices: {
          ...state.paymentsInvoices,
          data: actions.payload.invoices,
          loading: false,
        },
      };
    case types.GET_PARENT_PAYMENTS_INVOICES_FAIL:
      return {
        ...state,
        paymentsInvoices: {
          ...state.paymentsInvoices,
          error: actions.payload,
          loading: false,
        },
      };
    default:
      return state;
  }
}

import * as types from "../constants";
import { roundCurrentTime } from "../../utils/helpers";
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
  students: {
    data: [],
    loading: false,
    error: {},
  },
  schedules: {
    data: [],
    loading: false,
    error: {},
  },
  schedules2: {
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
  stripe: {
    loading: false,
    error: {},
    link: "",
    isCalled: false,
  },
  initBookings: {
    data: "",
    loading: false,
    error: {},
    called: false,
  },
  bookLesson: {
    date: "",
    time: roundCurrentTime(),
  },
  bookLesson2: {
    date: "",
    time: roundCurrentTime(),
  },
  bookingStudents: {
    data: [],
    loading: false,
    error: {},
  },
  createLesson: {
    data: {},
    loading: false,
    error: {},
  },
  setupBooking: {
    data: [],
    loading: false,
    error: {},
  },
  createMakeupSchedule: {
    data: {},
    loading: false,
    error: {},
  },
  cancelLessonSchedule: {
    data: {},
    loading: false,
    error: {},
  },
  progressReport: {
    data: {},
    loading: false,
    error: {},
  },
  dataStudentProgressReport: {
    data: {},
    loading: false,
    error: {},
  },
  dataProgressReportItem: {
    data: {},
    loading: false,
    error: {},
  },
  earningCurrentDetails: {
    data: {},
    loading: false,
    error: {},
  },
  dateEarning: new Date(),
  earnings: {
    data: [],
    loading: false,
    error: {},
  },
  dateEarningReceipt: new Date(),
  earningsReceipts: {
    data: [],
    loading: false,
    error: {},
  },
  zoomAuthCode: {
    data: {},
    loading: false,
    error: {},
  },
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.REGISTER_TEACHER_API:
      return {
        ...state,
        register: {
          ...state.register,
          loading: true,
          error: {},
        },
      };
    case types.REGISTER_TEACHER_API_SUCCEED:
      return {
        ...state,
        register: {
          ...state.register,
          data: actions.payload,
          loading: false,
        },
      };
    case types.REGISTER_TEACHER_API_FAIL:
      return {
        ...state,
        register: {
          ...state.register,
          error: actions.payload,
          loading: false,
        },
      };
    case types.GET_TEACHER_PROFILE:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: true,
          error: {},
        },
      };
    case types.GET_TEACHER_PROFILE_SUCCEED:
      return {
        ...state,
        profile: {
          ...state.profile,
          data: actions.payload.profile,
          loading: false,
        },
      };
    case types.GET_TEACHER_PROFILE_FAIL:
      return {
        ...state,
        profile: {
          ...state.profile,
          error: actions.payload,
          loading: false,
        },
      };
    case types.UPDATE_TEACHER_PROFILE:
      return {
        ...state,
        updateProfile: {
          loading: true,
          error: {},
        },
      };
    case types.UPDATE_TEACHER_PROFILE_SUCCEED:
      return {
        ...state,
        profile: {
          ...state.profile,
          data: actions.payload.profile,
        },
        updateProfile: {
          ...state.updateProfile,
          loading: false,
        },
      };
    case types.UPDATE_TEACHER_PROFILE_FAIL:
      return {
        ...state,
        updateProfile: {
          ...state.updateProfile,
          error: actions.payload,
          loading: false,
        },
      };
    case types.GET_STUDENTS:
      return {
        ...state,
        students: {
          ...state.students,
          loading: true,
          error: {},
        },
      };
    case types.GET_STUDENTS_SUCCEED:
      return {
        ...state,
        students: {
          ...state.students,
          data: actions.payload.students,
          loading: false,
        },
      };
    case types.GET_STUDENTS_FAIL:
      return {
        ...state,
        students: {
          ...state.students,
          error: actions.payload,
          loading: false,
        },
      };
    case types.GET_SCHEDULES:
      return {
        ...state,
        schedules: {
          ...state.schedules,
          loading: true,
          error: {},
        },
      };
    case types.GET_SCHEDULES_SUCCEED:
      return {
        ...state,
        schedules: {
          ...state.schedules,
          data: actions.payload.schedules,
          loading: false,
        },
      };

    case types.GET_SCHEDULES_SUCCEED2:
      return {
        ...state,
        schedules2: {
          ...state.schedules2,
          data: actions.payload.schedules,
          loading: false,
        },
      };

    case types.GET_SCHEDULES_FAIL:
      return {
        ...state,
        schedules: {
          ...state.schedules,
          error: actions.payload,
          loading: false,
        },
      };

    case types.GET_SCHEDULES_FAIL2:
      return {
        ...state,
        schedules2: {
          ...state.schedules2,
          error: actions.payload,
          loading: false,
        },
      };

    case types.GET_SCHEDULES_UPCOMMING:
      return {
        ...state,
        schedulesUpcomming: {
          ...state.schedulesUpcomming,
          loading: true,
          error: {},
        },
      };
    case types.GET_SCHEDULES_UPCOMMING_SUCCEED:
      return {
        ...state,
        schedulesUpcomming: {
          ...state.schedulesUpcomming,
          data: actions.payload.schedules,
          loading: false,
        },
      };
    case types.GET_SCHEDULES_UPCOMMING_FAIL:
      return {
        ...state,
        schedulesUpcomming: {
          ...state.schedulesUpcomming,
          error: actions.payload,
          loading: false,
        },
      };
    case types.UPDATE_TEACHER_DATE_SCHEDULE:
      return { ...state, dateSchedule: actions.payload };
    case types.UPDATE_TEACHER_DATE_SCHEDULE_SELECTED:
      return { ...state, dateScheduleSelected: actions.payload };
    case types.CONNECT_STRIPE_TEACHER_REQUEST:
      return {
        ...state,
        stripe: {
          ...state.stripe,
          loading: true,
          error: {},
          link: "",
          isCalled: false,
        },
      };
    case types.CONNECT_STRIPE_TEACHER_SUCCEED:
      return {
        ...state,
        stripe: {
          ...state.stripe,
          loading: false,
          link: actions.payload.link,
          isCalled: true,
        },
      };
    case types.CONNECT_STRIPE_TEACHER_FAIL:
      return {
        ...state,
        stripe: {
          ...state.stripe,
          loading: false,
          error: actions.payload,
          isCalled: true,
        },
      };
    case types.GET_STRIPE_TEACHER_REQUEST:
      return {
        ...state,
        stripe: {
          ...state.stripe,
          loading: true,
          error: {},
          link: "",
        },
      };
    case types.GET_STRIPE_TEACHER_SUCCEED:
      return {
        ...state,
        stripe: {
          ...state.stripe,
          loading: false,
          link: actions.payload.link,
        },
      };
    case types.GET_STRIPE_TEACHER_FAIL:
      return {
        ...state,
        stripe: {
          ...state.stripe,
          loading: false,
          error: actions.payload,
        },
      };
    case types.GET_INIT_BOOKINGS:
      return {
        ...state,
        initBookings: {
          ...initialState.initBookings,
          loading: true,
        },
      };
    case types.GET_INIT_BOOKINGS_SUCCEED:
      return {
        ...state,
        initBookings: {
          ...state.initBookings,
          data: actions.payload.bookings_hash,
          loading: false,
          called: true,
        },
      };
    case types.GET_INIT_BOOKINGS_FAIL:
      return {
        ...state,
        initBookings: {
          ...state.initBookings,
          error: actions.payload,
          loading: false,
          called: true,
        },
      };
    case types.RESET_INIT_BOOKINGS:
      return {
        ...state,
        initBookings: initialState.initBookings,
      };

    case types.UPDATE_BOOK_LESSON:
      return {
        ...state,
        bookLesson: {
          ...state.bookLesson,
          ...actions.payload,
        },
      };

    case types.UPDATE_BOOK_LESSON2:
      return {
        ...state,
        bookLesson2: {
          ...state.bookLesson2,
          ...actions.payload,
        },
      };

    case types.GET_BOOKING_STUDENT:
      return {
        ...state,
        bookingStudents: {
          ...initialState.bookingStudents,
          loading: true,
          error: {},
        },
      };
    case types.GET_BOOKING_STUDENT_SUCCEED:
      return {
        ...state,
        bookingStudents: {
          ...state.bookingStudents,
          data: actions.payload.bookings,
          loading: false,
        },
      };
    case types.GET_BOOKING_STUDENT_FAIL:
      return {
        ...state,
        bookingStudents: {
          ...state.bookingStudents,
          error: actions.payload,
          loading: false,
        },
      };
    case types.CREATE_LESSON:
      return {
        ...state,
        createLesson: {
          ...state.createLesson,
          loading: true,
          error: {},
        },
      };
    case types.CREATE_LESSON_SUCCEED:
      return {
        ...state,
        createLesson: {
          ...state.createLesson,
          data: actions.payload,
          loading: false,
        },
      };
    case types.CREATE_LESSON_FAIL:
      return {
        ...state,
        createLesson: {
          ...state.createLesson,
          error: actions.payload,
          loading: false,
        },
      };
    case types.GET_SETUP_BOOKING:
      return {
        ...state,
        setupBooking: {
          ...state.setupBooking,
          loading: true,
          error: {},
        },
      };
    case types.GET_SETUP_BOOKING_SUCCEED:
      return {
        ...state,
        setupBooking: {
          ...state.setupBooking,
          data: actions.payload.booking,
          loading: false,
        },
      };
    case types.GET_SETUP_BOOKING_FAIL:
      return {
        ...state,
        setupBooking: {
          ...state.setupBooking,
          error: actions.payload,
          loading: false,
        },
      };
    case types.CREATE_MAKEUP_SCHEDULE:
      return {
        ...state,
        createMakeupSchedule: {
          ...state.createMakeupSchedule,
          loading: true,
          error: {},
        },
      };
    case types.CREATE_MAKEUP_SCHEDULE_SUCCEED:
      return {
        ...state,
        createMakeupSchedule: {
          ...state.createMakeupSchedule,
          data: actions.payload,
          loading: false,
        },
      };
    case types.CREATE_MAKEUP_SCHEDULE_FAIL:
      return {
        ...state,
        createMakeupSchedule: {
          ...state.createMakeupSchedule,
          error: actions.payload,
          loading: false,
        },
      };
    case types.CANCEL_LESSON_SCHEDULE:
      return {
        ...state,
        cancelLessonSchedule: {
          ...state.cancelLessonSchedule,
          loading: true,
          error: {},
        },
      };
    case types.CANCEL_LESSON_SCHEDULE_SUCCEED:
      const isScheduleCanceled = (item, actions) => {
        return item.id === actions.schedule_id &&
          actions.data.cancel.recurrence === "one"
      };
      const isAllSchedulesCanceled = (item, actions) => {
        return item.lesson.id === actions.lesson_id &&
          actions.data.cancel.recurrence === "many" &&
          (moment().isBefore(
            moment(item.date), 'date'
          ) ||
            moment().isSame(
              moment(item.date), 'date'
            ))
      };
      const isLessonSuspended = (item, actions) => {
        return item.lesson.id === actions.lesson_id &&
          (moment(actions.data.cancel.start_date).isBefore(
            moment(item.date)
          ) ||
            moment(actions.data.cancel.start_date).isSame(
              moment(item.date)
            )) &&
          (moment(item.date).isBefore(
            moment(actions.data.cancel.end_date)
          ) ||
            moment(item.date).isSame(
              moment(actions.data.cancel.end_date)
            ))
      };
      const newData = state.schedules.data.map((item) => {
        if (
          isScheduleCanceled(item, actions) ||
          isAllSchedulesCanceled(item, actions) ||
          isLessonSuspended(item, actions)
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
    case types.CANCEL_LESSON_SCHEDULE_FAIL:
      return {
        ...state,
        cancelLessonSchedule: {
          ...state.cancelLessonSchedule,
          error: actions.payload,
          loading: false,
        },
      };
    case types.PROGRESS_REPORT_TEACHER:
      return {
        ...state,
        progressReport: {
          ...state.progressReport,
          loading: true,
          error: {},
        },
      };
    case types.PROGRESS_REPORT_TEACHER_SUCCEED:
      return {
        ...state,
        progressReport: {
          ...state.progressReport,
          data: actions.payload,
          loading: false,
        },
      };
    case types.PROGRESS_REPORT_TEACHER_FAIL:
      return {
        ...state,
        progressReport: {
          ...state.progressReport,
          error: actions.payload,
          loading: false,
        },
      };
    case types.GET_STUDENT_PROGRESS_REPORT:
      return {
        ...state,
        dataStudentProgressReport: {
          ...state.dataStudentProgressReport,
          loading: true,
          error: {},
        },
      };
    case types.GET_STUDENT_PROGRESS_REPORT_SUCCEED:
      return {
        ...state,
        dataStudentProgressReport: {
          ...state.dataStudentProgressReport,
          data: {
            ...state.dataStudentProgressReport.data,
            [actions.profil_id]: actions.payload.progress_reports,
          },
          loading: false,
        },
      };
    case types.GET_STUDENT_PROGRESS_REPORT_FAIL:
      return {
        ...state,
        dataStudentProgressReport: {
          ...state.dataStudentProgressReport,
          error: actions.payload,
          loading: false,
        },
      };
    case types.GET_PROGRESS_REPORT_ITEM_FOR_TEACHER:
      return {
        ...state,
        dataProgressReportItem: {
          ...state.dataProgressReportItem,
          loading: true,
          error: {},
        },
      };
    case types.GET_PROGRESS_REPORT_ITEM_FOR_TEACHER_SUCCEED:
      return {
        ...state,
        dataProgressReportItem: {
          ...state.dataProgressReportItem,
          data: actions.payload.progress_report,
          loading: false,
        },
      };
    case types.GET_PROGRESS_REPORT_ITEM_FOR_TEACHER_FAIL:
      return {
        ...state,
        dataProgressReportItem: {
          ...state.dataProgressReportItem,
          error: actions.payload,
          loading: false,
        },
      };
    case types.GET_EARNING_CURRENT_DETAILS:
      return {
        ...state,
        earningCurrentDetails: {
          ...state.earningCurrentDetails,
          loading: true,
          error: {},
        },
      };
    case types.GET_EARNING_CURRENT_DETAILS_SUCCEED:
      return {
        ...state,
        earningCurrentDetails: {
          ...state.earningCurrentDetails,
          data: actions.payload,
          loading: false,
        },
      };
    case types.GET_EARNING_CURRENT_DETAILS_FAIL:
      return {
        ...state,
        earningCurrentDetails: {
          ...state.earningCurrentDetails,
          error: actions.payload,
          loading: false,
        },
      };
    case types.UPDATE_TEACHER_DATE_EARNING:
      return { ...state, dateEarning: actions.payload };
    case types.GET_TEACHER_EARNINGS:
      return {
        ...state,
        earnings: {
          ...state.earnings,
          loading: true,
          error: {},
        },
      };
    case types.GET_TEACHER_EARNINGS_SUCCEED:
      return {
        ...state,
        earnings: {
          ...state.earnings,
          data: actions.payload.earnings,
          loading: false,
        },
      };
    case types.GET_TEACHER_EARNINGS_FAIL:
      return {
        ...state,
        earnings: {
          ...state.earnings,
          error: actions.payload,
          loading: false,
        },
      };
    case types.UPDATE_TEACHER_DATE_EARNING_RECEIPTS:
      return { ...state, dateEarningReceipt: actions.payload };
    case types.GET_TEACHER_EARNINGS_RECEIPTS:
      return {
        ...state,
        earningsReceipts: {
          ...state.earningsReceipts,
          loading: true,
          error: {},
        },
      };
    case types.GET_TEACHER_EARNINGS_RECEIPTS_SUCCEED:
      return {
        ...state,
        earningsReceipts: {
          ...state.earningsReceipts,
          data: actions.payload.receipts,
          loading: false,
        },
      };
    case types.GET_TEACHER_EARNINGS_RECEIPTS_FAIL:
      return {
        ...state,
        earningsReceipts: {
          ...state.earningsReceipts,
          error: actions.payload,
          loading: false,
        },
      };
    case types.GET_ZOOM_AUTH_CODE:
      return {
        ...state,
        zoomAuthCode: {
          ...state.zoomAuthCode,
          loading: true,
          error: {},
        },
      };
    case types.GET_ZOOM_AUTH_CODE_SUCCEED:
      return {
        ...state,
        zoomAuthCode: {
          ...state.zoomAuthCode,
          data: actions.payload,
          loading: false,
        },
        profile: {
          ...state.profile,
          data: {
            ...state.profile.data,
            conferencing_tools: ["zoom"],
          },
          loading: false,
        },
      };
    case types.GET_ZOOM_AUTH_CODE_FAIL:
      return {
        ...state,
        zoomAuthCode: {
          ...state.zoomAuthCode,
          error: actions.payload,
          loading: false,
        },
      };
    default:
      return state;
  }
}

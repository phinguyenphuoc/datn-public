import * as types from "../constants";
import { getHeader, request } from "../../utils/request";
import store from "../store";

export function registerTeacher(data, resolve = () => { }) {
  store.dispatch({
    type: types.REGISTER_TEACHER_API,
  });
  return request()
    .post("/register_pending_teacher", data)
    .then((response) => {
      resolve();
      store.dispatch({
        payload: response.data,
        type: types.REGISTER_TEACHER_API_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.REGISTER_TEACHER_API_FAIL,
      });
    });
}

export async function getTeacherProfile(resolve = () => { }) {
  const header = await getHeader()
  store.dispatch({
    type: types.GET_TEACHER_PROFILE,
  });
  return request()
    .get("/teacher/profile", header)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.GET_TEACHER_PROFILE_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_TEACHER_PROFILE_FAIL,
      });
    });
}

export async function updateTeacherInfo(data, resolve = () => { }) {
  const header = await getHeader()
  store.dispatch({
    type: types.UPDATE_TEACHER_PROFILE,
  });
  return request()
    .put("/teacher/profile", data, header)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.UPDATE_TEACHER_PROFILE_SUCCEED,
      });
    })
  // .catch((error) => {
  //   console.log({ error })
  //   store.dispatch({
  //     payload: error.data,
  //     type: types.UPDATE_TEACHER_PROFILE_FAIL,
  //   });
  // });
}

export async function getStudents(resolve = () => { }) {
  const header = await getHeader()
  store.dispatch({
    type: types.GET_STUDENTS,
  });
  return request()
    .get("/teacher/students/profiles", header)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.GET_STUDENTS_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_STUDENTS_FAIL,
      });
    });
}

export async function getSchedules(date, resolve = () => { }) {
  const header = await getHeader()
  store.dispatch({
    type: types.GET_SCHEDULES,
  });
  return request()
    .get(`/schedules?date=${date}`, header)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.GET_SCHEDULES_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_SCHEDULES_FAIL,
      });
    });
}

export async function getSchedules2(date, resolve = () => { }) {
  const header = await getHeader()
  store.dispatch({
    type: types.GET_SCHEDULES,
  });
  return request()
    .get(`/schedules?date=${date}`, header)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.GET_SCHEDULES_SUCCEED2,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_SCHEDULES_FAIL2,
      });
    });
}

export async function getSchedulesUpcomming(studentId, resolve = () => { }) {
  const header = await getHeader()
  store.dispatch({
    type: types.GET_SCHEDULES_UPCOMMING,
  });
  return request()
    .get(`/schedules/upcoming?profile_id=${studentId}`, header)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        studentId,
        payload: response.data,
        type: types.GET_SCHEDULES_UPCOMMING_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_SCHEDULES_UPCOMMING_FAIL,
      });
    });
}

export function updateDateSchedule(date) {
  store.dispatch({ type: types.UPDATE_TEACHER_DATE_SCHEDULE, payload: date });
}

export function updateDateScheduleSelected(date) {
  store.dispatch({
    type: types.UPDATE_TEACHER_DATE_SCHEDULE_SELECTED,
    payload: date,
  });
}

export function connectStripe(data, resolve = () => { }, reject = () => { }) {
  store.dispatch({
    type: types.CONNECT_STRIPE_TEACHER_REQUEST,
  });
  return request()
    .post("/teacher/connect_stripe", data)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.CONNECT_STRIPE_TEACHER_SUCCEED,
      });
    })
    .catch((error) => {
      reject(error);
      store.dispatch({
        payload: error.data,
        type: types.CONNECT_STRIPE_TEACHER_FAIL,
      });
    });
}

export async function getStripeLink(resolve = () => { }, reject = () => { }) {
  const header = await getHeader()
  store.dispatch({
    type: types.GET_STRIPE_TEACHER_REQUEST,
  });
  return request()
    .get("/teacher/connect_stripe", header)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.GET_STRIPE_TEACHER_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_STRIPE_TEACHER_FAIL,
      });
    });
}

export async function getInitBookings(resolve = () => { }) {
  const header = await getHeader();
  store.dispatch({
    type: types.GET_INIT_BOOKINGS,
  });
  return request()
    .get("/teacher/pending_bookings", header)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.GET_INIT_BOOKINGS_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_INIT_BOOKINGS_FAIL,
      });
    });
}

export function resetInitBookings() {
  store.dispatch({
    type: types.RESET_INIT_BOOKINGS,
  });
}

export function updateBooklesson(data) {
  store.dispatch({
    type: types.UPDATE_BOOK_LESSON,
    payload: data,
  });
}

export function updateBooklesson2(data) {
  store.dispatch({
    type: types.UPDATE_BOOK_LESSON2,
    payload: data,
  });
}


export async function getBookingStudent(resolve = () => { }) {
  const header = await getHeader();
  store.dispatch({
    type: types.GET_BOOKING_STUDENT,
  });
  return request()
    .get(`/teacher/bookings/pending`, header)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.GET_BOOKING_STUDENT_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_BOOKING_STUDENT_FAIL,
      });
    });
}

export async function createLesson(data, resolve = () => { }) {
  const header = await getHeader()
  store.dispatch({
    type: types.CREATE_LESSON,
  });
  return request()
    .post("/teacher/lessons", data, header)
    .then((response) => {
      resolve();
      store.dispatch({
        payload: response.data,
        type: types.CREATE_LESSON_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.CREATE_LESSON_FAIL,
      });
    });
}

export async function createMakeupSchedule(schedule_id, data, resolve = () => { }) {
  const header = await getHeader()
  store.dispatch({
    type: types.CREATE_MAKEUP_SCHEDULE,
  });
  return request()
    .post(`teacher/lessons/makeup_schedule/${schedule_id}`, data, header)
    .then((response) => {
      resolve();
      store.dispatch({
        schedule_id,
        payload: response.data,
        type: types.CREATE_MAKEUP_SCHEDULE_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.CREATE_MAKEUP_SCHEDULE_FAIL,
      });
    });
}
export async function cancelLesson(lesson_id, schedule_id, data, resolve = () => { }) {
  const header = await getHeader()
  store.dispatch({
    type: types.CANCEL_LESSON_SCHEDULE,
  });
  return request()
    .post(`teacher/lessons/cancel_schedule/${schedule_id}`, data, header)
    .then((response) => {
      resolve();
      store.dispatch({
        lesson_id,
        schedule_id,
        data,
        payload: response.data,
        type: types.CANCEL_LESSON_SCHEDULE_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.CANCEL_LESSON_SCHEDULE_FAIL,
      });
    });
}
export async function suspendLesson(lesson_id, data, resolve = () => { }) {
  const header = await getHeader()
  store.dispatch({
    type: types.CANCEL_LESSON_SCHEDULE,
  });
  return request()
    .post(`teacher/lessons/${lesson_id}/suspend`, data, header)
    .then((response) => {
      resolve();
      store.dispatch({
        lesson_id,
        data,
        payload: response.data,
        type: types.CANCEL_LESSON_SCHEDULE_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.CANCEL_LESSON_SCHEDULE_FAIL,
      });
    });
}

export async function progressReport(profil_id, data, resolve = () => { }) {
  const header = await getHeader()
  store.dispatch({
    type: types.PROGRESS_REPORT_TEACHER,
  });
  return request()
    .post(`teacher/students/progress_reports?profile_id=${profil_id}`, data, header)
    .then((response) => {
      resolve();
      store.dispatch({
        profil_id,
        payload: response.data,
        type: types.PROGRESS_REPORT_TEACHER_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.PROGRESS_REPORT_TEACHER_FAIL,
      });
    });
}

export function getStudentProgressReport(profil_id, resolve = () => { }) {
  store.dispatch({
    type: types.GET_STUDENT_PROGRESS_REPORT,
  });
  return request()
    .get(`teacher/students/progress_reports?profile_id=${profil_id}`)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        profil_id,
        payload: response.data,
        type: types.GET_STUDENT_PROGRESS_REPORT_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_STUDENT_PROGRESS_REPORT_FAIL,
      });
    });
}

export function getProgressReportItem(progress_report_id, resolve = () => { }) {
  store.dispatch({
    type: types.GET_PROGRESS_REPORT_ITEM_FOR_TEACHER,
  });
  return request()
    .get(`teacher/students/progress_reports/${progress_report_id}`)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        progress_report_id,
        payload: response.data,
        type: types.GET_PROGRESS_REPORT_ITEM_FOR_TEACHER_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_PROGRESS_REPORT_ITEM_FOR_TEACHER_FAIL,
      });
    });
}

export async function getEarningCurrentDetails(resolve = () => { }) {
  const header = await getHeader()
  store.dispatch({
    type: types.GET_EARNING_CURRENT_DETAILS,
  });
  return request()
    .get(`teacher/earnings/current_details`, header)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.GET_EARNING_CURRENT_DETAILS_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_EARNING_CURRENT_DETAILS_FAIL,
      });
    });
}

export function updateDateEarning(date) {
  store.dispatch({ type: types.UPDATE_TEACHER_DATE_EARNING, payload: date });
}

export async function getEarnings(date, resolve = () => { }) {
  const header = await getHeader();
  store.dispatch({
    type: types.GET_TEACHER_EARNINGS,
  });
  return request()
    .get(`teacher/earnings?date=${date}`, header)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.GET_TEACHER_EARNINGS_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_TEACHER_EARNINGS_FAIL,
      });
    });
}

export function updateDateEarningReceipts(date) {
  store.dispatch({
    type: types.UPDATE_TEACHER_DATE_EARNING_RECEIPTS,
    payload: date,
  });
}

export async function getEarningsReceipts(date, resolve = () => { }) {
  const header = await getHeader()
  store.dispatch({
    type: types.GET_TEACHER_EARNINGS_RECEIPTS,
  });
  return request()
    .get(`teacher/earnings/receipts?date=${date}`, header)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.GET_TEACHER_EARNINGS_RECEIPTS_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_TEACHER_EARNINGS_RECEIPTS_FAIL,
      });
    });
}

export async function getSetupBooking(lesson_id, resolve = () => { }) {
  const header = await getHeader();
  store.dispatch({
    type: types.GET_SETUP_BOOKING,
  });
  return request()
    .get(`teacher/lessons/${lesson_id}/setup_booking`, header)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        lesson_id,
        payload: response.data,
        type: types.GET_SETUP_BOOKING_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_SETUP_BOOKING_FAIL,
      });
    });
}


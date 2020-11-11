import * as types from "../constants";
import { request, getHeader } from "../../utils/request";
import store from "../store";

export async function getParentProfile(resolve = () => { }) {
  const header = await getHeader()
  store.dispatch({
    type: types.GET_PARENT_PROFILE,
  });
  return request()
    .get("/student/profile", header)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.GET_PARENT_PROFILE_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_PARENT_PROFILE_FAIL,
      });
    });
}

export async function updateParentInfo(data, resolve = () => { }) {
  const headers = await getHeader()
  store.dispatch({
    type: types.UPDATE_PARENT_PROFILE,
  });
  return request()
    .put("/students/profile", data, headers)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.UPDATE_PARENT_PROFILE_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.UPDATE_PARENT_PROFILE_FAIL,
      });
    });
}

export async function updateParentAvatar(data, resolve = () => { }) {
  const header = await getHeader()
  store.dispatch({
    type: types.UPDATE_PARENT_AVATAR,
  });
  return request()
    .post("/student/profile/avatar", data, header)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data.media,
        type: types.UPDATE_PARENT_AVATAR_SUCCEED,
      });
    })
    .catch((error) => {
      console.log("error", error)
      store.dispatch({
        payload: error.data,
        type: types.UPDATE_PARENT_AVATAR_FAIL,
      });
    });
}

export async function getTeachers(resolve = () => { }) {
  const headers = await getHeader()
  store.dispatch({
    type: types.GET_TEACHERS_PROFILE,
  });
  return request()
    .get("/student/teachers/profile", headers)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.GET_TEACHERS_PROFILE_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_TEACHERS_PROFILE_FAIL,
      });
    });
}

export async function getSchedulesParent(date, resolve = () => { }) {
  const header = await getHeader()
  store.dispatch({
    type: types.GET_SCHEDULES_PARENT,
  });
  return request()
    .get(`/schedules?date=${date}`, header)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.GET_SCHEDULES_PARENT_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_SCHEDULES_PARENT_FAIL,
      });
    });
}

export async function getSchedulesParentUpcomming(teacherId, resolve = () => { }) {
  const header = await getHeader();
  store.dispatch({
    type: types.GET_SCHEDULES_PARENT_UPCOMMING,
  });
  return request()
    .get(`/schedules/upcoming?profile_id=${teacherId}`, header)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        teacherId,
        payload: response.data,
        type: types.GET_SCHEDULES_PARENT_UPCOMMING_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_SCHEDULES_PARENT_UPCOMMING_FAIL,
      });
    });
}

export function updateDateSchedule(date) {
  store.dispatch({ type: types.UPDATE_PARENT_DATE_SCHEDULE, payload: date });
}

export function updateDateScheduleSelected(date) {
  store.dispatch({
    type: types.UPDATE_PARENT_DATE_SCHEDULE_SELECTED,
    payload: date,
  });
}

export async function getCardSetup(resolve = () => { }) {
  const header = await getHeader()
  store.dispatch({
    type: types.GET_CARD_SETUP,
  });
  return request()
    .get("/student/customer/card_setup", header)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.GET_CARD_SETUP_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_CARD_SETUP_FAIL,
      });
    });
}

export async function postCardSave(data, resolve = () => { }) {
  const header = await getHeader();
  store.dispatch({
    type: types.POST_CARD_SAVE,
  });
  return request()
    .post("/student/customer/card_save", data, header)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.POST_CARD_SAVE_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.POST_CARD_SAVE_FAIL,
      });
    });
}

export function resetCardSaveSuccess() {
  store.dispatch({
    type: types.RESET_CARD_SAVE_SUCCEED,
  });
}

export async function getCardInfo(resolve = () => { }) {
  const header = await getHeader()
  store.dispatch({
    type: types.GET_CARD_INFO,
  });
  return request()
    .get("/student/customer/card_info", header)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.GET_CARD_INFO_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_CARD_INFO_FAIL,
      });
    });
}

export async function cancelLesson(schedule_id, resolve = () => { }) {
  const header = await getHeader()
  console.log(header)
  store.dispatch({
    type: types.CANCEL_LESSON_SCHEDULE_FOR_PARENT,
  });
  return request()
    .post(`student/lessons/cancel_schedule/${schedule_id}`, {}, header)
    .then((response) => {
      resolve();
      store.dispatch({
        schedule_id,
        payload: response.data,
        type: types.CANCEL_LESSON_SCHEDULE_FOR_PARENT_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.CANCEL_LESSON_SCHEDULE_FOR_PARENT_FAIL,
      });
    });
}

export async function suspendLesson(lesson_id, data, resolve = () => { }) {
  const header = await getHeader()
  store.dispatch({
    type: types.CANCEL_LESSON_SCHEDULE_FOR_PARENT,
  });
  return request()
    .post(`student/lessons/${lesson_id}/suspend`, data, header)
    .then((response) => {
      resolve();
      store.dispatch({
        lesson_id,
        data,
        payload: response.data,
        type: types.CANCEL_LESSON_SCHEDULE_FOR_PARENT_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.CANCEL_LESSON_SCHEDULE_FOR_PARENT_FAIL,
      });
    });
}

export function getProgressReport(resolve = () => { }) {
  store.dispatch({
    type: types.GET_PROGRESS_REPORT_PARENT,
  });
  return request()
    .get("parent/students/progress_reports?last=true")
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.GET_PROGRESS_REPORT_PARENT_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_PROGRESS_REPORT_PARENT_FAIL,
      });
    });
}

export function getStudentProgressReport(profil_id, resolve = () => { }) {
  store.dispatch({
    type: types.GET_STUDENT_PROGRESS_REPORT_FOR_PARENT,
  });
  return request()
    .get(`parent/students/progress_reports?profile_id=${profil_id}`)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        profil_id,
        payload: response.data,
        type: types.GET_STUDENT_PROGRESS_REPORT_FOR_PARENT_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_STUDENT_PROGRESS_REPORT_FOR_PARENT_FAIL,
      });
    });
}

export function getStudentProgressReportItem(
  progress_report_id,
  resolve = () => { }
) {
  store.dispatch({
    type: types.GET_PROGRESS_REPORT_ITEM_FOR_PARENT,
  });
  return request()
    .get(`parent/students/progress_reports/${progress_report_id}`)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        progress_report_id,
        payload: response.data,
        type: types.GET_PROGRESS_REPORT_ITEM_FOR_PARENT_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_PROGRESS_REPORT_ITEM_FOR_PARENT_FAIL,
      });
    });
}

export function updateDatePaymentsInvoices(date) {
  store.dispatch({
    type: types.UPDATE_PARENT_DATE_PAYMENTS_INVOICES,
    payload: date,
  });
}

export function getPaymentsInvoices(date, resolve = () => { }) {
  store.dispatch({
    type: types.GET_PARENT_PAYMENTS_INVOICES,
  });
  return request()
    .get(`parent/invoices?date=${date}`)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data,
        type: types.GET_PARENT_PAYMENTS_INVOICES_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_PARENT_PAYMENTS_INVOICES_FAIL,
      });
    });
}
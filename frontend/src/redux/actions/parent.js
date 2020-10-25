import * as types from "../constants";
import request from "../../utils/request";
import store from "../store";

export function getParentProfile(resolve = () => {}) {
  store.dispatch({
    type: types.GET_PARENT_PROFILE,
  });
  return request()
    .get("/parent/profile")
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

export function updateParentInfo(data, resolve = () => {}) {
  store.dispatch({
    type: types.UPDATE_PARENT_PROFILE,
  });
  return request()
    .put("/parent/profile", data)
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

export function updateParentAvatar(data, resolve = () => {}) {
  store.dispatch({
    type: types.UPDATE_PARENT_AVATAR,
  });
  return request()
    .post("/parent/profile/avatar", data)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data.media,
        type: types.UPDATE_PARENT_AVATAR_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.UPDATE_PARENT_AVATAR_FAIL,
      });
    });
}

export function updateParentAvatarSticker(data, resolve = () => {}) {
  store.dispatch({
    type: types.UPDATE_PARENT_AVATAR_STICKER,
  });

  return request()
    .post("/parent/profile/avatar", data)
    .then((response) => {
      resolve(response.data);
      store.dispatch({
        payload: response.data.media,
        type: types.UPDATE_PARENT_AVATAR_STICKER_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.UPDATE_PARENT_AVATAR_STICKER_FAIL,
      });
    });
}

export function getTeachers(resolve = () => {}) {
  store.dispatch({
    type: types.GET_TEACHERS_PROFILE,
  });
  return request()
    .get("/parent/teachers/profiles")
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

export function getSchedulesParent(date, resolve = () => {}) {
  store.dispatch({
    type: types.GET_SCHEDULES_PARENT,
  });
  return request()
    .get(`/schedules?date=${date}`)
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

export function getSchedulesParentUpcomming(teacherId, resolve = () => {}) {
  store.dispatch({
    type: types.GET_SCHEDULES_PARENT_UPCOMMING,
  });
  return request()
    .get(`/schedules?upcoming=true&profil_id=${teacherId}`)
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

export function getCardSetup(resolve = () => {}) {
  store.dispatch({
    type: types.GET_CARD_SETUP,
  });
  return request()
    .get("/parent/customer/card_setup")
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

export function postCardSave(data, resolve = () => {}) {
  store.dispatch({
    type: types.POST_CARD_SAVE,
  });
  return request()
    .post("/parent/customer/card_save", data)
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

export function getCardInfo(resolve = () => {}) {
  store.dispatch({
    type: types.GET_CARD_INFO,
  });
  return request()
    .get("/parent/customer/card_info")
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

export function cancelLesson(schedule_id, resolve = () => {}) {
  store.dispatch({
    type: types.CANCEL_LESSON_SCHEDULE_FOR_PARENT,
  });
  return request()
    .post(`parent/lessons/cancel_schedule/${schedule_id}`)
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

export function suspendLesson(lesson_id, data, resolve = () => {}) {
  store.dispatch({
    type: types.CANCEL_LESSON_SCHEDULE_FOR_PARENT,
  });
  return request()
    .post(`parent/lessons/${lesson_id}/suspend`, data)
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

export function getProgressReport(resolve = () => {}) {
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

export function getStudentProgressReport(profil_id, resolve = () => {}) {
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
  resolve = () => {}
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

export function getPaymentsInvoices(date, resolve = () => {}) {
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
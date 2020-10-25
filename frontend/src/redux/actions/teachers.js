import * as types from "../constants";
import request from "../../utils/request";
import store from "../store";

export function getTeachers(params = {}, dataFromAPI = []) {
  store.dispatch({
    type: types.GET_TEACHERS,
    payload: { ...params, page: params.page ? params.page : 1 },
  });

  let dataFiltered = dataFromAPI;

  if (params.filter.location && params.filter.location.value) {
    dataFiltered = dataFiltered.filter((item) =>
      item.city
        .toLowerCase()
        .includes(params.filter.location.value.toLowerCase())
    );
  }
  if (params.filter.lessonType && params.filter.lessonType.value) {
    dataFiltered = dataFiltered.filter(
      (item) =>
        item.teaching_type &&
        item.teaching_type.data &&
        item.teaching_type.data.includes(params.filter.lessonType.value)
    );
  }
  if (params.filter.instruments.length) {
    dataFiltered = dataFiltered.filter((item) => {
      if (params.filter.instruments.length === 0) {
        return true;
      }
      return params.filter.instruments.some((filterInstrument) => {
        return item.skills.some(
          (skill) => skill.instrument === filterInstrument.value
        );
      });
    });
  }

  let data = [];
  if (!isNaN(params.page) && params.page > 1) {
    data = dataFiltered.slice(
      (params.page - 1) * params.limit,
      params.page * params.limit
    );
  } else {
    data = dataFiltered.slice(0, params.limit);
  }

  setTimeout(() => {
    store.dispatch({
      type: types.GET_TEACHERS_SUCCEED,
      payload: {
        data,
        page: params.page,
        isOutOfTeachers: dataFiltered.length < params.page * params.limit,
      },
    });
  }, 500);
}

export function getTeachersAPI(storeTeachers) {
  store.dispatch({
    type: types.GET_TEACHERS_API,
    payload: {
      limit: storeTeachers.limit,
    },
  });
  return request()
    .get("/teachers/profiles")
    .then((response) => {
      store.dispatch({
        payload: { data: response.data.teachers },
        type: types.GET_TEACHERS_API_SUCCEED,
      });

      // this case for calling filter teachers if call search from home page with filter instruments
      if (
        storeTeachers.filter.instruments.length ||
        (storeTeachers.filter.location &&
          storeTeachers.filter.location.value) ||
        (storeTeachers.filter.lessonType &&
          storeTeachers.filter.lessonType.value)
      ) {
        getTeachers(
          {
            filter: storeTeachers.filter,
            page: 1,
            limit: storeTeachers.limit,
          },
          response.data.teachers
        );
      }
    })
    .catch((error) => {
      store.dispatch({
        payload: error.data,
        type: types.GET_TEACHERS_API_FAIL,
      });
    });
}

export function updateFilter(filter) {
  store.dispatch({ payload: filter, type: types.UPDATE_FILTER_TEACHERS });
}
export function setNewDataTeachers(teacher) {
  store.dispatch({ payload: teacher, type: types.SET_NEW_DATA_TEACHERS });
}

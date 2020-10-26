import axios from "axios";
import { API_URL } from "../config";
import { updateIsBadToken } from "../redux/actions/global";

export const request = (opts = {}, optsHeader = {}) => {
  /*
  |--------------------------------------------------
  | Custom axios api
  |--------------------------------------------------
  */

  const defaultOptions = {
    ...opts,
    headers: optsHeader,
  };

  const axiosApi = axios.create({
    baseURL: API_URL,
    ...defaultOptions,
    withCredentials: true,
  });

  // if (process.env.NODE_ENV === "development") {
  //   axiosApi.interceptors.request.use((config) => {
  //     config.params = config.params || {};
  //     config.params["dev"] = "true";
  //     return config;
  //   });
  // }

  // error will be showed in catch block instead of appeared in then
  axiosApi.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      // Handle logout when the token is wrong
      if (
        error.response &&
        (error.response.status === 401)
      ) {
        if (["BAD_TOKEN", "RESTRICTED_ACCESS"].includes(error.response.data.status)) {
          updateIsBadToken(true);
        }
      }

      const errorResponse =
        error && error.response
          ? error.response
          : { data: { status: "SOMETHING_WENT_WRONG" } };
      return Promise.reject(errorResponse);
    }
  );

  return axiosApi;
};

export default request;

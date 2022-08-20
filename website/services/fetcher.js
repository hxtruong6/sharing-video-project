import axios from "axios";
import { ApiCode } from "../utils/constants";

let baseUrl = process.env.BASE_URL;
console.log("BASE_URL: ", baseUrl);

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
    // Authorization: `Bearer ${token}`,
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // const token = localStorage.getItem("token");
    // config.headers["Authorization"] = `Bearer ${token}`;

    console.log("[config] ", config);
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    // return Promise.reject(error);
    return error;
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("[response] ", response);
    return response.data;
  },
  function (error) {
    if (error?.response.status === ApiCode.Unauthorized) {
      localStorage.clear();
    }
    console.log("xxx 300 ser err: ", error.response);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // return Promise.reject(error);
    return error?.response?.data;
  }
);

function setToken(accessToken) {
  axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
}

function clearToken() {
  axiosInstance.defaults.headers.Authorization = undefined;
}

const fetcher = (url, method, params) =>
  axiosInstance[method](url, { ...params });

export default fetcher;

export { setToken, clearToken };

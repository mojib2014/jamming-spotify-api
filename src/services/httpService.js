import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (expectedError) {
    return Promise.reject(error);
  } else {
    console.log("Logging the error", error);
    toast.error("An Unexpected Error occured!");
  }
});

function setHeaders(token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setHeaders,
};

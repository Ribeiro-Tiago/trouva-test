import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: { "Content-Type": "application/json" },
});

// response
axios.interceptors.response.use(
  ({ data }) => data,
  ({ response }) => {
    Promise.reject({ data: response.data, status: response.status });
  }
);

export default axios;

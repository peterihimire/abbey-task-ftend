import axios from "axios";

const baseURL = "http://localhost:8082/api/abbeytask/v1/";

const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

let $axios = axios.create({
  // ...config,
  baseURL,
  headers: config.headers,
  withCredentials: config.withCredentials,
});

export default $axios;

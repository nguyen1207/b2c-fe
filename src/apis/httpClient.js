import axios from "axios";

const baseURL = "http://localhost:8080";

export const api = axios.create({
  baseURL: `${baseURL}/api`,
});

api.interceptors.response.use((response) => {
  return response.data;
});

export const wait = (second) => {
  return new Promise((resolve) => setTimeout(resolve, second * 1000));
};

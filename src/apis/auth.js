import { api } from "./httpClient";

export const sendLoginPayload = async (payload) => {
  return api.post("/auth/login", payload);
};

export const sendRegisterPayload = async (payload) => {
  return api.post("/auth/register", payload);
};

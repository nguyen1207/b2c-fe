import { api, wait } from "./httpClient";

export const getProducts = async (page = 1) => {
  await wait(0);
  return api.get("/products?page=" + page);
};

export const getProductById = async (id) => {
  await wait(0);
  return api.get("products/" + id);
};

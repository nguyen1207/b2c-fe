import { api, wait } from "./httpClient";

export const ordersByUsername = async (username, page = 1) => {
  await wait(0);
  console.log("Bearer " + localStorage.getItem("b2c-token"));
  return api.get(`/orders/${username}?page=` + page, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("b2c-token"),
    },
  });
};

export const getOrderDetails = async (id) => {
  await wait(0);
  return api.get("orders/details/" + id, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("b2c-token"),
    },
  });
};

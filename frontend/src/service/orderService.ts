import axios from "axios";
import { CartProps } from "../interfaces/CartProps";
//import dotenv from "dotenv";
//dotenv.config();

const api = axios.create({
  baseURL: "http://localhost:3000/order",
});

const payment = async ({
  cart,
  userId,
}: {
  userId: string;
  cart: CartProps[];
}) => {
  const res = api
    .post("/create-checkout-session", { cart, userId })
    .then((res) => {
      if (res.data.url) window.open(res.data.url, "_blank", "noreferrer");
      return res.data;
    })
    .catch((err) => err.response.data);

  return res;
};

const getOrdersByUser = async (userId: string) => {
  const res = api
    .get(`/getOrdersByUser/${userId}`)
    .then((res) => res.data)
    .catch((err) => err.response.data);

  return res;
};

export const orderService = { payment, getOrdersByUser };

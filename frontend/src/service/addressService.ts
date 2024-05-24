import axios from "axios";
import { AddressProps } from "../interfaces/AddressProps";

const api = axios.create({
  baseURL: "http://localhost:3000/address",
});

const getAddress = async (token: string) => {
  const res = await api
    .get("/getAddress", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);

  return res;
};

const createAddress = async (address: AddressProps, token: string) => {
  const res = await api
    .post("/createAddress", address, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      location.reload();

      return res.data;
    })
    .catch((err) => err.response.data);

  return res;
};

const updateAddress = async (address: AddressProps, token: string) => {
  const res = await api
    .put("/updateAddress", address, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      location.reload();

      return res.data;
    })
    .catch((err) => err.response.data);

  return res;
};

export const addressService = { getAddress, createAddress, updateAddress };

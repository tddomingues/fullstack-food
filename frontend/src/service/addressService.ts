import axios from "axios";

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

export const addressService = { getAddress };

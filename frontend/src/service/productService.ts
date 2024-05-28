import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/product",
});

const getAllProducts = async () => {
  const res = await api
    .get("/getProducts")
    .then((res) => res.data)
    .catch((err) => err.response.data);

  return res;
};

const getProduct = async (id: string, token: string) => {
  const res = await api
    .get(`/getProduct/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);

  return res;
};

const createProduct = async (data: FormData, token: string) => {
  const res = await api
    .post("/createItem", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);

  return res;
};

const editProduct = async (data: FormData, token: string, id: string) => {
  const res = await api
    .put(`/editProduct/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);

  return res;
};

const deleteProduct = async (_id: string, token: string) => {
  const res = await api
    .delete(`/deleteItem/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);

  return res.data;
};

export const productService = {
  getAllProducts,
  createProduct,
  deleteProduct,
  editProduct,
  getProduct,
};

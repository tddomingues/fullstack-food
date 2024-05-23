import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/product",
});

const getAllProducts = async () => {
  try {
    const products = await api.get("/getProducts");

    return products.data;
  } catch (error) {
    console.log(error);
  }
};

const getProductsByCategory = async (category: string) => {
  try {
    const products = await api.get(`/category/${category}`);

    return products.data;
  } catch (error) {
    console.log(error);
  }
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

  console.log(data);

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
  getProductsByCategory,
  deleteProduct,
  editProduct,
  getProduct,
};

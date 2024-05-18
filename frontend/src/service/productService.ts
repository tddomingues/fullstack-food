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

const createProduct = async (data: FormData, token: string) => {
  try {
    const product = await api.post("/createItem", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return product.data;
  } catch (error) {
    console.log(error);
  }
};

export const productService = {
  getAllProducts,
  createProduct,
  getProductsByCategory,
};

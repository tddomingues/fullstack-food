import { Request, Response } from "express";
import Product from "../model/product";
import { MenuProps } from "../interface/MenuProps";
import User from "../model/user";

const createItem = async (request: Request, response: Response) => {
  const { name, price, category, description }: MenuProps = request.body;

  const imageUrl = request.file?.filename;

  const role = request.userInfo?.role;

  try {
    if (role !== "admin")
      return response.status(400).json({ error: ["Sem permissão."] });

    const item = await Product.create({
      name,
      price,
      category,
      imageUrl,
      description,
    });

    return response.status(200).json(item);
  } catch (error) {
    return response
      .status(400)
      .json({ error: "Erro ao criar um item para o cardápio." });
  }
};

const getAllProducts = async (request: Request, response: Response) => {
  try {
    const menu = await Product.find({});

    return response.status(200).json(menu);
  } catch (error) {
    return response.status(400).json({ error: "Erro ao criar  o cardápio." });
  }
};

const getProduct = async (request: Request, response: Response) => {
  const { id } = request.params;

  try {
    const produto = await Product.findById({ _id: id });

    if (!produto)
      return response.status(400).json({ error: ["Produto não encontrado."] });

    return response.status(200).json(produto);
  } catch (error) {
    return response.status(400).json({ error: "Erro ao criar  o cardápio." });
  }
};

const getByCategory = async (request: Request, response: Response) => {
  const { category } = request.params;

  try {
    const menu = await Product.find({ category });

    return response.status(200).json(menu);
  } catch (error) {
    return response.status(400).json({ error: "Erro ao criar  o cardápio." });
  }
};

const deleteItem = async (request: Request, response: Response) => {
  const { _id } = request.params;
  const email = request.userInfo?.email;
  const role = request.userInfo?.email;
  try {
    if (role !== "admin")
      return response.status(400).json({ error: ["Sem permissão."] });

    const user = await User.findOne({ email });

    if (user?.role === "client")
      return response
        .status(400)
        .json({ error: ["Sem permissão para excluir."] });

    const item = await Product.findById({ _id });

    if (!item)
      return response.status(400).json({ error: ["Produto não encontrado."] });

    await Product.deleteOne({ _id: _id });

    return response
      .status(200)
      .json({ message: "Produto deletado com sucesso." });
  } catch (error) {
    return response.status(400).json({ error: ["Erro ao excluir o produto."] });
  }
};

const editProduct = async (request: Request, response: Response) => {
  const { id } = request.params;
  const { name, category, price, description }: MenuProps = request.body;

  const role = request.userInfo?.role;

  try {
    if (role !== "admin")
      return response.status(400).json({ error: ["Sem permissão."] });

    const produto = await Product.findById({ _id: id }).exec();

    if (!produto)
      return response.status(400).json({ error: ["Produto não encontrado."] });

    if (name) produto.name = name;
    if (category) produto.category = category;
    if (description) produto.description = description;
    if (price) produto.price = price;
    if (request.file?.filename) produto.imageUrl = request.file?.filename;

    await produto.save();

    return response
      .status(200)
      .json({ message: ["Item atualizado com sucesso."] });
  } catch (error) {
    return response
      .status(400)
      .json({ error: ["Erro ao atualizar o produto."] });
  }
};

const menuControllers = {
  createItem,
  getAllProducts,
  deleteItem,
  editProduct,
  getByCategory,
  getProduct,
};

export default menuControllers;

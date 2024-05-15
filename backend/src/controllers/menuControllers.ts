import { Request, Response } from "express";
import Menu from "../model/menu";
import { IMenu } from "../interface/IMenu";

const createItem = async (request: Request, response: Response) => {
  const { name, price, category, imageUrl } = request.body as IMenu;

  try {
    const item = await Menu.create({
      name,
      price,
      category,
      imageUrl,
    });

    return response.status(200).json(item);
  } catch (error) {
    return response
      .status(400)
      .json({ error: "Erro ao criar um item para o cardápio." });
  }
};

const getMenu = async (request: Request, response: Response) => {
  try {
    const menu = await Menu.find({});

    return response.status(200).json(menu);
  } catch (error) {
    return response.status(400).json({ error: "Erro ao criar  o cardápio." });
  }
};

const deleteItem = async (request: Request, response: Response) => {
  const { id } = request.query;

  try {
    const item = await Menu.findById({ _id: id });

    if (!item)
      return response.status(400).json({ error: "Item não encontrado." });

    await Menu.deleteOne({ _id: id });

    return response.status(200).json({ message: "Item deletado com sucesso." });
  } catch (error) {
    return response.status(400).json({ error: "Erro ao criar o cardápio." });
  }
};

const updateItem = async (request: Request, response: Response) => {
  const { id } = request.query;
  const { name, category, price, imageUrl } = request.body as IMenu;

  try {
    const item = await Menu.findById({ _id: id }).exec();

    if (!item)
      return response.status(400).json({ error: "Item não encontrado." });

    if (name) item.name = name;
    if (category) item.category = category;
    if (price) item.price = price;
    if (imageUrl) item.imageUrl = imageUrl;

    await item.save();

    return response
      .status(200)
      .json({ message: "Item atualizado com sucesso." });
  } catch (error) {
    return response.status(400).json({ error: "Erro ao criar o cardápio." });
  }
};

const menuControllers = { createItem, getMenu, deleteItem, updateItem };

export default menuControllers;

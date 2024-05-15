import { Request, Response } from "express";
import { IUser } from "../interface/IUser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user";
import dotenv from "dotenv";
dotenv.config();

const register = async (request: Request, response: Response) => {
  const { name, email, password, confirmPassword }: IUser = request.body;

  try {
    const userExist = await User.findOne({ email });

    if (userExist)
      return response.status(400).json({ error: "Usuário existente." });

    if (password !== confirmPassword)
      return response
        .status(400)
        .json({ error: "Senhas não correspondentes." });

    if (!name || !email)
      return response.status(400).json({ error: "Campo(s) vazios." });

    const newPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: newPassword });

    return response.status(200).json(user);
  } catch (error) {
    return response.status(400).json({ error: "Erro ao criar o usuário." });
  }
};

const login = async (request: Request, response: Response) => {
  const { email, password }: IUser = request.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user)
      return response.status(400).json({ error: "Usuário não registrado." });

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword)
      return response.status(400).json({ error: "Senha inválida." });

    const token = jwt.sign({ userEmail: user.email }, "secredokey");

    return response
      .cookie("token", token, {
        expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
      })
      .status(200)
      .json({ message: "Autorizado com sucesso.", user, token });
  } catch (error) {
    return response.status(400).json({ error: "Erro ao criar o usuário." });
  }
};

const profile = async (request: Request, response: Response) => {
  try {
    return response.status(200).json({ msg: "Rota protegida com token." });
  } catch (error) {
    return response.status(400).json({ error: "Erro ao criar o usuário." });
  }
};

export const userControllers = { register, login, profile };

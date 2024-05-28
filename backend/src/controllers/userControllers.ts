import { Request, Response } from "express";
import { UserProps } from "../interface/UserProps";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user";
import dotenv from "dotenv";
dotenv.config();

const register = async (request: Request, response: Response) => {
  const { name, email, role, password, confirmPassword }: UserProps =
    request.body;

  try {
    const userExist = await User.findOne({ email });

    if (userExist)
      return response.status(400).json({ error: ["Usuário existente."] });

    if (password !== confirmPassword)
      return response
        .status(400)
        .json({ error: ["Senhas não correspondentes."] });

    const newPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: newPassword,
      role: role || "client",
    });

    return response.status(200).json(user);
  } catch (error) {
    return response.status(400).json({ error: ["Erro ao criar o usuário."] });
  }
};

const login = async (request: Request, response: Response) => {
  const { email, password }: UserProps = request.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user)
      return response.status(400).json({ error: ["Usuário não registrado."] });

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword)
      return response.status(400).json({ error: ["Senha inválida."] });

    const token = jwt.sign(
      { email: user.email, role: user.role, id: user._id },
      "secredokey",
    );

    return response
      .cookie("token", JSON.stringify(token), {
        expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
      })
      .cookie(
        "user",
        JSON.stringify({
          name: user.name,
          role: user.role,
          email: user.email,
          _id: user._id,
        }),
        {
          expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
        },
      )
      .status(200)
      .json({ message: "Autorizado com sucesso." });
  } catch (error) {
    return response.status(400).json({ error: ["Erro ao criar o usuário."] });
  }
};

const logout = async (request: Request, response: Response) => {
  try {
    return response
      .clearCookie("token")
      .clearCookie("user")
      .status(200)
      .json({ message: "Logout com sucesso." });
  } catch (error) {
    return response.status(400).json({ error: ["Erro ao fazer o logout."] });
  }
};

const getUser = async (request: Request, response: Response) => {
  try {
    const email = request.userInfo?.email;

    const user = await User.findOne({ email });

    if (!user)
      return response.status(400).json({ error: ["Usuário não cadastrado."] });

    return response.status(200).json(user);
  } catch (error) {
    return response.status(400).json({ error: ["Erro ao criar o usuário."] });
  }
};

export const userControllers = { register, login, getUser, logout };

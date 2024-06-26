import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface JwtPayload {
  email: string;
  role: string;
  id: string;
}

const validateToken = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const [, token] = request.headers.authorization?.split(" ") || [" ", " "];

    if (!token)
      return response.status(400).json({ error: ["Token não encontrado."] });

    const { email, role, id } = jwt.verify(token, "secredokey") as JwtPayload;

    request.userInfo = { email, role, id };

    return next();
  } catch (error) {
    return response
      .status(400)
      .json({ error: ["Erro na validação do token."] });
  }
};

export default validateToken;

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface JwtPayload {
  userEmail: string;
}

const validateToken = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const [, token] = request.headers.authorization?.split(" ") || [" ", " "];

    if (!token)
      return response.status(400).json({ error: "Token não encontrado." });

    const { userEmail } = jwt.verify(token, "secredokey") as JwtPayload;

    response.cookie("userEmail", userEmail, {
      expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
    });

    return next();
  } catch (error) {
    return response.status(400).json({ error: "Erro na validação do token." });
  }
};

export default validateToken;

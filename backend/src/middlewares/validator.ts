import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const validation = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const errors = validationResult(request);

  if (errors.isEmpty()) {
    return next();
  }

  const filteredErrors = errors.array().map((error) => {
    return error.msg;
  });

  response.status(400).json({ error: filteredErrors });
};

export default validation;

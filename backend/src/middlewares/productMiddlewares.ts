import { body } from "express-validator";

const createItemValidation = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("O nome do item deve ser preenchido.")
      .isString()
      .withMessage("O nome é um tipo inválido."),
    body("description")
      .notEmpty()
      .withMessage("A descrição do item deve ser preenchido.")
      .isString()
      .withMessage("A descrição é um tipo inválido."),
    body("category")
      .notEmpty()
      .withMessage("O tipo da categoria do item deve ser preenchido.")
      .isString()
      .withMessage("A categoria é um tipo inválido.")
      .isIn(["burguer", "pizza", "drink"])
      .withMessage("Essa categoria é inválida."),
    body("price")
      .notEmpty()
      .withMessage("O preço do item deve ser preenchido.")
      .isString()
      .withMessage("O preço é um tipo inválido."),
    body("file").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("A imagem é obrigatória.");
      }
      return true;
    }),
  ];
};

const menuMiddlewares = { createItemValidation };

export default menuMiddlewares;

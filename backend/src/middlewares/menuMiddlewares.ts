import { body } from "express-validator";

const createItemValidation = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("O nome do item deve ser preenchido.")
      .isString()
      .withMessage("O nome é um tipo inválido."),
    body("category")
      .notEmpty()
      .withMessage("O tipo da categoria do item deve ser preenchido.")
      .isString()
      .withMessage("A categoria é um tipo inválido.")
      .isIn(["burguers", "pizzas", "drinks"])
      .withMessage("Essa categoria é inválida."),
    body("price")
      .notEmpty()
      .withMessage("O preço do item deve ser preenchido.")
      .isNumeric()
      .withMessage("O preço é um tipo inválido."),
    body("imageUrl")
      .notEmpty()
      .withMessage("A imagem do item deve ser inserida.")
      .isURL()
      .withMessage("Insira uma URL válida."),
  ];
};

const menuMiddlewares = { createItemValidation };

export default menuMiddlewares;

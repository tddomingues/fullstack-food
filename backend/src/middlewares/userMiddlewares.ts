import { body } from "express-validator";

const validateUseRegistration = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("O nome do usuário é obrigatória.")
      .isString()
      .withMessage("O nome é um tipo inválido."),
    body("role")
      .notEmpty()
      .withMessage("O nome do usuário é obrigatória.")
      .isString()
      .withMessage("O nome é um tipo inválido.")
      .isIn(["admin", "client"])
      .withMessage("Essa categoria é inválida."),
    body("password")
      .notEmpty()
      .withMessage("O nome do usuário é obrigatória.")
      .isString()
      .withMessage("O nome é um tipo inválido."),
    body("confirmPassword")
      .notEmpty()
      .withMessage("O nome do usuário é obrigatória.")
      .isString()
      .withMessage("O nome é um tipo inválido.")
      .custom((value: string, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Senhas não correspondentes.");
        }
        return true;
      }),
  ];
};

const userMiddlewares = { validateUseRegistration };

export default userMiddlewares;

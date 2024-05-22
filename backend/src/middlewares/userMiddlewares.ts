import { body } from "express-validator";

const validateUseRegistration = () => {
  return [
    body("name").notEmpty().withMessage("O nome do usuário é obrigatória."),
    body("email").notEmpty().withMessage("O email do usuário é obrigatória."),
    //body("role").isIn(["admin", "client"]).withMessage("Papel é inválida."),
    body("password").notEmpty().withMessage("A senha é obrigatória."),
    body("confirmPassword")
      .notEmpty()
      .withMessage("A senha é obrigatória.")
      .custom((value: string, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Senhas não correspondentes.");
        }
        return true;
      }),
  ];
};

const validateUseLogin = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("O nome do usuário é obrigatória.")
      .isString()
      .withMessage("O nome é um tipo inválido."),
    body("password")
      .notEmpty()
      .withMessage("A senha do usuário é obrigatória.")
      .isString()
      .withMessage("A senha é um tipo inválido."),
  ];
};

const userMiddlewares = { validateUseRegistration, validateUseLogin };

export default userMiddlewares;

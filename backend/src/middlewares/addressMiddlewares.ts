import { body } from "express-validator";

const createAddressValidation = () => {
  return [
    body("city").notEmpty().withMessage("Campo obrigatório."),
    body("state").notEmpty().withMessage("Campo obrigatório."),
    body("postalCode").notEmpty().withMessage("Campo do CEP é obrigatório."),
    body("address").notEmpty().withMessage("Campo do endereço é obrigatório."),
    body("userId").notEmpty().withMessage("Campo obrigatório."),
  ];
};

const updateAddressValidation = () => {
  return [
    body("city").notEmpty().withMessage("Campo obrigatório."),
    body("state").notEmpty().withMessage("Campo obrigatório."),
    body("postalCode").notEmpty().withMessage("Campo do CEP é obrigatório."),
    body("address").notEmpty().withMessage("Campo do endereço é obrigatório."),
    body("userId").notEmpty().withMessage("Campo obrigatório."),
  ];
};

export const addressMiddlewares = {
  createAddressValidation,
  updateAddressValidation,
};

import express, { Router } from "express";
import { addressControllers } from "../controllers/addressControllers";
import validateToken from "../middlewares/authorizationMiddleware";
import { addressMiddlewares } from "../middlewares/addressMiddlewares";
import validation from "../middlewares/validator";

const router: Router = express.Router();

router.post(
  "/createAddress",
  validateToken,
  addressMiddlewares.createAddressValidation(),
  validation,
  addressControllers.createAddress,
);
router.get("/getAddress", validateToken, addressControllers.getAddress);
router.put(
  "/updateAddress",
  validateToken,
  addressMiddlewares.updateAddressValidation(),
  validation,
  addressControllers.updateAddress,
);

export const addressRoutes = router;

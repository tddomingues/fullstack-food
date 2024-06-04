import express, { Router } from "express";

//controllers
import { userControllers } from "../controllers/userControllers";

//middlewares
import validateToken from "../middlewares/authorizationMiddleware";
import userMiddlewares from "../middlewares/userMiddlewares";
import validation from "../middlewares/validator";

const router: Router = express.Router();

router.post(
  "/register",
  userMiddlewares.validateUseRegistration(),
  validation,
  userControllers.register,
);
router.post(
  "/login",
  userMiddlewares.validateUseLogin(),
  validation,
  userControllers.login,
);
router.get("/logout", userControllers.logout);
router.get("/getUser", validateToken, userControllers.getUser);

export default router;

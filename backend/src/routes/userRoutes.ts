import express, { Router } from "express";
import { userControllers } from "../controllers/userControllers";
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
router.post("/login", userControllers.login);
router.get("/profile", validateToken, userControllers.profile);

export default router;

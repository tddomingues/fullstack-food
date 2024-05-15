import express, { Router } from "express";
import { userControllers } from "../controllers/userControllers";
import validateToken from "../middlewares/authorizationMiddleware";

const router: Router = express.Router();

router.post("/register", userControllers.register);
router.post("/login", userControllers.login);
router.get("/profile", validateToken, userControllers.profile);

export default router;

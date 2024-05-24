import express, { Router } from "express";
import { addressControllers } from "../controllers/addressControllers";
import validateToken from "../middlewares/authorizationMiddleware";

const router: Router = express.Router();

router.post("/createAddress", validateToken, addressControllers.createAddress);
router.get("/getAddress", validateToken, addressControllers.getAddress);
router.put("/updateAddress", validateToken, addressControllers.updateAddress);

export const addressRoutes = router;

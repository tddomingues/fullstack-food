import express, { Router } from "express";
import { orderControllers } from "../controllers/orderControllers";
import webhookStriper from "../config/webhook-striper";

const router: Router = express.Router();

router.post("/create-checkout-session", orderControllers.payment);
router.get("/getOrdersByUser/:id", orderControllers.getOrdersByUser);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  webhookStriper,
);

export const orderRoutes = router;

import express, { Router } from "express";
import menuControllers from "../controllers/menuControllers";
import validation from "../middlewares/validator";
import menuMiddlewares from "../middlewares/menuMiddlewares";

const router: Router = express.Router();

router.post(
  "/createItem",
  menuMiddlewares.createItemValidation(),
  validation,
  menuControllers.createItem,
);
router.get("/getMenu", menuControllers.getMenu);
router.delete("/deleteItem", menuControllers.deleteItem);
router.put("/updateItem", menuControllers.updateItem);

export default router;

import express, { Router } from "express";
import productControllers from "../controllers/productControllers";
import validation from "../middlewares/validator";
import productMiddlewares from "../middlewares/productMiddlewares";
import uploadFile from "../middlewares/uploadMiddleware";
import validateToken from "../middlewares/authorizationMiddleware";

const router: Router = express.Router();

router.post(
  "/createItem",
  validateToken,
  uploadFile,
  productMiddlewares.createItemValidation(),
  validation,
  productControllers.createItem,
);
router.get("/getProducts", productControllers.getMenu);
router.delete("/deleteItem", productControllers.deleteItem);
router.put("/updateItem", productControllers.updateItem);

export default router;

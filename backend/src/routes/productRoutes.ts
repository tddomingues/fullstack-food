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
router.get("/getProducts", productControllers.getAllProducts);
router.get("/category/:category", productControllers.getByCategory);
router.get("/getProduct/:id", productControllers.getProduct);
router.delete("/deleteItem/:_id", validateToken, productControllers.deleteItem);
router.put(
  "/editProduct/:id",
  validateToken,
  uploadFile,
  productControllers.editProduct,
);

export default router;

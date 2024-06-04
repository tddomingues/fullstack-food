import express, { Router } from "express";

//controllers
import productControllers from "../controllers/productControllers";

//middlewares
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
router.get("/getProduct/:id", productControllers.getProduct);
router.delete("/deleteItem/:_id", validateToken, productControllers.deleteItem);
router.put(
  "/editProduct/:id",
  validateToken,
  uploadFile,
  productControllers.editProduct,
);

export default router;

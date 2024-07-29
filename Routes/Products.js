import express from "express";
import {
  addProduct,
  deleteProduct,
  fetchOneProduct,
  fetchProducts,
  updateProduct,
} from "../Controllers/product.js";

const productRouter = express.Router();

productRouter.get("/", fetchProducts);
productRouter.get("/:id", fetchOneProduct);
productRouter.post("/", addProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;

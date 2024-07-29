import express from "express";
import {
  addProduct,
  deleteProduct,
  fetchOneProduct,
  fetchProducts,
  updateProduct,
} from "../Controllers/product.js";
import authenticate from "../middleware/authentication.js";

const productRouter = express.Router();

productRouter.get("/", fetchProducts);
productRouter.get("/:id", fetchOneProduct);
productRouter.post("/", authenticate, addProduct);
productRouter.put("/:id", authenticate, updateProduct);
productRouter.delete("/:id", authenticate, deleteProduct);

export default productRouter;

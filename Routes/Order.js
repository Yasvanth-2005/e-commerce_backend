import express from "express";
import authenticate from "../middleware/authentication.js";
import { placeOrder, getUserOrder } from "../Controllers/Order.js";

const orderRouter = express.Router();

orderRouter.post("/", authenticate, placeOrder);
orderRouter.get("/", authenticate, getUserOrder);

export default orderRouter;

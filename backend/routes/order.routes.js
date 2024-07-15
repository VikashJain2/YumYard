import {
    cancelOrder,
  listOrders,
  placeOrder,
  updateStatus,
  userOrders,
  verifyOrder,
} from "../controllers/order.controllers.js";
import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";

const orderRouter = express.Router();
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status",updateStatus)
orderRouter.post("/cancel",cancelOrder)

export default orderRouter;

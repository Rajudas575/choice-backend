import express from "express";
import OrderController from "../controllers/OrderController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", authMiddleware, OrderController.createOrder); 

router.get("/user", authMiddleware, OrderController.getUserOrderHistory);

router.put("/:orderId/cancel", authMiddleware, OrderController.cancelOrder);

router.get("/:orderId", authMiddleware, OrderController.getOrderById);

router.get(
  "/item/:orderItemId",
  authMiddleware,
  OrderController.getOrderItemById,
);

export default router;

import express from "express";
import sellerMiddleware from "../middlewares/sellerAuthMiddleware1.js";
import OrderController from "../controllers/OrderController.js";

const router = express.Router();

router.get("/", sellerMiddleware, OrderController.getSellersOrders);

router.patch(
  "/:orderId/status/:orderStatus",
  sellerMiddleware,
  OrderController.updateOrderStatus,
);

export default router;

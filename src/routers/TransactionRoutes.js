import express from "express";
import sellerMiddleware from "../middlewares/sellerAuthMiddleware1.js";
import TransactionController from "../controllers/TransactionController.js";

const router = express.Router();

router.get(
  "/seller",
  sellerMiddleware,
  TransactionController.getTransactionBySeller,
);

export default router;

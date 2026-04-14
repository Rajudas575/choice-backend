import express from "express";
import sellerMiddleware from "../middlewares/sellerAuthMiddleware1.js";
import sellerReportController from "../controllers/sellerReportController.js";

const router = express.Router();

router.get("/", sellerMiddleware, sellerReportController.getSellerReport);

export default router;

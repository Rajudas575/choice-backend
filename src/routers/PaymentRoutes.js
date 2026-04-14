import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
// import paymentController from "../controllers/paymentController.js";
import paymentSuccessHandler from "../controllers/paymentController.js";

const router = express.Router();

router.get("/:paymentId", authMiddleware, paymentSuccessHandler);

export default router;

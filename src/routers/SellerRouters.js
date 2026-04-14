import express from "express";
const router = express.Router();
import sellerController from "../controllers/sellerController.js";
import sellerMiddleware from "../middlewares/sellerAuthMiddleware1.js";

router.get("/profile", sellerMiddleware, sellerController.getSellerProfile);
router.post("/", sellerController.createSeller);
router.get("/", sellerController.getAllSellers);
router.patch("/", sellerMiddleware, sellerController.updateSeller);

router.post("/verify/login-otp", sellerController.verifyLoginOtp);

export default router;

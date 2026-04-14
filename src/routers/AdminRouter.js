import express from "express";
const router = express.Router();
import sellerController from "../controllers/sellerController.js";

router.patch(
  "/seller/:id/status/:status",
  sellerController.updateSellerAccountStatus,
);

export default router;

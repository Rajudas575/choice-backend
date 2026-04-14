import express from "express";
import sellerMiddleware from "../middlewares/sellerAuthMiddleware1.js";
import ProductController from "../controllers/productController.js";

const router = express.Router();

router.get("/", sellerMiddleware, ProductController.getProductsBySellerId);

router.post("/", sellerMiddleware, ProductController.createProduct);

router.delete("/:productId", sellerMiddleware, ProductController.deleteProduct);

router.patch("/:productId", sellerMiddleware, ProductController.updateProduct);

export default router;

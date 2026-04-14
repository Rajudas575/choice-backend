import express from "express";
import productController from "../controllers/productController.js";

const router = express.Router();

router.get("/search", productController.searchProduct);

router.get("/", productController.getAllProducts);

router.get("/:productId", productController.getProductById);

export default router;

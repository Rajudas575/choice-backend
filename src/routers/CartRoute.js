import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import CartController from "../controllers/CartController.js";

const router = express.Router();

router.get("/", authMiddleware, CartController.findUserCartHandler);

router.put("/add", authMiddleware, CartController.addItemToCart);

router.delete(
  "/item/:cartItemId",
  authMiddleware,
  CartController.deleteCartItemHandler,
);

router.put(
  "/item/:cartItemId",
  authMiddleware,
  CartController.updateCartItemHandler,
);

export default router;

import express from "express";
const router = express.Router();
import { getUserProfileByJwt } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

router.get("/profile", authMiddleware, getUserProfileByJwt);

export default router;

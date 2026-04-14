import express from "express";
import DealController from "../controllers/DealController.js";

const router = express.Router();

router.get("/", DealController.getAllDeals);

router.post("/", DealController.createDeals);

router.patch("/:id", DealController.updateDeal);

router.delete("/:id", DealController.deleteDeals);

export default router;

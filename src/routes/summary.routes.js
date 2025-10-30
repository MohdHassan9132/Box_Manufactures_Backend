import express from "express";
import { getDailySummary } from "../controllers/summary.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// GET /api/summary/daily?date=YYYY-MM-DD  (protected)
router.get("/daily", authMiddleware, getDailySummary);

export default router;

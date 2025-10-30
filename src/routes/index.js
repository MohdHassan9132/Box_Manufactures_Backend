import express from "express";

import enterpriseRoutes from "./enterprise.routes.js"; // public (register/create enterprise etc.)
import authRoutes from "./auth.routes.js";
import labourRoutes from "./labour.routes.js";
import jobRoutes from "./job.routes.js";
import workdoneRoutes from "./workdone.routes.js";
import transportationRoutes from "./transportation.routes.js";
import inventoryRoutes from "./inventory.routes.js";
import summaryRoutes from "./summary.routes.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.use("/enterprise", enterpriseRoutes);
router.use("/auth", authRoutes);

// Protected data routes — apply authMiddleware at route level
router.use("/labour", authMiddleware, labourRoutes);
router.use("/job", authMiddleware, jobRoutes);
router.use("/workdone", authMiddleware, workdoneRoutes);
router.use("/transportation", authMiddleware, transportationRoutes);
router.use("/inventory", authMiddleware, inventoryRoutes);

// Summary (protected inside summary.routes)
router.use("/summary", summaryRoutes);

export default router;

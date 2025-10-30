import express from "express";
import { createInventory, getInventoryByEnterprise } from "../controllers/inventory.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(authMiddleware)

router.post("/", createInventory);
router.get("/:enterpriseId", getInventoryByEnterprise);

export default router;

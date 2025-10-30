import express from "express";
import { upsertInventory, getInventoryByEnterprise } from "../controllers/inventory.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(authMiddleware);

router.post("/", upsertInventory); // ✅ create or update
router.get("/", getInventoryByEnterprise);

export default router;

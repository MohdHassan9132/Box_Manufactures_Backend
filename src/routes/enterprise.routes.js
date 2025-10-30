import express from "express";
import { createEnterprise, getEnterprises, getEnterpriseById } from "../controllers/enterprise.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", createEnterprise);
router.get("/", getEnterprises);
router.get("/:id", getEnterpriseById);

export default router;

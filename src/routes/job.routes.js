import express from "express";
import { createJob, getJobsByEnterprise } from "../controllers/job.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(authMiddleware)

router.post("/", createJob);
router.get("/:enterpriseId", getJobsByEnterprise);

export default router;

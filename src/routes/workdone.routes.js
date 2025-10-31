import express from "express";
import { createWorkDone, getTodayWorkDone } from "../controllers/workdone.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createWorkDone);
router.get("/", getTodayWorkDone); // no enterpriseId in params

export default router;

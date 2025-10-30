import express from "express";
import { createWorkDone, getWorkDone } from "../controllers/workdone.controller.js";

const router = express.Router();

router.post("/", createWorkDone);
router.get("/:enterpriseId", getWorkDone);

export default router;

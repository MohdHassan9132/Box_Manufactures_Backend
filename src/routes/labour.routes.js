import express from "express";
import { createLabour, getLaboursByEnterprise } from "../controllers/labour.controller.js";

const router = express.Router();

router.post("/", createLabour);
router.get("/:enterpriseId", getLaboursByEnterprise);

export default router;

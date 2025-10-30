import express from "express";
import { createTransportation, getTransportationByDate } from "../controllers/transportation.controller.js";

const router = express.Router();

router.post("/", createTransportation);
router.get("/:enterpriseId", getTransportationByDate);

export default router;

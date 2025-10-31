import express from "express";
import { createTransportation, getTransportationByDate } from "../controllers/transportation.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(authMiddleware);

// create new transport entry
router.post("/", createTransportation);

// get today's transport entries for logged enterprise
router.get("/", getTransportationByDate);

export default router;

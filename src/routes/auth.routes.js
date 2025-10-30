import express from "express";
import { registerEnterprise, loginEnterprise, logoutEnterprise, getCurrentEnterprise } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Register enterprise (creates account + cookie)
router.post("/register", registerEnterprise);

// Login (returns cookie)
router.post("/login", loginEnterprise);

// Logout (clears cookie)
router.post("/logout", logoutEnterprise);

// Get current enterprise (protected)
router.get("/me", authMiddleware, getCurrentEnterprise);

export default router;

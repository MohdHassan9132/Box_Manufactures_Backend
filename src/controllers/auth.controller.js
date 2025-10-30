import { Enterprise } from "../models/index.js";
import { signToken } from "../utils/token.js";

/**
 * Register (create enterprise) - returns cookie
 * Body: { name, password, address?, owner_name?, gst? }
 */
export const registerEnterprise = async (req, res) => {
  try {
    const { name, password, address, owner_name, gst } = req.body;

    if (!name || !password) {
      return res.status(400).json({ success: false, message: "Name and password required" });
    }

    const exists = await Enterprise.findOne({ name });
    if (exists) return res.status(400).json({ success: false, message: "Enterprise already exists" });

    const enterprise = await Enterprise.create({ name, password, address, owner_name, gst });

    const token = signToken({ enterpriseId: enterprise._id, name: enterprise.name });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ success: true, data: { id: enterprise._id, name: enterprise.name } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Login - set cookie
 * Body: { name, password }
 */
export const loginEnterprise = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) return res.status(400).json({ success: false, message: "Name and password required" });

    const enterprise = await Enterprise.findOne({ name });
    if (!enterprise) return res.status(404).json({ success: false, message: "Enterprise not found" });

    const ok = await enterprise.comparePassword(password);
    if (!ok) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = signToken({ enterpriseId: enterprise._id, name: enterprise.name });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, message: "Login successful", data: { id: enterprise._id, name: enterprise.name } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Logout - clear cookie
 */
export const logoutEnterprise = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out" });
};

/**
 * Get current enterprise (requires auth middleware)
 */
export const getCurrentEnterprise = async (req, res) => {
  try {
    // auth middleware attaches req.enterprise
    const ent = req.enterprise;
    if (!ent) return res.status(401).json({ success: false, message: "Not authenticated" });
    const safe = {
      id: ent._id,
      name: ent.name,
      address: ent.address,
      owner_name: ent.owner_name,
      gst: ent.gst,
      createdAt: ent.createdAt,
      updatedAt: ent.updatedAt
    };
    res.status(200).json({ success: true, data: safe });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

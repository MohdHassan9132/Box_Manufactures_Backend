  import { verifyToken } from "../utils/token.js";
  import { Enterprise } from "../models/index.js";

  export const authMiddleware = async (req, res, next) => {
    try {
      const token = req.cookies?.token;
      if (!token) return res.status(401).json({ success: false, message: "Not authenticated" });

      const decoded = verifyToken(token);
      if (!decoded || !decoded.enterpriseId) return res.status(401).json({ success: false, message: "Invalid token" });

      const enterprise = await Enterprise.findById(decoded.enterpriseId);
      if (!enterprise) return res.status(404).json({ success: false, message: "Enterprise not found" });

      req.enterprise = enterprise; // attach enterprise for controllers
      next();
    } catch (err) {
      return res.status(401).json({ success: false, message: "Authentication failed" });
    }
  };

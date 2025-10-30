import { Enterprise } from "../models/index.js";

// Create Enterprise
export const createEnterprise = async (req, res) => {
  try {
    const enterprise = await Enterprise.create(req.body);
    res.status(201).json({ success: true, data: enterprise });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get All Enterprises
export const getEnterprises = async (req, res) => {
  try {
    const enterprises = await Enterprise.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: enterprises });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get One
export const getEnterpriseById = async (req, res) => {
  try {
    const enterprise = await Enterprise.findById(req.params.id);
    if (!enterprise) return res.status(404).json({ message: "Enterprise not found" });
    res.status(200).json({ success: true, data: enterprise });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

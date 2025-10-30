import { Labour } from "../models/index.js";

// Create labour entry
export const createLabour = async (req, res) => {
  try {
    const labour = await Labour.create({
      ...req.body,
      enterprise_id: req.enterprise._id,
    });
    res.status(201).json({ success: true, data: labour });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get labours for logged-in enterprise
export const getLaboursByEnterprise = async (req, res) => {
  try {
    const labours = await Labour.find({ enterprise_id: req.enterprise._id });
    res.status(200).json({ success: true, data: labours });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

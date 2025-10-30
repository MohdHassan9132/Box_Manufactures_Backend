import { WorkDone } from "../models/index.js";

// Create daily work done record
export const createWorkDone = async (req, res) => {
  try {
    const work = await WorkDone.create({
      ...req.body,
      enterprise_id: req.enterprise._id,
    });
    res.status(201).json({ success: true, data: work });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all by enterprise (with optional date filters)
export const getWorkDone = async (req, res) => {
  try {
    const { from, to } = req.query;
    const enterpriseId = req.enterprise._id;

    let data;
    if (from && to) {
      data = await WorkDone.getByDateRange(enterpriseId, new Date(from), new Date(to));
    } else {
      data = await WorkDone.find({ enterprise_id: enterpriseId }).sort({ date: -1 });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

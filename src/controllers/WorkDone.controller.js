import { WorkDone } from "../models/index.js";

// ✅ Create Work Done Entry
export const createWorkDone = async (req, res) => {
  try {
    const work = await WorkDone.create({
      ...req.body,
      enterprise_id: req.enterprise._id,
    });

    res.status(201).json({ success: true, data: work });
  } catch (error) {
    console.error("Error creating work done:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ Get Today’s Work Done Entries
export const getTodayWorkDone = async (req, res) => {
  try {
    const enterpriseId = req.enterprise._id;
    const now = new Date();

    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    const data = await WorkDone.find({
      enterprise_id: enterpriseId,
      date: { $gte: startOfDay, $lte: endOfDay },
    }).sort({ date: -1 });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching today's work done:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

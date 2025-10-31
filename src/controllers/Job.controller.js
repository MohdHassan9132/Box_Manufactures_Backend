import { Job } from "../models/index.js";

// ✅ Create new Job entry
export const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      enterprise_id: req.enterprise._id,
      date: new Date(), // ensure today’s date is stored
    });

    res.status(201).json({ success: true, data: job });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ Get today's Jobs (filtered by enterprise + today's date)
export const getJobsByEnterprise = async (req, res) => {
  try {
    const now = new Date();

    // Calculate today's start and end timestamps
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    const jobs = await Job.find({
      enterprise_id: req.enterprise._id,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

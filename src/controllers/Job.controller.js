import { Job } from "../models/index.js";

export const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      enterprise_id: req.enterprise._id,
    });
    res.status(201).json({ success: true, data: job });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getJobsByEnterprise = async (req, res) => {
  try {
    const jobs = await Job.findByEnterprise(req.enterprise._id);
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

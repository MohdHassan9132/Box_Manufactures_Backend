import { Transportation } from "../models/index.js";

export const createTransportation = async (req, res) => {
  try {
    const transport = await Transportation.create({
      ...req.body,
      enterprise_id: req.enterprise._id,
    });
    res.status(201).json({ success: true, data: transport });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get daily transport by enterprise
export const getTransportationByDate = async (req, res) => {
  try {
    const { date } = req.query;
    const data = await Transportation.getByDate(req.enterprise._id, new Date(date));
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

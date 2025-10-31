import { Transportation } from "../models/index.js";

// ✅ Create a new transportation log
export const createTransportation = async (req, res) => {
  try {
    const transport = await Transportation.create({
      ...req.body,
      enterprise_id: req.enterprise._id,
      date: new Date(), // store today's date
    });

    res.status(201).json({ success: true, data: transport });
  } catch (error) {
    console.error("Error creating transportation:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ Get today's transportation logs (isolated by date)
export const getTransportationByDate = async (req, res) => {
  try {
    const now = new Date();

    // calculate start and end of current day properly
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    const data = await Transportation.find({
      enterprise_id: req.enterprise._id,
      date: { $gte: startOfDay, $lte: endOfDay },
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching transportation logs:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

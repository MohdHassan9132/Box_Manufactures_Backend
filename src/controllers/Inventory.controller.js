import { Inventory } from "../models/index.js";

// Create or Update today's inventory
export const upsertInventory = async (req, res) => {
  try {
    const { date } = req.body;
    if (!date)
      return res.status(400).json({ success: false, message: "Date is required" });

    const enterpriseId = req.enterprise._id;

    // ✅ Normalize date (ignore time zone offsets)
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    // ✅ Create start & end range for same day
    const startOfDay = new Date(normalizedDate);
    const endOfDay = new Date(normalizedDate);
    endOfDay.setHours(23, 59, 59, 999);

    // ✅ Find existing inventory by range (not exact match)
    const existing = await Inventory.findOne({
      enterprise_id: enterpriseId,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    let inventory;
    if (existing) {
      // ✅ Update existing record
      await Inventory.updateOne({ _id: existing._id }, { $set: req.body });
      inventory = await Inventory.findById(existing._id);
    } else {
      // ✅ Create new record
      inventory = await Inventory.create({
        ...req.body,
        date: normalizedDate,
        enterprise_id: enterpriseId,
      });
    }

    res.status(200).json({ success: true, data: inventory });
  } catch (error) {
    console.error("Inventory upsert error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};


// Get all inventory sorted by date
export const getInventoryByEnterprise = async (req, res) => {
  try {
    const inventories = await Inventory.getSorted(req.enterprise._id);
    res.status(200).json({ success: true, data: inventories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

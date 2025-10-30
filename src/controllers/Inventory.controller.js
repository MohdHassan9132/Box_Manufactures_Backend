import { Inventory } from "../models/index.js";

// Create inventory entry (auto enterprise)
export const createInventory = async (req, res) => {
  try {
    const inventory = await Inventory.create({
      ...req.body,
      enterprise_id: req.enterprise._id, // ✅ auto-attach enterprise
    });
    res.status(201).json({ success: true, data: inventory });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get inventory sorted by date
export const getInventoryByEnterprise = async (req, res) => {
  try {
    const inventories = await Inventory.getSorted(req.enterprise._id); // ✅ from token
    res.status(200).json({ success: true, data: inventories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

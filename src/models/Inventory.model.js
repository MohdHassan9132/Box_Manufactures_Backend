import mongoose from "mongoose";

const laminationFilmSchema = new mongoose.Schema({
  type: String,
  size: String,
  quantity: Number,
}, { _id: false });

const dieSchema = new mongoose.Schema({
  size: String,
  job_name: String,
}, { _id: false });

const inventorySchema = new mongoose.Schema({
  enterprise_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enterprise",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  lamination_films: [laminationFilmSchema],
  empty_fevicol_containers: Number,
  die: [dieSchema],
  corugation_rolls: { count: Number },
  pin_rolls: { count: Number },
}, { timestamps: true });

// 🔹 Unique per enterprise per day
inventorySchema.index({ enterprise_id: 1, date: 1 }, { unique: true });

// 🔹 Static helper: get inventory sorted by date
inventorySchema.statics.getSorted = function (enterpriseId) {
  return this.find({ enterprise_id: enterpriseId }).sort({ date: -1 });
};

// 🔹 Difference logic (for phase 2)
inventorySchema.methods.calculateDifference = function (prevInventory) {
  if (!prevInventory) return {};
  const diff = {};
  diff.empty_fevicol_containers =
    (this.empty_fevicol_containers ?? 0) - (prevInventory.empty_fevicol_containers ?? 0);
  diff.corugation_rolls =
    (this.corugation_rolls?.count ?? 0) - (prevInventory.corugation_rolls?.count ?? 0);
  diff.pin_rolls =
    (this.pin_rolls?.count ?? 0) - (prevInventory.pin_rolls?.count ?? 0);
  return diff;
};

export const Inventory = mongoose.model("Inventory", inventorySchema);

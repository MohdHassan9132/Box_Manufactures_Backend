import mongoose from "mongoose";

const workDoneSchema = new mongoose.Schema({
  enterprise_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enterprise",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  labour_name: {
    type: String,
    required: true
  },
  work_type: String,
  job_name: String,
  no_of_sheets: Number,
  wage: Number
}, { timestamps: true });

// 🔹 Static method to fetch data date-wise
workDoneSchema.statics.getByDateRange = function (enterpriseId, from, to) {
  return this.find({
    enterprise_id: enterpriseId,
    date: { $gte: from, $lte: to }
  }).sort({ date: 1 });
};

// 🔹 Instance method (if needed later)
workDoneSchema.methods.getWageInfo = function () {
  return `${this.labour_name} earned ₹${this.wage} on ${this.date.toDateString()}`;
};

export const WorkDone = mongoose.model("WorkDone", workDoneSchema);

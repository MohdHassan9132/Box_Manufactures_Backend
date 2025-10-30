import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  enterprise_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enterprise",
    required: true
  },
  job_name: {
    type: String,
    required: true,
    trim: true
  },
  size: String,
  no_of_sheets: Number,
  no_of_boxes: Number,
  paper_cost: Number
}, { timestamps: true });

jobSchema.statics.findByEnterprise = function (enterpriseId) {
  return this.find({ enterprise_id: enterpriseId });
};

export const Job = mongoose.model("Job", jobSchema);

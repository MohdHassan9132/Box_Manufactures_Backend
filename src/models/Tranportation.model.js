import mongoose from "mongoose";

const transportationSchema = new mongoose.Schema({
  enterprise_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enterprise",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  driver_name: String,
  source: String,
  destination: String,
  transport_wage: Number,
  no_of_sacks: Number,
  no_of_boxes: Number,
  job_name: String,
  work_type: String
}, { timestamps: true });

transportationSchema.statics.getByDate = function (enterpriseId, date) {
  return this.find({ enterprise_id: enterpriseId, date });
};

export const Transportation = mongoose.model("Transportation", transportationSchema);

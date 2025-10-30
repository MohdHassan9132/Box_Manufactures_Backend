import mongoose from "mongoose";

const labourSchema = new mongoose.Schema({
  enterprise_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enterprise",
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  occupation: String,
  age: Number,
  joined_on: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export const Labour = mongoose.model("Labour", labourSchema);

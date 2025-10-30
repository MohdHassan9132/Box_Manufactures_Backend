import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const enterpriseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  address: String,
  owner_name: String,
  gst: String,
  password: {
    type: String,
    required: true,
    minlength: 6,
  }
}, { timestamps: true });

enterpriseSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

enterpriseSchema.methods.comparePassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

enterpriseSchema.methods.generateToken = function () {
  return jwt.sign(
    { enterpriseId: this._id, name: this.name },
    process.env.JWT_SECRET || "supersecretkey",
    { expiresIn: process.env.JWT_EXPIRES || "7d" }
  );
};

export const Enterprise = mongoose.model("Enterprise", enterpriseSchema);

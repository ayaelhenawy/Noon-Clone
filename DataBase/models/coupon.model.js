import mongoose from "mongoose";

const couponSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Coupon name is required"],
    trim: true,
    unique: true,
  },
  expire: {
    type: Date,
    required: [true, "Coupon expiration date is required"],
  },
  discount: {
    type: Number,
    required: [true, "Coupon discount is required"],
    min: [0, "Discount must be positive"],
    max: [100, "Discount cannot exceed 100%"],
  },
}, { timestamps: true });

export const couponModel = mongoose.model("coupon", couponSchema);

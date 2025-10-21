import { catchError } from "../../middleware/catchGlobalError.js";
import { couponModel } from "../../../DataBase/models/coupon.model.js";

/**
 * @desc    Create new coupon
 * @route   POST /api/v1/coupons
 * @access  Private/Admin-Manager
 */
const createCoupon = catchError(async (req, res) => {
  const coupon = new couponModel(req.body);
  await coupon.save();
  res.status(201).json({ message: "success", coupon });
});

/**
 * @desc    Get all coupons
 * @route   GET /api/v1/coupons
 * @access  Private/Admin-Manager
 */
const getAllCoupons = catchError(async (req, res) => {
  const coupons = await couponModel.find();
  res.status(200).json({ message: "success", count: coupons.length, coupons });
});

/**
 * @desc    Get specific coupon by id
 * @route   GET /api/v1/coupons/:id
 * @access  Private/Admin-Manager
 */
const getSpecificCoupon = catchError(async (req, res) => {
  const coupon = await couponModel.findById(req.params.id);
  if (!coupon) {
    return res.status(404).json({ message: "Coupon not found" });
  }
  res.status(200).json({ message: "success", coupon });
});

/**
 * @desc    Update specific coupon
 * @route   PUT /api/v1/coupons/:id
 * @access  Private/Admin-Manager
 */
const updateCoupon = catchError(async (req, res) => {
  const coupon = await couponModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!coupon) {
    return res.status(404).json({ message: "Coupon not found" });
  }
  res.status(200).json({ message: "success", coupon });
});

/**
 * @desc    Delete specific coupon
 * @route   DELETE /api/v1/coupons/:id
 * @access  Private/Admin
 */
const deleteCoupon = catchError(async (req, res) => {
  const coupon = await couponModel.findByIdAndDelete(req.params.id);
  if (!coupon) {
    return res.status(404).json({ message: "Coupon not found" });
  }
  res.status(200).json({ message: "Coupon deleted successfully" });
});

export {
  createCoupon,
  getAllCoupons,
  getSpecificCoupon,
  updateCoupon,
  deleteCoupon
};

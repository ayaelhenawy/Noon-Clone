import express from "express";
import {
  createCoupon,
  getAllCoupons,
  getSpecificCoupon,
  updateCoupon,
  deleteCoupon,
} from "./coupon.controller.js";

const couponRouter = express.Router();

couponRouter.route("/")
  .post(createCoupon)
  .get(getAllCoupons);

couponRouter.route("/:id")
  .get(getSpecificCoupon)
  .put(updateCoupon)
  .delete(deleteCoupon);

export default couponRouter;

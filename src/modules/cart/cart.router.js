import express from "express";
import {
  addProductToCart,
  getLoggedUserCart,
  removeSpecificCartItem,
  clearCart,
  updateCartItemQuantity,
  applyCoupon,
} from "./cart.controller.js";
import { protectedRoutes } from "../auth/auth.controller.js";

const cartRouter = express.Router();

cartRouter
  .route("/")
  .post(protectedRoutes,addProductToCart)
  .get(protectedRoutes,getLoggedUserCart)
  .delete(protectedRoutes,clearCart);

cartRouter.route("/applyCoupon").put(protectedRoutes,applyCoupon);
cartRouter
  .route("/:itemId")
  .put(protectedRoutes,updateCartItemQuantity)
  .delete(protectedRoutes,removeSpecificCartItem);

export default cartRouter;

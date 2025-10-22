import { catchError } from "../../middleware/catchGlobalError.js";
import { cartModel } from "../../../DataBase/models/cart.model.js";
import { productModel } from "../../../DataBase/models/product.model.js";
import { couponModel } from "../../../DataBase/models/coupon.model.js";
import { AppError } from "../../utilts/appError.js";

const calcTotalCartPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  cart.totalCartPrice = totalPrice;
  cart.totalPriceAfterDiscount = undefined;
  return totalPrice;
};

/**
 * @desc    Add product to cart
 * @route   POST /api/v1/cart
 * @access  Private/User
 */
const addProductToCart = catchError(async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await productModel.findById(productId);
  if (!product) throw new AppError("Product not found", 404);

  let cart = await cartModel.findOne({ user: req.user._id });
  if (!cart) cart = new cartModel({ user: req.user._id, cartItems: [] });

  const existingItem = cart.cartItems.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) existingItem.quantity += quantity || 1;
  else
    cart.cartItems.push({
      product: productId,
      price: product.price,
      quantity: quantity || 1,
    });

  calcTotalCartPrice(cart);
  await cart.save();
  res.status(200).json({ message: "Product added to cart", cart });
});

/**
 * @desc    Get logged user cart
 * @route   GET /api/v1/cart
 * @access  Private/User
 */
const getLoggedUserCart = catchError(async (req, res) => {
  const cart = await cartModel.findOne({ user: req.user._id }).populate(
    "cartItems.product",
    "title price"
  );
  if (!cart) throw new AppError("Cart not found", 404);

  res.status(200).json({ message: "success", cart });
});

/**
 * @desc    Update specific cart item quantity
 * @route   PUT /api/v1/cart/:productId
 * @access  Private/User
 */
const updateCartItemQuantity = catchError(async (req, res) => {
  const { quantity } = req.body;
  const cart = await cartModel.findOne({ user: req.user._id });
  if (!cart) throw new AppError("Cart not found", 404);

  const itemIndex = cart.cartItems.findIndex(
    (item) => item.product.toString() === req.params.itemId
  );
  if (itemIndex === -1) throw new AppError("Item not found", 404);

  cart.cartItems[itemIndex].quantity = quantity;
  calcTotalCartPrice(cart);
  await cart.save();

  res.status(200).json({
    message: "Item quantity updated successfully",
    cart,
  });
});

/**
 * @desc    Remove specific cart item
 * @route   DELETE /api/v1/cart/:productId
 * @access  Private/User
 */
const removeSpecificCartItem = catchError(async (req, res) => {
  const cart = await cartModel.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { product: req.params.itemId } } },
    { new: true }
  );
  if (!cart) throw new AppError("Cart not found", 404);

  calcTotalCartPrice(cart);
  await cart.save();

  res.status(200).json({ message: "Item removed successfully", cart });
});

/**
 * @desc    Clear logged user cart
 * @route   DELETE /api/v1/cart
 * @access  Private/User
 */
const clearCart = catchError(async (req, res) => {
  const cart = await cartModel.findOneAndDelete({ user: req.user._id });
  if (!cart) throw new AppError("Cart not found", 404);

  res.status(200).json({ message: "Cart cleared successfully" });
});

/**
 * @desc    Apply coupon on total cart price
 * @route   PUT /api/v1/cart/applyCoupon
 * @access  Private/User
 */
const applyCoupon = catchError(async (req, res) => {
  const coupon = await couponModel.findOne({
    name: req.body.name,
    expire: { $gt: Date.now() },
  });
  if (!coupon) throw new AppError("Invalid or expired coupon", 400);

  const cart = await cartModel.findOne({ user: req.user._id });
  if (!cart) throw new AppError("Cart not found", 404);

  const discount = (cart.totalCartPrice * coupon.discount) / 100;
  cart.totalPriceAfterDiscount = (cart.totalCartPrice - discount).toFixed(2);

  await cart.save();

  res.status(200).json({
    message: "Coupon applied successfully",
    totalPriceAfterDiscount: cart.totalPriceAfterDiscount,
    cart,
  });
});

export {
  addProductToCart,
  getLoggedUserCart,
  updateCartItemQuantity,
  removeSpecificCartItem,
  clearCart,
  applyCoupon,
};

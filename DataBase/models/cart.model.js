import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
    {
    cartItems: [
        {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
        },
        quantity: {
            type: Number,
            default: 1,
        },
        color: String,
        price: Number,
        },
    ],
    totalCartPrice: Number,
    totalPriceAfterDiscount: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    },
    { timestamps: true }
);

export const  cartModel= mongoose.model("Cart", CartSchema);
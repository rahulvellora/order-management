const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Customer as User
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },   // Seller as User
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

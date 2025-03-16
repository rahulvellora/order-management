const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    status: { type: String, enum: ["instock", "outofstock", "faulty"], required: true },
    manufacturer: { type: mongoose.Schema.Types.ObjectId, ref: "Manufacturer" },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
    lastUpdatedBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

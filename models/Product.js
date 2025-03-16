const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    status: { 
      type: String, 
      enum: ["instock", "outofstock", "faulty"], 
      required: true 
    },
    manufacturer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: false 
    }, // Manufacturer is a User
    seller: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: false 
    }, // Seller is a User
    lastUpdatedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    }, // Who last updated the product
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    const { name, status } = req.body;

    // Ensure the user is either a Seller or Manufacturer
    if (!["seller", "manufacturer"].includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Only sellers or manufacturers can add products" });
    }

    const product = new Product({
      name,
      status,
      manufacturer: req.user.role === "manufacturer" ? req.user.userId : null,
      seller: req.user.role === "seller" ? req.user.userId : null,
      lastUpdatedBy: req.user.userId,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
};

exports.changeProductStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    // Ensure the user is either the Seller or Manufacturer of the product
    if (
      ![product.seller.toString(), product.manufacturer.toString()].includes(
        req.user.userId
      )
    ) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this product" });
    }

    product.status = status;
    product.lastUpdatedBy = req.user.userId;
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error updating product status", error });
  }
};

exports.getFaultyProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "faulty" }).populate(
      "manufacturer seller"
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching faulty products", error });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("manufacturer seller");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

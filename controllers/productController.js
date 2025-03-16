const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    const { name, status, manufacturer, seller, lastUpdatedBy } = req.body;
    const product = new Product({ name, status, manufacturer, seller, lastUpdatedBy });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
};

exports.changeProductStatus = async (req, res) => {
  try {
    const { status, lastUpdatedBy } = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, { status, lastUpdatedBy }, { new: true });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error updating product status", error });
  }
};

exports.getFaultyProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "faulty" }).populate("manufacturer seller");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching faulty products", error });
  }
};

const Order = require("../models/Order");

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("product")
      .populate("customer")
      .populate("seller");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

exports.getTopOrderedProducts = async (req, res) => {
  try {
    const products = await Order.aggregate([
      { $group: { _id: "$product", totalOrders: { $sum: 1 } } },
      { $sort: { totalOrders: -1 } },
      { $limit: 10 },
    ]);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching top products", error });
  }
};

exports.getMonthlyOrders = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      { $group: { _id: { $month: "$createdAt" }, totalOrders: { $sum: 1 }, revenue: { $sum: "$price" } } },
      { $sort: { _id: 1 } },
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching monthly stats", error });
  }
};

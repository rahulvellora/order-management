const express = require("express");
const { getOrders, getTopOrderedProducts, getMonthlyOrders } = require("../controllers/orderController");
const router = express.Router();

router.get("/", getOrders);
router.get("/top-products", getTopOrderedProducts);
router.get("/monthly-stats", getMonthlyOrders);

module.exports = router;

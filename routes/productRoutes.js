const express = require("express");
const { addProduct, changeProductStatus, getFaultyProducts } = require("../controllers/productController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/add", authMiddleware, addProduct);
router.put("/:id/status", authMiddleware, changeProductStatus);
router.get("/faulty", getFaultyProducts);

module.exports = router;

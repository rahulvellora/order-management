const express = require("express");
const {
  addProduct,
  changeProductStatus,
  getFaultyProducts,
  getProducts,
} = require("../controllers/productController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { roleMiddleware } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.post(
  "/add",
  authMiddleware,
  roleMiddleware(["seller", "manufacturer"]),
  addProduct
);
router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware(["seller", "manufacturer"]),
  changeProductStatus
);
router.get("/faulty", authMiddleware, getFaultyProducts);

module.exports = router;

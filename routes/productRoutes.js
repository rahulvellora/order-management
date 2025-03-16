const express = require("express");
const { addProduct, changeProductStatus, getFaultyProducts } = require("../controllers/productController");
const router = express.Router();

router.post("/add", addProduct);
router.put("/:id/status", changeProductStatus);
router.get("/faulty", getFaultyProducts);

module.exports = router;

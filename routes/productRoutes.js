const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const verifyJWT = require('../Middleware/verifyJWT');

//router.use(verifyJWT);
// Product routes
router.route('/').get(productController.getAllProducts)
router.post("/", productController.createProduct);
router.get("/products/:id", productController.getProductById);

// Add more routes for create, update, and delete products

module.exports = router;

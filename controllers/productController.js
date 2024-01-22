const Products = require("../models/productModel");

async function getAllProducts(req, res) {
  try {
    const products = await Products.find();
    res.status(200).json(products);  // Set HTTP status code to 200 (OK)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getProductById(req, res) {
  console.log(res.params);
  try {
    const product = await Products.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
}

async function createProduct(req, res) {
  const product = new Products({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    const updatedProduct = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

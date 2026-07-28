import express from "express";
import auth from "../middleware/auth.js";

import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Create Product
router.post("/create", auth, createProduct);

// Get All Products
router.get("/get-all", auth, getAllProducts);

// Get Product By Id
router.get("/get/:id", auth, getProductById);

// Update Product
router.put("/update/:id", auth, updateProduct);

// Delete Product
router.delete("/delete/:id", auth, deleteProduct);

export default router;
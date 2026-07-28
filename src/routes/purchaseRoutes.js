import express from "express";
import auth from "../Middleware/auth.js";

import {
  createPurchase,
  getAllPurchases,
  getPurchaseById,
  updatePurchase,
  deletePurchase,
} from "../controllers/purchaseController.js";

const router = express.Router();

// ================================
// Purchase Routes
// ================================

// Create Purchase
router.post("/create", auth, createPurchase);

// Get All Purchases
router.get("/get-all", auth, getAllPurchases);

// Get Purchase By Id
router.get("/get/:id", auth, getPurchaseById);

// Update Purchase
router.put("/update/:id", auth, updatePurchase);

// Delete Purchase
router.delete("/delete/:id", auth, deletePurchase);

export default router;
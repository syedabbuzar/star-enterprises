import express from "express";
import auth from "../middleware/auth.js";

import {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  cancelInvoice,
  deleteInvoice,
} from "../controllers/invoiceController.js";

const router = express.Router();

// ======================================
// Invoice Routes
// ======================================

// Create Invoice
router.post("/create", auth, createInvoice);

// Get All Invoices
router.get("/all", auth, getAllInvoices);

// Get Invoice By Id (Preview)
router.get("/view/:id", auth, getInvoiceById);

// Update Invoice
router.put("/update/:id", auth, updateInvoice);

// Cancel Invoice
router.put("/cancel/:id", auth, cancelInvoice);

// Delete Invoice (Soft Delete)
router.delete("/delete/:id", auth, deleteInvoice);

export default router;
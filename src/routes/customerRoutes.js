import express from "express";
import {
  getAllCustomers,
  getCustomerProfile,
  createCustomer,
  updateCustomer,
} from "../controllers/customerController.js";

const router = express.Router();

/**
 * Get all customers
 * GET /customers
 */
router.get("/", getAllCustomers);

/**
 * Get customer by ID
 * GET /customers/:id
 */
router.get("/:id", getCustomerProfile);

/**
 * Create new customer
 * POST /customers
 */
router.post("/", createCustomer);

/**
 * Update customer
 * PUT /customers/:id
 */
router.put("/:id", updateCustomer);

export default router;
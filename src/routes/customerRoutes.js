import express from "express";
import {
  getAllCustomers,
  getCustomerProfile,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";
import Middlware from "../Middleware/auth.js";
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
//delete Routes
router.delete("/delete/:id", Middlware, deleteCustomer);


export default router;
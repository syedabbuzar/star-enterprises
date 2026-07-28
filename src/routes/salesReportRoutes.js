import express from "express";
import { getSalesReport } from "../controllers/salesReportController.js";

const router = express.Router();

/**
 * Sales Report Routes
 */

// Get Sales Report
router.get("/", getSalesReport);

export default router;
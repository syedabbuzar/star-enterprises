// routes/dashboardRoutes.js

import express from "express";
import { getDashboard } from "../controllers/dashboardController.js";

const router = express.Router();

/**
 * @route   GET /dashboard
 * @desc    Get Dashboard Summary
 * @access  Public
 */
router.get("/", getDashboard);

export default router;
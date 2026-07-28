import express from "express";
import { getDailyDispatch } from "../controllers/dailyDispatchController.js";

const router = express.Router();

/**
 * Daily Dispatch Report
 */

// Get Daily Dispatch Report
router.get("/", getDailyDispatch);

export default router;
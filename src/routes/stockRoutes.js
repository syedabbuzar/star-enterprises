import express from "express";
import {
  getAllStock,
  adjustStock,
  getLedger,
} from "../controllers/stockController.js";

const router = express.Router();

/**
 * Get All Stock Summary
 * GET /api/stock
 */
router.get("/", getAllStock);

/**
 * Manual Stock Adjustment
 * POST /api/stock/adjust
 */
router.post("/adjust", adjustStock);

/**
 * Get Product Stock Ledger
 * GET /api/stock/ledger/:productId
 */
router.get("/ledger/:productId", getLedger);

export default router;
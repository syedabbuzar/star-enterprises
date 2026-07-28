import express from "express";
import { getGSTReport } from "../controllers/gstController.js";

const router = express.Router();

/**
 * GET /gst-report?from=2026-07-01&to=2026-07-31
 */
router.get("/", getGSTReport);

export default router;
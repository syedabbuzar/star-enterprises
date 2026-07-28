import express from "express";
import { getGSTB2BReport } from "../controllers/gstB2BController.js";

const router = express.Router();

router.get("/", getGSTB2BReport);

export default router;
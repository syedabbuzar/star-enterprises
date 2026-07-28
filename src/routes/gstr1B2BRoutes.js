import express from "express";
import { getGSTR1B2B } from "../controllers/gstr1B2BController.js";

const router = express.Router();

router.get("/", getGSTR1B2B);

export default router;
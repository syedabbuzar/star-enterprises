import express from "express";
import { getGSTR3B } from "../controllers/gstr3bController.js";

const router = express.Router();

router.get("/", getGSTR3B);

export default router;
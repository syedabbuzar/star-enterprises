import express from "express";

import {
  createCompany,
  getCompany,
  updateCompany,
  deleteCompany,
} from "../controllers/companyController.js";


const router = express.Router();


// Create
router.post(
  "/",
  createCompany
);


// Get
router.get(
  "/",
  getCompany
);


// Update
router.put(
  "/:id",
  updateCompany
);


// Delete
router.delete(
  "/:id",
  deleteCompany
);


export default router;
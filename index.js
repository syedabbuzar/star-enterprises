import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";

import connectDB from "./src/db/db.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import purchaseRoutes from "./src/routes/purchaseRoutes.js";
import stockRoutes from "./src/routes/stockRoutes.js";
import invoiceRoutes from "./src/routes/invoiceRoutes.js";
import companyRoutes from "./src/routes/companyRoutes.js";
import customerRoutes from "./src/routes/customerRoutes.js";
import gstRoutes from "./src/routes/gstRoutes.js";
import dailyDispatchRoutes from "./src/routes/dailyDispatchRoutes.js";
import gstB2BRoutes from "./src/routes/gstB2BRoutes.js";
import salesReportRoutes from "./src/routes/salesReportRoutes.js";
import gstr3bRoutes from "./src/routes/gstr3bRoutes.js";
import gstr1B2BRoutes from "./src/routes/gstr1B2BRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";
import dns from 'dns';


dns.setServers(["1.1.1.1","8.8.8.8"]);
// Load .env
dotenv.config();

// Connect MongoDB
connectDB();

// Create Express App
const app = express();

// ========================
// Middlewares
// ========================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(helmet());
app.use(compression());

// ========================
// Routes
// ========================

app.use("/admin", adminRoutes);
app.use("/products", productRoutes);
app.use("/purchases", purchaseRoutes);
app.use("/invoice", invoiceRoutes);
app.use("/stock", stockRoutes);
app.use("/customers", customerRoutes);
app.use("/company",companyRoutes);
app.use("/gst-report", gstRoutes);
app.use("/daily-dispatch", dailyDispatchRoutes);
app.use("/gst-b2b-report", gstB2BRoutes);
app.use("/sales-report", salesReportRoutes);
app.use("/gstr3b", gstr3bRoutes);
app.use("/gstr1-b2b", gstr1B2BRoutes);
app.use("/dashboard", dashboardRoutes);
// ========================
// Home Route
// ========================

app.get("/", (req, res) => {
  res.send("🚀 Star Ice Cream Parlour Backend is Running...");
});

// ========================
// Server
// ========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
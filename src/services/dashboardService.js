// services/dashboardService.js

import Invoice from "../models/invoiceModel.js";
import InvoiceItem from "../models/invoiceItemModel.js";
import Product from "../models/productModel.js";
import Customer from "../models/Customer.js";
import StockLedger from "../models/StockLedger.js";

export const getDashboardService = async () => {
  try {
    const now = new Date();

    // -----------------------------
    // Today Start & End
    // -----------------------------
    const dayStart = new Date(now);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(now);
    dayEnd.setHours(23, 59, 59, 999);

    // -----------------------------
    // Fetch Master Data
    // -----------------------------
    const [
      invoices,
      invoiceItems,
      products,
      customers,
      stockEntries,
    ] = await Promise.all([
      Invoice.find({}).lean(),
      InvoiceItem.find({}).lean(),
      Product.find({}).lean(),
      Customer.find({}).lean(),
      StockLedger.find({}).lean(),
    ]);

    // -----------------------------
    // Active Invoices
    // -----------------------------
    const activeInvoices = invoices.filter(
      (i) => i.status === "active"
    );

    // -----------------------------
    // Today's Invoices
    // -----------------------------
    const todayInvoices = activeInvoices.filter((i) => {
      const d = new Date(i.date);
      return d >= dayStart && d <= dayEnd;
    });

    // -----------------------------
    // Today's Items
    // -----------------------------
    const todayItems = invoiceItems.filter((item) =>
      todayInvoices.some(
        (inv) => String(inv._id) === String(item.invoiceId)
      )
    );

    // -----------------------------
    // Today's Sales
    // -----------------------------
    const todaySales = todayInvoices.reduce(
      (sum, inv) => sum + Number(inv.total || 0),
      0
    );

    // -----------------------------
    // Bills Count
    // -----------------------------
    const todayBills = todayInvoices.length;

    // -----------------------------
    // Collection
    // (No Payment Model)
    // -----------------------------
    const todayCollection = todaySales;

    // -----------------------------
    // Pending
    // -----------------------------
    const pending = 0;

    // -----------------------------
    // Customers / Products
    // -----------------------------
    const customerCount = customers.length;
    const productCount = products.length;

    // -----------------------------
    // Current Stock
    // -----------------------------
    const stockMap = new Map();

    for (const entry of stockEntries) {
      const product = products.find(
        (p) => String(p._id) === String(entry.productId)
      );

      if (!product) continue;

      const boxSize = product.boxSize || 1;

      const qty =
        Number(entry.boxes || 0) * boxSize +
        Number(entry.pieces || 0);

      let current = stockMap.get(String(entry.productId)) || 0;

      if (entry.type === "purchase") {
        current += qty;
      } else if (entry.type === "sale") {
        current -= qty;
      } else {
        current += qty;
      }

      stockMap.set(String(entry.productId), current);
    }

    // -----------------------------
    // Low Stock
    // -----------------------------
    const lowStock = products.filter((product) => {
      const totalPieces =
        stockMap.get(String(product._id)) || 0;

      const totalBoxes = Math.floor(
        totalPieces / (product.boxSize || 1)
      );

      return totalBoxes <= (product.minStockAlert || 0);
    });

    // -----------------------------
    // Today's Boxes / Pieces
    // -----------------------------
    let todayBoxes = 0;
    let todayPieces = 0;

    for (const item of todayItems) {
      todayBoxes += Number(item.boxes || 0);
      todayPieces += Number(item.pieces || 0);
    }

    // -----------------------------
    // Monthly Sales (6 Months)
    // -----------------------------
    const monthly = [];

    for (let i = 5; i >= 0; i--) {
      const start = new Date(
        now.getFullYear(),
        now.getMonth() - i,
        1
      );

      const end = new Date(
        now.getFullYear(),
        now.getMonth() - i + 1,
        1
      );

      const sales = activeInvoices
        .filter((inv) => {
          const d = new Date(inv.date);
          return d >= start && d < end;
        })
        .reduce(
          (sum, inv) => sum + Number(inv.total || 0),
          0
        );

      monthly.push({
        month: start.toLocaleString("en-US", {
          month: "short",
        }),
        sales,
      });
    }

    // -----------------------------
    // Top Selling Products
    // -----------------------------
    const productSales = new Map();

    for (const item of invoiceItems) {
      const amount =
        Number(item.amount || item.taxable || 0);

      productSales.set(
        String(item.productId),
        (productSales.get(String(item.productId)) || 0) +
          amount
      );
    }

    const top = [...productSales.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([productId, amt]) => ({
        name:
          products.find(
            (p) => String(p._id) === productId
          )?.name || "—",
        amt,
      }));

    // -----------------------------
    // Recent Bills
    // -----------------------------
    const recent = [...activeInvoices]
      .sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      )
      .slice(0, 8);

    // -----------------------------
    // Final Response
    // -----------------------------
    return {
      todaySales,
      todayBills,
      todayCollection,
      pending,
      customers: customerCount,
      products: productCount,
      lowStock: lowStock.length,
      todayBoxes,
      todayPieces,
      monthly,
      top,
      recent,
      invoicesById: activeInvoices,
      customersById: customers,
    };
  } catch (error) {
    throw error;
  }
};
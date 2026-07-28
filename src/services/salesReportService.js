import Invoice from "../models/invoiceModel.js";
import InvoiceItem from "../models/invoiceItemModel.js";
import Product from "../models/productModel.js";
import Customer from "../models/Customer.js";

export const getSalesReportService = async (from, to) => {
  // Date Range
  const fromDate = new Date(from);
  fromDate.setHours(0, 0, 0, 0);

  const toDate = new Date(to);
  toDate.setHours(23, 59, 59, 999);

  // Active Invoices
  const invoices = await Invoice.find({
    status: "active",
    date: {
      $gte: fromDate,
      $lte: toDate,
    },
  }).sort({ date: 1 });

  const invoiceIds = invoices.map((invoice) => invoice._id);

  // Invoice Items
  const invoiceItems = await InvoiceItem.find({
    invoiceId: {
      $in: invoiceIds,
    },
  });

  // Products
  const products = await Product.find();

  // Customers
  const customers = await Customer.find();

  // ===============================
  // Daily Sales
  // ===============================

  const dailyMap = new Map();

  for (const invoice of invoices) {
    const key = invoice.date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });

    dailyMap.set(key, (dailyMap.get(key) || 0) + invoice.total);
  }

  const daily = [...dailyMap.entries()].map(([day, sales]) => ({
    day,
    sales,
  }));

  // ===============================
  // Top Products
  // ===============================

  const productMap = new Map();

  for (const item of invoiceItems) {
    const key = item.productId.toString();

    productMap.set(
      key,
      (productMap.get(key) || 0) + item.amount
    );
  }

  const topProducts = [...productMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([productId, amt]) => {
      const product = products.find(
        (p) => p._id.toString() === productId
      );

      return {
        name: product ? product.name : "—",
        amt,
      };
    });

  // ===============================
  // Top Customers
  // ===============================

  const customerMap = new Map();

  for (const invoice of invoices) {
    const key = invoice.customerId.toString();

    customerMap.set(
      key,
      (customerMap.get(key) || 0) + invoice.total
    );
  }

  const topCustomers = [...customerMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([customerId, amt]) => {
      const customer = customers.find(
        (c) => c._id.toString() === customerId
      );

      return {
        name: customer ? customer.name : "—",
        amt,
      };
    });

  // ===============================
  // Total Sales
  // ===============================

  const total = invoices.reduce(
    (sum, invoice) => sum + invoice.total,
    0
  );

  return {
    invoices,
    total,
    daily,
    topProducts,
    topCustomers,
  };
};
import Invoice from "../models/invoiceModel.js";
import InvoiceItem from "../models/invoiceItemModel.js";
import Product from "../models/productModel.js";

export const getDailyDispatchService = async (date) => {
  const selectedDate = date ? new Date(date) : new Date();

  const startDate = new Date(selectedDate);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(selectedDate);
  endDate.setHours(23, 59, 59, 999);

  // Get Active Invoices
  const invoices = await Invoice.find({
    status: "active",
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  });

  const invoiceIds = invoices.map((invoice) => invoice._id);

  // Get Invoice Items
  const invoiceItems = await InvoiceItem.find({
    invoiceId: {
      $in: invoiceIds,
    },
  });

  // Get Products
  const products = await Product.find();

  const reportMap = new Map();

  for (const item of invoiceItems) {
    const product = products.find(
      (p) => p._id.toString() === item.productId.toString()
    );

    const existing = reportMap.get(item.productId.toString()) || {
      name: product ? product.name : item.name,
      boxes: 0,
      pieces: 0,
      invoices: new Set(),
      amount: 0,
    };

    existing.boxes += item.boxes;
    existing.pieces += item.pieces;
    existing.amount += item.amount;

    existing.invoices.add(item.invoiceId.toString());

    reportMap.set(item.productId.toString(), existing);
  }

  const rows = [...reportMap.values()]
    .map((row) => ({
      name: row.name,
      boxes: row.boxes,
      pieces: row.pieces,
      invoices: row.invoices.size,
      amount: row.amount,
    }))
    .sort((a, b) => b.amount - a.amount);

  return {
    invoiceCount: invoices.length,
    rows,
  };
};
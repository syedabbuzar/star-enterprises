import Invoice from "../models/invoiceModel.js";
import InvoiceItem from "../models/invoiceItemModel.js";
import StockLedger from "../models/StockLedger.js";

// =======================================
// Create Invoice
// =======================================
export const createInvoiceService = async (data) => {
  const invoice = await Invoice.create({
    number: data.number,
    customerId: data.customerId,
    date: data.date,
    taxable: data.taxable,
    cgst: data.cgst,
    sgst: data.sgst,
    igst: data.igst,
    total: data.total,
    status: data.status || "active",
  });

  if (data.items?.length) {
    const invoiceItems = data.items.map((item) => ({
      invoiceId: invoice._id,
      productId: item.productId,
      name: item.name,
      hsn: item.hsn,
      batch: item.batch,
      expiry: item.expiry,
      gstPct: item.gstPct,
      boxes: item.boxes,
      pieces: item.pieces,
      boxSize: item.boxSize,
      rate: item.rate,
      taxable: item.taxable,
      gstAmount: item.gstAmount,
      amount: item.amount,
    }));

    await InvoiceItem.insertMany(invoiceItems);

    const stockEntries = data.items.map((item) => ({
      productId: item.productId,
      type: "sale",
      boxes: -(item.boxes || 0),
      pieces: -(item.pieces || 0),
      note: `Invoice : ${invoice.number}`,
    }));

    await StockLedger.insertMany(stockEntries);
  }

  return invoice;
};

// =======================================
// Get All Invoices
// =======================================
export const getAllInvoicesService = async () => {
  return await Invoice.find({
    status: { $ne: "deleted" },
  }).sort({ date: -1 });
};

// =======================================
// Get Invoice By Id
// =======================================
export const getInvoiceByIdService = async (id) => {
  const invoice = await Invoice.findById(id);

  if (!invoice) return null;

  const items = await InvoiceItem.find({
    invoiceId: invoice._id,
  });

  return {
    invoice,
    items,
  };
};

// =======================================
// Update Invoice
// =======================================
export const updateInvoiceService = async (id, data) => {
  const oldInvoice = await Invoice.findById(id);

  if (!oldInvoice) return null;

  // Restore old stock first
  const oldItems = await InvoiceItem.find({
    invoiceId: id,
  });

  if (oldItems.length) {
    const restoreStock = oldItems.map((item) => ({
      productId: item.productId,
      type: "adjustment",
      boxes: item.boxes || 0,
      pieces: item.pieces || 0,
      note: `Update Restore : ${oldInvoice.number}`,
    }));

    await StockLedger.insertMany(restoreStock);
  }

  // Delete old invoice items
  await InvoiceItem.deleteMany({
    invoiceId: id,
  });

  // Delete previous sale stock entries
  await StockLedger.deleteMany({
    note: `Invoice : ${oldInvoice.number}`,
  });

  // Update invoice header
  const invoice = await Invoice.findByIdAndUpdate(
    id,
    {
      number: data.number,
      customerId: data.customerId,
      date: data.date,
      taxable: data.taxable,
      cgst: data.cgst,
      sgst: data.sgst,
      igst: data.igst,
      total: data.total,
      status: data.status,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  // Insert new items
  if (data.items?.length) {
    const invoiceItems = data.items.map((item) => ({
      invoiceId: invoice._id,
      productId: item.productId,
      name: item.name,
      hsn: item.hsn,
      batch: item.batch,
      expiry: item.expiry,
      gstPct: item.gstPct,
      boxes: item.boxes,
      pieces: item.pieces,
      boxSize: item.boxSize,
      rate: item.rate,
      taxable: item.taxable,
      gstAmount: item.gstAmount,
      amount: item.amount,
    }));

    await InvoiceItem.insertMany(invoiceItems);

    const stockEntries = data.items.map((item) => ({
      productId: item.productId,
      type: "sale",
      boxes: -(item.boxes || 0),
      pieces: -(item.pieces || 0),
      note: `Invoice : ${invoice.number}`,
    }));

    await StockLedger.insertMany(stockEntries);
  }

  return invoice;
};

// =======================================
// Cancel Invoice
// =======================================
export const cancelInvoiceService = async (id) => {
  const invoice = await Invoice.findById(id);

  if (!invoice) return null;

  if (invoice.status === "cancelled") {
    return invoice;
  }

  invoice.status = "cancelled";

  await invoice.save();

  const items = await InvoiceItem.find({
    invoiceId: invoice._id,
  });

  if (items.length) {
    const stockEntries = items.map((item) => ({
      productId: item.productId,
      type: "adjustment",
      boxes: item.boxes || 0,
      pieces: item.pieces || 0,
      note: `Cancel Invoice : ${invoice.number}`,
    }));

    await StockLedger.insertMany(stockEntries);
  }

  return invoice;
};

// =======================================
// Delete Invoice (Soft Delete)
// =======================================
export const deleteInvoiceService = async (id) => {
  const invoice = await Invoice.findById(id);

  if (!invoice) return null;

  invoice.status = "deleted";

  await invoice.save();

  await InvoiceItem.deleteMany({
    invoiceId: id,
  });

  await StockLedger.deleteMany({
    note: `Invoice : ${invoice.number}`,
  });

  return invoice;
};
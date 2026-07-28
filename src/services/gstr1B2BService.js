import Invoice from "../models/invoiceModel.js";
import Customer from "../models/Customer.js";

export const getGSTR1B2BService = async () => {
  const invoices = await Invoice.find({
    status: "active",
  }).lean();

  const report = [];

  for (const invoice of invoices) {
    const customer = await Customer.findById(invoice.customerId).lean();

    report.push({
      gstin: customer?.gstin || "",
      customerName: customer?.name || "",
      invoiceNumber: invoice.invoiceNumber,
      invoiceDate: invoice.date,
      invoiceValue: invoice.total || 0,
      taxableValue: invoice.taxableAmount || 0,
      cgst: invoice.cgst || 0,
      sgst: invoice.sgst || 0,
      igst: invoice.igst || 0,
      taxAmount:
        (invoice.cgst || 0) +
        (invoice.sgst || 0) +
        (invoice.igst || 0),
    });
  }

  return report;
};
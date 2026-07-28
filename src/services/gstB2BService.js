import Invoice from "../models/invoiceModel.js";
import Customer from "../models/Customer.js";

export const getGSTB2BReportService = async () => {
  const invoices = await Invoice.find({
    status: "active",
  }).lean();

  const report = [];

  for (const invoice of invoices) {
    const customer = await Customer.findById(invoice.customerId).lean();

    report.push({
      invoiceNo: invoice.invoiceNumber,
      invoiceDate: invoice.date,
      customerName: customer?.name || "",
      gstin: customer?.gstin || "",
      taxableValue: invoice.taxableAmount || 0,
      cgst: invoice.cgst || 0,
      sgst: invoice.sgst || 0,
      igst: invoice.igst || 0,
      totalTax:
        (invoice.cgst || 0) +
        (invoice.sgst || 0) +
        (invoice.igst || 0),
      invoiceValue: invoice.total || 0,
    });
  }

  return report;
};
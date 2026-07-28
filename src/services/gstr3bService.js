import Invoice from "../models/invoiceModel.js";

export const getGSTR3BService = async () => {
  const invoices = await Invoice.find({
    status: "active",
  }).lean();

  let taxableValue = 0;
  let cgst = 0;
  let sgst = 0;
  let igst = 0;
  let invoiceValue = 0;

  for (const invoice of invoices) {
    taxableValue += Number(invoice.taxableAmount || 0);
    cgst += Number(invoice.cgst || 0);
    sgst += Number(invoice.sgst || 0);
    igst += Number(invoice.igst || 0);
    invoiceValue += Number(invoice.total || 0);
  }

  return {
    taxableValue,
    cgst,
    sgst,
    igst,
    totalTax: cgst + sgst + igst,
    invoiceValue,
    totalInvoices: invoices.length,
  };
};
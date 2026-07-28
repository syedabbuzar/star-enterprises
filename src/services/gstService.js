import Invoice from "../models/invoiceModel.js";
import InvoiceItem from "../models/invoiceItemModel.js";

export const getGSTReportService = async (from, to) => {
  const invoices = await Invoice.find({
    status: "active",
    date: {
      $gte: new Date(from),
      $lte: new Date(to),
    },
  }).lean();

  const invoiceIds = invoices.map((i) => i._id);

  const items = await InvoiceItem.find({
    invoiceId: { $in: invoiceIds },
  }).lean();

  const byRate = new Map();

  for (const inv of invoices) {
    const invItems = items.filter(
      (x) => String(x.invoiceId) === String(inv._id)
    );

    const invTaxable = invItems.reduce(
      (sum, item) => sum + Number(item.taxable || 0),
      0
    );

    const rates = new Map();

    for (const item of invItems) {
      rates.set(
        item.gstPct,
        (rates.get(item.gstPct) || 0) + Number(item.taxable)
      );
    }

    for (const [rate, taxable] of rates.entries()) {
      const current = byRate.get(rate) || {
        taxable: 0,
        cgst: 0,
        sgst: 0,
        igst: 0,
      };

      const share = invTaxable > 0 ? taxable / invTaxable : 0;

      current.taxable += taxable;
      current.cgst += (inv.cgst || 0) * share;
      current.sgst += (inv.sgst || 0) * share;
      current.igst += (inv.igst || 0) * share;

      byRate.set(rate, current);
    }
  }

  const rows = [...byRate.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([rate, value]) => ({
      gstPct: rate,
      taxable: Number(value.taxable.toFixed(2)),
      cgst: Number(value.cgst.toFixed(2)),
      sgst: Number(value.sgst.toFixed(2)),
      igst: Number(value.igst.toFixed(2)),
      totalTax: Number(
        (value.cgst + value.sgst + value.igst).toFixed(2)
      ),
    }));

  return rows;
};
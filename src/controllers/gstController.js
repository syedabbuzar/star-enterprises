import { getGSTReportService } from "../services/gstService.js";

export const getGSTReport = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        success: false,
        message: "From and To dates are required.",
      });
    }

    const report = await getGSTReportService(from, to);

    const totals = report.reduce(
      (acc, row) => {
        acc.taxable += row.taxable;
        acc.cgst += row.cgst;
        acc.sgst += row.sgst;
        acc.igst += row.igst;
        acc.totalTax += row.totalTax;
        return acc;
      },
      {
        taxable: 0,
        cgst: 0,
        sgst: 0,
        igst: 0,
        totalTax: 0,
      }
    );

    return res.status(200).json({
      success: true,
      data: report,
      totals,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate GST report.",
      error: error.message,
    });
  }
};
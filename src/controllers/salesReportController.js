import { getSalesReportService } from "../services/salesReportService.js";

/**
 * Get Sales Report
 * GET /sales-report?from=YYYY-MM-DD&to=YYYY-MM-DD
 */
export const getSalesReport = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        success: false,
        message: "Both 'from' and 'to' dates are required.",
      });
    }

    const report = await getSalesReportService(from, to);

    return res.status(200).json({
      success: true,
      message: "Sales report fetched successfully.",
      data: report,
    });
  } catch (error) {
    console.error("Sales Report Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch sales report.",
      error: error.message,
    });
  }
};
import { getDailyDispatchService } from "../services/dailyDispatchService.js";

/**
 * Get Daily Dispatch Report
 * GET /daily-dispatch?date=YYYY-MM-DD
 */
export const getDailyDispatch = async (req, res) => {
  try {
    const { date } = req.query;

    const report = await getDailyDispatchService(date);

    return res.status(200).json({
      success: true,
      message: "Daily dispatch report fetched successfully.",
      data: report,
    });
  } catch (error) {
    console.error("Daily Dispatch Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch daily dispatch report.",
      error: error.message,
    });
  }
};
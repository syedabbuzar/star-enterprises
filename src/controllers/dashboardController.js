// controllers/dashboardController.js

import { getDashboardService } from "../services/dashboardService.js";

/**
 * @desc    Get Dashboard Data
 * @route   GET /dashboard
 * @access  Public
 */
export const getDashboard = async (req, res) => {
  try {
    const dashboard = await getDashboardService();

    return res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully.",
      data: dashboard,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data.",
      error: error.message,
    });
  }
};
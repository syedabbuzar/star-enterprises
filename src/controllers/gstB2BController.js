import { getGSTB2BReportService } from "../services/gstB2BService.js";

export const getGSTB2BReport = async (req, res) => {
  try {
    const data = await getGSTB2BReportService();

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch GST B2B report.",
      error: error.message,
    });
  }
};
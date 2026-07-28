import { getGSTR1B2BService } from "../services/gstr1B2BService.js";

export const getGSTR1B2B = async (req, res) => {
  try {
    const report = await getGSTR1B2BService();

    res.status(200).json({
      success: true,
      count: report.length,
      data: report,
    });
  } catch (error) {
    console.error("GSTR-1 B2B Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch GSTR-1 B2B report.",
      error: error.message,
    });
  }
};
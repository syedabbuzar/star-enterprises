import { getGSTR3BService } from "../services/gstr3bService.js";

export const getGSTR3B = async (req, res) => {
  try {
    const summary = await getGSTR3BService();

    return res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error("GSTR-3B Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate GSTR-3B report.",
      error: error.message,
    });
  }
};
import {
  getStockSummary,
  stockAdjustment,
  getProductLedger,
} from "../services/stockService.js";

/**
 * Get All Stock Summary
 */
export const getAllStock = async (req, res) => {
  try {
    const stock = await getStockSummary();

    return res.status(200).json({
      success: true,
      message: "Stock fetched successfully.",
      data: stock,
    });
  } catch (error) {
    console.error("Get Stock Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch stock.",
      error: error.message,
    });
  }
};

/**
 * Manual Stock Adjustment
 */
export const adjustStock = async (req, res) => {
  try {
    const { productId, boxes, pieces, note } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required.",
      });
    }

    const adjustment = await stockAdjustment({
      productId,
      boxes: Number(boxes) || 0,
      pieces: Number(pieces) || 0,
      note,
    });

    return res.status(201).json({
      success: true,
      message: "Stock adjusted successfully.",
      data: adjustment,
    });
  } catch (error) {
    console.error("Stock Adjustment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to adjust stock.",
      error: error.message,
    });
  }
};

/**
 * Get Ledger By Product
 */
export const getLedger = async (req, res) => {
  try {
    const { productId } = req.params;

    const ledger = await getProductLedger(productId);

    return res.status(200).json({
      success: true,
      message: "Ledger fetched successfully.",
      data: ledger,
    });
  } catch (error) {
    console.error("Ledger Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch ledger.",
      error: error.message,
    });
  }
};
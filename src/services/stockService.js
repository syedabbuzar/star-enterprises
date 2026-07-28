import Product from "../models/productModel.js";
import StockLedger from "../models/StockLedger.js";

/**
 * Get All Stock Summary
 */
export const getStockSummary = async () => {
  const products = await Product.find().sort({ name: 1 });

  const result = [];

  for (const product of products) {
    const ledger = await StockLedger.find({
      productId: product._id,
    });

    const boxSize = product.boxSize || 1;

    let purchased = 0;
    let sold = 0;
    let totalPieces = 0;

    ledger.forEach((entry) => {
      const qty = (entry.boxes * boxSize) + entry.pieces;

      totalPieces += qty;

      if (qty > 0) {
        purchased += qty;
      } else {
        sold += Math.abs(qty);
      }
    });

    const remainingBoxes = Math.floor(totalPieces / boxSize);
    const remainingPieces = totalPieces % boxSize;

    result.push({
      productId: product._id,
      productName: product.name,
      hsn: product.hsn,
      boxSize: product.boxSize,
      purchased,
      sold,
      remainingPieces: totalPieces,
      remainingBoxes,
      loosePieces: remainingPieces,
      minStockAlert: product.minStockAlert,
      lowStock:
        remainingBoxes <= (product.minStockAlert || 0),
    });
  }

  return result;
};

/**
 * Manual Stock Adjustment
 */
export const stockAdjustment = async ({
  productId,
  boxes,
  pieces,
  note,
}) => {
  const ledger = await StockLedger.create({
    productId,
    ts: new Date(),
    type: "adjustment",
    boxes,
    pieces,
    note: note || "Manual Adjustment",
  });

  return ledger;
};

/**
 * Get Stock Ledger of One Product
 */
export const getProductLedger = async (productId) => {
  const ledger = await StockLedger.find({
    productId,
  }).sort({ ts: -1 });

  return ledger;
};
import {
  createPurchaseService,
  getAllPurchasesService,
  getPurchaseByIdService,
  updatePurchaseService,
  deletePurchaseService,
} from "../services/purchaseService.js";

// ==========================================
// Create Purchase
// ==========================================
export const createPurchase = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Request body is missing",
      });
    }

    const purchase = await createPurchaseService(req.body);

    res.status(201).json({
      success: true,
      message: "Purchase Created Successfully",
      data: purchase,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get All Purchases
// ==========================================
export const getAllPurchases = async (req, res) => {
  try {
    const purchases = await getAllPurchasesService();

    res.status(200).json({
      success: true,
      data: purchases,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get Purchase By Id
// ==========================================
export const getPurchaseById = async (req, res) => {
  try {
    const purchase = await getPurchaseByIdService(req.params.id);

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found",
      });
    }

    res.status(200).json({
      success: true,
      data: purchase,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Update Purchase
// ==========================================
export const updatePurchase = async (req, res) => {
  try {
    const purchase = await updatePurchaseService(
      req.params.id,
      req.body
    );

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Purchase Updated Successfully",
      data: purchase,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Delete Purchase
// ==========================================
export const deletePurchase = async (req, res) => {
  try {
    const purchase = await deletePurchaseService(req.params.id);

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Purchase Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
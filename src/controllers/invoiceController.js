import {
  createInvoiceService,
  getAllInvoicesService,
  getInvoiceByIdService,
  updateInvoiceService,
  deleteInvoiceService,
  cancelInvoiceService,
} from "../services/invoiceService.js";

// ==========================================
// Create Invoice
// ==========================================
export const createInvoice = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body is missing",
      });
    }

    const invoice = await createInvoiceService(req.body);

    return res.status(201).json({
      success: true,
      message: "Invoice Created Successfully",
      data: invoice,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get All Invoices
// ==========================================
export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await getAllInvoicesService();

    return res.status(200).json({
      success: true,
      data: invoices,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get Invoice By Id
// ==========================================
export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await getInvoiceByIdService(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Update Invoice
// ==========================================
export const updateInvoice = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body is missing",
      });
    }

    const invoice = await updateInvoiceService(
      req.params.id,
      req.body
    );

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Invoice Updated Successfully",
      data: invoice,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Cancel Invoice
// ==========================================
export const cancelInvoice = async (req, res) => {
  try {
    const invoice = await cancelInvoiceService(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Invoice Cancelled Successfully",
      data: invoice,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Delete Invoice
// ==========================================
export const deleteInvoice = async (req, res) => {
  try {
    const invoice = await deleteInvoiceService(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Invoice Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
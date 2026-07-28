import {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
} from "../services/productService.js";

// ==========================
// Create Product
// ==========================
export const createProduct = async (req, res) => {
  try {
    console.log("========== CREATE PRODUCT ==========");
    console.log("Headers :", req.headers);
    console.log("Body :", req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body is missing",
      });
    }

    const product = await createProductService(req.body);

    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      data: product,
    });
  } catch (error) {
    console.error("Create Product Error :", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get All Products
// ==========================
export const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsService(req.query.q);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Get Products Error :", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get Product By Id
// ==========================
export const getProductById = async (req, res) => {
  try {
    const product = await getProductByIdService(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Get Product Error :", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Update Product
// ==========================
export const updateProduct = async (req, res) => {
  try {
    console.log("========== UPDATE PRODUCT ==========");
    console.log("Body :", req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body is missing",
      });
    }

    const product = await updateProductService(req.params.id, req.body);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      data: product,
    });
  } catch (error) {
    console.error("Update Product Error :", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Delete Product
// ==========================
export const deleteProduct = async (req, res) => {
  try {
    const product = await deleteProductService(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.error("Delete Product Error :", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
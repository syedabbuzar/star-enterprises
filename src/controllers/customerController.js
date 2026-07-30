import {
  getAllCustomersService,
  createCustomerService,
  updateCustomerService,
  deleteCustomerService,
  getCustomerProfileService,
} from "../services/customerService.js";

/**
 * Get All Customers
 * GET /customers
 */
export const getAllCustomers = async (req, res) => {
  try {
    const { search } = req.query;

    const customers = await getAllCustomersService(search);

    return res.status(200).json({
      success: true,
      message: "Customers fetched successfully.",
      data: customers,
    });
  } catch (error) {
    console.error("Get Customers Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch customers.",
      error: error.message,
    });
  }
};

/**
 * Create Customer
 * POST /customers
 */
export const createCustomer = async (req, res) => {
  try {
    const customer = await createCustomerService(req.body);

    return res.status(201).json({
      success: true,
      message: "Customer created successfully.",
      data: customer,
    });
  } catch (error) {
    console.error("Create Customer Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create customer.",
      error: error.message,
    });
  }
};

/**
 * Update Customer
 * PUT /customers/:id
 */
export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await updateCustomerService(id, req.body);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer updated successfully.",
      data: customer,
    });
  } catch (error) {
    console.error("Update Customer Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update customer.",
      error: error.message,
    });
  }
};

/**
 * Delete Customer
 * DELETE /customers/:id
 */
export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await deleteCustomerService(id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Customer Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete customer.",
      error: error.message,
    });
  }
};

/**
 * Get Customer Profile
 * GET /customers/:id
 */
export const getCustomerProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await getCustomerProfileService(id);

    return res.status(200).json({
      success: true,
      message: "Customer profile fetched successfully.",
      data: profile,
    });
  } catch (error) {
    console.error("Customer Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch customer profile.",
      error: error.message,
    });
  }
};
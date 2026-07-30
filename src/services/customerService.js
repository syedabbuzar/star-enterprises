import Customer from "../models/Customer.js";
import Invoice from "../models/invoiceModel.js";
import InvoiceItem from "../models/invoiceItemModel.js";

/**
 * Get All Customers
 */
export const getAllCustomersService = async (search = "") => {
  let query = {};

  if (search) {
    query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { shopName: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
        { gstin: { $regex: search, $options: "i" } },
      ],
    };
  }

  return await Customer.find(query).sort({ name: 1 });
};

/**
 * Create Customer
 */
export const createCustomerService = async (data) => {
  return await Customer.create(data);
};

/**
 * Update Customer
 */
export const updateCustomerService = async (id, data) => {
  return await Customer.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

/**
 * Delete Customer
 */
export const deleteCustomerService = async (id) => {
  return await Customer.findByIdAndDelete(id);
};

/**
 * Get Customer Profile
 */
export const getCustomerProfileService = async (customerId) => {
  const customer = await Customer.findById(customerId);

  if (!customer) {
    throw new Error("Customer not found");
  }

  const invoices = await Invoice.find({
    customerId,
  }).sort({ date: -1 });

  const invoiceIds = invoices.map((invoice) => invoice._id);

  const invoiceItems = await InvoiceItem.find({
    invoiceId: {
      $in: invoiceIds,
    },
  });

  const activeInvoices = invoices.filter(
    (invoice) => invoice.status === "active"
  );

  const totalSales = activeInvoices.reduce(
    (sum, invoice) => sum + invoice.total,
    0
  );

  const outstanding =
    totalSales + (customer.openingBalance || 0);

  const lastPurchase =
    invoices.length > 0 ? invoices[0].date : null;

  const months = [];

  const today = new Date();

  for (let i = 5; i >= 0; i--) {
    const monthDate = new Date(
      today.getFullYear(),
      today.getMonth() - i,
      1
    );

    const start = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth(),
      1
    );

    const end = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth() + 1,
      1
    );

    const sales = activeInvoices
      .filter(
        (invoice) =>
          invoice.date >= start &&
          invoice.date < end
      )
      .reduce((sum, invoice) => sum + invoice.total, 0);

    months.push({
      month: start.toLocaleString("default", {
        month: "short",
      }),
      sales,
    });
  }

  return {
    customer,
    invoices,
    invoiceItems,
    totalSales,
    outstanding,
    lastPurchase,
    months,
  };
};
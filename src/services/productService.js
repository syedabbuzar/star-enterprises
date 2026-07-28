import Product from "../models/productModel.js";

// Create Product
export const createProductService = async (data) => {
  const existingProduct = await Product.findOne({ name: data.name });

  if (existingProduct) {
    throw new Error("Product name already exists");
  }

  return await Product.create(data);
};

// Get All Products
export const getAllProductsService = async (search = "") => {
  if (search) {
    return await Product.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { hsn: { $regex: search, $options: "i" } },
      ],
    }).sort({ name: 1 });
  }

  return await Product.find().sort({ name: 1 });
};

// Get Product By Id
export const getProductByIdService = async (id) => {
  return await Product.findById(id);
};

// Update Product
export const updateProductService = async (id, data) => {
  const existingProduct = await Product.findOne({
    name: data.name,
    _id: { $ne: id },
  });

  if (existingProduct) {
    throw new Error("Product name already exists");
  }

  return await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// Delete Product
export const deleteProductService = async (id) => {
  return await Product.findByIdAndDelete(id);
};
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    hsn: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    mrp: {
      type: Number,
      default: 0,
      min: 0,
      required: true,
    },

    rate: {
      type: Number,
      default: 0,
      min: 0,
      required: true,
    },

    gstPct: {
      type: Number,
      default: 5,
      enum: [0, 5, 12, 18, 28],
       required :true,
    },

    unit: {
      type: String,
      default: "PCS",
      trim: true,
    },

    barcode: {
      type: String,
      default: "",
      trim: true,
    },

    boxSize: {
      type: Number,
      default: 1,
      min: 1,
    },

    minStockAlert: {
      type: Number,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
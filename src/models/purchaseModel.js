import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    supplier: {
      type: String,
      required: true,
      trim: true,
    },

    supplierGstin: {
      type: String,
      default: "",
      trim: true,
    },

    supplierState: {
      type: String,
      default: "",
    },

    placeOfSupply: {
      type: String,
      default: "",
    },

    invoiceNo: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    referenceNo: {
      type: String,
      default: "",
    },

    lrNo: {
      type: String,
      default: "",
    },

    transport: {
      type: String,
      default: "",
    },

    vehicleNo: {
      type: String,
      default: "",
    },

    driver: {
      type: String,
      default: "",
    },

    taxable: {
      type: Number,
      default: 0,
    },

    cgst: {
      type: Number,
      default: 0,
    },

    sgst: {
      type: Number,
      default: 0,
    },

    igst: {
      type: Number,
      default: 0,
    },

    gstAmount: {
      type: Number,
      default: 0,
    },

    // =========================
    // Bill Discount
    // =========================
    discount: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      required: true,
    },

    narration: {
      type: String,
      default: "",
    },

    remarks: {
      type: String,
      default: "",
    },

    note: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Purchase", purchaseSchema);
import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      required: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    hsn: {
      type: String,
      default: "",
      trim: true,
    },

    batch: {
      type: String,
      default: "",
      trim: true,
    },

    expiry: {
      type: Date,
      default: null,
    },

    gstPct: {
      type: Number,
      default: 5,
    },

    boxes: {
      type: Number,
      default: 0,
    },

    pieces: {
      type: Number,
      default: 0,
    },

    boxSize: {
      type: Number,
      default: 1,
    },

    rate: {
      type: Number,
      required: true,
    },

    taxable: {
      type: Number,
      default: 0,
    },

    gstAmount: {
      type: Number,
      default: 0,
    },

    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("InvoiceItem", invoiceItemSchema);
import mongoose from "mongoose";

const purchaseItemSchema = new mongoose.Schema(
  {
    purchaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Purchase",
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
    },

    hsn: {
      type: String,
      default: "",
    },

    batch: {
      type: String,
      default: "",
    },

    expiry: {
      type: Date,
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
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("PurchaseItem", purchaseItemSchema);
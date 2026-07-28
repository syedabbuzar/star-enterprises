import mongoose from "mongoose";

const stockLedgerSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    ts: {
      type: Date,
      default: Date.now,
    },

    type: {
      type: String,
      enum: ["purchase", "sale", "adjustment"],
      required: true,
    },

    boxes: {
      type: Number,
      required: true,
      default: 0,
    },

    pieces: {
      type: Number,
      required: true,
      default: 0,
    },

    note: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const StockLedger = mongoose.model("StockLedger", stockLedgerSchema);

export default StockLedger;
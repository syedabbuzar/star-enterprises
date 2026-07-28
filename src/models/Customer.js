import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    shopName: {
      type: String,
      default: "",
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    altMobile: {
      type: String,
      default: "",
      trim: true,
    },

    gstin: {
      type: String,
      default: "",
      trim: true,
      uppercase: true,
    },

    pan: {
      type: String,
      default: "",
      trim: true,
      uppercase: true,
    },

    address: {
      type: String,
      default: "",
      trim: true,
    },

    city: {
      type: String,
      default: "",
      trim: true,
    },

    state: {
      type: String,
      default: "Maharashtra",
      trim: true,
    },

    stateCode: {
      type: String,
      default: "27",
      trim: true,
    },

    pincode: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },

    creditLimit: {
      type: Number,
      default: 0,
      min: 0,
    },

    openingBalance: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Customer", customerSchema);
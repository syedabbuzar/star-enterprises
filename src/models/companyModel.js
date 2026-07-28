import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
      trim: true,
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
      default: "",
      trim: true,
    },

    stateCode: {
      type: String,
      default: "",
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    gstin: {
      type: String,
      default: "",
      trim: true,
    },

    pan: {
      type: String,
      default: "",
      trim: true,
    },

    fssai: {
      type: String,
      default: "",
      trim: true,
    },

    bankName: {
      type: String,
      default: "",
      trim: true,
    },

    accountNo: {
      type: String,
      default: "",
      trim: true,
    },

    ifsc: {
      type: String,
      default: "",
      trim: true,
    },

    invoicePrefix: {
      type: String,
      default: "",
      trim: true,
    },

    footer: {
      type: String,
      default: "",
      trim: true,
    },

    terms: {
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

const Company = mongoose.model("Company", companySchema);

export default Company;
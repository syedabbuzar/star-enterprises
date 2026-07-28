import Admin from "../models/adminModel.js";

export const loginService = async (username, password) => {
  const admin = await Admin.findOne({ username });

  if (!admin) {
    throw new Error("Invalid Username");
  }

  if (admin.password !== password) {
    throw new Error("Invalid Password");
  }

  return admin;
};
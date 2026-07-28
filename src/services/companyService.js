import Company from "../models/companyModel.js";


// Create Company
export const createCompanyService = async (data) => {
  const company = await Company.create(data);
  return company;
};


// Get Company
export const getCompanyService = async () => {
  const company = await Company.findOne();
  return company;
};


// Update Company
export const updateCompanyService = async (id, data) => {
  const company = await Company.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  return company;
};


// Delete Company
export const deleteCompanyService = async (id) => {
  const company = await Company.findByIdAndDelete(id);
  return company;
};
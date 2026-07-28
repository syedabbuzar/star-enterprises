import {
  createCompanyService,
  getCompanyService,
  updateCompanyService,
  deleteCompanyService,
} from "../services/companyService.js";



// CREATE COMPANY
export const createCompany = async (req, res) => {
  try {

    const company = await createCompanyService(req.body);

    res.status(201).json({
      success: true,
      message: "Company created successfully",
      data: company,
    });


  } catch (error) {

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }
};



// GET COMPANY
export const getCompany = async (req,res)=>{

  try {

    const company = await getCompanyService();


    res.status(200).json({
      success:true,
      data:company,
    });


  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }

};



// UPDATE COMPANY
export const updateCompany = async(req,res)=>{

  try {

    const company = await updateCompanyService(
      req.params.id,
      req.body
    );


    res.status(200).json({
      success:true,
      message:"Company updated successfully",
      data:company,
    });


  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }

};



// DELETE COMPANY
export const deleteCompany = async(req,res)=>{

  try {

    await deleteCompanyService(req.params.id);


    res.status(200).json({
      success:true,
      message:"Company deleted successfully",
    });


  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }

};
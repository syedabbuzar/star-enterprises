import jwt from "jsonwebtoken";
import { loginService } from "../services/adminService.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await loginService(username, password);

    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      data: {
        id: admin._id,
        username: admin.username,
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
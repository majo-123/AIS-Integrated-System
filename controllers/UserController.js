import * as userModel from "../models/UserModel.js";

export const register = async (req, res) => {
  const { name, birthdate, address, program, studentStatus, email, password } =
    req.body;

  try {
    const userProfile = {
      name,
      birthdate,
      address,
      program,
      studentStatus,
    };

    const result = await userModel.createUser(userProfile, email, password);

    res.status(201).json({
      success: true,
      message: result,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userModel.login(email, password);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

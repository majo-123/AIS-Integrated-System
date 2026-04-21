import * as userModel from "../models/UserModel.js";

export const register = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    dob,
    course,
    major,
    address,
    status,
  } = req.body;

  try {
    const userProfile = {
      firstName,
      lastName,
      dob,
      course,
      major,
      address,
      status,
    };

    const user = await userModel.createUser(userProfile, email, password);

    res.status(200).json({
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

import * as AuthService from "../services/authService.js";

export const registerStudent = async (req, res) => {
  try {
    const result = await AuthService.registerStudent(req.body);

    res.status(201).json({
      success: true,
      student: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStudentProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const studentProfile = await AuthService.getStudentProfile(id);

    res.status(200).json({
      success: true,
      studentProfile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

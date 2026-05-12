import * as AuthService from "../services/authService.js";
<<<<<<< HEAD

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
=======
export const registerStudent = async (req, res) => {
  const { firstName, lastName, dob, course, major, address, status } = req.body;
  try {
    const studentProfile = {
      firstName,
      lastName,
      dob,
      course,
      major,
      address,
      status,
    };
    const result = await AuthService.registerStudent(studentProfile);
    res.status(200).json({
      success: true,
      message: result,
>>>>>>> 83fbd20f77ddd9c55fcda91141623ec2fd6535a3
    });
  } catch (error) {
    res.status(500).json({
      success: false,
<<<<<<< HEAD
      message: error.message,
=======
      message: "An error occured while registering the student.",
>>>>>>> 83fbd20f77ddd9c55fcda91141623ec2fd6535a3
    });
  }
};

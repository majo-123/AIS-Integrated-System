import * as StudentService from "../service/student_service.js";

export const getStudentProfile = async (studentId) => {
  if (!studentId) {
    throw new Error("Student id is required");
  }

  return await StudentService.getProfileThroughAdapterLayer(studentId);
};

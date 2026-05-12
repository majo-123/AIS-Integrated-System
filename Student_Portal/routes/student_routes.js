import express from "express";
import * as StudentController from "../controller/student_controller.js";

const router = express.Router();

// no login, no middleware
router.get("/profile/:id", StudentController.getStudentProfile);

export default router;

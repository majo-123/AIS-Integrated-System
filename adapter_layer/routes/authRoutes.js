import * as AuthController from "../controllers/authController.js";
import express from "express";
const authRoutes = express.Router();

authRoutes.get("/test", (req, res) => {
  res.json({ message: "auth route working" });
});

authRoutes.post("/register", AuthController.registerStudent);
authRoutes.get("/profile/:id", AuthController.getStudentProfile);

export default authRoutes;

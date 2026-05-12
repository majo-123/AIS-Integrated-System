import * as AuthController from "../controllers/authController.js";
import express from "express";
const authRoutes = express.Router();

authRoutes.get("/test", (req, res) => {
  res.json({ message: "auth route working" });
});

authRoutes.post("/register", AuthController.registerStudent);
<<<<<<< HEAD
authRoutes.get("/profile/:id", AuthController.getStudentProfile);
=======
>>>>>>> 83fbd20f77ddd9c55fcda91141623ec2fd6535a3

export default authRoutes;

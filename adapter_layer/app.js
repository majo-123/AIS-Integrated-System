import authRoutes from "./routes/authRoutes.js";
import express from "express";
import "dotenv/config";
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/user", authRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Listening to port ${process.env.PORT || 4000}...`);
});

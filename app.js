import express from "express";
import "dotenv/config";
import userRoutes from "./routes/UserRoutes.js";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: process.env.ORIGIN,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/user", userRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening to port ${process.env.PORT || 5000}...`);
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db";
import dashboardRoutes from "./routes/dashboardRoute";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 4000;

// health check
app.get("/api/health", async (req, res) => {
  return res.json({
    success: true,
    message: "Cron Job Monitoring API running",
  });
});

app.use("/api/dashboard", dashboardRoutes);

// connect mongo then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

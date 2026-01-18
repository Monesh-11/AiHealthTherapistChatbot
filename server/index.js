import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
dotenv.config();

const app = express();
app.use("/api/chat", chatRoutes);
app.use("/api/auth", authRoutes);
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Health Therapist API running");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

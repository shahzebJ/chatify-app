import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDB from "./lib/db.js";
import path from "path";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json()); // req.body
app.use("/api/auth", authRoutes);
connectToDB();

// app.use("/api/chat", chatRoutes); 

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`);
}); 
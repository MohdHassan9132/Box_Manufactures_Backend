import express from "express";
import routes from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// mount API
app.use("/api", routes);

// health
app.get("/", (req, res) => res.send("API is running ✅"));

export default app;

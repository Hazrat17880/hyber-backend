import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { DBConnections } from "./Database/Db.js"; 

// import Rotues 
import { Route } from "./Routes/User.js";

const allowedOrigins = [
  "https://frontend-qhftc02lt-hazrat-usmans-projects.vercel.app",
  "http://localhost:5173", // for local dev with Vite
];


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: "./Config/.env" });
const app = express();


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware
app.use(express.json());

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

app.use(express.urlencoded({ extended: true }));


// Database Connectivity
DBConnections();

// Routes
app.use(`/api/v1`,Route);

// Port from .env
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
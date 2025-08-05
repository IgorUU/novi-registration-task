import dotenv from "dotenv";
import mongoose from "mongoose";

import app from "./app.js";

dotenv.config();

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  })
  .catch((err: unknown) => {
    console.error("Database connection error:", err);
  });

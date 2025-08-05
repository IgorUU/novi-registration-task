import cookieParser from 'cookie-parser';
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from 'helmet';

import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();

app.use(helmet());
const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
})
app.use('/api', limiter);
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL,
}));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);

export default app;

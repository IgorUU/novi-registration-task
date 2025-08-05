import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import rateLimit from "express-rate-limit";
import helmet from 'helmet';

dotenv.config();

const app = express();

app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
})
app.use('/api', limiter);
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);

export default app;

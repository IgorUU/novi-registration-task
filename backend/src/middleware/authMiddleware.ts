
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User, { UserDocument } from "../models/user.model";

// Add custom properties to Express Request.
declare module "express-serve-static-core" {
  interface Request {
    user?: UserDocument;
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ message: "Invalid token" });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

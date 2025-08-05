import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import User, { UserDocument } from "../models/user.model";

// Add custom properties to Express Request.
declare module "express-serve-static-core" {
  interface Request {
    user?: UserDocument;
  }
}

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

const isCustomJwtPayload = (payload: unknown): payload is CustomJwtPayload => {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "userId" in payload &&
    typeof (payload as Record<string, unknown>).userId === "string"
  );
};

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: unknown = req.cookies.token;
    if (!token || typeof token !== "string")
      return res.status(401).json({ message: "No token" });

    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(401).json({ message: "Invalid JWT configuration" });

    const decoded = jwt.verify(token, secret);

    if (!isCustomJwtPayload(decoded)) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ message: "Invalid token" });

    req.user = user;
    next();
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
    res.status(401).json({ message: "Unauthorized" });
  }
};

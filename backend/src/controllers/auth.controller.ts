import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import User, { UserDocument } from "../models/user.model";

const TOKEN_EXPIRATION = "15";

interface LoginRequestBody {
  email: string;
  password: string;
}

interface RegisterRequestBody {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const createToken = (payload: object): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Invalid JWT configuration");
  }

  return jwt.sign(payload, secret, {
    expiresIn: `${TOKEN_EXPIRATION}m`,
  });
};

export const register = async (req: Request, res: Response): Promise<Response|undefined> => {
  try {
    const { email, firstName, lastName, password } =
      req.body as RegisterRequestBody;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Potential security issue.
      return res
        .status(400)
        .json({ message: "User with this email is already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: hashedPassword,
    });

    const savedUser: UserDocument = await user.save();

    const token = createToken({
      firstName: savedUser.firstName,
      userId: savedUser.id,
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: parseInt(TOKEN_EXPIRATION, 10) * 60 * 1000,
    });

    res.status(201).json({
      email: savedUser.email,
      firstName: savedUser.firstName,
      id: savedUser.id,
      lastName: savedUser.lastName,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const login = async (req: Request, res: Response): Promise<Response|undefined> => {
  try {
    const { email, password } = req.body as LoginRequestBody;
    const user = await User.findOne({ email: email }).select("+password") as null | UserDocument;

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = createToken({
      firstname: (user).firstName,
      userId: (user).id,
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: parseInt(TOKEN_EXPIRATION, 10) * 60 * 1000,
    });

    res.status(200).json({
      email: user.email,
      firstName: user.firstName,
      id: user.id,
      lastName: user.lastName,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req: Request, res: Response): void  => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

export const getCurrentUser = (req: Request, res: Response): Response|undefined => {
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });

  res.status(200).json({
    email: req.user.email,
    firstName: req.user.firstName,
    id: req.user._id,
    lastName: req.user.lastName,
  });
};

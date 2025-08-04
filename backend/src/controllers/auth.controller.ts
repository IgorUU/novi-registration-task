import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const TOKEN_EXPIRATION = "15";

const createToken = (payload: object): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: `${TOKEN_EXPIRATION}m`,
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

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
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    const token = createToken({
      userId: savedUser.id,
      firstname: savedUser.firstName,
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: parseInt(TOKEN_EXPIRATION, 10) * 60 * 1000,
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = createToken({
      userId: user.id,
      firstname: user.firstName,
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: parseInt(TOKEN_EXPIRATION, 10) * 60 * 1000,
    });

    res.status(200).json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

export const getCurrentUser = (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });

  res.status(200).json({
    id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
  });
};

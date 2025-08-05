import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import User from "../models/user.model";

const TOKEN_EXPIRATION = "15";

const createToken = (payload: object): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: `${TOKEN_EXPIRATION}m`,
  });
};

export const register = async (req: Request, res: Response): Promise<Response|undefined> => {
  try {
    const { email, firstName, lastName, password } = req.body;

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

    const savedUser = await user.save();

    const token = createToken({
      firstname: savedUser.firstName,
      userId: savedUser.id,
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: parseInt(TOKEN_EXPIRATION, 10) * 60 * 1000,
    });

    res.status(201).json({
      email: user.email,
      firstName: user.firstName,
      id: user.id,
      lastName: user.lastName,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const login = async (req: Request, res: Response): Promise<Response|undefined> => {
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
      firstname: user.firstName,
      userId: user.id,
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

export const logout = async (req: Request, res: Response): Promise<void>  => {
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

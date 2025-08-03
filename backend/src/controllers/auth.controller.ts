import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Potential security issue.
      return res.status(400).json({ message: "User with this email is already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    const token = jwt.sign(
      { userId: user.id, firstname: user.firstname },
       process.env.JWT_SECRET as string,
       {expiresIn: "5m"}
    );

    res.status(201).json({
      token: token,
      user: { userId: user.id}
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error.'});
  }
}

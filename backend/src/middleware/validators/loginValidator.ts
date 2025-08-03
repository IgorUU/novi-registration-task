import { body } from "express-validator";

export const loginValidator = [
  body("email").trim().isEmail().withMessage("Invalid email format"),
];

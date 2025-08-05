import { body } from "express-validator";

export const registerValidator = [
  body("firstName").escape().notEmpty().withMessage("First name is required"),
  body("lastName").escape().notEmpty().withMessage("Last name is required"),
  body("email")
  .trim()
  .isEmail()
  .normalizeEmail()
  .withMessage("Invalid email format"),
  body("password")
  .isLength({min: 6})
  .withMessage("The password must be at least 6 characters long"),
]

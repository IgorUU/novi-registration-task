import { body } from "express-validator";

export const registerValidator = [
  body("firstname").escape().notEmpty().withMessage("First name is required"),
  body("lastname").escape().notEmpty().withMessage("Last name is required"),
  body("email")
  .escape()
  .isEmail()
  .withMessage("Invalid email format"),
  body("password")
  .escape()
  .isLength({min: 6})
  .withMessage("The password must be at least 6 characters long"),
]

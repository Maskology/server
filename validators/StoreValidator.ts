import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

// name, contact, email, password, profilePictureUrl, backgroundUrl

export const ValidateStore = [
  body("name")
    .isString()
    .withMessage("Name must be valid string")
    .bail()
    .notEmpty()
    .withMessage("Name can't be empty")
    .bail(),
  body("contact")
    .isMobilePhone("id-ID")
    .bail()
    .notEmpty()
    .withMessage("Contact can't be empty")
    .bail(),
  body("email")
    .isEmail()
    .bail()
    .notEmpty()
    .withMessage("Email can't be empty")
    .bail(),
  body("password")
    .isString()
    .bail()
    .notEmpty()
    .withMessage("Password can't be empty")
    .bail(),
  body("profilePictureUrl")
    .isURL()
    .bail()
    .notEmpty()
    .withMessage("profilePictureUrl can't be empty")
    .bail(),
  body("backgroundUrl")
    .isURL()
    .bail()
    .notEmpty()
    .withMessage("backgroundUrl can't be empty")
    .bail(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
];

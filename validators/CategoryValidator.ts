import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

// name, imageUrl, author, source

export const ValidateCategory = [
  body("name")
    .isString()
    .bail()
    .notEmpty()
    .withMessage("Name can't be empty")
    .bail(),
  body("imageUrl")
    .isURL()
    .bail()
    .notEmpty()
    .withMessage("imageUrl can't be empty")
    .bail(),
  body("author")
    .isString()
    .bail()
    .notEmpty()
    .withMessage("author can't be empty")
    .bail(),
  body("source")
    .isString()
    .bail()
    .notEmpty()
    .withMessage("source can't be empty")
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

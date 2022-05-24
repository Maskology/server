import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const ValidateCategory = [
  body("name")
    .isString()
    .bail()
    .notEmpty()
    .withMessage("Name can't be empty")
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

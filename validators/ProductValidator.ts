import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

// storeId, categoryId, name, imageUrl, stock, price

export const ValidateProduct = [
  body("storeId")
    .isString()
    .bail()
    .notEmpty()
    .withMessage("storeId can't be empty")
    .bail(),
  body("categoryId")
    .isString()
    .bail()
    .notEmpty()
    .withMessage("categoryId can't be empty")
    .bail(),
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
  body("stock")
    .isInt({ min: 0 })
    .bail()
    .notEmpty()
    .withMessage("stock can't be empty")
    .bail()
    .toInt(),
  body("price")
    .isInt({ min: 0 })
    .bail()
    .notEmpty()
    .withMessage("price can't be empty")
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

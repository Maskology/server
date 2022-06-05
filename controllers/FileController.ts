import { NextFunction, Request, Response } from "express";
import { storage as gc } from "../config/";
import { nanoid } from "nanoid";

export default class ProductController {
  static async store(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file;
      const bucket = gc.bucket("maskology-images");
      const user = res.locals.userData;
      bucket
        .file(
          `images/${user.name}_${nanoid(8)}/${nanoid(8)}_${file!.originalname}`
        )
        .save(file!.buffer);

      const imageUrl = bucket
        .file(
          `images/${user.name}_${nanoid(8)}/${nanoid(8)}_${file!.originalname}`
        )
        .publicUrl();

      res.status(200).json({
        url: imageUrl,
      });
    } catch (error) {
      next(error);
    }
  }
}

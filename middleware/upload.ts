import { NextFunction, Request, Response } from "express";
import { storage as gc } from "../config/storageConfig";
import { nanoid } from "nanoid";

export default function uploadToGCP(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const file = req.file;
    const bucket = gc.bucket("maskology-images");
    const user = res.locals.userData;
    const imagePath = `images/${user.name}_${nanoid(8)}/${nanoid(8)}_${
      file!.originalname
    }`;

    bucket.file(imagePath).save(file!.buffer);
    req.body.imageUrl = bucket.file(imagePath).publicUrl();
    next();
  } catch (error) {
    next(error);
  }
}

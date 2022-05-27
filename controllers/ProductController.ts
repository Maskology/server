import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export default class ProductController {
  static async get(req: Request, res: Response) {
    const result = await prisma.product.findMany();

    return res.status(200).json(result);
  }

  static async store(req: Request, res: Response, next: NextFunction) {
    const { ...product } = req.body;

    try {
      const result = await prisma.product.create({
        data: { ...product },
      });

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async show(req: Request, res: Response) {
    const result = await prisma.product.findUnique({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json(result);
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const { ...product } = req.body;

    try {
      const result = await prisma.product.update({
        data: { ...product },
        where: { id: req.params.id },
      });

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.product.delete({
        where: {
          id: req.params.id,
        },
      });

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

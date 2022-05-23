import { Prisma, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export default class CategoryController {
  static async get(req: Request, res: Response) {
    const categories = await prisma.category.findMany();

    return res.status(200).json(categories);
  }

  static async store(req: Request, res: Response, next: NextFunction) {
    const { name, detail } = req.body;

    try {
      const category = await prisma.category.create({
        data: { name, detail },
      });

      return res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async show(req: Request, res: Response) {
    const category = await prisma.category.findUnique({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json(category);
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const { name, detail } = req.body;

    try {
      const category = await prisma.category.update({
        data: {
          name,
          detail,
        },
        where: {
          id: req.params.id,
        },
      });

      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.category.delete({
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

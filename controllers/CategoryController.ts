import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export default class CategoryController {
  static async get(req: Request, res: Response) {
    const q = req.query;
    let limit = 5;
    let page = 1;

    if (q.page && q.limit) {
      page = parseInt(q.page!.toString());
      limit = parseInt(q.limit!.toString());
    }

    const startIndex = (page - 1) * limit;

    const totalData = await prisma.category.count();
    const totalPage = Math.ceil(totalData / limit);

    const result = await prisma.category.findMany({
      take: limit,
      skip: startIndex,
    });

    return res.status(200).json({
      meta: {
        total: totalData,
        totalPage: totalPage,
        page: page,
        lastPage: totalPage,
      },
      data: result,
    });
  }

  static async store(req: Request, res: Response, next: NextFunction) {
    const { ...category } = req.body;

    try {
      const result = await prisma.category.create({
        data: { ...category },
      });

      return res.status(201).json(result);
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

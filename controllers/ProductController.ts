import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import _ from "lodash";

const prisma = new PrismaClient();

export default class ProductController {
  static async get(req: Request, res: Response) {
    const q = req.query;
    let limit = 5;
    let page = 1;

    if (q.page && q.limit) {
      page = parseInt(q.page!.toString());
      limit = parseInt(q.limit!.toString());
    }

    const startIndex = (page - 1) * limit;

    const totalData = await prisma.product.count();
    const totalPage = Math.ceil(totalData / limit);

    const result = await prisma.product.findMany({
      take: limit,
      skip: startIndex,
      where: { category: { tags: q.category?.toString() } },
      include: {
        store: {
          select: {
            name: true,
          },
        },
        category: true,
      },
    });

    const resultWithStoreName = _.map(result, function (el) {
      return _.extend({}, el, { storeName: el.store.name });
    });

    const resultWithoutStore = _.map(
      resultWithStoreName,
      _.partial(_.omit, _, "store")
    );

    return res.status(200).json({
      meta: {
        total: totalData,
        totalPage: totalPage,
        page: page,
        lastPage: totalPage,
      },
      data: _.map(resultWithoutStore, _.partial(_.omit, _, "category")),
    });
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
      include: {
        category: true,
        store: true,
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

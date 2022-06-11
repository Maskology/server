import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import * as argon2 from "argon2";
import _ from "lodash";

const prisma = new PrismaClient();

export default class StoreController {
  static async get(req: Request, res: Response) {
    const q = req.query;
    let limit = 5;
    let page = 1;

    if (q.page && q.limit) {
      page = parseInt(q.page!.toString());
      limit = parseInt(q.limit!.toString());
    }

    const startIndex = (page - 1) * limit;

    const totalData = await prisma.store.count();
    const totalPage = Math.ceil(totalData / limit);

    const result = await prisma.store.findMany({
      take: limit,
      skip: startIndex,
    });

    const resultWithoutPasword = _.map(
      result,
      _.partial(_.omit, _, "password")
    );

    return res.status(200).json({
      meta: {
        total: totalData,
        totalPage: totalPage,
        page: page,
        lastPage: totalPage,
      },
      data: resultWithoutPasword,
    });
  }

  static async store(req: Request, res: Response, next: NextFunction) {
    const { password, ...store } = req.body;

    const hashPassword = await argon2.hash(password);

    try {
      const result = await prisma.store.create({
        data: { password: hashPassword, ...store },
      });

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async show(req: Request, res: Response, next: NextFunction) {
    const result = await prisma.store.findUnique({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json(result);
  }

  static async showProduct(req: Request, res: Response, next: NextFunction) {
    const result = await prisma.store.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        product: true,
      },
    });
    return res.status(200).json(result?.product ?? []);
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const { password, ...store } = req.body;

    const hashPassword = await argon2.hash(password);

    try {
      const result = await prisma.store.update({
        data: { password: hashPassword, ...store },
        where: {
          id: req.params.id,
        },
      });

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.store.delete({
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

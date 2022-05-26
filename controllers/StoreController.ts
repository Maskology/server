import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

export default class StoreController {
  static async get(req: Request, res: Response) {
    const stores = await prisma.store.findMany();

    return res.status(200).json(stores);
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

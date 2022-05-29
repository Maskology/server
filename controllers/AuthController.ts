import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";
import { NextFunction, Request, Response } from "express";
import { generateToken } from "../helpers/jwt";

const prisma = new PrismaClient();

export default class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await prisma.store.findUnique({
        where: { email },
      });

      const admin = await prisma.admin.findUnique({
        where: { email },
      });

      if (user) {
        if (await argon2.verify(user.password, password)) {
          return res.status(200).json({
            user,
            token: generateToken({
              name: user.name,
              email: user.email,
              contact: user.contact,
            }),
          });
        } else {
          return res.status(401).json({ message: "Invalid email or password" });
        }
      } else {
        return res.status(404).json({ message: "User not registered" });
      }
    } catch (error) {
      next(error);
    }
  }
}

import { NextFunction, Response, Request } from "express";
import { decodeToken, TokenData } from "../helpers/jwt";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headers = req.headers.authorization;
  if (headers) {
    const token = headers.split(" ")[1];
    res.locals.userData = decodeToken(token) as TokenData;
    next();
  } else {
    res.sendStatus(401);
  }
};

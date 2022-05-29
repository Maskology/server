import jwt from "jsonwebtoken";

export const secret = process.env.JWTSECRET ?? "123456789secret";

export interface TokenData {
  name: string;
  email: string;
  contact: string;
}

export const generateToken = (payload: TokenData): string => {
  return jwt.sign(payload, secret);
};

export const decodeToken = (token: string): object | string => {
  return jwt.verify(token, secret);
};

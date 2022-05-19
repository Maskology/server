import { Router } from "express";
import { Request, Response, NextFunction } from "express";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "API OK!" });
});

router.get("/menu", (_, res: Response) => {
  res.status(200).json({ message: "This is OUR Menu" });
});

export default router;

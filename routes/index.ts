import { Router } from "express";
import { Request, Response, NextFunction } from "express";

import CategoryController from "../controllers/CategoryController";
import StoreController from "../controllers/StoreController";

import { ValidateCategory } from "../validators/CategoryValidator";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "API OK!" });
});

// Category
router.get("/categories", CategoryController.get);
router.post("/categories", ValidateCategory, CategoryController.store);
router.get("/categories/:id", CategoryController.show);
router.put("/categories/:id", CategoryController.update);
router.delete("/categories/:id", CategoryController.delete);

// Store
router.get("/stores", StoreController.get);
router.post("/stores", StoreController.store);
router.get("/stores/:id", StoreController.show);
router.put("/stores/:id", StoreController.update);
router.delete("/stores/:id", StoreController.delete);

export default router;

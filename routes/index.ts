import { Router } from "express";
import { Request, Response, NextFunction } from "express";

import CategoryController from "../controllers/CategoryController";
import ProductController from "../controllers/ProductController";
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
router.put("/categories/:id", ValidateCategory, CategoryController.update);
router.delete("/categories/:id", CategoryController.delete);

// Store
router.get("/stores", StoreController.get);
router.post("/stores", StoreController.store);
router.get("/stores/:id", StoreController.show);
router.put("/stores/:id", StoreController.update);
router.delete("/stores/:id", StoreController.delete);

//Product
router.get("/products", ProductController.get);
router.post("/products", ProductController.store);
router.get("/products/:id", ProductController.show);
router.put("/products/:id", ProductController.update);
router.delete("/products/:id", ProductController.delete);

export default router;

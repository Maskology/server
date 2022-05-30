import { Router } from "express";
import { Request, Response, NextFunction } from "express";

import AuthController from "../controllers/AuthController";
import CategoryController from "../controllers/CategoryController";
import ProductController from "../controllers/ProductController";
import StoreController from "../controllers/StoreController";

import { ValidateCategory } from "../validators/CategoryValidator";
import { ValidateProduct } from "../validators/ProductValidator";
import { ValidateStore } from "../validators/StoreValidator";

import { adminAuthorization, authenticate } from "../middleware/auth";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "API OK!" });
});

//Auth
router.post("/login", AuthController.login);
router.post(
  "/register",
  authenticate,
  adminAuthorization,
  AuthController.register
);

// Category
router.get("/categories", CategoryController.get);
router.post(
  "/categories",
  ValidateCategory,
  authenticate,
  adminAuthorization,
  CategoryController.store
);
router.get("/categories/:id", CategoryController.show);
router.put(
  "/categories/:id",
  ValidateCategory,
  authenticate,
  adminAuthorization,
  CategoryController.update
);
router.delete(
  "/categories/:id",
  authenticate,
  adminAuthorization,
  CategoryController.delete
);

// Store
router.get("/stores", StoreController.get);
router.post("/stores", ValidateStore, authenticate, StoreController.store);
router.get("/stores/:id", StoreController.show);
router.put("/stores/:id", ValidateStore, authenticate, StoreController.update);
router.delete("/stores/:id", authenticate, StoreController.delete);

//Product
router.get("/products", ProductController.get);
router.post(
  "/products",
  ValidateProduct,
  authenticate,
  ProductController.store
);
router.get("/products/:id", ProductController.show);
router.put(
  "/products/:id",
  ValidateProduct,
  authenticate,
  ProductController.update
);
router.delete("/products/:id", authenticate, ProductController.delete);

export default router;

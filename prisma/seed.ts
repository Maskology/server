import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";
import checkLabel from "../config/machineLearningLabel";

const prisma = new PrismaClient();

async function load() {
  try {
    const listCategoryDataSource = checkLabel();
    const listCategoryData = listCategoryDataSource?.listCategoryData ?? [];

    const categoryData = await prisma.category.createMany({
      data: listCategoryData,
    });

    const hashPassword = await argon2.hash("maskology2022");
    const adminData = await prisma.admin.create({
      data: {
        password: hashPassword,
        email: "admin@maskology.id",
        name: "Admin",
      },
    });

    if (adminData && categoryData) {
      console.log("Added Admin and Category data");
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

load();

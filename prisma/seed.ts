import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

async function load() {
  try {
    const hashPassword = await argon2.hash("maskology2022");
    const result = await prisma.admin.create({
      data: {
        password: hashPassword,
        email: "admin@maskology.id",
        name: "Admin",
      },
    });
    console.log("Added Admin data");
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

load();

import { PrismaClient } from "@prisma/client";

async function test() {
  const prisma = new PrismaClient();
  try {
    console.log("Connecting to database using Prisma Client...");
    const res = await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Database connection successful! Query result:", res);
  } catch (err: any) {
    console.error("❌ Database connection failed:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();

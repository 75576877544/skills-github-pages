import { PrismaClient } from "@prisma/client";

declare global {
  // Declare global for hot-reload in dev
  var prismaForGlobal: PrismaClient | undefined;
}

export const db: PrismaClient = globalThis.prismaForGlobal ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prismaForGlobal = db;

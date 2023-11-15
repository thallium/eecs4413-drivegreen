import { PrismaClient } from "@prisma/client";

export const prisma = 
  global.prisma ||
  new PrismaClient({
    log:["error"],
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma
// bringing in the prisma client - connection tool to talk to postgres
import { PrismaClient } from "@prisma/client";

// new instance of prismaClient
export const db = globalThis.prisma || new PrismaClient();

// in dev same Prisma client gets reused 
if(process.env.NODE_ENV !== "production"){
    globalThis.prisma = db;
}
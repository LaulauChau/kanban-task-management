import { PrismaClient } from "@prisma/client";

function prismaClientSingleton() {
  return new PrismaClient();
}

// biome-ignore lint/suspicious/noShadowRestrictedNames: Cache the database connection in development. This avoids creating a new connection on every HMR update.
declare const globalThis: {
  dbGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const db = globalThis.dbGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.dbGlobal = db;
}

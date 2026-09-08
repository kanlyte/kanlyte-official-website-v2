import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Next's standalone output splits server code into many separate route
// chunks, and several of them import this module independently. Each
// PrismaClient owns a native query engine that spins up its own
// multi-threaded Tokio runtime (one OS thread per CPU core) -- creating more
// than one per process exhausts the account's process/thread limit almost
// immediately. Guarding the globalThis cache to dev-only (the textbook
// Prisma+Next.js HMR pattern) assumes prod only ever evaluates this module
// once; that assumption doesn't hold here, so the cache must apply in every
// environment to guarantee exactly one engine per process.
function createPrismaClient() {
  const dbUrl = new URL(process.env.DATABASE_URL!);

  // Each Node process (Passenger can run more than one for this app) opens
  // its own pool. The mariadb driver defaults to 10 connections/process,
  // which easily blows past a shared-hosting account's max_user_connections
  // cap and leaves later queries queued (slow requests, no thrown error)
  // instead of rejected. Keep the per-process ceiling low and release idle
  // connections quickly so the pool doesn't sit on connections it isn't using.
  const adapter = new PrismaMariaDb({
    host: dbUrl.hostname,
    port: dbUrl.port ? Number(dbUrl.port) : 3306,
    user: decodeURIComponent(dbUrl.username),
    password: decodeURIComponent(dbUrl.password),
    database: dbUrl.pathname.replace(/^\//, ""),
    connectionLimit: Number(process.env.DATABASE_CONNECTION_LIMIT ?? 1),
    acquireTimeout: 10_000,
    idleTimeout: 60,
  });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
}

const prisma = globalForPrisma.prisma ?? createPrismaClient();

globalForPrisma.prisma = prisma;

export { prisma };

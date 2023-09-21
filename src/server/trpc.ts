import * as trpcNext from "@trpc/server/adapters/next";

import { ZodError } from "zod";
import { getServerSession } from "next-auth";
import type { inferAsyncReturnType } from "@trpc/server";
import { initTRPC } from "@trpc/server";
import { nextAuthOptions } from "@/utils/nextAuthOptions";
import prisma from "./prisma";
import superjson from "superjson";

export async function createContext(ctx: trpcNext.CreateNextContextOptions) {
  const { req, res } = ctx;
  const session = await getServerSession(req, res, nextAuthOptions);

  return {
    req,
    res,
    prisma,
    session,
  };
}

// export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;

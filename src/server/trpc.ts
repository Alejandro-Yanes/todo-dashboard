import * as trpcNext from "@trpc/server/adapters/next";

import { TRPCError, inferAsyncReturnType } from "@trpc/server";

import { ZodError } from "zod";
import { getServerSession } from "next-auth";
import { initTRPC } from "@trpc/server";
import { nextAuthOptions } from "@/utils/nextAuthOptions";
import prisma from "./prisma";
import superjson from "superjson";

export async function createContext(ctx: trpcNext.CreateNextContextOptions) {
  const { req, res } = ctx;
  const session = await getServerSession(req, res, nextAuthOptions);

  const email = session?.user?.email;

  if (!email) {
    return {
      req,
      res,
      prisma,
    };
  }

  const user = await prisma.user.findUnique({ where: { email } });

  return {
    req,
    res,
    prisma,
    currentUser: user?.id,
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

const enforcedUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.currentUser) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not Authenticated" });
  }

  return next({
    ctx: {
      currentUser: ctx.currentUser,
    },
  });
});

export const privateProcedure = t.procedure.use(enforcedUserIsAuthed);

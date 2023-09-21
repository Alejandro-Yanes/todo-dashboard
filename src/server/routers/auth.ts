import { publicProcedure, router } from "../trpc";

import { TRPCError } from "@trpc/server";
import { hash } from "bcrypt";
import { signUpSchema } from "../validation/auth";

export const authRouter = router({
  current: publicProcedure.query(async (opts) => {
    const session = opts.ctx.session;
    console.log(session?.user?.email);
    if (!session?.user?.email) {
      throw new Error("Not signed in");
    }

    const currentUser = await opts.ctx.prisma.user.findUnique({
      where: {
        email: session.user?.email,
      },
    });

    if (!currentUser) {
      throw new Error("User doesnt exist");
    }

    return {
      currentUser,
    };
  }),
  register: publicProcedure.input(signUpSchema).mutation(async (opts) => {
    const { username, email, password, name } = opts.input;
    const { ctx } = opts;

    if (!username || !email || !password) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Credentials missing",
      });
    }

    const exist = await ctx.prisma.user.findFirst({
      where: { email },
    });

    if (exist) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Email already in use",
      });
    }

    const hashedPassword = await hash(password, 12);

    const result = await ctx.prisma.user.create({
      data: {
        username,
        hashedPassword,
        email,
        name,
      },
    });

    if (result) {
      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    } else {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Error Creating user",
      });
    }
  }),
});

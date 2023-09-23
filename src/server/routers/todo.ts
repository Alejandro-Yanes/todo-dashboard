import { privateProcedure, publicProcedure, router } from "../trpc";

import { TRPCError } from "@trpc/server";
import { addTodo } from "../validation/todo";
import { z } from "zod";

export const todoRouter = router({
  addTodo: privateProcedure.input(addTodo).mutation(async (opts) => {
    const { status, description, substacks, title } = opts.input;

    const currentUser = opts.ctx.currentUser;

    if (!currentUser) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Not Authenticated",
      });
    }

    const todo = await opts.ctx.prisma.todo.create({
      data: {
        description,
        title,
        status,
        userId: currentUser,
      },
    });

    if (substacks) {
      substacks.map(async (substack) => {
        await opts.ctx.prisma.substacks.create({
          data: { description: substack.name, todoId: todo.id, done: false },
        });
      });
    }

    return {
      message: "all worked out",
    };
  }),
  getTodos: privateProcedure.query(async (opts) => {
    const todos = await opts.ctx.prisma.todo.findMany({
      where: { userId: opts.ctx.currentUser },
      include: { substacks: true },
    });

    return {
      todos,
    };
  }),
});

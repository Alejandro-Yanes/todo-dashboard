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
  addBoard: privateProcedure.input(z.string()).mutation(async (opts) => {
    const boardTitle = opts.input;
    const currentUser = opts.ctx.currentUser;
    if (!boardTitle) {
      throw new TRPCError({
        message: "Needs board title",
        code: "BAD_REQUEST",
      });
    }

    if (!currentUser) {
      throw new TRPCError({
        message: "Needs to be authenticated",
        code: "UNAUTHORIZED",
      });
    }

    const board = await opts.ctx.prisma.board.create({
      data: { title: boardTitle, userId: currentUser },
    });

    return { board };
  }),
  getBoardById: privateProcedure.input(z.string()).query(async (opts) => {
    const boardId = opts.input;

    if (!boardId) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Needs board Id" });
    }

    const board = await opts.ctx.prisma.board.findUnique({
      where: { id: boardId },
      include: { todos: { include: { substacks: true } } },
    });

    return {
      board,
    };
  }),
  getBoardsByUser: privateProcedure.query(async (opts) => {
    const currentUser = opts.ctx.currentUser;

    if (!currentUser) {
      throw new TRPCError({
        message: "Needs to be authenticated",
        code: "UNAUTHORIZED",
      });
    }

    const boards = await opts.ctx.prisma.board.findMany({
      where: { userId: currentUser },
    });

    const boardsCount = await opts.ctx.prisma.board.count({
      where: { userId: currentUser },
    });

    return {
      boards,
      boardsCount,
    };
  }),
});

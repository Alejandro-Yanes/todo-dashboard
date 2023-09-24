import * as z from "zod";

const StatusTypeSchema = z.enum(["TODO", "DOING", "DONE"]);

export const addTodoForm = z.object({
  title: z.string(),
  description: z.string().min(10).max(100),
  substacks: z.array(z.object({ name: z.string() })),
  status: StatusTypeSchema,
});

export const addTodo = z.object({
  title: z.string(),
  description: z.string().min(10).max(100),
  substacks: z.array(z.object({ name: z.string() })),
  status: StatusTypeSchema,
  boardId: z.string(),
});

export const addBoard = z.object({
  title: z
    .string()
    .min(5, "Board title is too short")
    .max(20, "Board title is too long"),
});

export type IaddTodoForm = z.infer<typeof addTodoForm>;
export type IaddBoard = z.infer<typeof addBoard>;

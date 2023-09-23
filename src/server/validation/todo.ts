import * as z from "zod";

const StatusTypeSchema = z.enum(["TODO", "DOING", "DONE"]);

export const addTodo = z.object({
  title: z.string(),
  description: z.string().min(10).max(100),
  substacks: z.array(z.object({ name: z.string() })),
  status: StatusTypeSchema,
});

export const addBoard = z.object({
  title: z
    .string()
    .min(5, "Board title is too short")
    .max(20, "Board title is too long"),
});

export type IaddTodo = z.infer<typeof addTodo>;
export type IaddBoard = z.infer<typeof addBoard>;

import * as z from "zod";

const StatusTypeSchema = z.enum(["TODO", "DOING", "DONE"]);

export const addTodo = z.object({
  title: z.string(),
  description: z.string().min(10).max(100),
  substacks: z.array(z.object({ name: z.string() })),
  status: StatusTypeSchema,
});

export type IaddTodo = z.infer<typeof addTodo>;

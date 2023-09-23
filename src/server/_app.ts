import { authRouter } from "./routers/auth";
import { router } from "./trpc";
import { todoRouter } from "./routers/todo";

export const appRouter = router({
  auth: authRouter,
  todo: todoRouter,
});

export type AppRouter = typeof appRouter;

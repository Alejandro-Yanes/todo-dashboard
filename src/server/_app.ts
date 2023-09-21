import { authRouter } from "./routers/auth";
import { postRouter } from "./routers/post";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  post: postRouter,
});

export type AppRouter = typeof appRouter;

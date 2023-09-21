import { publicProcedure, router } from "../trpc";

import { z } from "zod";

export const postRouter = router({
  bye: publicProcedure.input(z.object({ text: z.string() })).query((opts) => {
    return {
      greeting: `hello ${opts.input.text}`,
    };
  }),
});

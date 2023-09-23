import type { GetServerSideProps, GetServerSidePropsContext } from "next";

import { getServerSession } from "next-auth";
import { nextAuthOptions } from "./nextAuthOptions";

export const requireAuth =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await getServerSession(ctx.req, ctx.res, nextAuthOptions);

    if (!session) {
      return {
        redirect: {
          destination: "/auth/signin",
          permanent: false,
        },
      };
    }

    return await func(ctx);
  };

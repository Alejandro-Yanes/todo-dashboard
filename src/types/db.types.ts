import { Prisma } from "@prisma/client";

export type TodoWithSubstacks = Prisma.TodoGetPayload<{
  include: { substacks: true };
}>;

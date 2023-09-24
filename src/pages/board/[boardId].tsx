import Column from "@/components/organisms/Column";
import React from "react";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";

export default function Board() {
  const router = useRouter();

  const { boardId } = router.query;
  const { data: todos, isLoading: todosLoading } =
    trpc.todo.getBoardById.useQuery(boardId as string);

  if (todosLoading) return <div>loading ...</div>;

  if (!todos) return <div>error ...</div>;

  return (
    <div className="flex gap-5">
      {todos &&
        todos.board.map((todo, i) => (
          <React.Fragment key={i}>
            <Column todo={todo} />
          </React.Fragment>
        ))}
    </div>
  );
}

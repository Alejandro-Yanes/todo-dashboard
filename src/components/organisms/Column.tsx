import React from "react";
import TodoItem from "../molecules/todoItem";
import { TodoWithSubstacks } from "@/types/db.types";

export type ColumnProps = {
  todo: { status: string; todos: TodoWithSubstacks[]; count: number };
};

const Column: React.FunctionComponent<ColumnProps> = ({ todo }) => {
  const { todos, status, count } = todo;
  console.log(todo);

  const color = (status: string) => {
    if (status === "DONE") {
      return "bg-done";
    } else if (status === "DOING") {
      return "bg-doing";
    } else if (status === "TODO") {
      return "bg-todo";
    }
  };
  return (
    <div className="w-[400px]">
      <div className="flex flex-col gap-10">
        <div className="flex gap-2 items-center dark:text-dark-text-secondary">
          <div className={`rounded-full  h-5 w-5 ${color(status)}`}></div>
          <h3 className="font-bold tracking-widest text-md capitalize">
            {status.toLowerCase()} ({count})
          </h3>
        </div>
        <div className="flex flex-col gap-5">
          {todos && todos.map((todo) => <TodoItem todo={todo} />)}
        </div>
      </div>
    </div>
  );
};

export default Column;

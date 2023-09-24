import React from "react";
import { TodoWithSubstacks } from "@/types/db.types";

export type TodoItemProps = {
  todo: TodoWithSubstacks;
};

const TodoItem: React.FunctionComponent<TodoItemProps> = ({ todo }) => {
  const substacksCount = todo.substacks.length;
  const substacksDone = todo.substacks.filter(
    (substack) => substack.done === true
  ).length;

  return (
    <>
      <div className="dark:bg-dark-main-color py-7 px-5 rounded-lg shadow-xl cursor-pointer">
        <h3 className="text-md dark:text-dark-text-primary font-bold">
          {todo.title}
        </h3>
        <p className="text-sm dark:text-dark-text-secondary">
          {substacksDone} to {substacksCount} substacks
        </p>
      </div>
    </>
  );
};

export default TodoItem;

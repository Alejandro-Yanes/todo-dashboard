import { TodoWithSubstacks } from "@/types/db.types";

const todosRearange = (todos: TodoWithSubstacks[]) => {
  const todosObject = todos.reduce(
    (result: any, cv, i) => ({
      ...result,
      [cv.status]: [...(result[cv.status] || []), cv],
    }),
    {}
  );

  let todosObjectKeys = Object.keys(todosObject);

  let todosArray = todosObjectKeys.map((key) => ({
    todos: todosObject[key],
    count: todosObject[key].length,
    status: key,
  }));

  return todosArray;
};

export default todosRearange;

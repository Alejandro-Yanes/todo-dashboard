import Link from "next/link";
import { MdOutlineListAlt } from "react-icons/md";
import React from "react";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";

export type MenuItemProps = {};

const MenuItem: React.FunctionComponent<MenuItemProps> = (props) => {
  const router = useRouter();
  const { data: boardsData } = trpc.todo.getBoardsByUser.useQuery();

  return (
    <>
      {boardsData &&
        boardsData.boards.map((board) => {
          if (router.query.boardId === board.id) {
            return (
              <div className="flex gap-3 bg-doing dark:text-dark-text-primary  items-center rounded-r-full pl-7 py-3 mr-7 cursor-pointer">
                <MdOutlineListAlt size={20} className="fill-white-icons" />
                <h3 className="font-bold text-dark-text-white">
                  {board.title}
                </h3>
              </div>
            );
          } else {
            return (
              <Link
                className="flex items-center gap-3 pl-7 py-3 mr-7 dark:text-dark-text-secondary"
                key={board.id}
                href={`/board/${board.id}`}
              >
                <MdOutlineListAlt size={20} className="fill-dark-icons" />
                <h3 className="font-bold ">{board.title}</h3>
              </Link>
            );
          }
        })}
    </>
  );
};

export default MenuItem;

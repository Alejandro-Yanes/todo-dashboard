import { AiFillEyeInvisible } from "react-icons/ai";
import { BiSolidMoon } from "react-icons/bi";
import { BsSunFill } from "react-icons/bs";
import Link from "next/link";
import { MdOutlineListAlt } from "react-icons/md";
import MenuItem from "../molecules/menuItem";
import React from "react";
import { signOut } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import { useCreateBoardModal } from "@/hooks/zustand/useCreateBoardModal";
import { useRouter } from "next/router";
import { useShowSidebar } from "@/hooks/zustand/useShowSidebar";
import { useThemeContext } from "@/context/ThemeContextProvider";

export type SidebarProps = {};

const Sidebar: React.FunctionComponent<SidebarProps> = (props) => {
  const { theme, toggleTheme } = useThemeContext();
  const { isOpen, toggleOpen } = useShowSidebar();
  const { setOpen } = useCreateBoardModal();
  const { data: boardsData } = trpc.todo.getBoardsByUser.useQuery();

  if (!isOpen) return null;

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform ">
      <div className="flex flex-col h-full pb-4 overflow-y-auto border-r-2 border-neutral-700/50 dark:bg-dark-main-color bg-light-main-color">
        {/* title */}

        <div className="h-24 flex items-center justify-center">
          <h1 className="text-2xl text-dark-text-primary font-bold">TITLE</h1>
        </div>
        <h2 className=" px-7 font-bold uppercase tracking-wider py-3 dark:text-dark-text-secondary ">
          All Boards ({boardsData?.boardsCount})
        </h2>
        <MenuItem />

        {/* add button */}
        <button
          className="flex items-center gap-3 pl-7 py-3 mr-7 dark:text-doing"
          onClick={() => setOpen()}
        >
          <MdOutlineListAlt size={20} className="fill-pink-icons" />
          <h3 className="font-bold text-pink">+ Create New Board</h3>
        </button>

        {/* bot zone */}
        <div className="px-7 mt-auto">
          {/* theme switcher */}
          <div className="dark:bg-dark-background bg-light-background flex gap-3 py-3 rounded justify-center items-center ">
            <BsSunFill className="dark:text-dark-text-secondary" size={20} />
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={theme === "light" ? false : true}
                className="sr-only peer"
                onChange={toggleTheme}
              />
              <div className="w-11 h-6 bg-doing peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 "></div>
            </label>
            <BiSolidMoon className="dark:text-dark-text-secondary" size={20} />
          </div>

          {/* hide menu  */}
          <button
            onClick={() => toggleOpen()}
            className="flex items-center gap-2 mt-4 dark:text-dark-text-secondary"
          >
            <AiFillEyeInvisible />
            <span className="font-bold">Hide Sidebar</span>
          </button>
          <button onClick={() => signOut()}>log out</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

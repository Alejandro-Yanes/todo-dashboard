import { AiFillEyeInvisible, AiOutlineMenu } from "react-icons/ai";
import { BsSunFill, BsThreeDotsVertical } from "react-icons/bs";

import { BiSolidMoon } from "react-icons/bi";
import { Inter } from "next/font/google";
import { MdOutlineListAlt } from "react-icons/md";
import { requireAuth } from "@/utils/requireAuth";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { useThemeContext } from "@/context/ThemeContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

export default function Home() {
  const { data: currentUser } = trpc.auth.current.useQuery();
  const { data: todos } = trpc.todo.getTodos.useQuery();
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const { theme, toggleTheme } = useThemeContext();

  console.log(todos);

  return (
    <main className={`${inter.className}`}>
      <div className={"font-jakarta dark:text-dark-text-grey text-small "}>
        {/* sidebar  */}
        {showSidebar && (
          <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform ">
            <div className="flex flex-col h-full py-4 overflow-y-auto border-r-2 border-b-color dark:bg-dark-main-color bg-light-main-color">
              {/* title */}

              <h2 className="px-7 font-bold uppercase tracking-wider py-3 dark:text-dark-text-secondary">
                All Boards ()
              </h2>
              {/* active page */}
              <div className="flex gap-3 bg-doing dark:text-dark-text-primary  items-center rounded-r-full pl-7 py-3 mr-7">
                <MdOutlineListAlt size={20} className="fill-white-icons" />
                <h3 className="font-bold text-dark-text-white">Example Test</h3>
              </div>
              {/* not active page */}
              <div className="flex items-center gap-3 pl-7 py-3 mr-7 dark:text-dark-text-secondary">
                <MdOutlineListAlt size={20} className="fill-dark-icons" />
                <h3 className="font-bold ">Example Test</h3>
              </div>
              {/* add button */}
              <div className="flex items-center gap-3 pl-7 py-3 mr-7 dark:text-doing">
                <MdOutlineListAlt size={20} className="fill-pink-icons" />
                <h3 className="font-bold text-pink">+ Create New Board</h3>
              </div>

              {/* bot zone */}
              <div className="px-7 mt-auto">
                {/* theme switcher */}
                <div className="dark:bg-dark-background bg-light-background flex gap-3 py-3 rounded justify-center items-center ">
                  <BsSunFill
                    className="dark:text-dark-text-secondary"
                    size={20}
                  />
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={theme === "light" ? false : true}
                      className="sr-only peer"
                      onChange={toggleTheme}
                    />
                    <div className="w-11 h-6 bg-doing peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 "></div>
                  </label>
                  <BiSolidMoon
                    className="dark:text-dark-text-secondary"
                    size={20}
                  />
                </div>

                {/* hide menu  */}
                <button
                  onClick={() => setShowSidebar((prev) => !prev)}
                  className="flex items-center gap-2 mt-4 dark:text-dark-text-secondary"
                >
                  <AiFillEyeInvisible />
                  <span>Hide Sidebar</span>
                </button>
              </div>
            </div>
          </aside>
        )}

        {/* topbar  */}
        <div
          className={`h-24 p-4 bg-light-main-color fixed w-full dark:bg-dark-main-color  border-b-2 border-b-color flex justify-between items-center ${
            showSidebar ? "ml-64" : ""
          } `}
        >
          <div className="flex gap-4">
            {!showSidebar && (
              <button onClick={() => setShowSidebar((prev) => !prev)}>
                <AiOutlineMenu size={20} />
              </button>
            )}

            <h1 className="text-jakarta font-bold  dark:text-dark-text-primary text-extra-big">
              Platform Launch
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-full bg-pink py-2 px-5 font-bold dark:text-dark-text-primary dark:bg-doing">
              +Add New Task
            </button>
            <button>
              <BsThreeDotsVertical className="dark:fill-dark-icons" size={20} />
            </button>
          </div>
        </div>

        {/* site content  */}
        <div className="h-screen bg-light-background dark:bg-dark-background ml-64 mt-24">
          HELLO WORLD
          {todos &&
            todos.todos.map((todo) => (
              <>
                <p>{todo.status}</p>
                <p>{todo.title}</p>
              </>
            ))}
        </div>
      </div>
    </main>
  );
}

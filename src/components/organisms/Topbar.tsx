import { AiOutlineMenu } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import React from "react";
import { useCreateTodoModal } from "@/hooks/zustand/useCreateTodoModal";
import { useShowSidebar } from "@/hooks/zustand/useShowSidebar";

export type TopbarProps = {};

const Topbar: React.FunctionComponent<TopbarProps> = (props) => {
  const { isOpen, toggleOpen } = useShowSidebar();
  const { isOpen: test, setOpen } = useCreateTodoModal();

  return (
    <div
      className={`h-24 p-4 bg-light-main-color fixed top-0 right-0 dark:bg-dark-main-color border-b-2 border-neutral-700/50 flex justify-between items-center ${
        isOpen ? "left-64" : "left-0"
      } `}
    >
      <div className="flex gap-4">
        {!isOpen && (
          <button onClick={() => toggleOpen()}>
            <AiOutlineMenu size={20} />
          </button>
        )}

        <h1 className="text-jakarta font-bold  dark:text-dark-text-primary text-extra-big">
          Platform Launch
        </h1>
      </div>
      <div className="flex items-center gap-3" onClick={() => setOpen()}>
        <button className="rounded-full bg-pink py-2 px-5 font-bold dark:text-dark-text-primary dark:bg-doing">
          +Add New Task
        </button>
        <button>
          <BsThreeDotsVertical className="dark:fill-dark-icons" size={20} />
        </button>
      </div>
    </div>
  );
};

export default Topbar;

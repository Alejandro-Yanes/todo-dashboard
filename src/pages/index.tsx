import { AiFillEyeInvisible, AiOutlineMenu } from "react-icons/ai";
import { BsSunFill, BsThreeDotsVertical } from "react-icons/bs";

import { BiSolidMoon } from "react-icons/bi";
import Column from "@/components/organisms/Column";
import { Inter } from "next/font/google";
import { MdOutlineListAlt } from "react-icons/md";
import { Montserrat } from "next/font/google";
import Sidebar from "@/components/organisms/Sidebar";
import Topbar from "@/components/organisms/Topbar";
import { requireAuth } from "@/utils/requireAuth";
import { signOut } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { useThemeContext } from "@/context/ThemeContextProvider";

const montserrat = Montserrat({ subsets: ["latin"] });

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

export default function Home() {
  const { data: currentUser } = trpc.auth.current.useQuery();
  const { data: todos } = trpc.todo.getTodos.useQuery();

  console.log(todos);

  return (
    <main className={`${montserrat.className}`}>
      <Column />
    </main>
  );
}

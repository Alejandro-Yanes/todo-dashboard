import { Inter } from "next/font/google";
import { requireAuth } from "@/utils/requireAuth";
import { signOut } from "next-auth/react";
import { trpc } from "@/utils/trpc";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

export default function Home() {
  const { data } = trpc.auth.current.useQuery();
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1>HOME PAGE</h1>
      <h2>{data?.currentUser?.name}</h2>
      <button onClick={() => signOut()}>sing out</button>
    </main>
  );
}

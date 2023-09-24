import Column from "@/components/organisms/Column";
import { Montserrat } from "next/font/google";
import { requireAuth } from "@/utils/requireAuth";
import todosRearange from "@/utils/todosRearange";
import { trpc } from "@/utils/trpc";

const montserrat = Montserrat({ subsets: ["latin"] });

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

export default function Home() {
  const { data: currentUser } = trpc.auth.current.useQuery();

  return <main className={`${montserrat.className}`}></main>;
}

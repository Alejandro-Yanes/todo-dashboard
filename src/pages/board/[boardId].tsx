import { useRouter } from "next/router";

export default function Board() {
  const router = useRouter();

  const { boardId } = router.query;

  return <div></div>;
}

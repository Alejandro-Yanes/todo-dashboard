import "@/styles/globals.css";

import type { AppProps } from "next/app";
import CreateBoardModal from "@/components/templates/CreateBoardModal";
import Layout from "@/components/templates/Layout";
import Modal from "@/components/templates/Modal";
import { SessionProvider } from "next-auth/react";
import { ThemeContextProvider } from "@/context/ThemeContextProvider";
import ThemeSwitcher from "@/components/atoms/ThemeSwitcher";
import { Toaster } from "react-hot-toast";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  if (
    router.pathname === "/auth/signin" ||
    router.pathname === "/auth/signup"
  ) {
    return (
      <SessionProvider session={pageProps.session}>
        <ThemeContextProvider>
          <Toaster />
          <Component {...pageProps} />
          <ThemeSwitcher />
        </ThemeContextProvider>
      </SessionProvider>
    );
  }

  return (
    <SessionProvider session={pageProps.session}>
      <Modal />
      <CreateBoardModal />
      <Toaster />
      <ThemeContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ThemeSwitcher />
      </ThemeContextProvider>
    </SessionProvider>
  );
}

export default trpc.withTRPC(App);

import "@/styles/globals.css";

import type { AppProps } from "next/app";
import Modal from "@/components/templates/Modal";
import { SessionProvider } from "next-auth/react";
import { ThemeContextProvider } from "@/context/ThemeContextProvider";
import ThemeSwitcher from "@/components/atoms/ThemeSwitcher";
import { Toaster } from "react-hot-toast";
import { trpc } from "@/utils/trpc";

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Modal />
      <Toaster />
      <ThemeContextProvider>
        <Component {...pageProps} />
        <ThemeSwitcher />
      </ThemeContextProvider>
    </SessionProvider>
  );
}

export default trpc.withTRPC(App);

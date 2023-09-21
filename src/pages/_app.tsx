import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ThemeContextProvider } from "@/context/ThemeContextProvider";
import ThemeSwitcher from "@/component/themeSwitcher";
import { Toaster } from "react-hot-toast";
import { trpc } from "@/utils/trpc";

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <ThemeContextProvider>
        <Component {...pageProps} />
      </ThemeContextProvider>
    </SessionProvider>
  );
}

export default trpc.withTRPC(App);

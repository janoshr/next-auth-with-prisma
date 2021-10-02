import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import React from "react";
import { CssBaseline } from "@mui/material";
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>Next-Auth with prisma</title>
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;

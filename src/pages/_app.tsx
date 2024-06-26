import { AppProps } from "next/app";
import React from "react";
import '../styles/global.scss';
import {Header} from "../components/Header/header";
import {Provider as NextAuthProvider} from "next-auth/client"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header/>
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}

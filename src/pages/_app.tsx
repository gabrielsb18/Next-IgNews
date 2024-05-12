import { AppProps } from "next/app";
import React from "react";
import '../styles/global.scss';
import {Header} from "../components/Header/header"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header/>
      <Component {...pageProps} />
    </>
  )
}

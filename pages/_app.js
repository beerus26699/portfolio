import "@/styles/globals.scss";
import "@/styles/Skills.scss";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Hainv Services</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

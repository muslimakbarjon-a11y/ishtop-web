import "../styles/globals.css";
import BottomNav from "../components/BottomNav";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>IshTop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      <BottomNav />
    </>
  );
}

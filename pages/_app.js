import "tailwindcss/tailwind.css";
import Head from "next/head";
import CookieBanner from "../components/CookieBanner/CookieBanner";
import Analytics from "../components/Analytics/Analytics";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Ultimate React.js starter</title>
        <meta
          name="description"
          content="Create your next React app by using this starter. Brings a full-stack React web app to life in minutes. Made using a dream tech stack: React.js, Next.js, Firebase and TailwindCSS."
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#fcf4ed"></meta>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Component {...pageProps} />
      <CookieBanner
        privacyPolicyLink={"/privacy"}
        showStatistic={true}
        showMarketing={false}
        showExternalMedia={false}
      />
      <Analytics />
    </>
  );
}

export default MyApp;

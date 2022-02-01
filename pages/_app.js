import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import CookieBanner from "../components/CookieBanner/CookieBanner";
import Analytics from "../components/Analytics/Analytics";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>IdeaIsland</title>
        <meta
          name="description"
          content="Bring your next idea to life with IdeaIsland"
        />

        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#EEC3FD"></meta>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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

        {/* <!-- Disable tap highlight on IE --> */}
        <meta name="msapplication-tap-highlight" content="no" />

        {/*Add to homescreen for Chrome on Android --> */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="IdeaIsland" />
        <link
          rel="icon"
          sizes="192x192"
          href="images/touch/chrome-touch-icon-192x192.png"
        />

        {/* Add to homescreen for Safari on iOS --> */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="IdeaIsland" />
        <link rel="apple-touch-icon" href="images/touch/apple-touch-icon.png" />

        {/* <!-- Tile icon for Win8 (144x144 + tile color) --> */}
        <meta
          name="msapplication-TileImage"
          content="images/touch/ms-touch-icon-144x144-precomposed.png"
        />
        <meta name="msapplication-TileColor" content="#EEC3FD" />

        <link
          rel="preload"
          href="/fonts/Sniglet-Regular.ttf"
          as="font"
          crossOrigin=""
        />
        <link rel="preload" href="/fonts/Freude.otf" as="font" crossOrigin="" />
        {/* <link
            rel="preload"
            href="/fonts/EBGaramond/EBGaramond-Medium.ttf"
            as="font"
            crossOrigin=""
          /> */}
      </Head>

      {/* <style jsx global>{`
body {
  margin: 0;
}
`}</style> */}
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
          <CookieBanner
            privacyPolicyLink={"/privacy"}
            showStatistic={true}
            showMarketing={false}
            showExternalMedia={false}
          />
        </Layout>
        <Analytics />
      </Provider>
    </>
  );
}

export default MyApp;

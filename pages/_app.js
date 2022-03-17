import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

import { store, persistor } from "../redux/store";
// import CookieBanner from "../components/CookieBanner/CookieBanner";
// import Analytics from "../components/Analytics/Analytics";
import Layout from "../components/Layout/Layout";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";
import { useEffect, useState } from "react";
import FullLoader from "../components/Layout/FullLoader";
import { useRouter } from "next/router";
import Script from "next/script";
import Head from "../components/Header";
import Header from "../components/Header";
// import splitbee from '@splitbee/web';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  // splitbee.init()

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = (url) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  if (typeof window === "undefined") {
    // console.log("SERVER");
    return (
      <>
        <Header />

        <Provider store={store}>
          {/* <PersistGate loading={<FullLoader />} persistor={persistor}> */}
          <UserContext.Provider value={userData}>
            <Layout>
              <FullLoader show={loading} />
              <Component {...pageProps} />
              {/* <CookieBanner
              privacyPolicyLink={"/privacy"}
              showStatistic={true}
              showMarketing={false}
              showExternalMedia={false}
            /> */}
            </Layout>
            {/* <Analytics /> */}
          </UserContext.Provider>
          {/* </PersistGate> */}
        </Provider>
      </>
    );
  }

  return (
    <>
      <Header />

      <Provider store={store}>
        <PersistGate loading={<FullLoader />} persistor={persistor}>
          <UserContext.Provider value={userData}>
            <Layout>
              <FullLoader show={loading} />
              <Component {...pageProps} />
              {/* <CookieBanner
            privacyPolicyLink={"/privacy"}
            showStatistic={true}
            showMarketing={false}
            showExternalMedia={false}
          /> */}
            </Layout>
            {/* <Analytics /> */}
          </UserContext.Provider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;

import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { Provider, useStore } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { hydrate } from "react-dom";
import { store, persistor } from "../redux/store";
import Layout from "../components/Layout/Layout";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";
import { useEffect, useState, useContext } from "react";
import FullLoader from "../components/Layout/FullLoader";
import { useRouter } from "next/router";
import { wrapper } from "../redux/store";
import AuthCheck from "../components/Authentication/AuthCheck";
import * as gtag from "../lib/gtag";
import { steps } from "../components/Authentication/onboarding/steps";
import dynamic from "next/dynamic";

// webvitals for axiom log drain
export function reportWebVitals(metric) {
  const url = process.env.NEXT_PUBLIC_AXIOM_INGEST_ENDPOINT;
  
  if (!url) {
    return;
  }
  
  const body = JSON.stringify({
    route: window.__NEXT_DATA__.page,
    ...metric,
  });
  
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: 'POST', keepalive: true });
  }
}


const ShephardLogic = dynamic(
  () => import("../components/Authentication/onboarding/ShephardLogic"),
  {
    ssr: false,
  }
);

// const LogRocket = require("logrocket");

// if (typeof window !== "undefined") {
//   const setupLogRocketReact = require("logrocket-react");
//   LogRocket.init("90vvpm/ideaisland");
//   setupLogRocketReact(LogRocket);
// }

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // const [ShepherdTourContext] = ShepherdTour;
  const [tourStarted, setTourStarted] = useState(false);

  // if(typeof window !== "undefined"){
  // const tour = useContext(ShepherdTourContext);

  //Loading animation logic
  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = (url) => {
      setLoading(false);
      gtag.pageview(url);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeComplete", handleComplete);
    };
  }, [router]);

  const store = useStore((state) => state);
  const userData = useUserData();

  return process.browser ? (
    <PersistGate persistor={store.__persistor}>
      {() => (
        <UserContext.Provider value={userData}>
          <Layout>
            <ShephardLogic>

              <FullLoader show={loading} />
              <Component {...pageProps} />
            </ShephardLogic>
          </Layout>
        </UserContext.Provider>
      )}
    </PersistGate>
  ) : (
    <PersistGate persistor={store}>
      {() => (
        <UserContext.Provider value={userData}>
          <Layout>
          <ShephardLogic>

            <Component {...pageProps} />
            </ShephardLogic>

          </Layout>
        </UserContext.Provider>
      )}
    </PersistGate>
  );
}
//
export default wrapper.withRedux(MyApp);

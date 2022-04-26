import "../styles/globals.css";
import "tailwindcss/tailwind.css";

import { Provider, useStore } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
// import { ReactDOM } from "react";
import { hydrate } from "react-dom";
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
import { wrapper } from "../redux/store";
import { AuthProvider } from "../lib/firebaseContext";
import AuthCheck from "../components/Authentication/AuthCheck";
// import LogRocket from "logrocket";
// import setupLogRocketReact from "logrocket-react";
// import { useStore } from 'react-redux';

const LogRocket = require('logrocket');

if (typeof window !== 'undefined') {
const setupLogRocketReact = require('logrocket-react');
LogRocket.init('90vvpm/ideaisland');
  setupLogRocketReact(LogRocket);
}



function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();





//Loading animation logic
  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = (url) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  const store = useStore((state) => state);
  const userData = useUserData();

  return process.browser ? (
    <PersistGate persistor={store.__persistor}>
      {() => (
        <UserContext.Provider value={userData}>
          {/* <AuthProvider> */}
            <Layout>
      {/* <AuthCheck> */}

              <FullLoader show={loading} />
              <Component {...pageProps} />
      {/* </AuthCheck> */}

            </Layout>
          {/* </AuthProvider> */}
        </UserContext.Provider>
      )}
    </PersistGate>
  ) : (
    <PersistGate persistor={store}>
      {() => (
        // <AuthProvider>
          <UserContext.Provider value={userData}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UserContext.Provider>
        // </AuthProvider>
      )}
    </PersistGate>
  );
}
//
export default wrapper.withRedux(MyApp);

//   return (
//     <>
//       <Header />

//       {/* <Provider store={store}> */}
//         {/* <PersistGate loading={(<FullLoader from="persist"/>)} persistor={persistor}> */}
//           <UserContext.Provider value={userData}>
//             <Layout>
//               <Component {...pageProps} />
//               {/* <CookieBanner
//             privacyPolicyLink={"/privacy"}
//             showStatistic={true}
//             showMarketing={false}
//             showExternalMedia={false}
//           /> */}
//             </Layout>
//             {/* <Analytics /> */}
//           </UserContext.Provider>
//         {/* </PersistGate> */}
//       {/* </Provider> */}
//     </>
//   );
// }

//   if (typeof window === "undefined") {
//     // console.log("SERVER");

//     return (
//       <>
//         <Header />

//         <Provider store={store}>
//           {/* <PersistGate loading={<FullLoader />} persistor={persistor}> */}
//           <UserContext.Provider value={userData}>
//             <Layout>
//               <FullLoader show={loading} />
//               <Component {...pageProps} />
//               {/* <CookieBanner
//               privacyPolicyLink={"/privacy"}
//               showStatistic={true}
//               showMarketing={false}
//               showExternalMedia={false}
//             /> */}
//             </Layout>
//             {/* <Analytics /> */}
//           </UserContext.Provider>
//           {/* </PersistGate> */}
//         </Provider>
//       </>
//     );
//   }
// // console.log("CLIENT")

// //
//   return (
//     <>
//       <Header />

//       <Provider store={store}>
//         {/* <PersistGate loading={(<FullLoader from="persist"/>)} persistor={persistor}> */}
//           <UserContext.Provider value={userData}>
//             <Layout>
//               <FullLoader show={loading} />
//               <Component {...pageProps} />
//               {/* <CookieBanner
//             privacyPolicyLink={"/privacy"}
//             showStatistic={true}
//             showMarketing={false}
//             showExternalMedia={false}
//           /> */}
//             </Layout>
//             {/* <Analytics /> */}
//           </UserContext.Provider>
//         {/* </PersistGate> */}
//       </Provider>
//     </>
//   );
// }
// // if(typeof window !== "undefined"){

// //   persistor.subscribe(() => {
// //     /* Hydrate React components when persistor has synced with redux store */
// //     const { bootstrapped } = persistor.getState();

// //     console.log(bootstrapped)

// //     if (bootstrapped) {
// //        hydrate(<MyApp />, document.getElementById("root"));
// //     }
// //   });
// // }

import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  indexedDBLocalPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  connectAuthEmulator,
} from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import useStore from "./StateManagement";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import {
  getFirebaseConfig,
  getRecaptchaProviderConfig,
} from "./firebase-config.js";

console.log("Init Firebase");
const firebaseApp = initializeApp(getFirebaseConfig());
export const auth = initializeAuth(firebaseApp, {
  persistence: [
    indexedDBLocalPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
  ],
});

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const getIdTokenResult = await user.getIdTokenResult();
    useStore.setState({ user: { ...user, claims: getIdTokenResult.claims } });
  } else {
    useStore.setState({ user: undefined });
  }
});
export const firestore = getFirestore(firebaseApp);
export const functions = getFunctions(firebaseApp);
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

functions.region = "us-west2";

if (
  typeof window !== "undefined" &&
  window.location.hostname === "localhost" &&
  process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === "true"
) {
  connectAuthEmulator(auth, "http://localhost:9099", {
    disableWarnings: true,
  });
  connectFirestoreEmulator(firestore, "localhost", 8080);
  connectFunctionsEmulator(functions, "localhost", 5001);
}

const initAppCheck = async () => {
  try {
    if (
      typeof window !== "undefined" &&
      window.location.hostname !== "localhost" &&
      getRecaptchaProviderConfig() !== ""
    ) {
      const { initializeAppCheck, ReCaptchaV3Provider } = await import(
        "firebase/app-check"
      );
      initializeAppCheck(firebaseApp, {
        provider: new ReCaptchaV3Provider(getRecaptchaProviderConfig()),

        // Optional argument. If true, the SDK automatically refreshes App Check
        // tokens as needed.
        isTokenAutoRefreshEnabled: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
if (typeof window !== "undefined") {
  if (document.readyState !== "loading") {
    // The event DOMContentLoaded was already fires and therefore we initialize
    // AppCheck without attaching it to the event listener for DOMContentLoaded
    if (window.location.pathname === "/") {
      // On the landing page, we delay the initialization of AppCheck
      setTimeout(() => {
        initAppCheck();
      }, 5000);
    } else {
      initAppCheck();
    }
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      if (window.location.pathname === "/") {
        // On the landing page, we delay the initialization of AppCheck
        setTimeout(() => {
          initAppCheck();
        }, 5000);
      } else {
        initAppCheck();
      }
    });
  }
}

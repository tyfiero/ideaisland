
import { initializeApp, getApps, getApp } from "firebase/app";

import {
  getAuth,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  Timestamp,
  serverTimestamp,
  collection,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ideaislandtest.firebaseapp.com",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: "ideaislandtest",
  storageBucket: "ideaislandtest.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize firebase

function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    let apps = getApps();

    //TODO maybe I need this type of check? idk honestly
    // if (typeof window !== "undefined" && !apps.length) {
    return initializeApp(config);
    // }
  }
}

const firebaseApp = createFirebaseApp(firebaseConfig);
//old init
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

export const auth = getAuth(firebaseApp);

//TODO confirm session persistence is working

const persist = setPersistence(auth, browserSessionPersistence);

export const googleAuthProvider = new GoogleAuthProvider();

export const firestore = getFirestore(firebaseApp);
// export const storage = getStorage(firebaseApp);

// Storage exports
export const storage = getStorage(firebaseApp);
export const STATE_CHANGED = "state_changed";

export const fromMillis = Timestamp.fromMillis;
// export const serverTimestamp = firestore.FieldValue.serverTimestamp;

export async function getUserWithUsername(username) {
  const usersRef = collection(firestore, "users");
  const q = query(usersRef, where("username", "==", username), limit(1));
  // const query = usersRef.where("username", "==", username).limit(1);

  const userDoc = (await getDocs(q)).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis(),
    updatedAt: data?.updatedAt.toMillis(),
  };
}

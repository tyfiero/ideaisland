// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/storage";

// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import "firebase/compat/storage";
import { initializeApp, getApps, getApp } from "firebase/app";

// import { initializeApp } from "firebase/app";
import {
  getAuth,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
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

//TODO replace these values with private values from env.local
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize firebase
// const firebaseApp = initializeApp(firebaseConfig);

function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    // console.log("failed to create firebase app");
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

// console.log(app.name ? 'Firebase Mode Activated!' : 'Firebase not working :(');

// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import "firebase/compat/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyDjF7ZR6b81q28TVdLcW0TaJlvifYE8hBo",
//   authDomain: "ideaislandtest.firebaseapp.com",
//   databaseURL: "https://ideaislandtest-default-rtdb.firebaseio.com",
//   projectId: "ideaislandtest",
//   storageBucket: "ideaislandtest.appspot.com",
//   messagingSenderId: "674234982067",
//   appId: "1:674234982067:web:3e00039ec4b0d9eabb1ac6",
//   measurementId: "G-K6YPWXZQSG",
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// export async function getUserWithUsername(username) {
//   const usersRef = firestore.collection("users");
//   const query = usersRef.where("username", "==", username).limit(1);
//   const userDoc = (await query.get()).docs[0];
//   return userDoc;
// }

// /**`
//  * Converts a firestore document to JSON
//  * @param  {DocumentSnapshot} doc
//  */
// export function postToJSON(doc) {
//   const data = doc.data();
//   return {
//     ...data,
//     // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
//     createdAt: data.createdAt.toMillis(),
//     updatedAt: data.updatedAt.toMillis(),
//   };
// }

// export const auth = firebase.auth();
// export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// export const firestore = firebase.firestore();
// export const storage = firebase.storage();
// export const fromMillis = firebase.firestore.Timestamp.fromMillis;
// export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

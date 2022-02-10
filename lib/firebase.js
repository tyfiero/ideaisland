// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/storage";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDjF7ZR6b81q28TVdLcW0TaJlvifYE8hBo",
  authDomain: "ideaislandtest.firebaseapp.com",
  databaseURL: "https://ideaislandtest-default-rtdb.firebaseio.com",
  projectId: "ideaislandtest",
  storageBucket: "ideaislandtest.appspot.com",
  messagingSenderId: "674234982067",
  appId: "1:674234982067:web:3e00039ec4b0d9eabb1ac6",
  measurementId: "G-K6YPWXZQSG",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export async function getUserWithUsername(username) {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("username", "==", username).limit(1);
  const userDoc = (await query.get()).docs[0];
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
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

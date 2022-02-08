/**
 * To find your Firebase config object:
 *
 * 1. Go to your [Project settings in the Firebase console](https://console.firebase.google.com/project/_/settings/general/)
 * 2. In the "Your apps" card, select the nickname of the app for which you need a config object.
 * 3. Select Config from the Firebase SDK snippet pane.
 * 4. Copy the config object snippet, then add it here.
 */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyDjF7ZR6b81q28TVdLcW0TaJlvifYE8hBo",
  authDomain: "ideaislandtest.firebaseapp.com",
  databaseURL: "https://ideaislandtest-default-rtdb.firebaseio.com",
  projectId: "ideaislandtest",
  storageBucket: "ideaislandtest.appspot.com",
  messagingSenderId: "674234982067",
  appId: "1:674234982067:web:3e00039ec4b0d9eabb1ac6",
  measurementId: "G-K6YPWXZQSG",
};

// Initialize Firebase
// const app = initializeApp(config);
// const analytics = getAnalytics(app);




// const config = {
//   apiKey: "AIzaSyD6PS_FC7cPGlt5o_Dk7mX97n1GPWR6gqE",
//   authDomain: "reactjsappdev.firebaseapp.com",
//   projectId: "reactjsappdev",
//   storageBucket: "reactjsappdev.appspot.com",
//   messagingSenderId: "200120568887",
//   appId: "1:200120568887:web:14b33d126e03ae81fd03b2",
// };
const reCaptchaV3ProviderId = "6LeOD0EdAAAAAH2hvj1cqH_W_Y_9twum3YlzeNxH";

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error(
      "No Firebase configuration object provided." +
        "\n" +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return config;
  }
}
export function getRecaptchaProviderConfig() {
  return reCaptchaV3ProviderId;
}

import * as firebaseAdmin from "firebase-admin";


const {key} = JSON.parse(process.env.FIREBASE_ADMIN_PRIVATE_KEY)

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: key,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      projectId: "ideaislandtest",
    }),
    databaseURL: "https://ideaislandtest-default-rtdb.firebaseio.com",
  });
}

export { firebaseAdmin };


export const adminDB = firebaseAdmin.firestore();


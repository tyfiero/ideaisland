import {
  serverTimestamp,
  query,
  where,
  collection,
  orderBy,
  doc,
  getFirestore,
  updateDoc,
  addDoc,
  onSnapshot,
  deleteDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";


import { firebaseAdmin } from "../../lib/firebaseAdmin";

export default async function handler(req, res) {
  if (!req.body) return res.status(401).json({ error: "No req body found" });
  const { verifyPaddleWebhook } = require("verify-paddle-webhook");

    console.log(req.body);
  //   console.log("HIT PADDLE WEBHOOK");

//   if (verifyPaddleWebhook(process.env.PADDLE_PUBLIC_KEY, req.body)) {
//     console.log("Webhook is valid!");

    // process the webhook
    //I need to get the alert name, then save the following data to firestore in the users collection under the user's uid: cancelUrl, updateUrl,paddleUserId, nextBillDate, subscriptionStartDate, subscriptionID

    if (req.body.alert_name === "subscription_created") {
      //For this one, I need to save all of this data to user document

      let data = {
        // updatedAt: serverTimestamp(),
        cancelUrl: req.body.cancel_url,
        updateUrl: req.body.update_url,
        paddleUserId: req.body.user_id,
        nextBillDate: req.body.next_bill_date,
        subscriptionStartDate: req.body.event_time,
        subscriptionID: req.body.subscription_id,
        status: req.body.status,
      };

      saveToFirestore(data, req.body.passthrough);
    //   console.log(req.body);
    //   console.log(req.body.cancel_url);
    //   console.log(req.body.update_url);
    //   console.log(req.body.user_id);
    //   console.log(req.body.passthrough);
    //   console.log(req.body.next_bill_date);
    //   console.log(req.body.user_id);
    //   console.log(req.body.status);
    //   console.log(req.body.subscription_id);
      //^^^this is the data that I need to save to firestore, passthrough contains the user's uid

      res.status(200).json({ success: true });
    } else if (req.body.alert_name === "subscription_updated") {
      //For this one the plan needs to change,
    //   let data = {
    //     updatedAt: serverTimestamp(),
    //     cancelUrl: req.body.cancel_url,
    //     updateUrl: req.body.update_url,
    //     paddleUserId: req.body.user_id,
    //     nextBillDate: req.body.next_bill_date,
    //     subscriptionStartDate: req.body.subscription_start_date,
    //     subscriptionID: req.body.subscription_id,
    //     status: req.body.subscription_status,
    //   };

    //   saveToFirestore(data, req.body.alert_data.user_id);


      res.status(200).json({ success: true });
    } else if (req.body.alert_name === "subscription_cancelled") {
      res.status(200).json({ success: true });
    } else if (req.body.alert_name === "subscription_expired") {
      res.status(200).json({ success: true });
    } else if (req.body.alert_name === "subscription_trial_ended") {
      res.status(200).json({ success: true });
    }
//   } else {
//     res.status(401).json({ error: "Webhook is not valid  " });
//     console.log("Webhook is  NOT valid");

//   }
}

const saveToFirestore = async (data, uid) => {
//   console.log(data);
//   console.log(uid);

//   let db = firebaseAdmin.firestore.Firestore;
  let db = firebaseAdmin.firestore
//   console.log(db)
  const ref = doc(db, "users", uid);
  await updateDoc(ref, data)
    .then(() => {
      console.log("Updated firestore user doc");
    })
    .catch((error) => {
      console.log("Update failed!" + error);
    });
};


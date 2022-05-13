// import { serverTimestamp } from "firebase/firestore";

import { firebaseAdmin, adminDB } from "../../lib/firebaseAdmin";
export default async function handler(req, res) {
  if (!req.body) return res.status(401).json({ error: "No req body found" });
  const { verifyPaddleWebhook } = require("verify-paddle-webhook");

  // console.log(req.body);
  //   console.log("HIT PADDLE WEBHOOK");

    if (verifyPaddleWebhook(process.env.PADDLE_PUBLIC_KEY, req.body)) {
    //   console.log("Webhook is valid!");

  // process the webhook
  //I need to get the alert name, then save the following data to firestore in the users collection under the user's uid: cancelUrl, updateUrl,paddleUserId, nextBillDate, subscriptionStartDate, subscriptionID
  let serverTime= Date.now()



  let planType, credits;
  if (
    req.body.subscription_plan_id === "767575" ||
    req.body.subscription_plan_id === "767574"
  ) {
    planType = "Hobbyist";
    credits = 0;
  } else if (
    req.body.subscription_plan_id === "769859" ||
    req.body.subscription_plan_id === "769860"
  ) {
    planType = "Innovator";
    credits = 250;

  } else if (
    req.body.subscription_plan_id === "769861" ||
    req.body.subscription_plan_id === "769863"
  ) {
    planType = "Pro";
    credits = 1000;

  }else{
    planType= "Free"
    credits = 0;

  }

  if (req.body.alert_name === "subscription_created") {
    //For this one, I need to save all of this data to user document
    console.log("subscription_created");

    let data = {
      updatedAt: serverTime,
      cancelUrl: req.body.cancel_url,
      updateUrl: req.body.update_url,
      paddleUserId: req.body.user_id,
      nextBillDate: req.body.next_bill_date,
      subscriptionStartDate: req.body.event_time,
      subscriptionID: req.body.subscription_id,
      status: req.body.status,
      plan: planType,
      credits: credits,
    };

    saveToFirestore(data, req.body.passthrough);

    res.status(200).json({ success: true });
  } else if (req.body.alert_name === "subscription_updated") {
    console.log("subscription_updated");


    let data = {
      updatedAt: serverTime,
      cancelUrl: req.body.cancel_url,
      updateUrl: req.body.update_url,
      paddleUserId: req.body.user_id,
      nextBillDate: req.body.next_bill_date,
      subscriptionStartDate: req.body.event_time,
      subscriptionID: req.body.subscription_id,
      status: req.body.status,
      plan: planType,
      credits: credits,
    };

    saveToFirestore(data, req.body.passthrough);
 

    res.status(200).json({ success: true });
  } else if (req.body.alert_name === "subscription_cancelled") {
    console.log("subscription_cancelled");

    let data = {
      updatedAt: serverTime,
      paddleUserId: req.body.user_id,
      nextBillDate: null,
      subscriptionStartDate: req.body.event_time,
      subscriptionID: req.body.subscription_id,
      status: req.body.status,
      plan: "Free",
      credits: 0,
    };

    saveToFirestore(data, req.body.passthrough);


    res.status(200).json({ success: true });
  } else if (req.body.alert_name === "subscription_payment_succeeded") {
    console.log("subscription_payment_succeeded");

    let data = {
      updatedAt: serverTime,
      paddleUserId: req.body.user_id,
      nextBillDate: req.body.next_bill_date,
      subscriptionStartDate: req.body.event_time,
      subscriptionID: req.body.subscription_id,
      status: req.body.status,
      plan: planType,
      credits: credits,
    };

    saveToFirestore(data, req.body.passthrough);


    res.status(200).json({ success: true });
  } else if (req.body.alert_name === "subscription_payment_failed") {
    console.log("subscription_payment_failed");

    let data = {
      updatedAt: serverTime,
      paddleUserId: req.body.user_id,
      subscriptionID: req.body.subscription_id,
      status: req.body.status,
      plan: "Free",
    };

    saveToFirestore(data, req.body.passthrough);


    res.status(200).json({ success: true });
  }
    } else {
      res.status(401).json({ error: "Webhook is not valid  " });
      console.log("Webhook is  NOT valid");

    }
}

const saveToFirestore = async (data, uid) => {
    console.log(data);


  let ref = adminDB.collection("users").doc(uid);
  console.log(ref);

 await ref.update(data).then(() => {
      console.log("Document successfully written!!");
    }).catch((error) => {
      console.error("Error writing document: ", error);
    });
};

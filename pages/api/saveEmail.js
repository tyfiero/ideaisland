// import { serverTimestamp } from "firebase/firestore";

import { firebaseAdmin, adminDB } from "../../lib/firebaseAdmin";

export default async function handler(req, res) {
  if (!req.body) return res.status(401).json({ error: "No req body found" });
  console.log(req.body);
  saveToFirestore(req.body).then(() => {
   console.log("Saved email!")
   res.status(200)
}).catch(() => {
    console.log("Email not saved")
    res.status(200)
}
    );

}

const saveToFirestore = async (email) => {
  let ref = adminDB.collection("email-list");
console.log(email)
  await ref
    .doc(email.email)
    .set({
      name: email.name,
      uid: email.uid,
      email: email.email,
    })
    .then(() => {
      console.log("Document successfully written!!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

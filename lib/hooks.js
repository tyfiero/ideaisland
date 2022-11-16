import { auth, firestore } from "../lib/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { doc, onSnapshot, getFirestore } from "firebase/firestore";

export function useUserData() {
  let [user, loading, error] = useAuthState(auth);

if(error){
  console.log("error in useAuthState hook")
  console.log(error)
}
  const [username, setUsername] = useState(null);
  const [paidPlan, setPaidPlan] = useState(null);
  const [aiCredits, setAiCredits] = useState(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
   

      //THIS WAS HERE
      const ref = doc(getFirestore(), "users", user.uid)
      // const ref = firestore.collection("users").doc(user.uid);

      unsubscribe = onSnapshot(ref, (doc) => {
        setUsername(doc.data()?.username);
        setPaidPlan(doc.data()?.plan);
        setAiCredits(doc.data()?.credits);
      })
  
    } else {
    
           //THIS WAS HERE
           setUsername(null);
           setPaidPlan(null);
           setAiCredits(null);
          }

    return unsubscribe;
  }, [user]);

  return { user, username, loading, paidPlan, aiCredits };
}

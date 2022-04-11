import { auth, firestore } from "../lib/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
// import { useSelector, useDispatch } from "react-redux";
// import { logIn, userDataRedux } from "../redux/actions";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";
// import { useSelector, useDispatch } from "react-redux";
// import { userNameAction } from "../redux/actions";
// Custom hook to read  auth record and user profile doc
export function useUserData() {
  // const userNameRedux = useSelector((state) => state.userName);

  let [user, loading, error] = useAuthState(auth);

if(error){
  console.log("error in useAuthState hook")
  console.log(error)
}
  // console.log(useAuthState(auth))
  const [username, setUsername] = useState(null);
  // const dispatch = useDispatch();
  //  const db = getFirestore();

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      // console.log("Logged In HOOKSIDE");
      // localStorage.setItem("userLocal", JSON.stringify(user));
      // if(!userNameRedux){
      // // dispatch(userNameAction(user.userName));
      // }

      //THIS WAS HERE
      const ref = doc(getFirestore(), "users", user.uid)
      // const ref = firestore.collection("users").doc(user.uid);

      unsubscribe = onSnapshot(ref, (doc) => {
        setUsername(doc.data()?.username);
      })
      // unsubscribe = ref.onSnapshot((doc) => {
      //   setUsername(doc.data()?.username);
      // });
      //   LogInReduxFunction(true)
    } else {
      // if (localStorage.getItem("userLocal") !== null) {
      //   // console.log("USERDATA EXISTS");
      //   user = JSON.parse(localStorage.getItem("userLocal"));
      //   // console.log(user);
      // } else {
      //   // console.log("NOT logged in");

   
      //   //   LogInReduxFunction(false)
      // }
           //THIS WAS HERE
           setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username, loading };
}

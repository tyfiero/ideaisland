import React, { useEffect, useState } from "react";
import SFilterIdeaFeed from "./SFilterIdeaFeed";
import { useSelector, useDispatch } from "react-redux";
import { firestore, auth } from "../../../lib/firebase";
import {
  serverTimestamp,
  query,
  collection,
  orderBy,
  getFirestore,
  setDoc,
  doc,
} from "firebase/firestore";

import { useCollection } from "react-firebase-hooks/firestore";

function SFilterIdeas() {
  return (
    <div>
        <h1 className="heading !text-xl">All Ideas</h1>

      <div className="glass-box fade-effect-quick flex flex-col items-center min-h-[20em] max-h-[30em] overflow-y-auto overflow-x-hidden !rounded-2xl !pt-4 gap-3">

        <IdeasList />
      </div>
    </div>
  );
}

export default SFilterIdeas;

function IdeasList() {
  const statsRedux = useSelector((state) => state.stats);
  const dispatch = useDispatch();
  const userUIDRedux = useSelector((state) => state.userUID);
  const sFormRedux = useSelector((state) => state.sForm);

// const [ideas, setIdeas] = useState([]);
const [canSelect, setCanSelect] = useState(true);

  //Done? idk. that was traumatic. Make sure it still works.THIS MUST BE EDITED WHEN THE PERSISTENCE IS FIXED priceart cant stay!!!  TODO
  //TODO memoize this so that firebase reads less
  console.log(userUIDRedux);
  let uid;
  if (userUIDRedux) {
    uid = userUIDRedux;
    console.log("it actually worked");
  } else if (auth.currentUser?.uid) {
    uid = auth.currentUser.uid;
  } else {
    uid = null;
    console.log("it fucked up");
    return null;
  }
  // console.log(auth.currentUser);

//   let ideas =null;
//   useEffect(() => {
    // if (uid) {

    const ref = collection(getFirestore(), "users", uid, "ideas");
    const postQuery = query(ref, orderBy("createdAt", "desc"));

    const [querySnapshot] = useCollection(postQuery);

   let ideas = querySnapshot?.docs.map((doc) => doc.data());
//   }
//   },[])

  useEffect(() => {
console.log("IT RAN")
    if (sFormRedux.idea?.title) {
    setCanSelect(false);
    }
  },[sFormRedux])




  return (
    <>
      <SFilterIdeaFeed ideas={ideas} canSelect={canSelect} admin />
    </>
  );
}

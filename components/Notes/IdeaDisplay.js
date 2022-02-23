import { firestore, auth } from "../../lib/firebase";
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
import DOMPurify from "dompurify";
import Stars from "./Stars";
import { FaGlobeAmericas, FaLock } from "react-icons/fa";

export default function IdeaDisplay({ setEditDocDetails }) {
  //THIS MUST BE EDITED WHEN THE PERSISTENCE IS FIXED priceart cant stay!!!
  //   let uid;
  //   if (auth.currentUser) {
  //     uid = auth.currentUser.uid;
  //   } else {
  //     uid = "WoKVte3Fpae3Zqp1KAlcJEpO09j1";
  //     console.log("it fucked up");
  //   }
  // console.log(auth.currentUser);
  //   const ref = collection(getFirestore(), "users", uid, "ideas");
  //   const postQuery = query(ref, orderBy("createdAt"));

  //   const [querySnapshot] = useCollection(postQuery);

  //   const idea = querySnapshot?.docs.map((doc) => doc.data());
  //   console.log(idea[0]);
  return (
    <div>
      <h2 className="normal-box-soft text-t-bd text-[28px]">
        {setEditDocDetails[0]?.title}
      </h2>
      <div className="flex items-end gap-5">
        <div className="flex flex-col items-center ">
          <p className="text-[22px] text-t-bd">Rating</p>
          <Stars rating={setEditDocDetails[0]?.rating} />
        </div>
        <div>
          {setEditDocDetails[0]?.published ? (
              <div className="flex items-center gap-1">
                  <FaGlobeAmericas className="text-t-bl"/>
            <p className="text-t-bl">Public&nbsp;&nbsp; </p></div>
          ) : (
              <div className="flex items-center gap-1">
                  <FaLock className="text-t-pd"/>
            <p className="text-t-pd">Private</p>
            </div>
          )}
        </div>
      </div>
      {/* <div
        className="normal-box"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(setEditDocDetails[0]?.content, {
            USE_PROFILES: { html: true },
          }),
        }}
      ></div> */}
    </div>
  );
}

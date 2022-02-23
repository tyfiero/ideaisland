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
export default function IdeaDisplay() {
  //THIS MUST BE EDITED WHEN THE PERSISTENCE IS FIXED priceart cant stay!!!
  let uid;
  if (auth.currentUser) {
    uid = auth.currentUser.uid;
  } else {
    uid = "WoKVte3Fpae3Zqp1KAlcJEpO09j1";
    console.log("it fucked up");
  }
  // console.log(auth.currentUser);
  const ref = collection(getFirestore(), "users", uid, "ideas");
  const postQuery = query(ref, orderBy("createdAt"));

  const [querySnapshot] = useCollection(postQuery);

  const idea = querySnapshot?.docs.map((doc) => doc.data());
//   console.log(idea[0]);
  return (
    <div>
      <h2 className="normal-box-soft text-t-bd text-[28px]">{idea[0].title}</h2>
      <div
        className="normal-box"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(idea[0].content, {
            USE_PROFILES: { html: true },
          }),
        }}
      ></div>
    </div>
  );
}

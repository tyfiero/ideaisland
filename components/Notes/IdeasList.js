import IdeaFeed from "./IdeaFeed";

import { UserContext } from "../../lib/context";
import {
  serverTimestamp,
  query,
  collection,
  orderBy,
  getFirestore,
  setDoc,
  doc,
  limit
} from "firebase/firestore";
// import { firestore, auth } from '@lib/firebase';
import { firestore, auth } from "../../lib/firebase";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useCollection } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
// import IdeaFeed from "./IdeaFeed";
import { editModeAction } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { statsAction } from "../../redux/actions";
import {
  FaEdit,
  FaLightbulb,
  FaExclamationTriangle,
  FaStickyNote,
  FaPlus,
  FaRegTimesCircle,
  FaSearch,
} from "react-icons/fa";


function IdeasList(props) {
    const { user, username } = useContext(UserContext);
    const statsRedux = useSelector((state) => state.stats);
    const dispatch = useDispatch();
    const userUIDRedux = useSelector((state) => state.userUID);
    const [searchValue, setSearchValue] = useState("");
  
    console.log();
    useEffect(() => {
      setSearchValue(props.searchValue);
    }, [props.searchValue]);
    //Done? Using context api, any content component will only mount if the user variable is defined.
    //TODO memoize this so that firebase reads less
    let uid;
  
    if (user?.uid) {
      uid = user?.uid;
    } else if (userUIDRedux) {
      uid = userUIDRedux;
    } else if (auth.currentUser?.uid) {
      uid = auth.currentUser?.uid;
    } else {
      uid = "default";
      console.log("no uid available :(");
    }
  
    let type = props.type;
  
    // console.log(auth.currentUser);
    let ideas, ideaSearch;
    // if (uid) {
    const ref = collection(getFirestore(), "users", uid, type);
    let postQuery;
    let limitNum = props.type ==="ideas" ? 5 : 2;
    if(props.mode === "dash"){
     postQuery = query(ref, orderBy("createdAt", "desc"), limit(limitNum));
        
    }else{
     postQuery = query(ref, orderBy("createdAt", "desc"));

    }
  
    const [querySnapshot] = useCollection(postQuery);
  
    ideas = querySnapshot?.docs.map((doc) => doc.data());
  
    ideaSearch = ideas?.filter((obj) => {
      // console.log(obj.title.toLowerCase());
  
      if (props.type === "ideas") {
        return (
          obj.title.toLowerCase().includes(searchValue?.toLowerCase()) ||
          obj.content?.toLowerCase().includes(searchValue?.toLowerCase())
        );
      } else if (props.type === "problem") {
        return (
          obj.title.toLowerCase().includes(searchValue?.toLowerCase()) ||
          obj.why?.toLowerCase().includes(searchValue?.toLowerCase()) ||
          obj.what?.toLowerCase().includes(searchValue?.toLowerCase()) ||
          obj.who?.toLowerCase().includes(searchValue?.toLowerCase()) ||
          obj.pq1?.toLowerCase().includes(searchValue?.toLowerCase()) ||
          obj.pq2?.toLowerCase().includes(searchValue?.toLowerCase()) ||
          obj.pq3?.toLowerCase().includes(searchValue?.toLowerCase())
        );
      } else if (props.type === "notes") {
        return (
          obj.title.toLowerCase().includes(searchValue?.toLowerCase()) ||
          obj.content?.toLowerCase().includes(searchValue?.toLowerCase())
        );
      }
    });
    // } else {
    //   ideaSearch= null;
    // }
  
    return (
      <>
        <IdeaFeed ideas={ideaSearch} admin type={props.type} mode={props.mode}/>
  
        { searchValue?.length > 0 && ideas?.length > 0 ? (
          <p className={"mt-2 text-xs text-slate-400 fade-effect block" + (props.mode === "dash" && " hidden")}>
            Displaying {ideaSearch?.length} of {ideas?.length}
          </p>
        ) : (
          <p className={"mt-2 text-xs text-slate-400 fade-effect "+ (props.mode === "dash" && " hidden")}>
            {ideas?.length}
            {props.type === "problem"
              ? " problems"
              : props.type === "ideas"
              ? " ideas"
              : " notes"}
          </p>
        )}
      </>
    );
  }

  export default IdeasList;
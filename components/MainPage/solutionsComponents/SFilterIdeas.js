import React, { useEffect, useState, useContext } from "react";
import SFilterIdeaFeed from "./SFilterIdeaFeed";
import { useSelector, useDispatch } from "react-redux";
import { firestore, auth } from "../../../lib/firebase";
import { UserContext } from "../../../lib/context";
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
import { FaRegTimesCircle, FaSearch } from "react-icons/fa";
function SFilterIdeas(props) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="flex flex-col items-center w-full">
     

      <div className="pt-2 relative mx-auto text-gray-600  mb-2 flex w-[80%] items-center">
        <div className="flex items-center justify-start ">
         
        </div>
        <input
          className="w-full h-10 px-5 pr-16 text-sm bg-white border-2 border-gray-300 rounded-full dark:bg-slate-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-300 text-slate-700 dark:text-slate-100 "
          type="search"
          name="search"
          placeholder="Search"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />

        {searchValue ? (
          <button onClick={() => setSearchValue("")}>
            <FaRegTimesCircle className="absolute right-0 top-0 mt-[1.2rem] mr-4 text-t-pm md:hover:scale-125 text-xl text-slate-700 dark:text-slate-100" />
          </button>
        ) : (
          <button className="absolute top-0 right-0 mt-5 mr-4 text-slate-700 dark:text-slate-100">
            <FaSearch />
          </button>
        )}
      </div>
      <div className="glass-box bg-[rgba(255, 255, 255, 0.25)] dark:bg-[hsla(200,0%,5%,0.85)]   fade-effect-quick flex flex-col items-center md:min-h-[20em] sm:max-h-[22em] md:max-h-[30em] overflow-y-auto overflow-x-hidden !rounded-2xl !pt-4 gap-3 w-[98%]">
        <IdeasList searchTerm={searchValue} />
      </div>
    </div>
  );
}

export default SFilterIdeas;

function IdeasList(props) {
  const { user, username } = useContext(UserContext);

  const statsRedux = useSelector((state) => state.stats);
  const dispatch = useDispatch();
  const userUIDRedux = useSelector((state) => state.userUID);
  const sFormRedux = useSelector((state) => state.sForm);
  const sUpdate = useSelector((state) => state.sUpdate);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSearchTerm(props.searchTerm);
  }, [props.searchTerm]);

  //Done? I think it works now after adding nextjs firebase cookies.

  //TODO memoize this so that firebase reads less
  //   console.log(userUIDRedux);
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
 

  //TODO memoize all firebase reads, if it needs it. Im unsure if querySnapshot continues to read from firebase after the first read. I think it waits until the data changes maybe?
  const ref = collection(getFirestore(), "users", uid, "ideas");
  const postQuery = query(ref, orderBy("createdAt", "desc"));

  const [querySnapshot] = useCollection(postQuery);
  // console.log("ANOTHER FULL FIREBASE READ");
  let ideas = querySnapshot?.docs.map((doc) => doc.data());

  let ideaSearch = ideas?.filter((obj) => {
    // console.log(obj.title.toLowerCase().includes(searchTerm.toLowerCase()))
    return (
      obj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      obj.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });



  return (
    <>
      {ideaSearch?.length === 0 && <p>No ideas found 😢</p>}
      {searchTerm && ideaSearch?.length > 0 && (
        <p>
          {ideaSearch?.length} idea{ideaSearch?.length > 1 && "s"} found
          matching: &quot;{searchTerm}&quot;
        </p>
      )}

      <SFilterIdeaFeed ideas={ideaSearch} admin />
    </>
  );
}

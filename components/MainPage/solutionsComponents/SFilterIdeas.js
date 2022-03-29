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
import { FaRegTimesCircle, FaSearch } from "react-icons/fa";

function SFilterIdeas() {
const [searchValue, setSearchValue] = useState("");

  return (
    <div className="flex flex-col items-center w-full">
      {/* <p>**Might need a filter, sort, or search function at some point**</p> */}

      
      <div className="pt-2 relative mx-auto text-gray-600  mb-2 flex w-[80%] items-center">
      <div className="flex items-center justify-start ">
        {/* <h1 className=" !text-xl whitespace-nowrap !mb-0 mr-5">All Ideas</h1> */}

      </div>
        <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-full text-sm focus:outline-none w-full"
          type="search" name="search" placeholder="Search" onChange={(e)=>setSearchValue(e.target.value)} value={searchValue}/>
        
        {searchValue ? <button onClick={()=>setSearchValue("")}><FaRegTimesCircle className="absolute right-0 top-0 mt-[1.2rem] mr-4 text-t-pm md:hover:scale-125 text-xl"/></button> : <button className="absolute right-0 top-0 mt-5 mr-4">
         
         <FaSearch />
       </button>}
      </div>
      <div className="glass-box fade-effect-quick flex flex-col items-center min-h-[20em] max-h-[30em] overflow-y-auto overflow-x-hidden !rounded-2xl !pt-4 gap-3 w-[98%]">
        <IdeasList searchTerm={searchValue}/>
      </div>
    </div>
  );
}

export default SFilterIdeas;

function IdeasList(props) {
  const statsRedux = useSelector((state) => state.stats);
  const dispatch = useDispatch();
  const userUIDRedux = useSelector((state) => state.userUID);
  const sFormRedux = useSelector((state) => state.sForm);
  const sUpdate = useSelector((state) => state.sUpdate);
  const [searchTerm, setSearchTerm] = useState("");

  // const [ideas, setIdeas] = useState([]);


useEffect(() => {
    setSearchTerm(props.searchTerm);

}, [props.searchTerm])


  //Done? idk. that was traumatic. Make sure it still works.THIS MUST BE EDITED WHEN THE PERSISTENCE IS FIXED priceart cant stay!!!  TODO
  //TODO memoize this so that firebase reads less
  //   console.log(userUIDRedux);
  let uid;
  if (userUIDRedux) {
    uid = userUIDRedux;
    // console.log("it actually worked");
  } else if (auth.currentUser?.uid) {
    uid = auth.currentUser.uid;
  } else {
    uid = null;
    // console.log("it fucked up");
    return null;
  }
  // console.log(auth.currentUser);1

  //   let ideas =null;
  //   useEffect(() => {
  // if (uid) {

  //TODO memoize all firebase reads, if it needs it. Im unsure if querySnapshot continues to read from firebase after the first read. I think it waits until the data changes maybe?
  const ref = collection(getFirestore(), "users", uid, "ideas");
  const postQuery = query(ref, orderBy("createdAt", "desc"));

  const [querySnapshot] = useCollection(postQuery);
  console.log("ANOTHER FULL FIREBASE READ");
  let ideas = querySnapshot?.docs.map((doc) => doc.data());


    let ideaSearch = ideas?.filter(obj => {
        // console.log(obj.title.toLowerCase().includes(searchTerm.toLowerCase()))
       return (obj.title.toLowerCase().includes(searchTerm.toLowerCase()) || obj.content.toLowerCase().includes(searchTerm.toLowerCase()));});
   
        // console.log(ideaSearch)
//   }


  //   }
  //   },[])

  //   useEffect(() => {
  // console.log("IT RAN")
  //     if (sFormRedux.idea[1]?.title) {
  //     setCanSelect(false);
  //     }
  //   },[sUpdate])

  return (
    <>

    {ideaSearch?.length === 0 && <p>No ideas found 😢</p>}
    {(searchTerm && ideaSearch?.length >0) && <p>{ideaSearch?.length} idea{ideaSearch?.length > 1 && "s"} found matching: &quot;{searchTerm}&quot;</p>}

      <SFilterIdeaFeed ideas={ideaSearch}  admin />
    </>
  );
}

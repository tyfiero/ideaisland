import { React, useState, useContext, useEffect } from "react";
import Stars from "../../Notes/Stars";
import Editor from "../../Notes/Editor";
import dynamic from "next/dynamic";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { FaSave, FaTrash } from "react-icons/fa";

import {
  serverTimestamp,
  query,
  where,
  collection,
  orderBy,
  doc,
  getFirestore,
  updateDoc,
  addDoc,
  onSnapshot,
  deleteDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import sanitize from "../../../lib/sanitize";
import { UserContext } from "../../../lib/context";

import {  auth } from "../../../lib/firebase";




const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
});
function IdeaNote() {
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const userUIDRedux = useSelector((state) => state.userUID);
  const dispatch = useDispatch();

  //Send rating back from stars component
  const sendRating = (starsRating) => {
    // console.log(starsRating);
    setRating(starsRating);
  };




  // Create a new post in firestore
  const createIdea = async (e) => {

    //Should I be using redux? Or auth.current user? If I do use redux, delete all instances of auth.currentUser @auth

    if(typeof window !== 'undefined'){
    let uid;
      if (userUIDRedux) {
        uid = userUIDRedux;
        console.log("it actually worked");
      } else if (auth.currentUser?.uid) {
        uid = auth.currentUser.uid;
      } else {
        uid = null;
        console.log("no uid available :(");
      }
    const d = Number(new Date());
    const timeID = d.valueOf().toString();
    
    const ref = doc(getFirestore(), "users", uid, "ideas", timeID);

    //Username needs replacing with redux here @auth
    let dataForCreation = {
        title: title,
        rating: rating,
        identifier: timeID,
        uid: uid,
        imgUrl: "",
        imgPosition: 0,
        username: username,
        published: false,
        content: sanitize(content),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        heartCount: 0,
        problem: null,
      };
    await setDoc(ref, dataForCreation)

      .then(() => {
        toast.success("Idea created! 💡")
        // dispatch(unsavedChangesAction(false));
      })
      .catch((error) => {
        toast.error("Error occured :( " + error);
        console.log("It failed!" + error);
      });

    setTitle("");
    setContent("");
    setRating(0);
    }else{
      console.log("Dont save on server");
    }
  }
  return (
    <div className="h-full">
      {/* <Editor /> */}

      <div className="flex flex-col items-center w-full h-full gap-1">


      <input
              className="w-[96%] textarea-box"
              value={title}
              tabIndex="1"

              onChange={(e) => {
                setTitle(e.target.value);
                let charLength = e.target.value.length;
                if (charLength >= 150) {
                  toast.error("Max character length reached (150)");
                }
              }}
              placeholder="Idea title"
              minLength={3}
              maxLength={150}
              // className={styles.input}
            />

<div className="flex justify-between w-[95%]">
      <div className="flex items-center gap-1 ">
        <p className="text-[22px] text-t-bd">Rating</p>
        <Stars hover={true} rating={rating} sendRating={sendRating} />
      </div>

      <button
                onClick={createIdea}
                className=" w-[8em] h-[2.5em] rounded-3xl bg-t-bl flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer "
              >
                  <FaSave className="text-[20px]" />

             Save Idea
              </button>
              </div>

              <div className="flex justify-center w-full h-full p-2 rounded-b-3xl rounded-t-xl bg-clear-bl3">
      <div
        className="normal-box !rounded-lg  mt-1 !rounded-b-3xl w-[97%] h-full

"
      >
        {/* <ReactQuill theme="snow"></ReactQuill> */}
        <QuillNoSSRWrapper
          // onKeyPress={(event) => {
          //   if (event.key === "ENTER" && event.metakey) {
          //     alert("The sky is your starting point!");
          //   } else if (event.key === "n") {
          //     alert("The sky is your limit👀");
          //   }
          // }}
          onChange={(e) => {
            setContent(e);
          }}
          value={content}
          modules={Editor.modules}
          formats={Editor.formats}
          theme="snow"
          tabIndex="2"

          // readOnly= "true"
          className="w-[100%] !bg-white/90 h-full"
          placeholder={"Describe your idea..."}
        />
      </div>
      </div>

      </div>
    </div>
  );
}

export default IdeaNote;

Editor.modules = {
  // syntax: true,              // Include syntax module
  toolbar: [
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: true,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "code",
  "color",
];

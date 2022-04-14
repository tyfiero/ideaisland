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

import { auth } from "../../../lib/firebase";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
});
function NoteNote() {
  const { user, username } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const userUIDRedux = useSelector((state) => state.userUID);
  const dispatch = useDispatch();

  // Create a new post in firestore
  const createIdea = async (e) => {
    if (typeof window !== "undefined") {
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
      const d = Number(new Date());
      const timeID = d.valueOf().toString();

      const ref = doc(getFirestore(), "users", uid, "notes", timeID);

      let dataForCreation = {
        title: title,
        identifier: timeID,
        uid: uid,
        imgUrl: "",
        imgPosition: 0,
        username: username,
        content: sanitize(content),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      await setDoc(ref, dataForCreation)
        .then(() => {
          toast.success("Note created!");
          // dispatch(unsavedChangesAction(false));
        })
        .catch((error) => {
          toast.error("Error occured :( " + error);
          console.log("It failed!" + error);
        });

      setTitle("");
      setContent("");
    } else {
      console.log("Dont save on server");
    }
  };
  return (
    <div>
      <div className="flex flex-col items-center w-full gap-1 ">
        <input
          className="w-[96%] textarea-box  textarea-tw  "
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            let charLength = e.target.value.length;
            if (charLength >= 150) {
              toast.error("Max character length reached (150)");
            }
          }}
          placeholder="Note Title"
          minLength={3}
          maxLength={150}
          tabIndex="1"
        />

        <div className="flex justify-end w-[95%]">
          <button
            onClick={createIdea}
            className=" w-[8em] h-[2.5em] rounded-3xl bg-t-bl flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer "
          >
            <FaSave className="text-[20px]" />
            Save Note
          </button>
        </div>

        <div className="flex justify-center w-full p-2 rounded-b-3xl rounded-t-xl bg-clear-bpop2">
          <div
            className="normal-box bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] !rounded-lg  mt-1 !rounded-b-3xl w-[97%]

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
              className="w-[100%] !bg-white/90 rounded-2xl"
              placeholder={"Note content..."}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteNote;

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


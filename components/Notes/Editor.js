import React from "react";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../lib/context";
import kebabCase from "lodash.kebabcase";
import { FaPlus } from "react-icons/fa";
import Stars from "./Stars";
import { firestore, auth } from "../../lib/firebase";
import Toggle from "react-toggle";
// import ReactQuill from "react-quill";
// import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
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
  setDoc,
  getDoc,
} from "firebase/firestore";

import toast from "react-hot-toast";
import { FaLock, FaGlobeAmericas } from "react-icons/fa";
import IdeaDisplay from "./IdeaDisplay";
import { useSelector } from "react-redux";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

// const ClientQuill = dynamic(
//     () => {
//  return import ReactQuill from 'react-quill';

//     },
//     { ssr: false }
//   );

function Editor() {
  const [editMode, setEditMode] = useState(false);
  const [editDocDetails, setEditDocDetails] = useState([]);

  const currentDocRedux = useSelector((state) => state.currentDoc);
  //   const currentDocRedux = useSelector((state) => state.currentDoc);

  useEffect(() => {
    // console.log("UE START");


    if (currentDocRedux) {
      const getDetails = async () => {
        try {
          let uid;
          if (auth.currentUser) {
            uid = auth.currentUser.uid;

            //THIS MUST BE EDITED WHEN THE PERSISTENCE IS FIXED priceart cant stay!!!
          } else {
            uid = "WoKVte3Fpae3Zqp1KAlcJEpO09j1";
          }

        //   console.log(uid);

          let db = getFirestore();
          const colRef = collection(db, "users", uid, "ideas");

          // console.log("🚀 ~ file: Editor.js ~ line 74 ~ getDetails ~ qRef", colRef)

          const q = query(colRef, where("id", "==", currentDocRedux));

          // const docSnap = await getDoc(q);
          // if (docSnap.exists()) {
          //   console.log("Document data:", docSnap.data());
          //   setEditDocDetails(docSnap.data());

          // } else {
          //   // doc.data() will be undefined in this case
          //   console.log("No such document!");
          // }

          // real time collection data
          onSnapshot(q, (snapshot) => {
            let details = [];
            snapshot.docs.forEach((doc) => {
              details.push({ ...doc.data(), id: doc.id });
            });
            console.log(details);
            setEditDocDetails(details);
          });
        } catch (error) {
          console.error(error);
        }
      };
      getDetails();
    } else {
      console.log("no note change");
    }
    // console.log("UE END");
  }, [currentDocRedux]);

  return (
    <div>
      <div className="flex items-center justify-center">
        <h1 className="heading-top">My Ideas & Notes</h1>
      </div>
      <div
        className="flex items-center justify-center  px-4 pt-[1rem] sm:px-6 lg:px-8 drop-shadow-xl fade-effect-quick

"
      >
        <div className="w-full max-w-[82rem] p-10 space-y-8 shadow h-[40em] rounded-xl bg-blues-100 drop-shadow-xl container-style normal-box-soft items-center flex flex-col">
          {editMode && (
            <>
              {" "}
              {/* <div className="heading">Edit Idea</div> */}
              <div>
                <button
                  className="w-[12em] h-[3em] rounded-3xl bg-t-bl flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer"
                  onClick={() => {
                    setEditMode(!editMode);
                  }}
                >
                  Save Idea Changes
                </button>
              </div>
              <CreateNewIdea setEditDocDetails={editDocDetails} />
            </>
          )}
          {!editMode && (
            <>
              {" "}
              <div>
                <button
                  className="w-[12em] h-[3em] rounded-3xl bg-t-bl flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer"
                  onClick={() => {
                    setEditMode(!editMode);
                  }}
                >
                  Edit Idea
                </button>
              </div>
              <IdeaDisplay setEditDocDetails={editDocDetails} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Editor;

function CreateNewIdea({ setEditDocDetails }) {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [newIdea, setNewIdea] = useState(false);

  const [title, setTitle] = useState("");
  const [ideaID, setIdeaID] = useState("");

  const [content, setContent] = useState("");

  const [publish, setPublish] = useState(false);

  const [rating, setRating] = useState(0);
//   console.log(setEditDocDetails.length + "docdeets");
// console.log(serverTimestamp());
  //?????? need to detect if setEditDocDetails is full or not.
  useEffect(() => {
    if (setEditDocDetails.length >= 1) {
    //   console.log("ARRAY IS full");

    //   console.log(setEditDocDetails[0].title);
    setIdeaID(setEditDocDetails[0].id)
    console.log(ideaID + "THIS IS ID")
      setTitle(setEditDocDetails[0].title);
    //   console.log(title + "2");

      setContent(setEditDocDetails[0].content);
      setRating(setEditDocDetails[0].rating);
      setPublish(setEditDocDetails[0].published);
    } else {
    //   console.log("ARRAY IS EMPTY");
      return;
    }
  }, [setEditDocDetails]);
  // console.log("🚀 ~ file: Editor.js ~ line 170 ~ CreateNewIdea ~ setEditDocDetails", setEditDocDetails)

  // Ensure slug is URL safe

  const slug = encodeURI(kebabCase(title));
//   console.log(setEditDocDetails);
//   console.log(title);

  // Validate length
  const isValid = title?.length > 3 && title?.length < 100;

  //Send rating back from stars component
  const sendRating = (starsRating) => {
    // console.log(starsRating);
    setRating(starsRating);
  };
  const updateIdea = async (e) => {
      console.log("UPDATE")
    toast.success("update");
    e.preventDefault();

    const uid = auth.currentUser.uid;
    const ref = doc(getFirestore(), "users", uid, "ideas", ideaID);
    await updateDoc(ref,{
        content: content,
        published: publish,
        rating: rating,
        slug,
        updatedAt: serverTimestamp(),
      })
      .then(() => {
        // toast.success("Idea created!");
    toast.success("Idea updated successfully!");
        // setEditMode(false)
        // console.log("It Worked!");
      })
      .catch((error) => {
        toast.error("Error occured 😩");
        console.log("It failed!" + error);
      });

  };
  // Create a new post in firestore
  const createIdea = async (e) => {
    toast.success("new");
   
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = doc(getFirestore(), "users", uid, "ideas", slug);
    // const ref = doc(getFirestore(), "users", uid, "ideas");
    // id: (serverTimestamp.seconds + serverTimestamp.nanoseconds),
   

    // Tip: give all fields a default value here
    const data = {
      title,
      rating: rating,
    //   slug,
      uid,
      username,
      published: publish,
      content: content,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
      problem: null,
    };

    // await addDoc(ref, data)
    await addDoc(collection(getFirestore(), 'users', uid, "ideas"), data)

      .then(() => {
        toast.success("Idea created!");
        console.log("It Worked!");
        console.log(ref.id);

      })
      .catch((error) => {
        toast.error("Error occured :( " + error);
        console.log("It failed!" + error);
      });

    setTitle("");
    setContent("");
    setRating(0);
    // Imperative navigation after doc is set
    // router.push(`/admin/${slug}`);
  };

  return (
    // <form onSubmit={newIdea ? createIdea : updateIdea} 
    // className="my-8 w-[62em]">

    <form onSubmit={createIdea} className="my-8 w-[62em]">
    
      <div className="normal-box-soft flex flex-col items-center w-full gap-1">
        <h5 className="text-[22px] text-t-bd">Title</h5>
        <input
          className="w-[90%] textarea-box"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            let charLength = e.target.value.length;
            // console.log(charLength);
            if (charLength >= 150) {
              toast.error("Max character length reached (150)");
            }
          }}
          placeholder="My great idea!"
          minLength={3}
          maxLength={150}
          // className={styles.input}
        />
        <p>
          <strong>Slug:</strong> {slug}
        </p>
        <p>
          <strong>ID:</strong> {ideaID}
        </p>
        {/* <h5 className="text-[22px] text-t-bd">Notes</h5> */}

        <div className="flex justify-between w-[100%] items-end">
          <div className="flex flex-col justify-center  items-center ml-16">
            <p className="text-[22px]  text-t-bd">Publish?</p>
            <div className="flex gap-3 ">
              <Toggle
                className="dark-toggle fade-effect"
                // defaultChecked={publish}
                checked={publish}
                icons={{
                  unchecked: (
                    <FaLock
                      style={{
                        fontSize: "1em",
                        color: "white",
                        paddingBottom: "3px",
                        paddingTop: "1px !important",
                      }}
                    />
                  ),
                  checked: (
                    <FaGlobeAmericas
                      style={{
                        fontSize: "1em",
                        color: "white",
                        paddingBottom: "2px",
                        paddingTop: "1px !important",
                      }}
                    />
                  ),
                }}
                onChange={() => {
                  setPublish(!publish);
                }}
              />
              {publish ? (
                <p className="text-t-bl">Public&nbsp;&nbsp; </p>
              ) : (
                <p className="text-t-pd">Private</p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center ">
            <p className="text-[22px] text-t-bd">Rating</p>
            <Stars rating={rating} sendRating={sendRating} />
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className=" w-[12em] h-[3em] rounded-3xl bg-t-bl flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer "
          >
            <FaPlus className="text-[20px]" />
            Create New Idea
          </button>
        </div>
        <div
          className="normal-box !rounded-lg mb-5 mt-1 !rounded-b-3xl

"
        >
          {/* <ReactQuill theme="snow"></ReactQuill> */}
          <QuillNoSSRWrapper
            onChange={setContent}
            value={content}
            modules={Editor.modules}
            formats={Editor.formats}
            theme="snow"
            // readOnly= "true"
            className="w-[55em] "
            placeholder={"Describe your idea..."}
          />
        </div>
      </div>
    </form>
  );
}

Editor.modules = {
  // syntax: true,              // Include syntax module
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    [{ size: [] }],
    ["color"],
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

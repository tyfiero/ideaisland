import React from "react";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../lib/context";
import kebabCase from "lodash.kebabcase";
import { FaEdit, FaImage, FaPlus, FaSave, FaTrash } from "react-icons/fa";
import Stars from "./Stars";
import { firestore, auth } from "../../lib/firebase";
import Toggle from "react-toggle";
import sanitize from "../../lib/sanitize";
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
  deleteDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { editModeAction, unsavedChangesAction } from "../../redux/actions";
import toast from "react-hot-toast";
import { FaLock, FaGlobeAmericas } from "react-icons/fa";
import IdeaDisplay from "./IdeaDisplay";
import { useSelector, useDispatch } from "react-redux";
import { currentDocAction } from "../../redux/actions";

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
  //   const [editMode, setEditMode] = useState(false);
  const [editDocDetails, setEditDocDetails] = useState([]);

  const currentDocRedux = useSelector((state) => state.currentDoc);
  const editModeRedux = useSelector((state) => state.editMode);

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("UE START");

    if (currentDocRedux) {
    } else {
      // setEditDocDetails(details);
      dispatch(editModeAction("new"));

      console.log("no note change");
    }
    // console.log("UE END");
  }, [currentDocRedux]);

  return (
    <div>
      <div
        className="flex items-center justify-center  pt-[0.1rem] sm:px-6 lg:px-4 drop-shadow-xl fade-effect-quick

"
      >
        <div className="w-full max-w-[82rem] p-10 space-y-8 shadow h-[40em]  bg-blues-100 drop-shadow-xl container-style normal-box-soft items-center flex flex-col !rounded-2xl">
          {(editModeRedux === "edit" || editModeRedux === "new") && (
            <>
              {" "}
              {/* <div className="heading">Edit Idea</div> */}
              <CreateNewIdea
              // mode={editModeRedux}

              //I might be missing this piece of logic in my code
              // setEditDocDetails={
              //   editModeRedux === "new" ? null : editDocDetails
              // }
              />
              {/* <div>
                <button
                  className="w-[12em] h-[3em] rounded-3xl bg-t-bl flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer"
                  onClick={() => {
                    // setEditMode(!editMode);
      dispatch(editModeAction("display"));

                  }}
                >
                    <FaSave />

                  Save Changes
                </button>
              </div> */}
            </>
          )}
          {editModeRedux === "display" && (
            <>
              {" "}
              <IdeaDisplay />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Editor;

function CreateNewIdea() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  //   const [newIdea, setNewIdea] = useState(false);

  const dispatch = useDispatch();
  const currentDocRedux = useSelector((state) => state.currentDoc);
  const [title, setTitle] = useState("");
  const [ideaID, setIdeaID] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [position, setPosition] = useState(0);
  const [addImg, setAddImg] = useState(false);

  const [content, setContent] = useState("");

  const [publish, setPublish] = useState(false);
  const editModeRedux = useSelector((state) => state.editMode);
  const unsavedChangesRedux = useSelector((state) => state.unsavedChanges);

  const [rating, setRating] = useState(0);
  // console.log(setEditDocDetails.length + "docdeets");
  // console.log(serverTimestamp());
  useEffect(() => {
    return () => {
      // console.log("Here, you can add clean up code - componentWillUnmount");

      if (unsavedChangesRedux) {
        if (editModeRedux === "edit") {
          // updateIdea()
        } else if (editModeRedux === "new") {
          createIdea();
        }
      }
    };
  }, []);

  useEffect(() => {
    if (editModeRedux === "new") {
      setTitle("");
      setContent("");
      setRating(0);
      setIdeaID("");
      setImgUrl("");
      setPosition(0);
      setPublish(false);
    }
  }, [editModeRedux]);

  useEffect(() => {
    if (currentDocRedux && editModeRedux === "edit") {
      //   if (setEditDocDetails.length >= 1) {
      // console.log("ARRAY IS full");

      //   console.log(setEditDocDetails[0].title);
      setIdeaID(currentDocRedux.identifier);
      //   console.log(ideaID + "THIS IS ID");
      setTitle(currentDocRedux.title);
      //   console.log(title + "2");

      setContent(currentDocRedux.content);
      setRating(currentDocRedux.rating);
      setPublish(currentDocRedux.published);
      setImgUrl(currentDocRedux.imgUrl);
      if (currentDocRedux.imgUrl) {
        setAddImg(true);
      }
    } else {
      return;
    }
    // }
  }, [currentDocRedux]);
  // console.log("🚀 ~ file: Editor.js ~ line 170 ~ CreateNewIdea ~ setEditDocDetails", setEditDocDetails)

  // Ensure slug is URL safe

  //   const slug = encodeURI(kebabCase(title));
  //   console.log(setEditDocDetails);
  //   console.log(title);

  // Validate length
  const isValid = title?.length > 3 && title?.length < 100;

  //Send rating back from stars component
  const sendRating = (starsRating) => {
    // console.log(starsRating);
    setRating(starsRating);
    if (!unsavedChangesRedux) {
      dispatch(unsavedChangesAction(true));
    }
  };

  const imgButton = () => {
    if (addImg) {
      setImgUrl("");
    }
    setAddImg(!addImg);
  };

  const deleteIdea = async (e) => {
    //Should I be using redux? Or auth.current user? If I do use redux, delete all instances of auth.currentUser @auth
    const uid = auth.currentUser.uid;
    const ref = doc(getFirestore(), "users", uid, "ideas", ideaID);
    await deleteDoc(ref)
      .then(() => {
        toast.success("Idea Deleted 🗑️");
        dispatch(unsavedChangesAction(false));
        setTitle("");
        setContent("");
        setRating(0);
        setIdeaID("");
        setPublish(false);
        setImgUrl("");
        setPosition(0);
        setAddImg(false);
        // console.log(ref.id);
      })
      .catch((error) => {
        toast.error("Error occured 😩" + error);
        console.log("Delete failed!" + error);
      });
  };
  const updateIdea = async (e) => {
    // console.log("UPDATE");
    // toast.success("update");

    if (unsavedChangesRedux) {
      e.preventDefault();

      const uid = auth.currentUser.uid;
      const ref = doc(getFirestore(), "users", uid, "ideas", ideaID);
      await updateDoc(ref, {
        title: title,
        content: sanitize(content),
        published: publish,
        rating: rating,
        //   slug,
        updatedAt: serverTimestamp(),
      })
        .then(() => {
          // toast.success("Idea created!");
          toast.success("Idea updated successfully!");
          dispatch(unsavedChangesAction(false));
          // setEditMode(false)
          // console.log("It Worked!");
          dispatch(editModeAction("display"));
        })
        .catch((error) => {
          toast.error("Error occured 😩");
          console.log("Update failed!" + error);
        });
    } else {
      toast.error("No changes to save");
      dispatch(editModeAction("display"));
    }
  };

  // Create a new post in firestore
  const createIdea = async (e) => {
    // toast.success("new");

    e.preventDefault() || null;
    const uid = auth.currentUser.uid;
    const d = Number(new Date());
    const timeID = d.valueOf().toString();
    // let timeIDNum = timeID.stringify()
    console.log(timeID);
    // const ref = doc(getFirestore(), "users", uid, "ideas", timeID);
    const ref = doc(getFirestore(), "users", uid, "ideas", timeID);
    // id: (serverTimestamp.seconds + serverTimestamp.nanoseconds),

    // Tip: give all fields a default value here

    //Username needs replacing with redux here @auth
    const data = {
      title,
      rating: rating,
      identifier: timeID,
      uid,
      imgUrl: imgUrl,
      imgPosition: position,
      username,
      published: publish,
      content: sanitize(content),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
      problem: null,
    };
    // console.log(timeID);

    await setDoc(ref, data)
      // await addDoc(collection(getFirestore(), "users", uid, "ideas"), data)
      .then(() => {
        toast.success("Idea created! 💡");
        dispatch(unsavedChangesAction(false));
        dispatch(editModeAction("display"));
        // console.log("It Worked!");
        // console.log(ref.id);
        dispatch(currentDocAction(data));
      })
      .catch((error) => {
        toast.error("Error occured :( " + error);
        console.log("It failed!" + error);
      });

    setTitle("");
    setContent("");
    setRating(0);
    setIdeaID("");
    setPublish(false);
    setImgUrl("");
    setPosition(0);
    setAddImg(false);

    // Imperative navigation after doc is set
    // router.push(`/admin/${slug}`);
  };

  return (
    // <form onSubmit={newIdea ? createIdea : updateIdea}
    // className="my-8 w-[62em]">
    <div className="w-full">
      {/* <div className="flex items-center justify-center">
        <h1 className="heading-top">My Ideas & Notes</h1>
      </div>  */}
      <div className="flex flex-col items-center w-[98%] md:mx-3 sm:mx-1 normal-box-soft">
        <form
          onSubmit={editModeRedux === "new" ? createIdea : updateIdea}
          className=" w-[99%] mb-2"
        >
          <div className="flex flex-col items-center w-full gap-1 ">
            <h5 className="text-[22px] text-t-bd">
              {editModeRedux === "edit" ? "Edit Idea" : "New Idea"}
            </h5>
            <input
              className="w-[96%] textarea-box"
              value={title}
              onChange={(e) => {
                if (!unsavedChangesRedux) {
                  dispatch(unsavedChangesAction(true));
                }

                setTitle(e.target.value);
                let charLength = e.target.value.length;
                // console.log(charLength);
                if (charLength >= 150) {
                  toast.error("Max character length reached (150)");
                }
              }}
              placeholder="Idea title"
              minLength={3}
              maxLength={150}
              // className={styles.input}
            />
            {/* <p>
          <strong>Slug:</strong> {slug}
        </p> */}
            {/* <p>
          <strong>ID:</strong> {ideaID}
        </p> */}
            {/* <h5 className="text-[22px] text-t-bd">Notes</h5> */}

            <div className="flex justify-between w-[90%] items-end ">
              <div className="flex items-center gap-1 ">
                <p className="text-[22px] text-t-bd">Rating</p>
                <Stars hover={true} rating={rating} sendRating={sendRating} />
              </div>
              <div className="flex items-center justify-center gap-1 ml-16">
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
                      dispatch(unsavedChangesAction(true));

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
            </div>

            <div
              className="normal-box !rounded-lg  mt-1 !rounded-b-3xl w-[97%]

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
                  console.log(e);
                  if (!unsavedChangesRedux) {
                    dispatch(unsavedChangesAction(true));
                  }
                }}
                value={content}
                modules={Editor.modules}
                formats={Editor.formats}
                theme="snow"
                // readOnly= "true"
                className="w-[100%] "
                placeholder={"Describe your idea..."}
              />
            </div>
            <div className="flex justify-between w-[90%] mb-2 mt-2">
              <div
                // type="submit"
                // disabled={!isValid}
                onClick={deleteIdea}
                className=" w-[6em] h-[3em] rounded-3xl bg-t-pd flex items-center justify-center text-white gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer "
              >
                <FaTrash className="text-[20px]" />
                Delete
              </div>

              <div className="flex items-center justify-center gap-2">
                <div
                  className="flex items-center justify-center gap-1 px-2 py-2 cursor-pointer min-w-[2.5em] rounded-3xl bg-t-pl text-t-pd drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
                  onClick={imgButton}
                >
                  {addImg ? (
                    <>X</>
                  ) : (
                    <>
                      <FaImage /> Add Image
                    </>
                  )}
                </div>
                {addImg && (
                  <div className="flex items-center justify-center gap-2">
                    <input
                      type="text"
                      className=" text-[12px] textarea-box"
                      placeholder={"Paste image url here"}
                      onChange={(e) => {
                        setImgUrl(e.target.value);
                        // let charLength = e.target.value.length;
                        // console.log(charLength);
                        // if (charLength >= 150) {
                      }}
                    />
                    {imgUrl.length > 5 && (
                      <div className="w-[5em] h-[5em] normal-box flex items-center !rounded-md">
                        <img
                          className={"object-contain "}
                          src={imgUrl}
                          alt="not valid image"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={!isValid}
                className=" w-[12em] h-[3em] rounded-3xl bg-t-bl flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer "
              >
                {editModeRedux === "edit" ? (
                  <FaSave className="text-[20px]" />
                ) : (
                  <FaPlus className="text-[20px]" />
                )}

                {editModeRedux === "edit" ? "Save Changes" : "Create New Idea"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
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

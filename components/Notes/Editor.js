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
import useKeyboardShortcut from "../../lib/useKeyboardShortcut";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
});

// const ClientQuill = dynamic(
//     () => {
//  return import ReactQuill from 'react-quill';

//     },
//     { ssr: false }
//   );

function Editor(props) {
  //   const [editMode, setEditMode] = useState(false);
  const [editDocDetails, setEditDocDetails] = useState([]);

  const currentDocRedux = useSelector((state) => state.currentDoc);
  const editModeRedux = useSelector((state) => state.editMode);
  const unsavedChangesRedux = useSelector((state) => state.unsavedChanges);

  const dispatch = useDispatch();

  let type = props.type;

  const { flushHeldKeys } = useKeyboardShortcut(
    ["Control", "E"],
    (shortcutKeys) => {
      // console.log("ctrl E")
      if (editModeRedux === "display") {
        dispatch(editModeAction("edit"));
      }
    },
    {
      overrideSystem: false,
      ignoreInputFields: false,
      repeatOnHold: false,
    }
  );
  const hotkey2 = useKeyboardShortcut(
    ["Escape"],
    (shortcutKeys) => {
      console.log("Escape");
      if (editModeRedux === "edit" && !unsavedChangesRedux) {
        dispatch(editModeAction("display"));
      } else {
        toast.error(
          "You have unsaved changes. Please save before exiting edit mode."
        );
      }
    },
    {
      overrideSystem: true,
      ignoreInputFields: false,
      repeatOnHold: false,
    }
  );
  useEffect(() => {
    // console.log("UE START");

    if (!currentDocRedux) {
      // } else {
      // setEditDocDetails(details);
      dispatch(editModeAction("new"));

      console.log("no note change");
    }
    // console.log("UE END");
  }, [currentDocRedux]); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   var tabHideEls = document.querySelectorAll(".ql-toolbar .qlsnow");
  //   tabHideEls.forEach(function (item) {
  //     item.setAttribute("tabindex", -1);
  //   });
  // }, []);
  return (
    <div>
      <div
        className="flex items-center justify-center  pt-[0.1rem] sm:px-6 lg:px-4 drop-shadow-xl fade-effect-quick

"
      >
        <div className="w-full max-w-[82rem] space-y-8 shadow   normal-box-soft items-center flex flex-col !rounded-2xl">
          {(editModeRedux === "edit" || editModeRedux === "new") && (
            <>
              {" "}
              {/* <div className="heading">Edit Idea</div> */}
              <CreateNewIdea
                // mode={editModeRedux}
                type={props.type}

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
              <IdeaDisplay type={props.type} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Editor;

function CreateNewIdea(props) {
  const router = useRouter();
  const { username, user } = useContext(UserContext);
  //   const [newIdea, setNewIdea] = useState(false);
  const [uidValue, setUidValue] = useState("default");

  const dispatch = useDispatch();
  const currentDocRedux = useSelector((state) => state.currentDoc);
  const [title, setTitle] = useState("");
  const [ideaID, setIdeaID] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [position, setPosition] = useState(0);
  const [addImg, setAddImg] = useState(false);

  const [content, setContent] = useState("");
  const [refresh, setRefresh] = useState("");
  const [rating, setRating] = useState(0);

  const [publish, setPublish] = useState(false);
  const editModeRedux = useSelector((state) => state.editMode);
  const unsavedChangesRedux = useSelector((state) => state.unsavedChanges);
  const userUIDRedux = useSelector((state) => state.userUID);

  let type = props.type;


  //TODO decide if onbefore unload is worth it
  // if (process.browser) {
  //   if (unsavedChangesRedux) {
  //     window.onbeforeunload = function () {
  //       return "There are unsaved changes. Are you sure you want to leave?";
  //     };
  //   }
  // }

  const { flushHeldKeys } = useKeyboardShortcut(
    ["Meta", "Enter"],
    (shortcutKeys) => {
      console.log("META ENTER");
      if (title || content) {
        if (editModeRedux === "new") {
          createIdea();
        } else {
          updateIdea();
        }
      }
    },
    {
      overrideSystem: true,
      ignoreInputFields: false,
      repeatOnHold: false,
    }
  );

  useEffect(() => {
    if (user?.uid) {
      setUidValue(user?.uid);
    } else if (userUIDRedux) {
      setUidValue(userUIDRedux);
    } else if (auth.currentUser?.uid) {
      setUidValue(auth.currentUser?.uid);
    } else {
      setUidValue("default");
      console.log("no uid available :(");
    }
  }, [user, userUIDRedux]);
  // console.log(setEditDocDetails.length + "docdeets");
  // console.log(serverTimestamp());
  // useEffect(() => {
  //   return () => {
  //     // console.log("Here, you can add clean up code - componentWillUnmount");

  //     if (unsavedChangesRedux) {
  //       if (editModeRedux === "edit") {
  //         // updateIdea()
  //       } else if (editModeRedux === "new") {
  //         createIdea();
  //       }
  //     }
  //   };
  // }, []);// eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    setRefresh(!refresh);
  }, [props.type]); // eslint-disable-line react-hooks/exhaustive-deps

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
      if (type === "ideas") {
        setIdeaID(currentDocRedux.identifier);
        setTitle(currentDocRedux.title);
        setContent(currentDocRedux.content);
        setRating(currentDocRedux.rating);
        setPublish(currentDocRedux.published);
        setImgUrl(currentDocRedux.imgUrl);
        if (currentDocRedux.imgUrl) {
          setAddImg(true);
        }
      } else if (type === "notes") {
        setIdeaID(currentDocRedux.identifier);
        setTitle(currentDocRedux.title);
        setContent(currentDocRedux.content);
        setImgUrl(currentDocRedux.imgUrl);
        if (currentDocRedux.imgUrl) {
          setAddImg(true);
        }
      }
    } else {
      return;
    }
    // }
  }, [currentDocRedux]); // eslint-disable-line react-hooks/exhaustive-deps
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
    const ref = doc(getFirestore(), "users", uidValue, type, ideaID);
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
      // e.preventDefault();

      const ref = doc(getFirestore(), "users", uidValue, type, ideaID);

      let data;
      if (type === "ideas") {
        data = {
          title: title,
          content: sanitize(content),
          published: publish,
          rating: rating,
          updatedAt: serverTimestamp(),
        };
      } else if (type === "notes") {
        data = {
          title: title,
          content: sanitize(content),
          updatedAt: serverTimestamp(),
        };
      }

      await updateDoc(ref, data)
        .then(() => {
          if (type === "ideas") {
            toast.success("Idea updated successfully!");
          } else if (type === "notes") {
            toast.success("Note updated successfully!");
          }

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
    // console.log(e)

    const d = Number(new Date());
    const timeID = d.valueOf().toString();
    // let timeIDNum = timeID.stringify()
    // console.log(timeID);
    // const ref = doc(getFirestore(), "users", uid, "ideas", timeID);
    const ref = doc(getFirestore(), "users", uidValue, type, timeID);
    // id: (serverTimestamp.seconds + serverTimestamp.nanoseconds),

    // Tip: give all fields a default value here

    let dataForCreation;
    if (type === "ideas") {
      dataForCreation = {
        title: title,
        rating: rating,
        identifier: timeID,
        uid: uidValue,
        imgUrl: imgUrl,
        imgPosition: position,
        username: username,
        published: publish,
        content: sanitize(content),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        heartCount: 0,
        problem: null,
      };
    } else if (type === "notes") {
      dataForCreation = {
        title: title,
        identifier: timeID,
        uid: uidValue,
        content: sanitize(content),
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
        imgPosition: position,
        imgUrl: imgUrl,
      };
    }

    // console.log(timeID);

    await setDoc(ref, dataForCreation)
      // await addDoc(collection(getFirestore(), "users", uid, "ideas"), data)
      .then(() => {
        type === "ideas"
          ? toast.success("Idea created! 💡")
          : toast.success("Note created!");
        dispatch(unsavedChangesAction(false));
        dispatch(editModeAction("display"));
        dispatch(currentDocAction(dataForCreation));
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
        <h1 className="text-3xl text-t-bd dark:text-blues-100">My Ideas & Notes</h1>
      </div>  */}

      <div className="flex flex-col items-center w-[98%] md:mx-3 sm:mx-1 normal-box-soft">
        <div className=" w-[99%] mb-2">
          <div className="flex flex-col items-center w-full gap-1 ">
            {type === "ideas" ? (
              <h5 className="text-[22px] text-t-bd">
                {editModeRedux === "edit" ? "Edit Idea" : "New Idea"}
              </h5>
            ) : (
              <h5 className="text-[22px] text-t-bd">
                {editModeRedux === "edit" ? "Edit Note" : "New Note"}
              </h5>
            )}
            <input
              className="w-[96%] textarea-box  textarea-tw  "
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
              placeholder="Title"
              minLength={3}
              maxLength={150}
              tabIndex="1"
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
              {type === "ideas" && (
                <>
                  {" "}
                  <div className="flex items-center gap-1 ">
                    <p className="text-[22px] text-t-bd">Rating</p>
                    <Stars
                      hover={true}
                      rating={rating}
                      sendRating={sendRating}
                    />
                  </div>
                  <div className="flex items-center justify-center gap-1 ml-16">
                    <p className="text-[22px]  text-t-bd">Publish?</p>
                    <div className="flex gap-3 ">
                      <Toggle
                        className="dark-toggle fade-effect"
                        // defaultChecked={publish}
                        tabIndex="-1"
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
                </>
              )}
            </div>
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
                tabIndex="2"
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
                      className=" text-[12px] textarea-box  textarea-tw  "
                      placeholder={"Paste image url here"}
                      onChange={(e) => {
                        setImgUrl(e.target.value);
                        // let charLength = e.target.value.length;
                        // console.log(charLength);
                        // if (charLength >= 150) {
                      }}
                    />
                    {imgUrl.length > 5 && (
                      <div className="w-[5em] h-[5em] normal-box bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] flex items-center !rounded-md">
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
                onClick={editModeRedux === "new" ? createIdea : updateIdea}
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
        </div>
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

import React from "react";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../lib/context";
import kebabCase from "lodash.kebabcase";
import {
  FaCheck,
  FaEdit,
  FaImage,
  FaPlus,
  FaSave,
  FaTrash,
} from "react-icons/fa";
import Stars from "./Stars";
import { firestore, auth } from "../../lib/firebase";
import Toggle from "react-toggle";
import sanitize from "../../lib/sanitize";
import FullLoader from "../../components/Layout/FullLoader";

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
import useKeyboardShortcut from "../../lib/useKeyboardShortcut";
import { editModeAction, unsavedChangesAction } from "../../redux/actions";
import toast from "react-hot-toast";
import { FaLock, FaGlobeAmericas } from "react-icons/fa";
import IdeaDisplay from "./IdeaDisplay";
import { useSelector, useDispatch } from "react-redux";
import { currentDocAction } from "../../redux/actions";

import TextareaAutosize from "react-textarea-autosize";


function ProblemEditor(props) {
  //   const [editMode, setEditMode] = useState(false);
  const [editDocDetails, setEditDocDetails] = useState([]);

  const currentDocRedux = useSelector((state) => state.currentDoc);
  const editModeRedux = useSelector((state) => state.editMode);

  const dispatch = useDispatch();

  let type = props.type;

  useEffect(() => {
    // console.log("UE START");

    if (!currentDocRedux) {
      // } else {
      // setEditDocDetails(details);
      dispatch(editModeAction("new"));

      // console.log("no note change");
    }
    // console.log("UE END");
  }, [currentDocRedux]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div
        className="flex items-center justify-center  pt-[0.1rem] sm:px-6 lg:px-4 drop-shadow-xl fade-effect-quick

"
      >
        <div className="w-full max-w-[82rem] p-3 space-y-8 shadow   normal-box-soft items-center flex flex-col !rounded-2xl !bg-clear-pl2">
          <>
            {/* <div className="heading">Edit Idea</div> */}
            <CreateNewProblem
            // mode={editModeRedux}

            //I might be missing this piece of logic in my code
            // setEditDocDetails={
            //   editModeRedux === "new" ? null : editDocDetails
            // }
            />
          </>
          {/* {editModeRedux === "display" && (
            <>
              <IdeaDisplay />
            </>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default ProblemEditor;

function CreateNewProblem(props) {
  const router = useRouter();
  //   const [newIdea, setNewIdea] = useState(false);
  const { user, username } = useContext(UserContext);

  const dispatch = useDispatch();
  const currentDocRedux = useSelector((state) => state.currentDoc);
  const [problemID, setProblemID] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [position, setPosition] = useState(0);
  const [addImg, setAddImg] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [uidValue, setUidValue] = useState("default");

  const [contentWhy, setContentWhy] = useState("");
  const [contentWhyOptions, setContentWhyOptions] = useState([]);

  const [contentWho, setContentWho] = useState("");
  const [contentWhat, setContentWhat] = useState("");

  const [contentPq1, setContentPq1] = useState("");
  const [contentPq2, setContentPq2] = useState("");
  const [contentPq3, setContentPq3] = useState("");

  // const [publish, setPublish] = useState(false);
  const editModeRedux = useSelector((state) => state.editMode);
  const unsavedChangesRedux = useSelector((state) => state.unsavedChanges);
  const userUIDRedux = useSelector((state) => state.userUID);

  const [edit, setEdit] = useState(true);

  if (process.browser) {
    if (unsavedChangesRedux) {
      window.onbeforeunload = function () {
        return "There are unsaved changes. Are you sure you want to leave?";
      };
    }
  }

  const { flushHeldKeys } = useKeyboardShortcut(
    ["Meta", "Enter"],
    (shortcutKeys) => {
      if (
        title ||
        contentWhy ||
        contentWho ||
        contentWhat ||
        contentPq1 ||
        contentPq2 ||
        contentPq3
      ) {
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

  // console.log(uidValue)

  useEffect(() => {
    if (user?.uid) {
      setUidValue(user?.uid);
    } else if (userUIDRedux) {
      setUidValue(userUIDRedux);
    } else if (auth.currentUser?.uid) {
      setUidValue(auth.currentUser?.uid);
    } else {
      setUidValue("default");
      // console.log("no uid available :(");
    }
  }, [user, userUIDRedux]);
  // // console.log(setEditDocDetails.length + "docdeets");
  // // console.log(serverTimestamp());


  useEffect(() => {
    if (editModeRedux === "new") {
      setTitle("");
      setContentWhy("");
      setContentWho("");
      setContentWhat("");
      setContentPq1("");
      setContentPq2("");
      setContentPq3("");
      setContentWhyOptions([]);
      setProblemID("");
      setImgUrl("");
      setPosition(0);
    }
  }, [editModeRedux]);

  useEffect(() => {
    if (
      (currentDocRedux && editModeRedux === "edit") ||
      editModeRedux === "display"
    ) {
      //   if (setEditDocDetails.length >= 1) {

      //   console.log(setEditDocDetails[0].title);
      setProblemID(currentDocRedux.identifier);
      // console.log(problemID);

      //   console.log(ideaID + "THIS IS ID");
      setTitle(currentDocRedux.title);
      //   console.log(title + "2");

      setContentWhy(currentDocRedux.why);
      setContentWhyOptions(currentDocRedux.whyOptions)
      setContentWho(currentDocRedux.who);
      setContentWhat(currentDocRedux.what);
      setContentPq1(currentDocRedux.pq1);
      setContentPq2(currentDocRedux.pq2);
      setContentPq3(currentDocRedux.pq3);

      setImgUrl(currentDocRedux.imgUrl);
      if (currentDocRedux.imgUrl) {
        setAddImg(true);
      }
    } else {
      return;
    }
    // }
  }, [currentDocRedux]); // eslint-disable-line react-hooks/exhaustive-deps
  // console.log("🚀 ~ file: Editor.js ~ line 170 ~ CreateNewIdea ~ setEditDocDetails", setEditDocDetails)

  // Ensure slug is URL safe


  // Validate length
  const isValid = title?.length > 3 && title?.length < 100;

  const imgButton = () => {
    if (addImg) {
      setImgUrl("");
    }
    setAddImg(!addImg);
  };
  const deleteIdea = async (e) => {
    const ref = doc(getFirestore(), "users", uidValue, "problem", problemID);
    await deleteDoc(ref)
      .then(() => {
        toast.success("Idea Deleted 🗑️");
        dispatch(unsavedChangesAction(false));
        setTitle("");
        setContentWhy("");
        setContentWhyOptions([]);
        setContentWho("");
        setContentWhat("");
        setContentPq1("");
        setContentPq2("");
        setContentPq3("");
        setProblemID("");
        setImgUrl("");
        setPosition(0);
        setAddImg(false);
        // console.log(ref.id);
        dispatch(editModeAction("display"));
        // dispatch(currentDocRedux());
      })
      .catch((error) => {
        toast.error("Error occured 😩" + error);
        console.log("Delete failed!" + error);
      });
  };
  const updateIdea = async (e) => {
    if (unsavedChangesRedux) {
      e.preventDefault();
      setLoading(true);

      const ref = doc(getFirestore(), "users", uidValue, "problem", problemID);
      await updateDoc(ref, {
        title: title,
        why: contentWhy,
        whyOptions: contentWhyOptions,
        what: contentWhat,
        who: contentWho,
        pq1: contentPq1,
        pq2: contentPq2,
        pq3: contentPq3,
        updatedAt: serverTimestamp(),
      })
        .then(() => {
          // toast.success("Idea created!");
          setLoading(false);

          toast.success("Problem updated successfully!");
          dispatch(unsavedChangesAction(false));
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
    setLoading(true);

    const d = Number(new Date());
    const timeID = d.valueOf().toString();

    const ref = doc(getFirestore(), "users", uidValue, "problem", timeID);

    const data = {
      identifier: timeID,
      uid: uidValue,
      imgUrl: imgUrl,
      imgPosition: position,
      username: username,
      title: title,
      why: contentWhy,
      whyOptions: contentWhyOptions,
      what: contentWhat,
      who: contentWho,
      pq1: contentPq1,
      pq2: contentPq2,
      pq3: contentPq3,
      productType: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    // console.log(timeID);

    await setDoc(ref, data)
      // await addDoc(collection(getFirestore(), "users", uid, "ideas"), data)
      .then(() => {
        setLoading(false);
        toast.success("Problem created!");
        dispatch(unsavedChangesAction(false));
        dispatch(editModeAction("display"));
        dispatch(currentDocAction(data));
      })
      .catch((error) => {
        toast.error("Error occured :( ");
        console.log("It failed!" + error);
      });

    setTitle("");
    setContentWhy("");
    setContentWhyOptions([]);
    setContentWho("");
    setContentWhat("");
    setContentPq1("");
    setContentPq2("");
    setContentPq3("");
    setProblemID("");
    setImgUrl("");
    setPosition(0);
    setProblemID("");
    setAddImg(false);
  };

  return (
    // <form onSubmit={newIdea ? createIdea : updateIdea}
    // className="my-8 w-[62em]">
    <div className="w-full">
      {/* <div className="flex items-center justify-center">
        <h1 className="text-3xl text-t-bd dark:text-blues-100">My Ideas & Notes</h1>
      </div>  */}
      <div className="flex flex-col items-center w-[100%] normal-box-soft !rounded-xl !bg-white/60 dark:!bg-slate-500/50">
        <FullLoader show={loading} />
        <div className=" w-[99%] mb-2">
          <div className="flex flex-col items-center w-full gap-1 ">
            <h5 className="text-[22px] text-t-bd">
              {editModeRedux === "edit" && "Edit Problem"}
              {editModeRedux === "new" && "New Problem"}
            </h5>

            {editModeRedux === "edit" || editModeRedux === "new" ? (
              <div className="absolute flex gap-5 right-10 top-5">
                {editModeRedux === "edit" && (
                  <div
                    onClick={deleteIdea}
                    className=" w-[6em] h-[2.5em] rounded-3xl bg-t-pd flex items-center justify-center text-white gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer "
                  >
                    <FaTrash className="text-[20px]" />
                    Delete
                  </div>
                )}

                <button
                  onClick={editModeRedux === "new" ? createIdea : updateIdea}
                  className=" w-[10em] h-[2.5em] rounded-3xl bg-t-bl flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer "
                >
                  {editModeRedux === "edit" ? (
                    <FaSave className="text-[20px]" />
                  ) : (
                    <FaPlus className="text-[20px]" />
                  )}

                  {editModeRedux === "edit" ? "Save Changes" : "Save Problem"}
                </button>
              </div>
            ) : (
              <div className="absolute flex gap-5 right-10 top-5">
                <button
                  className="w-[9em] h-[2em] rounded-3xl bg-t-bl flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer"
                  onClick={() => {
                    dispatch(editModeAction("edit"));
                  }}
                >
                  <FaEdit />
                  Edit Problem
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center justify-center p-0 problem-page fade-effect-quick">
            <div className="flex flex-col w-full gap-4 mt-5">
              {editModeRedux === "edit" || editModeRedux === "new" ? (
                <TextareaAutosize
                  className="w-[95%] rounded-md  textarea-tw "
                  value={title}
                  placeholder="..."
                  onChange={(e) => {
                    setTitle(e.target.value);
                    dispatch(unsavedChangesAction(true));
                  }}
                ></TextareaAutosize>
              ) : (
                <h3 className="heading">{title}</h3>
              )}

              <div className="flex flex-wrap justify-center w-full gap-4">
                <div className="flex flex-col xl:w-[48%] sm:w-full gap-3">
                  <div className="p-5 normal-box-soft !rounded-xl min-w-[15em]  !bg-clear-bl2">
                    <h3 className="heading"> Why:</h3>
                    {/* <hr className="border-t-bd"></hr> */}
                  {contentWhyOptions?.length >0 &&   <div className="w-full glass-box bg-[rgba(255, 255, 255, 0.25)] dark:bg-[hsla(200,0%,5%,0.35)]   !bg-white/90 flex flex-wrap gap-1 mb-3 justify-center">
                    {contentWhyOptions?.map((data, index) => (
                  <ListItem
                    name={data}
                    key={index}

                  />
                ))}
    </div>}

                    <div className="w-full glass-box bg-[rgba(255, 255, 255, 0.25)] dark:bg-[hsla(200,0%,5%,0.35)]   !bg-white/90 dark:!bg-slate-700/90 dark:!border-black">
                      {editModeRedux === "edit" || editModeRedux === "new" ? (
                        <TextareaAutosize
                          className="w-full rounded-md textarea-tw"
                          value={contentWhy}
                          placeholder="..."
                          onChange={(e) => {
                            setContentWhy(e.target.value);
                            dispatch(unsavedChangesAction(true));
                          }}
                        ></TextareaAutosize>
                      ) : (
                        <p>{contentWhy || "..."}</p>
                      )}
                    </div>
                  </div>
                  <div className="p-5 normal-box-soft !rounded-xl min-w-[15em]  !bg-clear-pl2">
                    <h3 className="heading"> What:</h3>
                    {/* <hr className="border-t-bd"></hr> */}
                    <div className="w-full glass-box bg-[rgba(255, 255, 255, 0.25)] dark:bg-[hsla(200,0%,5%,0.35)]   !bg-white/90 dark:!bg-slate-700/90 dark:!border-black">
                      {editModeRedux === "edit" || editModeRedux === "new" ? (
                        <TextareaAutosize
                          className="w-[95%] rounded-md  textarea-tw"
                          value={contentWhat}
                          placeholder="..."
                          onChange={(e) => {
                            setContentWhat(e.target.value);
                            dispatch(unsavedChangesAction(true));
                          }}
                        ></TextareaAutosize>
                      ) : (
                        <p>{contentWhat || "..."}</p>
                      )}
                    </div>
                  </div>
                  <div className="p-5 normal-box-soft !rounded-xl md:min-w-[25em]  !bg-clear-bpop2">
                    <h3 className="heading">Who:</h3>
                    {/* <hr className="border-t-bd"></hr> */}
                    <div className="w-full glass-box bg-[rgba(255, 255, 255, 0.25)] dark:bg-[hsla(200,0%,5%,0.35)]   !bg-white/90 dark:!bg-slate-700/90 dark:!border-black">
                      {editModeRedux === "edit" || editModeRedux === "new" ? (
                        <TextareaAutosize
                          className="w-[95%] rounded-md  textarea-tw"
                          value={contentWho}
                          placeholder="..."
                          onChange={(e) => {
                            setContentWho(e.target.value);
                            dispatch(unsavedChangesAction(true));
                          }}
                        ></TextareaAutosize>
                      ) : (
                        <p>{contentWho || "..."}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-5 normal-box-soft !rounded-xl min-w-[25em] xl:w-[45%] sm:w-full !bg-clear-pm2 sm:mt-4">
                  <h3 className="heading"> Problem:</h3>
                  {/* <hr className="border-t-bd"></hr> */}
                  <div className="flex flex-col gap-1">
                    <p className="mt-4 text-xl text-white">
                      Probem you want to solve:
                    </p>

                    <div className="w-full glass-box bg-[rgba(255, 255, 255, 0.25)] dark:bg-[hsla(200,0%,5%,0.35)]   !bg-white/90 dark:!bg-slate-700/90 dark:!border-black">
                      {editModeRedux === "edit" || editModeRedux === "new" ? (
                        <TextareaAutosize
                          className="w-[95%] rounded-md  textarea-tw"
                          value={contentPq1}
                          placeholder="..."
                          onChange={(e) => {
                            setContentPq1(e.target.value);
                            dispatch(unsavedChangesAction(true));
                          }}
                        ></TextareaAutosize>
                      ) : (
                        <p>{contentPq1 || "..."}</p>
                      )}
                    </div>

                    <p className="mt-4 text-xl text-white">Potential Cause:</p>

                    <div className="w-full glass-box bg-[rgba(255, 255, 255, 0.25)] dark:bg-[hsla(200,0%,5%,0.35)]   !bg-white/90 dark:!bg-slate-700/90 dark:!border-black">
                      {editModeRedux === "edit" || editModeRedux === "new" ? (
                        <TextareaAutosize
                          className="w-[95%] rounded-md  textarea-tw"
                          value={contentPq2}
                          placeholder="..."
                          onChange={(e) => {
                            setContentPq2(e.target.value);
                            dispatch(unsavedChangesAction(true));
                          }}
                        ></TextareaAutosize>
                      ) : (
                        <p>{contentPq2 || "..."}</p>
                      )}
                    </div>
                    <p className="mt-4 text-xl text-white">Root Cause:</p>

                    <div className="w-full glass-box bg-[rgba(255, 255, 255, 0.25)] dark:bg-[hsla(200,0%,5%,0.35)]   !bg-white/90 dark:!bg-slate-700/90 dark:!border-black">
                      {editModeRedux === "edit" || editModeRedux === "new" ? (
                        <TextareaAutosize
                          className="w-[95%] rounded-md  textarea-tw"
                          value={contentPq3}
                          placeholder="..."
                          onChange={(e) => {
                            setContentPq3(e.target.value);
                            dispatch(unsavedChangesAction(true));
                          }}
                        ></TextareaAutosize>
                      ) : (
                        <p>{contentPq3 || "..."}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col"></div>
          </div>
        </div>
      </div>
    </div>
  );
}



function ListItem({ name }) {
  return (
    <div className="flex items-center justify-between px-2 py-1 bg-clear-bl2 w-fit rounded-xl">
      <p>{name}</p>
      {/* <FaTimes
        className="transition cursor-pointer text-t-pm md:hover:scale-125 md:active:scale-110"
        onClick={() => deleteIndex(name)}
      /> */}
    </div>
  );
}
import { firestore, auth } from "../../lib/firebase";
import {
  serverTimestamp,
  query,
  collection,
  orderBy,
  getFirestore,
  updateDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
// import DOMPurify from "dompurify";
import Stars from "./Stars";
import {
  FaAngleDoubleDown,
  FaAngleDoubleUp,
  FaAngleDown,
  FaAngleUp,
  FaEdit,
  FaGlobeAmericas,
  FaGripLines,
  FaImage,
  FaLock,
  FaSave,
} from "react-icons/fa";
import { useEffect, useState, useLayoutEffect } from "react";
import DOMPurify from "isomorphic-dompurify";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { editModeAction } from "../../redux/actions";


export default function IdeaDisplay({ setEditDocDetails }) {
    const currentDocRedux = useSelector((state) => state.currentDoc);
  const [cleanContent, setCleanContent] = useState("");
  const [imgSrc, setImgSrc] = useState(
    ""
  );
  const [showImgPopUp, setShowImgPopUp] = useState(false);
  const [hover, setHover] = useState(false);
  const [position, setPosition] = useState("object-[0px,0px]");
  const [dbImgPosition, setDbImgPosition] = useState(0);

  const dispatch = useDispatch();
    console.log(currentDocRedux);

  useEffect(() => {
    // const domPurify = DOMPurify(window);
    var clean = DOMPurify.sanitize(setEditDocDetails[0]?.content, {
      USE_PROFILES: { html: true },
    });

    setCleanContent(clean);
    console.log(setEditDocDetails[0]);

    if (setEditDocDetails[0]) {
    //   console.log(setEditDocDetails[0].imgPosition);

      if (setEditDocDetails[0].imgPosition) {
        console.log(dbImgPosition);

        setDbImgPosition(setEditDocDetails[0].imgPosition);

        console.log(dbImgPosition);
        if (setEditDocDetails[0].imgPosition === 2) {
          setPosition("object-[0px,210px]");
        } else if (setEditDocDetails[0].imgPosition === 1) {
          setPosition("object-[0px,110px]");
        } else if (setEditDocDetails[0].imgPosition === -1) {
          setPosition("object-[0px,-110px]");
        } else if (setEditDocDetails[0].imgPosition === -2) {
          setPosition("object-[0px,-210px]");
        } else {
          setPosition("object-[0px,0px]");
        }
      }

      setImgSrc(setEditDocDetails[0].imgUrl);
    }
  }, [setEditDocDetails]);

  useEffect(() => {
 
    if(!showImgPopUp){
        console.log("as;dldfjla;sdkfj")
        // if (setEditDocDetails[0].imgPosition === 2) {
        //     setPosition("object-[0px,210px]");
        //   } else if (setEditDocDetails[0].imgPosition === 1) {
        //     setPosition("object-[0px,110px]");
        //   } else if (setEditDocDetails[0].imgPosition === -1) {
        //     setPosition("object-[0px,-110px]");
        //   } else if (setEditDocDetails[0].imgPosition === -2) {
        //     setPosition("object-[0px,-210px]");
        //   } else {
        //     setPosition("object-[0px,0px]");
        //   }
    }

  }, [showImgPopUp])
  

  const updateImagetoDB = async () => {
    const uid = auth.currentUser.uid;
    const ref = doc(
      getFirestore(),
      "users",
      uid,
      "ideas",
      setEditDocDetails[0].identifier
    );
    await updateDoc(ref, {
      //   title: title,
      //   content: content,
      //   published: publish,
      //   rating: rating,
      //   slug,
      imgUrl: imgSrc,
      imgPosition: dbImgPosition,
      updatedAt: serverTimestamp(),
    })
      .then(() => {
        // toast.success("Idea created!");
        // console.log(dbImgPosition);
        // if (dbImgPosition === 2) {
        //   setPosition("object-[0px,210px]");
        // } else if (dbImgPosition === 1) {
        //   setPosition("object-[0px,110px]");
        // } else if (dbImgPosition === -1) {
        //   setPosition("object-[0px,-110px]");
        // } else if (dbImgPosition === -2) {
        //   setPosition("object-[0px,-210px]");
        // } else {
        //   setPosition("object-[0px,0px]");
        // }
        // setImgSrc()
        toast.success("Image Saved!");
        // dispatch(unsavedChangesAction(false));
        // setEditMode(false)
        // // console.log("It Worked!");
        // dispatch(editModeAction("display"));
      })
      .catch((error) => {
        toast.error("Error occured 😩");
        console.log("Update failed!" + error);
      });
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div
        className="h-[10em] w-[100%] flex items-center overflow-hidden rounded-2xl"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {hover && (
          <button
            onClick={() => {
              setShowImgPopUp(!showImgPopUp);
            }}
          >
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-white/60 md:hover:scale-105 fixed top-2 left-4">
              <FaImage className="text-t-bl" />
            </div>{" "}
          </button>
        )}
        {showImgPopUp && (
          <div className="fixed top-10 left-16 normal-box flex flex-col !rounded-xl">
            <div className="flex justify-between items-end">
              <p className="mx-4">Position:</p>

              <p
                onClick={() => {
                  setShowImgPopUp(!showImgPopUp);
                }}
                className="md:hover:text-t-bl text-2xl  text-t-bd cursor-pointer mr-1"
              >
                X
              </p>
            </div>
            {/* <input id="typeinp" type="range" min="-200" max="200" defaultValue="0" step="1"             onChange={(e)=>{
                // console.log(e.target.valueAsNumber)
                setPosition("object-[0px," + e.target.valueAsNumber+  "px]")
                console.log(position)
            }} */}
            {/* /> */}
            <div className="flex gap-3 normal-box items-center justify-center">
              <button
                onClick={() => {
                  setPosition("object-[0px,210px]");
                //   setDbImgPosition(2);
                }}
              >
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-t-bl/30 md:hover:scale-105">
                  <FaAngleDoubleUp className="text-t-bl" />
                </div>{" "}
              </button>
              <button
                onClick={() => {
                  setPosition("object-[0px,110px]");
                  setDbImgPosition(1);
                }}
              >
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-t-bl/40 md:hover:scale-105">
                  <FaAngleUp className="text-t-bl" />
                </div>{" "}
              </button>
              <button
                onClick={() => {
                  setPosition("object-[0px,0px]");
                  setDbImgPosition(0);
                }}
              >
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-black/10 md:hover:scale-105">
                  <FaGripLines className="text-t-bl" />
                </div>{" "}
              </button>
              <button
                onClick={() => {
                  setPosition("object-[0px,-110px]");
                  setDbImgPosition(-1);
                }}
              >
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-t-pl/50 md:hover:scale-105">
                  <FaAngleDown className="text-t-pm" />
                </div>{" "}
              </button>
              <button
                onClick={() => {
                  setPosition("object-[0px,-210px]");
                  setDbImgPosition(-2);
                }}
              >
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-t-pl/30 md:hover:scale-105">
                  <FaAngleDoubleDown className="text-t-pm" />
                </div>{" "}
              </button>
            </div>
            <p className="mx-4">Set Image URL:</p>

            <input
              type="text"
              className="mx-5 mb-3 textarea-box"
              placeholder={imgSrc}
              onChange={(e) => {
                setImgSrc(e.target.value);
                // let charLength = e.target.value.length;
                // console.log(charLength);
                // if (charLength >= 150) {
              }}
            />
            <div className="flex items-center justify-center w-full">
              <button
                className="w-[13em] h-[2em] rounded-3xl bg-t-bl flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer mb-2"
                onClick={async() => {
                 await updateImagetoDB();
                  setShowImgPopUp(false)
                }}
              >
                <FaSave />
                Save image & Position
              </button>
            </div>
          </div>
        )}
        <img className={" w-full fade-effect " + position} src={imgSrc} alt="cover image" />
      </div>
      <div className="normal-box-soft text-t-bd text-[28px] p-5 mt-3">
        <h2 className="mx-3 ">{setEditDocDetails[0]?.title}</h2>
      </div>
      <div className="flex items-center my-2 justify-between w-[98%]">
        <div className="flex gap-1 items-center ">
          <p className="text-[22px] text-t-bd">Rating</p>
          <Stars hover={false} rating={setEditDocDetails[0]?.rating} />
        </div>
        <div>
          {setEditDocDetails[0]?.published ? (
            <div className="flex items-center gap-1">
              <FaGlobeAmericas className="text-t-bl" />
              <p className="text-t-bl">Public&nbsp;&nbsp; </p>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <FaLock className="text-t-pd" />
              <p className="text-t-pd">Private</p>
            </div>
          )}
        </div>
        <div>
          <button
            className="w-[9em] h-[2em] rounded-3xl bg-t-bl flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer"
            onClick={() => {
              // setEditMode(!editMode);
              dispatch(editModeAction("edit"));
            }}
          >
            <FaEdit />
            Edit Idea
          </button>
        </div>
      </div>
      {/* <div>
            <p>{ "current position:" + position}</p>
            <p>{ "dbimg position:" + dbImgPosition}</p>

        </div> */}
      <div className="normal-box-soft w-full !rounded-2xl">
        <div className="normal-box mt-1 mx-1 min-h-[15em] !rounded-2xl mb-4 ">
          <div
            className="mx-2"
            dangerouslySetInnerHTML={{
              __html: cleanContent,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

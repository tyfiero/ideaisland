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
import { useEffect, useState, useLayoutEffect, useRef } from "react";
// import DOMPurify from "isomorphic-dompurify";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { editModeAction } from "../../redux/actions";
import sanitize from "../../lib/sanitize";
// const probe = require('probe-image-size');

export default function IdeaDisplay() {
  let defaultPic= "https://rb.gy/xlq8wz"
  const currentDocRedux = useSelector((state) => state.currentDoc);
  const [cleanContent, setCleanContent] = useState("");
  const [imgSrc, setImgSrc] = useState(defaultPic);
  const [showImgPopUp, setShowImgPopUp] = useState(false);
  const [hover, setHover] = useState(false);
  const [position, setPosition] = useState("0");
  const [isPic, setIsPic] = useState(false);
  const [imgHeight, setImgHeight] = useState(600);
  const [imgHeightUnit, setImgHeightUnit] = useState(0);

  const dispatch = useDispatch();
  // console.log(currentDocRedux);
  const imgRef = useRef(null);

  useEffect(() => {
    setShowImgPopUp(false);

    // const domPurify = DOMPurify(window);
    var clean = sanitize(currentDocRedux?.content, {
      USE_PROFILES: { html: true },
    });

    setCleanContent(clean);

    // console.log(currentDocRedux);
    // console.log(currentDocRedux.title);

    // const probe = require('probe-image-size');

    // console.log(imgRef.current.clientHeight + "init");
    // console.log(imgRef.current.currentSrc);

    // console.log(currentDocRedux.imgPosition);
    // setImgHeight(imgRef.current.clientHeight);

    // setImgSrc(currentDocRedux);

    // imgRef.style.objectPosition = "0 10%";
    console.log(imgSrc)

    if (currentDocRedux) {
      //   console.log(setEditDocDetails[0].imgPosition);
      if(imgSrc){
      setImgSrc(currentDocRedux.imgUrl);
    console.log(imgSrc)
        
      }else{
        setImgSrc(defaultPic)

    console.log(imgSrc)

      }
      if (currentDocRedux.imgUrl) {
        setIsPic(true);
      } else {
        setIsPic(false);
      }
      setPosition(currentDocRedux.imgPosition);
    }
  }, [currentDocRedux]);

  // useEffect(() => {

  //   if(!showImgPopUp){
  //       console.log("as;dldfjla;sdkfj")
  //     // setPosition(currentDocRedux.imgPosition)

  //       // if (setEditDocDetails[0].imgPosition === 2) {
  //       //     setPosition("object-[0px,210px]");
  //       //   } else if (setEditDocDetails[0].imgPosition === 1) {
  //       //     setPosition("object-[0px,110px]");
  //       //   } else if (setEditDocDetails[0].imgPosition === -1) {
  //       //     setPosition("object-[0px,-110px]");
  //       //   } else if (setEditDocDetails[0].imgPosition === -2) {
  //       //     setPosition("object-[0px,-210px]");
  //       //   } else {
  //       //     setPosition("object-[0px,0px]");
  //       //   }
  //   }

  // }, [showImgPopUp])

  // const onImgLoad = ({ target: img }) => {
  //   console.log(img);
  //   console.log("loaded "+ currentDocRedux.imgUrl);

  //   // setTimeout(function(){
  //   const { offsetHeight, offsetWidth } = img;
  //   setImgHeight([offsetHeight, offsetWidth]);
  //   console.log(imgHeight[0] + "imgheight");
  //   // let heightDivFour = ;
  //   if (imgHeight[0] >= imgHeight[1]) {
  //     setImgHeightUnit(imgHeight[0]);
  //   } else {
  //     setImgHeightUnit(imgHeight[0] / 2);
  //   }
  // // }, 1000);
  //   // console.log(offsetHeight, offsetWidth);

  // };
  const reSizeImgBounds = () => {
    // console.log(e);
    if (typeof window !== "undefined") {
      // console.log(currentDocRedux.imgPosition + "CDR pos");
      // const { offsetHeight, offsetWidth } = img;
      // setImgHeight([offsetHeight, offsetWidth]);
      // console.log(imgHeight[0] + "imgheight");
      // let heightDivFour = ;
      console.log(imgRef.current.clientHeight + "init");
      // setImgHeight(imgRef.current.clientHeight);

      var localImgHeight = imgRef.current.clientHeight;
      var localImgWidth = imgRef.current.clientWidth;

      console.log(imgRef.current.clientHeight + "after");

      console.log(localImgHeight + "hieght");

      if (localImgHeight >= localImgWidth) {
        setImgHeightUnit(localImgHeight / 2.2);
        console.log(localImgHeight + "unit");
      } else {
        setImgHeightUnit(localImgHeight / 2.5);
        console.log(localImgHeight + "unit");
      }
    }
  };
  const updateImagetoDB = async () => {
    const uid = auth.currentUser.uid;
    const ref = doc(
      getFirestore(),
      "users",
      uid,
      "ideas",
      currentDocRedux.identifier
    );
    await updateDoc(ref, {
      //   title: title,
      //   content: content,
      //   published: publish,
      //   rating: rating,
      //   slug,
      imgUrl: imgSrc,
      imgPosition: position,
      updatedAt: serverTimestamp(),
    })
      .then(() => {
        setShowImgPopUp(!showImgPopUp);
        toast.success("Image/Positon Saved!");
      })
      .catch((error) => {
        toast.error("Error occured 😩");
        console.log("Update failed!" + error);
      });
  };

  return (
    <div className="flex flex-col items-center w-full fade-effect-quick">
      {!isPic && (
        <button
          onClick={() => {
            // setImgSrc(
            //   "https://images.unsplash.com/photo-1530658432962-05f34932eb47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2307&q=80"
            // );
            // setTimeout(function(){
              // setShowImgPopUp(true)
              setIsPic(true);

          // }, 2000);
          }}
          className="fixed flex items-center justify-center w-[8em]  gap-2 h-8 rounded-full bg-white/60 md:hover:scale-105 top-2 left-4"
        >
          {" "}
          <FaImage className="text-t-bl" />
          Add Image
        </button>
      )}
      {/* {isPic && ( */}
        <div
          className={"h-[10em] w-[100%] flex items-center overflow-hidden rounded-2xl " + (isPic ? null : " !hidden")}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {hover && (
            <button
              onClick={() => {
                reSizeImgBounds();
                setShowImgPopUp(!showImgPopUp);
              }}
            >
              <div className="fixed flex items-center justify-center w-[8em] h-8 rounded-full bg-white/60 md:hover:scale-105 top-2 left-4 gap-2 text-black/60">
                <FaImage className="text-t-bl" />
                Edit Image
              </div>{" "}
            </button>
          )}
          {showImgPopUp && (
            <div className="fixed top-10 left-16 normal-box flex flex-col !rounded-xl">
              <div className="flex items-center justify-between">
                <p className="mx-4">Position:</p>

                <p
                  onClick={() => {
                    setShowImgPopUp(!showImgPopUp);
                  }}
                  className="mr-1 text-2xl cursor-pointer md:hover:text-t-bl text-t-bd"
                >
                  X
                </p>
              </div>
              <div className="flex justify-center ">
                <input
                id="typeinp"
                type="range"
                className="blue range"
                min={-imgHeightUnit || 400}
                max={imgHeightUnit || -400}
                // defaultValue="0"
                value={position}
                step="1"
                onChange={(e) => {
                  console.log(imgHeightUnit);

                  // console.log(e.target.valueAsNumber)
                  setPosition(e.target.valueAsNumber);
                  // console.log(position)
                }}
              /></div>
              
              {/* <div className="flex items-center justify-center gap-3 normal-box">
              <button
                onClick={() => {
                //   setPosition(`0px ${(imgHeightUnit * 2)}px`);
                //   setDbImgPosition(2);
                setPosition(imgHeightUnit * 2);

                console.log(position)
                }}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-t-bl/30 md:hover:scale-105">
                  <FaAngleDoubleUp className="text-t-bl" />
                </div>{" "}
              </button>
              <button
                onClick={() => {
                //   setPosition(`object-[0px,${imgHeightUnit}px]`);
                  setPosition(imgHeightUnit);

                  setDbImgPosition(1);
                }}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-t-bl/40 md:hover:scale-105">
                  <FaAngleUp className="text-t-bl" />
                </div>{" "}
              </button>
              <button
                onClick={() => {
                //   setPosition("object-[0px,0px]");
                setPosition(0);

                  setDbImgPosition(0);
                }}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 md:hover:scale-105">
                  <FaGripLines className="text-t-bl" />
                </div>{" "}
              </button>
              <button
                onClick={() => {
                //   setPosition("object-[0px,-110px]");
                setPosition(imgHeightUnit * -1);

                  setDbImgPosition(-1);
                }}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-t-pl/50 md:hover:scale-105">
                  <FaAngleDown className="text-t-pm" />
                </div>{" "}
              </button>
              <button
                onClick={() => {
                //   setPosition("object-[0px,-210px]");
                setPosition(imgHeightUnit * -2);

                  setDbImgPosition(-2);
                }}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-t-pl/30 md:hover:scale-105">
                  <FaAngleDoubleDown className="text-t-pm" />
                </div>{" "}
              </button>
            </div> */}
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
                  onClick={() => {
                    updateImagetoDB();
                    // setShowImgPopUp(false)
                  }}
                >
                  <FaSave />
                  Save image & Position
                </button>
              </div>
            </div>
          )}
          {/* <div className="h-[20em] w-full"> */}
          <img
            ref={imgRef}
            // onLoad={onImgLoad}

            style={{ objectPosition: "0px " + position + "px" }}
            className={" w-full fade-effect "}
            src={currentDocRedux?.imgUrl}
            alt="cover image"
          />
        </div>
      {/* )} */}
      {/* </div> */}
      <div className="normal-box-soft text-t-bd text-[28px] p-5 mt-3">
        <h2 className="mx-3 ">{currentDocRedux?.title}</h2>
      </div>
      <div className="flex items-center my-2 justify-between w-[98%]">
        <div className="flex items-center gap-1 ">
          <p className="text-[22px] text-t-bd">Rating</p>
          <Stars hover={false} rating={currentDocRedux?.rating} />
        </div>
        <div>
          {currentDocRedux?.published ? (
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

// import { useRouter } from "next/router";
import { UserContext } from "../../lib/context";
import {
  serverTimestamp,
  query,
  collection,
  orderBy,
  getFirestore,
  setDoc,
  doc,
} from "firebase/firestore";
// import { firestore, auth } from '@lib/firebase';
import { firestore, auth } from "../../lib/firebase";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useCollection } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import IdeaFeed from "./IdeaFeed";
import { editModeAction } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { statsAction } from "../../redux/actions";
import {
  FaEdit,
  FaLightbulb,
  FaExclamationTriangle,
  FaStickyNote,
  FaPlus,
  FaRegTimesCircle,
  FaSearch,
} from "react-icons/fa";
// import SwitchSelector from "react-switch-selector";

export default function IdeaSideBar(props) {
  // const [currentNote, setCurrentNote] = useState("ideas");
  const [searchValue, setSearchValue] = useState("");

  const editModeRedux = useSelector((state) => state.editMode);
  const dispatch = useDispatch();
  // dispatch(editModeAction("new"))
  let type = props.type;

  return (
    <div className="overflow-hidden rounded-2xl">
      <div className="normal-box-soft  bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] fade-effect-quick flex flex-col items-center !h-[87vh] overflow-y-auto overflow-x-hidden !rounded-2xl !scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-t-bl scrollbar-track-blues-50 fade-effect-turbo">
        {type === "ideas" && (
          <>
            <h1 className="text-3xl text-t-bd dark:text-blues-100 fade-effect-quick">Ideas</h1>
          </>
        )}
        {type === "problem" && (
          <>
            <h1 className="text-3xl text-t-pd dark:text-pinks-100 fade-effect-quick">
              Problems
            </h1>
          </>
        )}
        {type === "notes" && (
          <>
            <h1 className="text-3xl text-teal-600 dark:text-teal-200 fade-effect-quick">Notes</h1>
          </>
        )}
        <div className="flex w-[20em] p-2 gap-2 items-center justify-evenly text-center normal-box-soft">
          {/* <SwitchSelector
          onChange={onChangeHandler}
          options={options}
          initialSelectedIndex={initialSelectedIndex}
          backgroundColor={"#ffffff6e"}
          fontColor={"black"}
        /> */}
          <button
            className={
              "w-[6em] h-[2em] rounded-3xl  flex items-center justify-center text-slate-100 gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer " +
              (type === "ideas" ? " bg-t-bl" : " bg-slate-300 dark:bg-slate-800")
            }
            onClick={() => props.setCurrentNote("ideas")}
          >
            <FaLightbulb className="text-[18px] text-t-bd dark:text-blues-100" />

            <p
              className={
                "mr-1  mb-0 " +
                (type === "ideas"
                  ? "text-slate-100 text-[20px]"
                  : "text-black text-[18px]")
              }
            >
              Ideas
            </p>
          </button>
          <button
            className={
              "w-[7.5em] h-[2em] rounded-3xl px-1 bg-t-bl flex items-center justify-center text-slate-100 gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95  cursor-pointer " +
              (type === "problem" ? " bg-t-pm" : " bg-slate-300 dark:bg-slate-800")
            }
            onClick={() => props.setCurrentNote("problem")}
          >
            <FaExclamationTriangle className="text-[18px] text-t-pd dark:text-pinks-100" />

            <p
              className={
                "mr-1  mb-0 " +
                (type === "problem"
                  ? "text-slate-100 text-[20px]"
                  : "text-black text-[18px]")
              }
            >
              Problems
            </p>
          </button>
          <button
            className={
              "w-[6em] h-[2em] rounded-3xl bg-t-bl flex items-center justify-center  gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer " +
              (type === "notes" ? " bg-clear-bpop3" : " bg-slate-300 dark:bg-slate-800")
            }
            onClick={() => props.setCurrentNote("notes")}
          >
            <FaStickyNote className="text-[18px] text-teal-400 dark:text-teal-100" />

            <p
              className={
                "mr-1 mb-0 " +
                (type === "notes"
                  ? "text-slate-100 text-[20px]"
                  : "text-black text-[18px]")
              }
            >
              Notes
            </p>
          </button>
        </div>
        {/* <div className="transition duration-1000 rounded-lg -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur">
      <button
        // type="submit"
        // disabled={!isValid}
        onClick={() => {
          dispatch(editModeAction("new"));
          // dispatch(currentDocAction(idea.identifier))
        }}
        className=" w-[12em] h-[2em] mt-2 rounded-3xl bg-t-bl flex items-center justify-center text-slate-100 gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer "
      >
        <FaPlus className="text-[20px]" />
        Create New Idea
      </button>
      </div> */}

        <div className="relative mt-2 group">
          <div className="absolute transition duration-1000 rounded-full opacity-25 -inset-1 bg-gradient-to-r from-t-pl via-t-bl to-t-bpop blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
          {/* <div className="relative flex justify-start rounded-lg ring-1 items-top"> */}

          <button
            // type="submit"
            // disabled={!isValid}
            onClick={() => {
              dispatch(editModeAction("new"));
              // dispatch(currentDocAction(idea.identifier))
            }}
            className=" w-[12em] h-[2em] m-2 rounded-3xl bg-t-bl flex items-center justify-center text-slate-100 gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer md:hover:shadow-xl shadow-clear-bd3"
          >
            <FaPlus className="text-[20px]" />
            <p className="text-white">
              {" "}
              {type === "ideas"
                ? "Create New Idea"
                : type === "problem"
                ? "Create Problem"
                : "Create New Note"}
            </p>
          </button>
        </div>
        <div className="flex justify-center w-full">
          <FaRegTimesCircle className="relative right-6 -top-[13px] mt-[1.2rem] mr-4 text-t-pm md:hover:scale-125 text-xl opacity-0" />

          <input
            className="border-2 border-gray-300 bg-white dark:bg-slate-700 h-8 px-5 pr-16 rounded-full text-sm focus:outline-none w-[100%] placeholder:text-slate-400 dark:placeholder:text-slate-300"
            type="search"
            name="search"
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          {searchValue ? (
            <button onClick={() => setSearchValue("")}>
              <FaRegTimesCircle className="relative right-6 -top-[13px] mt-[1.2rem] mr-4 text-t-pm md:hover:scale-125 text-xl" />
            </button>
          ) : (
            <button className="relative mt-4 mr-4 right-6 -top-3 text-slate-300">
              <FaSearch />
            </button>
          )}
        </div>

        {type === "ideas" && (
          <>
            <IdeasList searchValue={searchValue} type="ideas" />
          </>
        )}
        {type === "problem" && (
          <>
            <IdeasList searchValue={searchValue} type="problem" />
          </>
        )}
        {type === "notes" && (
          <>
            <IdeasList searchValue={searchValue} type="notes" />
          </>
        )}
      </div>
    </div>
  );
}

function IdeasList(props) {
  const { user, username } = useContext(UserContext);
  const statsRedux = useSelector((state) => state.stats);
  const dispatch = useDispatch();
  const userUIDRedux = useSelector((state) => state.userUID);
  const [searchValue, setSearchValue] = useState("");

  console.log();
  useEffect(() => {
    setSearchValue(props.searchValue);
  }, [props.searchValue]);
  //Done? Using context api, any content component will only mount if the user variable is defined.
  //TODO memoize this so that firebase reads less
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

  let type = props.type;

  // console.log(auth.currentUser);
  let ideas, ideaSearch;
  // if (uid) {
  const ref = collection(getFirestore(), "users", uid, type);
  const postQuery = query(ref, orderBy("createdAt", "desc"));

  const [querySnapshot] = useCollection(postQuery);

  ideas = querySnapshot?.docs.map((doc) => doc.data());

  ideaSearch = ideas?.filter((obj) => {
    // console.log(obj.title.toLowerCase());

    if (props.type === "ideas") {
      return (
        obj.title.toLowerCase().includes(searchValue?.toLowerCase()) ||
        obj.content?.toLowerCase().includes(searchValue?.toLowerCase())
      );
    } else if (props.type === "problem") {
      return (
        obj.title.toLowerCase().includes(searchValue?.toLowerCase()) ||
        obj.why?.toLowerCase().includes(searchValue?.toLowerCase()) ||
        obj.what?.toLowerCase().includes(searchValue?.toLowerCase()) ||
        obj.who?.toLowerCase().includes(searchValue?.toLowerCase()) ||
        obj.pq1?.toLowerCase().includes(searchValue?.toLowerCase()) ||
        obj.pq2?.toLowerCase().includes(searchValue?.toLowerCase()) ||
        obj.pq3?.toLowerCase().includes(searchValue?.toLowerCase())
      );
    } else if (props.type === "notes") {
      return (
        obj.title.toLowerCase().includes(searchValue?.toLowerCase()) ||
        obj.content?.toLowerCase().includes(searchValue?.toLowerCase())
      );
    }
  });
  // } else {
  //   ideaSearch= null;
  // }
  // console.log(ideaSearch);

  return (
    <>
      <IdeaFeed ideas={ideaSearch} admin type={props.type} />

      {searchValue?.length > 0 && ideas?.length > 0 ? (
        <p className="mt-2 text-xs text-slate-400 fade-effect">
          Displaying {ideaSearch?.length} of {ideas?.length}
        </p>
      ) : (
        <p className="mt-2 text-xs text-slate-400 fade-effect">
          {ideas?.length}
          {props.type === "problem"
            ? " problems"
            : props.type === "ideas"
            ? " ideas"
            : " notes"}
        </p>
      )}
    </>
  );
}

// function CreateNewIdea() {
//   const router = useRouter();
//   const { username } = useContext(UserContext);
//   const [title, setTitle] = useState("");

//   // Ensure slug is URL safe
//   const slug = encodeURI(kebabCase(title));

//   // Validate length
//   const isValid = title.length > 3 && title.length < 100;

// Create a new post in firestore
//   const createIdea = async (e) => {
//     e.preventDefault();
//     const uid = auth.currentUser.uid;
//     const ref = doc(getFirestore(), "users", uid, "ideas", slug);

//     // Tip: give all fields a default value here
//     const data = {
//       title,
//       slug,
//       uid,
//       username,
//       published: false,
//       content: "blank idea",
//       createdAt: serverTimestamp(),
//       updatedAt: serverTimestamp(),
//       heartCount: 0,
//       rating: 0,
//     };

//     await setDoc(ref, data);

//     toast.success("Idea created!");

//     // Imperative navigation after doc is set
//     // router.push(`/admin/${slug}`);
//   };

//   return (
//     <form onSubmit={createIdea} className="my-8">
//       <div className="normal-box-soft w-[22em] flex flex-col items-center">
//         <h5>Title</h5>
//         <input
//           className="text-area-note"
//           value={title}
//           onChange={(e) => {
//             setTitle(e.target.value);
//             let charLength = e.target.value.length;
//             console.log(charLength);
//             if (charLength >= 100) {
//               toast.error("Max character length reached (100)");
//             }
//           }}
//           placeholder="My great idea!"
//           minLength={3}
//           maxLength={100}
//           // className={styles.input}
//         />
//         <p>
//           <strong>Slug:</strong> {slug}
//         </p>
//         <button
//           type="submit"
//           disabled={!isValid}
//           className=" w-[12em] h-[3em] rounded-3xl bg-t-bl flex items-center justify-center text-slate-100 gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer"
//         >
//           <FaPlus className="text-[20px]" />
//           Create New Idea
//         </button>
//       </div>
//     </form>
//   );
// }

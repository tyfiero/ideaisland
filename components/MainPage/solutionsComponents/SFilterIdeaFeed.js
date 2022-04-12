import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
// import AuthCheck from "../components/Authentication/AuthCheck";

// import { doc, getDoc } from "firebase/firestore";
// import { firestore } from "../lib/firebase";
import {
  FaCheck,
  FaEdit,
  FaGlobeAmericas,
  FaLock,
  FaRegTrashAlt,
} from "react-icons/fa";
import OneStar from "../../Notes/OneStar";
import Stars from "../../Notes/Stars";
// import DOMPurify from "dompurify";
import sanitize from "../../../lib/sanitize";
import { useState, useEffect } from "react";
import { statsAction, editModeAction } from "../../../redux/actions";
import { sFormAction, sUpdateAction } from "../../../redux/actions";
import { updateCurrentUser } from "firebase/auth";

export default function IdeaFeed({ ideas, admin }) {
  // const statsRedux = useSelector((state) => state.stats);
  const sFormRedux = useSelector((state) => state.sForm);

  const dispatch = useDispatch();
  // const docRef = doc(firestore, ", "idea-1");
  // getDoc(docRef).then((doc) => {
  //   console.log(doc.data(), doc.id);
  // })
  // // const docSnap = async  () => { await getDoc(docRef)};
  // // if (docSnap.exists()) {
  //   // console.log("Document data:", docSnap.data());
  // // } else {
  // //   // doc.data() will be undefined in this case
  // //   console.log("No such document!");
  // // }
  // console.log(ideas);

  // useEffect(() => {

  //   if(ideas){
  //     let num = ideas.length;
  //     dispatch(statsAction({ideaNum: num}))
  //   }

  // }, [])

  return ideas
    ? ideas.map((idea) => (
        <IdeaItem idea={idea} key={idea.identifier} admin={admin} />
      ))
    : null;
}

function IdeaItem({ idea, admin = false }) {
  // const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);

  const sFormRedux = useSelector((state) => state.sForm);
  const sUpdate = useSelector((state) => state.sUpdate);

  const dispatch = useDispatch();

  const TimeDisplay = (time) => {
    let formattedTime = new Date(
      time?.seconds * 1000 + time?.nanoseconds / 1000000
    );
    let date = formattedTime.toLocaleDateString();

    let clockTime = formattedTime.toLocaleString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return date + ", " + clockTime;
  };

  const updateIdea = (data) => {
    let updated = sFormRedux;
    updated.idea = data;
    dispatch(sFormAction(updated));
    dispatch(sUpdateAction(!sUpdate));
    // setTimeout(() => {
    // dispatch(sUpdateAction(false))
    // }, 1000);
  };

  const deleteIdea = (data) => {
    let updated = sFormRedux;
    updated.idea = null;
    dispatch(sFormAction(updated));
    dispatch(sUpdateAction(!sUpdate));
  };

  useEffect(() => {
    if (clicked) {
      if (idea.title !== sFormRedux.idea?.title) {
        // console.log("title changed " + idea.title);
        setClicked(false);
      }
    }
  }, [sUpdate]); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log(idea.documentID)
  return (
    <div
      className="flex items-center justify-center w-full px-4 pt-2 cursor-pointer sm:px-6 lg:px-8 drop-shadow-sm"
      onClick={() => {
        if (sFormRedux.idea) {
          // console.log("Idea in form");
          if (idea.title === sFormRedux.idea?.title) {
            // console.log("same idea");
            if (clicked) {
              // console.log("clicked!");

              deleteIdea();
              setClicked(false);
              // console.log("deleted idea");
            }
          } else {
            // console.log("DIFFERENT idea");
            deleteIdea();
            setClicked(true);
            updateIdea(idea);
          }
        } else {
          // console.log(" NO Idea in form");
          setClicked(true);
          updateIdea(idea);
        }

        // dispatch(currentDocAction(idea.identifier));
        // dispatch(currentDocAction(idea));

        // dispatch(editModeAction("display"));
      }}
    >
      <div
        className={
          "flex items-center normal-box-soft !rounded-lg md:w-[98%] !bg-slate-400/50 focus:border-4 border-t-bl" +
          (clicked ? " border-4 border-t-bl" : "")
        }
      >
        <input
          type="checkbox"
          className="w-5 h-5 form-checkbox text-t-bl"
          checked={clicked}
          onChange={() => {}}
        />

        <div className="w-full   p-1  shadow !rounded-xl normal-box-soft drop-shadow-sm flex-col  items-center ">
          <div className="flex">
            <div className="glass-box bg-[rgba(255, 255, 255, 0.25)] dark:bg-[hsla(200,0%,5%,0.35)]   !bg-white/90 dark:!bg-slate-600 !rounded-xl w-[100%] ">
              <div className="">
                <h2 className="text-t-bd dark:text-blues-100 truncate text-[18px] m-0 text-left">
                  {idea.title}
                </h2>
                <div
                  className="overflow-hidden max-h-[3em] !m-0 text-left "
                  dangerouslySetInnerHTML={{
                    __html: sanitize(idea.content, {
                      USE_PROFILES: { html: true },
                    }),
                  }}
                ></div>
                <div className="flex items-center justify-between ">
                  <p className="text-slate-400 text-[12px] ml-1 mb-0">
                    {TimeDisplay(idea.createdAt)}
                  </p>
                  <div className="flex ">
                    <span className="flex items-center pl-1 bg-slate-400/30 rounded-xl">
                      {idea.rating || 0}
                      <OneStar className="ml-5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div></div>
          </div>

          <div className="flex"></div>
        </div>
      </div>
    </div>
  );
}

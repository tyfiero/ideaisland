import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
// import AuthCheck from "../components/Authentication/AuthCheck";

// import { doc, getDoc } from "firebase/firestore";
// import { firestore } from "../lib/firebase";
import { FaCheck, FaEdit, FaGlobeAmericas, FaLock, FaRegTrashAlt } from "react-icons/fa";
import OneStar from "../../Notes/OneStar";
import Stars from "../../Notes/Stars";
// import DOMPurify from "dompurify";
import sanitize from "../../../lib/sanitize";
import { useState, useEffect } from "react";
import { statsAction, currentDocAction, editModeAction} from "../../../redux/actions";
import { sFormAction } from "../../../redux/actions";
import { updateCurrentUser } from "firebase/auth";

export default function IdeaFeed({ ideas, admin }) {
  // const statsRedux = useSelector((state) => state.stats);
  const sFormRedux = useSelector((state) => state.sForm);

  const dispatch = useDispatch()
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

  const currentDocRedux = useSelector((state) => state.currentDoc);
  const sFormRedux = useSelector((state) => state.sForm);

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
    return date + ", " +clockTime;
  };


  const updateIdea = (data) => {
    let updated = sFormRedux;
    updated.idea = data;
    dispatch(sFormAction(updated))
  }

  // console.log(idea.documentID)
  return (
    <div
      className="flex items-center justify-center px-4 pt-2 sm:px-6 lg:px-8 drop-shadow-sm  cursor-pointer "
      onClick={() => {
        setClicked(!clicked)
        updateIdea(idea)
        // dispatch(currentDocAction(idea.identifier));
        // dispatch(currentDocAction(idea));

        // dispatch(editModeAction("display"));
      }}
    >
      <div className={"flex items-center normal-box-soft !rounded-lg md:w-[78em] !bg-slate-400/50 focus:border-4 border-t-bl" + (clicked ? " border-4 border-t-bl" : "")}>
                  {/* <input type="radio" id="idea-selector" name="idea-select" value={clicked} className="mr-4 ml-2"/> */}

        {/* <div className={"h-5 w-5 flex" + (clicked ? "bg-slate-100 border-4 border-t-bl": " bg-white border-2 border-slate-400") }></div> */}
        <input type="checkbox" className="form-checkbox h-5 w-5 text-t-bl" checked={clicked} />

      <div
        className="w-full   p-1  shadow !rounded-xl normal-box-soft drop-shadow-sm flex-col  items-center "
        // onMouseOver={() => setHover(true)}
        // onMouseOut={() => setHover(false)}
      >
        <div className="flex">
          <div className="glass-box !bg-white/90 !rounded-xl w-[100%] ">
            {/* <Link href={`/${idea.username}`}>
            <a>
              <strong className="italic text-t-bl">@{idea.username}</strong>
            </a>
          </Link> */}

            {/* <Link href={`/${idea.username}/${idea.slug}`}>
              <a> */}
            <div className="">
              <h2 className="text-t-bd truncate text-[18px] m-0 text-left">{idea.title}</h2>
              {/* <p className="truncate text-[14px]">{idea.content}</p> */}
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
          
            <span className="flex  bg-slate-400/30 pl-1 rounded-xl items-center">
            {idea.rating || 0}
              <OneStar className="ml-5" />
            </span>
          </div>
          
              {/* {idea.published ? (
                <div className="flex items-center">
                  <span className="flex items-left">
                    {idea.heartCount || 0}
                    <p className="mr-1 ">💗</p>
                  </span>
                  <FaGlobeAmericas className="text-t-bl" />
                </div>
              ) : (
                <FaLock className="text-t-pd" />
              )} */}
        </div>
            </div>
            {/* </a>
            </Link> */}
            {/* <Stars rating={idea.rating} /> */}
          
          </div>

          <div></div>
        </div>

        
        <div className="flex">
          {/* {hover && (
            <Link href={`/admin/${idea.slug}`}>
              <button className=" w-[2em] h-[1.5em] rounded-3xl bg-t-bl flex items-center justify-center text-white drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer">
                <FaEdit />
              </button>
            </Link>
          )} */}
        </div>
      </div>
      </div>

    </div>
  );
}

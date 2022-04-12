import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../lib/context";

import {
  FaBuilding,
  FaLaptopCode,
  FaQuestion,
  FaShoppingBag,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaCheck,
  FaInfoCircle,
  FaFolderOpen,
  FaPlus,
} from "react-icons/fa";
import {
  serverTimestamp,
  query,
  collection,
  orderBy,
  getFirestore,
  setDoc,
  doc,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import { Popover, ArrowContainer } from "react-tiny-popover";
import { useSelector, useDispatch } from "react-redux";
import { pFormAction } from "../../../redux/actions";
import { firestore, auth } from "../../../lib/firebase";
import { defaults } from "lodash";

function PStartMenu(props) {
  // console.log("RERENDER");
  const { user, username } = useContext(UserContext);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [reRender, setRerender] = useState(false);
  const [loadMenu, setLoadMenu] = useState(false);
  const [problems, setProblems] = useState(null);

  const dispatch = useDispatch();
  const pFormRedux = useSelector((state) => state.pForm);
  const userUIDRedux = useSelector((state) => state.userUID);

  useEffect(() => {
    setRerender(!reRender);
  }, [props.reset]); // eslint-disable-line react-hooks/exhaustive-deps

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
  let problemsFromDb;
  // console.log(auth.currentUser);
  const ref = collection(getFirestore(), "users", uid, "problem");
  const postQuery = query(ref, orderBy("createdAt", "desc"));

  const [querySnapshot] = useCollection(postQuery);

  const getProblems = () => {
    problemsFromDb = querySnapshot?.docs.map((doc) => doc.data());

    setProblems(problemsFromDb);
  };

  return (
    <div>
      <div
        className="flex items-center justify-center  px-4 pt-[1rem] sm:px-6 lg:px-8 drop-shadow-xl fade-effect-quick

  "
      >
        <div className="w-full max-w-[48rem] p-10 space-y-8   normal-box-soft">
          <div className="relative flex flex-col items-center justify-center p-5 problem-page fade-effect-quick">
            <div className="absolute -top-5 -left-5">
              <Popover
                isOpen={isPopoverOpen}
                containerStyle={{
                  zIndex: 100,
                  boxShadow: "5px 13px 28px 0px rgba(0,0,0,0.48)",
                  backgroundColor: "white",
                  borderRadius: "2em",
                }}
                onClickOutside={() => setIsPopoverOpen(false)}
                positions={["bottom", "left", "right"]}
                content={({ position, childRect, popoverRect }) => (
                  <ArrowContainer
                    position={position}
                    childRect={childRect}
                    popoverRect={popoverRect}
                    arrowColor={"white"}
                    arrowSize={10}
                    arrowStyle={{ opacity: 1, top: "-6px" }}
                    className="popover-arrow-container"
                    arrowClassName="popover-arrow"
                  >
                    <div
                      className="!opacity-100 bg-white w-[25em] rounded-xl p-5"
                      onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                    >
                      The problem section is where you will identify and
                      describe the problem you want to solve.
                      <br />
                      You can load a previous problem or start a new problem on
                      this page.
                    </div>
                  </ArrowContainer>
                )}
              >
                <div
                  onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                  className="w-5"
                >
                  <FaInfoCircle className="text-2xl cursor-pointer text-blues-300 dark:text-blues-100 md:hover:scale-110" />
                </div>
              </Popover>
            </div>
            <div className="normal-box-soft">
              {pFormRedux.title ? (
                <h3 className="heading">
                  Continue with{" "}
                  <span className="underline text-t-bl">
                    {pFormRedux.title}
                  </span>
                  , start fresh, or load an existing problem?
                </h3>
              ) : (
                <h3 className="heading">
                  Create a new problem or load an existing problem?
                </h3>
              )}
            </div>

            <div className="flex flex-col items-center w-full gap-5 mt-5">
              {pFormRedux.title && (
                <div className="relative group !w-[25em]">
                  <div className="absolute w-full transition duration-1000 rounded-full opacity-90 -inset-1 bg-gradient-to-r from-t-bl via-blues-100 to-t-bpop blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
                  <button
                    className="w-[95%] h-[3em] bg-gradient-to-r from-t-bl via-t-bl to-t-bpop  flex items-center justify-between px-5 md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer shadow-clear-bd3 md:hover:shadow-xl m-1 drop-shadow-xl rounded-full text-xl text-white"
                    onClick={() => {
                      props.goToStep(2);
                    }}
                  >
                    <p>
                      Continue{" "}
                      <span className="underline text-white/60">
                        {"" + pFormRedux.title?.slice(0, 11) + "..."}
                      </span>
                    </p>
                    <FaLongArrowAltRight className="ml-1 text-[30px] text-t-bl" />
                  </button>
                </div>
              )}
              <div className="relative group !w-[25em]">
                <div className="absolute w-full transition duration-1000 rounded-full opacity-90 -inset-1 bg-gradient-to-r from-t-bl via-blues-200 to-blues-50 blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
                <button
                  className="w-[95%] h-[3em] bg-gradient-to-r from-t-bl via-blues-300 to-blues-100  flex items-center justify-between px-5 md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer shadow-clear-bd3 md:hover:shadow-xl m-1 drop-shadow-xl rounded-full text-xl text-white"
                  onClick={() => {
                    //CLEAR pformredux to all null values
                    // then go to step 2

                    let clearedForm = {
                      title: null,
                      id: null,
                      what: null,
                      why: null,
                      whyOptions: null,
                      who: null,
                      productType: null,
                      pq1: null,
                      pq2: null,
                      pq3: null,
                    };
                    dispatch(pFormAction(clearedForm));

                    props.setReset(true);
                    setTimeout(() => {
                      props.setReset(false);
                    }, 1000);
                    props.goToStep(2);
                  }}
                >
                  Create New Problem
                  <FaPlus className="ml-1 text-[24px] text-blues-500" />
                </button>
              </div>

              <div className="relative group !w-[25em]">
                <div className="absolute w-full transition duration-1000 rounded-full opacity-50 -inset-1 bg-gradient-to-r from-blues-100 via-t-bl to-t-bd blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
                <button
                  className="w-[95%] h-[3em] bg-gradient-to-r from-t-bl via-t-bl to-t-bd  flex items-center justify-between px-5 md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer shadow-clear-bd3 md:hover:shadow-xl m-1 drop-shadow-xl rounded-full text-xl text-white"
                  onClick={() => {
                    //open menu to load existing problem
                    //make button disappear after click, and create new button that continues to step 2 after problem selection
                    // props.goToStep(2);
                    setLoadMenu(!loadMenu);
                    getProblems();
                  }}
                >
                  Load Existing Problem
                  <FaFolderOpen className="ml-1 text-[24px] text-blues-100" />
                </button>
              </div>

              {loadMenu && (
                <div className="p-2 border-2 rounded-xl border-t-pm h-[20em] overflow-auto scrollbar-w-2 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-t-bl scrollbar-track-blues-50">
                  <p>
                    {problems?.length} Problem{problems?.length > 1 && "s"}
                  </p>
                  {problems
                    ? problems.map((idea, key) => (
                        <ProblemItem
                          idea={idea}
                          key={key}
                          goToStep={props.goToStep}
                          setLoadMenu={setLoadMenu}
                          setReset={props.setReset}
                          loadData={props.loadData}
                          setLoadData={props.setLoadData}
                        />
                      ))
                    : "No problems to load"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PStartMenu;

function ProblemItem({
  idea,
  goToStep,
  setLoadMenu,
  setReset,
  setLoadData,
  loadData,
}) {
  const [hover, setHover] = useState(false);
  const [nav, setNav] = useState(null);
  const currentDocRedux = useSelector((state) => state.currentDoc);

  const dispatch = useDispatch();

  const TimeDisplay = (time) => {
    let formattedTime = new Date(
      time?.seconds * 1000 + time?.nanoseconds / 1000000
    );
    let date = formattedTime.toLocaleDateString();
    // let clockTime = formattedTime.toLocaleString(navigator.language, {
    //   hour: "2-digit",
    //   minute: "2-digit",
    // });
    let clockTime = formattedTime.toLocaleString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return date + ", " + clockTime;
  };

  // console.log(idea.documentID)
  return (
    <div
      className="flex items-center justify-center px-4 pt-2 sm:px-6 lg:px-8 drop-shadow-xl "
      onClick={() => {
        dispatch(pFormAction(idea));
        setLoadData(!loadData);
        goToStep(2);
        setLoadMenu(false);
      }}
    >
      <div
        className={
          "w-[22em]  p-1  shadow !rounded-xl normal-box-soft drop-shadow-xl flex-col  items-center  bg-clear-pl4"
        }
      >
        <div className="flex">
          <div className="normal-box bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] !rounded-xl w-[100%] ">
            <div className="cursor-pointer">
              <h2 className="text-t-bd truncate text-[18px] text-left">
                {idea.title || "*Unnamed Problem*"}
              </h2>
              {/* <p className="truncate text-[14px]">{idea.content}</p> */}

              {/* <p className="overflow-hidden max-h-[3em]">
                Why:{" " + idea.why}
              </p>
              <p className="overflow-hidden max-h-[3em]">
                What:{" " + idea.what}
              </p>
              <p className="overflow-hidden max-h-[3em]">
                Who:{" " + idea.who}
              </p>
              <p className="overflow-hidden max-h-[3em]">
                Root Cause:{" " + idea.pq3}
              </p> */}
            </div>
          </div>

          <div></div>
        </div>

        <div className="flex items-center justify-between ">
          <p className="text-slate-500 text-[12px] ml-1 mb-0">
            {TimeDisplay(idea.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}

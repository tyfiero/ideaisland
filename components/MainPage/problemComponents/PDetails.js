import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../lib/context";
import { Popover, ArrowContainer } from "react-tiny-popover";
import TextareaAutosize from "react-textarea-autosize";
import {
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaInfoCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";
import {
  serverTimestamp,
  doc,
  getFirestore,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { pFormAction } from "../../../redux/actions";
import { useRouter } from "next/router";
import { auth } from "../../../lib/firebase";

function PDetails(props) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [content1, setContent1] = useState("");
  const [content2, setContent2] = useState("");
  const [content3, setContent3] = useState("");
  const { user, username } = useContext(UserContext);
  const [titleContent, setTitleContent] = useState("");
  const dispatch = useDispatch();
  const pFormRedux = useSelector((state) => state.pForm);
  const router = useRouter();
  const userUIDRedux = useSelector((state) => state.userUID);
  const userNameRedux = useSelector((state) => state.userName);

  const update = (e) => {
    let updated = pFormRedux;
    if (e.target.name === "title") {
      updated.title = e.target.value;
      setTitleContent(e.target.value);
    } else if (e.target.name === "pq1") {
      updated.pq1 = e.target.value;
      setContent1(e.target.value);
    } else if (e.target.name === "pq2") {
      updated.pq2 = e.target.value;
      setContent2(e.target.value);
    } else if (e.target.name === "pq3") {
      updated.pq3 = e.target.value;
      setContent3(e.target.value);
    }
    // let updated = pFormRedux;

    dispatch(pFormAction(updated));
    if (!props.changes) {
      props.setChanges(true);
    }
    // props.update(e.target.name, e.target.value);
  };

  useEffect(() => {
    if (props.reset) {
      setTitleContent("");
      setContent1("");
      setContent2("");
      setContent3("");
    } else {
      if (pFormRedux.title) {
        setTitleContent(pFormRedux.title);
      } else if (pFormRedux.pq1) {
        setContent1("");
      } else if (pFormRedux.pq2) {
        setContent2("");
      } else if (pFormRedux.pq3) {
        setContent3("");
      }
    }
  }, [props.reset]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (pFormRedux.title) {
      setTitleContent(pFormRedux.title);
    }

    if (pFormRedux.pq1) {
      setContent1(pFormRedux.pq1);
    }

    if (pFormRedux.pq2) {
      setContent2(pFormRedux.pq2);
    }

    if (pFormRedux.pq3) {
      setContent3(pFormRedux.pq3);
    }
  }, [props.loadData]); // eslint-disable-line react-hooks/exhaustive-deps

  // Create a new post in firestore
  const saveProblemForm = async (e) => {
    e?.preventDefault() || null;
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
    if (!pFormRedux.id) {
      const d = Number(new Date());
      const timeID = d.valueOf().toString();
      const ref = doc(getFirestore(), "users", uid, "problem", timeID);
      // Tip: give all fields a default value here
      const data = {
        id: timeID,
        title: pFormRedux.title,
        uid,
        username: userNameRedux,
        productType: pFormRedux.productType || null,
        whyOptions: pFormRedux.whyOptions || [],
        why: pFormRedux.why || null,
        what: pFormRedux.what || null,
        who: pFormRedux.who || null,
        pq1: pFormRedux.pq1 || null,
        pq2: pFormRedux.pq2 || null,
        pq3: pFormRedux.pq3 || null,

        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      await setDoc(ref, data)
        .then(() => {
          if (!pFormRedux.id) {
            let updated = pFormRedux;
            updated.id = timeID;
            dispatch(pFormAction(updated));
          }
          toast.success("Progress saved!");
          props.setChanges(false);
          router.push("/problem/progress");
        })
        .catch((error) => {
          toast.error("Error occured :( ");
          console.log("It failed!" + error);
        });
    } else {
      const ref = doc(getFirestore(), "users", uid, "problem", pFormRedux.id);

      const data = {
        id: pFormRedux.id,
        title: pFormRedux.title,
        productType: pFormRedux.productType,
        whyOptions: pFormRedux.whyOptions,
        why: pFormRedux.why,
        what: pFormRedux.what,
        who: pFormRedux.who,
        pq1: pFormRedux.pq1,
        pq2: pFormRedux.pq2,
        pq3: pFormRedux.pq3,
        updatedAt: serverTimestamp(),
      };
      await updateDoc(ref, data)
        .then(() => {
          toast.success("Progress saved!");
          props.setChanges(false);
          router.push("/problem/progress");
        })
        .catch((error) => {
          toast.error("Error occured :( ");
          console.log("It failed!" + error);
        });
    }
  };

  return (
    <div>
      <div
        className="flex items-center justify-center  px-4 pt-[1rem] sm:px-6 lg:px-8 drop-shadow-xl fade-effect-quick

  "
      >
        <div className="w-full max-w-[42rem] p-10 space-y-8   normal-box-soft">
          <div className="relative flex flex-col items-center justify-center gap-3 p-2 problem-page fade-effect-quick">
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
                      className="!opacity-100 bg-white w-[25em] nun rounded-xl p-3"
                      onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                    >
                      Finding the root cause of your problem helps to clarify
                      what you&apos;re actually trying to solve. Ensuring that
                      your ideas are solutions to a problem is the key to
                      building a business from the idea. The more frustrating
                      and annoying the problem is, the better, especially if you
                      have a solution that greatly improves the associated user
                      experience. Check out{" "}
                      <a
                        className="underline text-blues-300"
                        href="https://www.forbes.com/sites/stephanieburns/2019/05/28/solution-looking-for-a-problem/?sh=1031dac83835"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {" "}
                        this article in forbes
                      </a>{" "}
                      for more in depth information.
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
            <h1 className="text-3xl text-t-bd dark:text-blues-100">Problem</h1>
            <div className="normal-box-soft">
              <h3 className="heading">Time to find your problem</h3>
            </div>

            {/* <div className='flex gap-5'>
        <button className='w-[12em] h-[4em] rounded-3xl  flex items-center justify-center text-white gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer bg-t-bl' onClick={() => props.goToStep(3)}><FaLaptopCode />Software Product</button>
        <button className='w-[12em] h-[4em] rounded-3xl  flex items-center justify-center text-white gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer bg-t-pm' onClick={() => props.goToStep(3)}><FaShoppingBag /> Physical Product</button>
        </div> */}

            <div className="flex flex-col">
              <div className="flex flex-col p-2 my-2 glass-box bg-clear-pl5">
                <div className="flex">
                  {" "}
                  <p>Give your problem/challenge/mission a name!</p>
                  <p className="text-t-pm">*</p>
                </div>

                <input
                  type="text"
                  required
                  className="textarea-box textarea-tw   h-[3em] !rounded-xl"
                  name="title"
                  placeholder="Title"
                  value={titleContent}
                  onChange={(e) => {
                    setTitleContent(e.target.value);
                    if (!props.changes) {
                      props.setChanges(true);
                    }
                    update(e);
                  }}
                />
              </div>

              <div className="flex flex-col p-2 my-2 glass-box bg-clear-pl2">
                <p>
                  What problem are you trying to solve? What frustrates or
                  annoys your users?
                </p>

                <TextareaAutosize
                  className="textarea-box textarea-tw  h-[5em] whitespace-normal"
                  value={content1}
                  name="pq1"
                  placeholder="..."
                  onChange={update}
                ></TextareaAutosize>
              </div>
              <div className="flex flex-col p-2 my-2 glass-box bg-clear-pl2">
                <p>
                  Explain why this frustration/annoyance occurs? This is a
                  potential cause
                </p>

                <TextareaAutosize
                  className="textarea-box textarea-tw  h-[5em] whitespace-normal"
                  value={content2}
                  name="pq2"
                  placeholder="..."
                  onChange={update}
                ></TextareaAutosize>
              </div>
              <div className="flex flex-col p-2 my-2 glass-box bg-clear-pl2">
                <p>
                  Why does the potential cause occur? This is your root cause.
                </p>

                <TextareaAutosize
                  className="textarea-box textarea-tw  h-[5em] whitespace-normal"
                  value={content3}
                  name="pq3"
                  placeholder="..."
                  onChange={update}
                ></TextareaAutosize>
              </div>

         
            </div>
            <div className="flex items-center justify-between w-full">
              <button
                className="card__btn_prev save_button left-[5%]  flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect-quick"
                onClick={() => props.goToStep(4)}
              >
                <FaLongArrowAltLeft className="mr-1 text-[24px]" />
                Back
              </button>

              {titleContent || pFormRedux.title ? (
                <div className="relative group">
                  <div className="absolute transition duration-1000 rounded-full opacity-0 -inset-1 bg-gradient-to-r from-t-pl via-t-bl to-t-bpop blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>

                  <button
                    type="submit"
                    className="card__btn_next h-[3em]  right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect !w-[15em] drop-shadow-xl m-3 !bg-t-bl text-white"
                    onClick={() => {
                      let updated = pFormRedux;

                      dispatch(pFormAction(updated));

                      if (props.changes) {
                        saveProblemForm();
                      } else {
                        router.push("/problem/progress");
                      }
                    }}
                  >
                    {props.changes ? (
                      <p className="text-white fre">Save and Continue</p>
                    ) : (
                      <p className="text-white fre">Continue</p>
                    )}
                    <FaLongArrowAltRight className="ml-1 text-[24px]" />
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  className=" rounded-full save_button right-[50px] flex items-center justify-center  fade-effect !w-[15em] !bg-slate-300 cursor-not-allowed"
                  onClick={() => {
                    toast.error("Add title before submitting");
                  }}
                >
                  Add title to continue
                  {/* <FaLongArrowAltRight className="ml-1 text-[24px]" /> */}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PDetails;

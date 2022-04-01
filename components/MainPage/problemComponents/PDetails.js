import React, { useState } from "react";

import { Popover, ArrowContainer } from "react-tiny-popover";

import {
  FaLaptopCode,
  FaShoppingBag,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaInfoCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";
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
import { useSelector, useDispatch } from "react-redux";
import { pFormAction } from "../../../redux/actions";
import { useRouter } from "next/router";
import { firestore, auth } from "../../../lib/firebase";

function PDetails(props) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
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
    } else if (e.target.name === "pq1") {
      updated.pq1 = e.target.value;
    } else if (e.target.name === "pq2") {
      updated.pq2 = e.target.value;
    } else if (e.target.name === "pq3") {
      updated.pq3 = e.target.value;
    }
    // let updated = pFormRedux;

    dispatch(pFormAction(updated));
    if (!props.changes) {
      props.setChanges(true);
    }
    // props.update(e.target.name, e.target.value);
  };

  // Create a new post in firestore
  const saveProblemForm = async (e) => {
    e?.preventDefault() || null;
    let uid;
    if (props.cookieUID) {
      uid = props.cookieUID;
    } else {
      if (userUIDRedux) {
        uid = userUIDRedux;
        console.log("it actually worked");
      } else if (auth.currentUser?.uid) {
        uid = auth.currentUser.uid;
      } else {
        uid = null;
        console.log("no uid available :(");
      }
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
        whyOptions: pFormRedux.whyOptions || null,
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
          <div className="relative flex flex-col items-center justify-center problem-page fade-effect-quick">
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
                      className="!opacity-100 bg-white w-[25em] rounded-xl p-3"
                      onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                    >
                      Finding the root cause of your problem helps to clarify
                      what you&apos;re actually trying to solve.
                    </div>
                  </ArrowContainer>
                )}
              >
                <div
                  onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                  className="w-5"
                >
                  <FaInfoCircle className="text-2xl cursor-pointer text-blues-300 md:hover:scale-110" />
                </div>
              </Popover>
            </div>
            <h1 className="heading-top">Problem</h1>
            <div className="normal-box-soft">
              <h3 className="heading">Time to find your problem</h3>
            </div>

            {/* <div className='flex gap-5'>
        <button className='w-[12em] h-[4em] rounded-3xl  flex items-center justify-center text-white gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer bg-t-bl' onClick={() => props.goToStep(3)}><FaLaptopCode />Software Product</button>
        <button className='w-[12em] h-[4em] rounded-3xl  flex items-center justify-center text-white gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer bg-t-pm' onClick={() => props.goToStep(3)}><FaShoppingBag /> Physical Product</button>
        </div> */}

            <div className="flex flex-col">
              <div className="flex">
                {" "}
                <p>Give your problem/challenge/mission a name!</p>
                <p className="text-t-pm">*</p>
              </div>

              <input
                type="text"
                required
                className="textarea-box h-[3em] !rounded-xl"
                name="title"
                placeholder="Title"
                defaultValue={pFormRedux.title}
                onChange={(e) => {
                  setTitleContent(e.target.value);
                  if (!props.changes) {
                    props.setChanges(true);
                  }
                  update(e);
                }}
              />
              {/* <p>Your problem so far:</p>
              <div className="flex flex-wrap w-[25em] flex-col items-center">
                <div className="flex flex-col normal-box">
                  <h4>Why:</h4>
                  <p>{props.form?.whyOptions}</p>
                  <p>{props.form?.why}</p>

                </div>
                <div className="flex flex-col normal-box">
                  <h4>What:</h4>
                  <p>{props.form?.productType}</p>
                  <p>{props.form?.what}</p>

                </div>
                <div className="flex flex-col normal-box">
                  <h4>Who:</h4>
                  <p>{props.form?.who}</p>

                </div>
              </div> */}
              <p>
                What problem are you trying to solve? What frustrates or annoys
                your users?
              </p>

              <textarea
                // type="text"
                className="textarea-box h-[5em] whitespace-normal"
                name="pq1"
                defaultValue={pFormRedux.pq1}
                placeholder="..."
                onChange={update}
              />
              <p>
                Explain why this frustration/annoyance occurs? This is a
                potential cause
              </p>

              <textarea
                // type="text"
                className="textarea-box h-[5em] whitespace-normal"
                name="pq2"
                defaultValue={pFormRedux.pq2}
                placeholder="..."
                onChange={update}
              />
              <p>
                Why does the potential cause occur? This is your root cause.
              </p>

              <textarea
                // type="text"
                className="textarea-box h-[5em] whitespace-normal"
                name="pq3"
                placeholder="..."
                defaultValue={pFormRedux.pq3}
                onChange={update}
              />
              <p>
                *This note will be saved to your Idea Page for your review
                later.
              </p>
            </div>
            <div className="flex items-center justify-between w-full">
              <button
                className="card__btn_prev save_button left-[5%]  flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect-quick"
                onClick={() => props.goToStep(2)}
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
                    {props.changes ? <p>Save and Continue</p> : <p>Continue</p>}
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

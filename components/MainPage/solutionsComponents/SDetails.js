import React, { useEffect, useState } from "react";

import { Popover, ArrowContainer } from "react-tiny-popover";
import ConfettiComponent from "../ConfettiComponent";
import {
  FaLaptopCode,
  FaShoppingBag,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaInfoCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";

import { useRouter } from "next/router";

import { useSelector, useDispatch } from "react-redux";
import { sFormAction } from "../../../redux/actions";
import ChipBlue from "../problemComponents/chips/ChipBlue";
import ChipFeature from "./CombinatorialComponents/ChipFeature";
import ChipTechStackDisplay from "./CombinatorialComponents/ChipTechStackDisplay";
function SDetails(props) {
  const dispatch = useDispatch();
  const sFormRedux = useSelector((state) => state.sForm);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [titleContent, setTitleContent] = useState("");
  const [confetti, setConfetti] = useState(false);
  const router = useRouter();

  // const update = (e) => {
  //   props.update(e.target.name, e.target.value);
  // };

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
        className="flex items-center justify-center  px-4 pt-[1rem] sm:px-6 lg:px-8 drop-shadow-xl fade-effect-quick min-w-[50em]

  "
      >
        <div className="w-full max-w-[42rem] p-10 space-y-8  normal-box-soft">
          {confetti && <ConfettiComponent />}
          <div className="relative flex flex-col items-center justify-center p-2 problem-page fade-effect-quick">
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
                      Edit me plz
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
            <h1 className="text-3xl text-t-bd dark:text-blues-100">
              Overview of Your Improved Idea
            </h1>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <p className="text-left">Title:</p>
                <div className="normal-box-soft">
                  <h3 className="heading">
                    {sFormRedux.idea.title || "No title"}
                  </h3>
                </div>
              </div>

              <div className="flex flex-col">
                <p className="text-left">Features:</p>
                <div className="flex flex-wrap items-center justify-center gap-2 normal-box-soft">
                  {sFormRedux.features.map((feature, index) => (
                    <ChipFeature
                      cost={feature.cost}
                      name={feature.name}
                      feasibility={feature.feasibility}
                      importance={feature.importance}
                      version={feature.version}
                      key={index}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-left">Tech Stack:</p>
              <div className="flex flex-col items-center justify-center normal-box-soft ">
                <div className="flex flex-wrap items-center justify-center gap-2 ">
                  {sFormRedux.stack.map((tool, index) => (
                    <ChipTechStackDisplay
                      cost={tool.cost}
                      name={tool.name}
                    type={tool.type}
                    kind={tool.kind}
                      key={index}
                    />
                  ))}
                </div>
                  
                  <div className="flex gap-5 mt-2">
                  <p className="text-sm ">Monthly Cost: {sFormRedux.stackCost[0].monthly > 0 ? ("$" + sFormRedux?.stackCost[0].monthly): "Free"}</p>
                  <p className="text-sm ">Annual Cost: {sFormRedux.stackCost[1].yearly > 0 ? ("$" + sFormRedux?.stackCost[1].yearly): "Free"}</p>
                  </div>
                </div>

              </div>
              <p>More tools to upgrade your idea are coming soon!</p>
            </div>
            <div className="flex items-center justify-between w-full">
              <button
                className="card__btn_prev save_button left-[5%]  flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect-quick"
                onClick={() => props.goToStep(4)}
              >
                <FaLongArrowAltLeft className="mr-1 text-[24px]" />
                Back
              </button>

              {titleContent ? (
                <div className="relative group">
                  <div className="absolute transition duration-1000 rounded-full opacity-0 -inset-1 bg-gradient-to-r from-t-pl via-t-bl to-t-bpop blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>

                  <button
                    type="submit"
                    className="card__btn_next h-[3em]  right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect !w-[15em] drop-shadow-xl m-3"
                    onClick={() => {
                      router.push("/solutions/progress");
                    }}
                  >
                    Submit and Continue
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

export default SDetails;

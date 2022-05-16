import React, { useState, useEffect } from "react";
import { Popover, ArrowContainer } from "react-tiny-popover";

import {
  FaInfoCircle,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
} from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";

function Step({
  setChanges,
  reset,
  loadData,
  heading,
  text,
  subtext,
  setReset,
  hashKey,
  popupText,
  placeholder,
  num,
  ...props
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [content, setContent] = useState("");

  const update = (e) => {
    // let updated = pFormRedux;
    // updated.who = e.target.value;
    // dispatch(pFormAction(updated));
    setContent(e.target.value);
    // if (!props.changes) {
    //   props.setChanges(true);
    // }
  };

  useEffect(() => {
    // if (props.reset) {
    //   setContent("");
    // } else {
    //   if (pFormRedux.who) {
    //     setContent(pFormRedux.who);
    //   }
    // }
  }, [props.reset]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // if (pFormRedux.who) {
    //   setContent(pFormRedux.who);
    // }
  }, [props.loadData]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      <div
        className="flex items-center justify-center  px-4 pt-[1rem] sm:px-6 lg:px-8 drop-shadow-xl fade-effect-quick

"
      >
        <div className="w-full max-w-[42rem] p-10 space-y-8  glass-box border-2 border-slate-700 bg-slate-900/40">
          <div className="relative flex flex-col items-center justify-between gap-3 p-3 problem-page fade-effect-quick min-h-[25em]">
            <h1 className="text-3xl text-t-bd dark:text-blues-100">
              {heading || "Title"}
            </h1>

            <div className=" glass-box border-slate-700 bg-slate-900/40 min-h-[10em] min-w-[30em] p-5 my-2">
              <h3 className="heading text-blues-100">{text || "Question"}</h3>
              <p className="px-5">{subtext}</p>

              <div className="flex flex-col w-full">
                <TextareaAutosize
                  className="textarea-box textarea-tw  min-h-[10em] whitespace-normal mt-3"
                  value={content}
                  placeholder={placeholder || "Enter your answer here"}
                  onChange={update}
                ></TextareaAutosize>
              </div>
            </div>

            <div className="flex items-center justify-between w-full mt-3">
            <div className="relative group">
                <div className={"absolute transition duration-1000  !rounded-3xl -inset-1 bg-gradient-to-r from-t-pl via-t-pm to-t-pd blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"  +
                  (props.currentStep === 1
                    ? " !opacity-0 cursor-default"
                    : " opacity-40 cursor-pointer ")
                }></div>
              <button
                // className={
                //   "card__btn_prev save_button left-[5%]  flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect-quick " +
                //   (props.currentStep === 1
                //     ? " opacity-0 cursor-default"
                //     : " opacity-100 cursor-pointer ")
                // }

                className={" px-3 h-[3em] glass-box text-white !border-white/0 bg-gradient-to-r from-clear-pl2 via-clear-pl4 to-clear-pl4  rounded-2xl right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer shadow-clear-pd2 shadow-xl m-1 drop-shadow-xl " +
                  (props.currentStep === 1
                    ? " opacity-0 cursor-default"
                    : " opacity-100 cursor-pointer ")
                }
                onClick={() => {
                  if (props.currentStep > 1) {
                    props.previousStep();
                  }
                }}
              >
                <FaLongArrowAltLeft className="mr-1 text-[24px]" />
                Back
              </button>
              </div>

              <div className="relative group">
                <div className="absolute transition duration-1000 opacity-70 !rounded-3xl -inset-1 bg-gradient-to-r from-t-bd via-t-bl to-t-bpop blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
                <button
                  // className=" px-3 h-[3em] card__btn_next right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer shadow-clear-bd3 md:hover:shadow-xl m-1 drop-shadow-xl "
                   className=" px-3 h-[3em] glass-box text-white !border-white/0 bg-gradient-to-r from-clear-bl4 via-clear-bl4 to-clear-bl2 rounded-2xl  right-[50px] flex items-center justify-center md:hover:scale-105 transition md:active:scale-95 fade-effect cursor-pointer shadow-clear-bl3 shadow-xl m-1 drop-shadow-xl "
                  onClick={() => props.nextStep()}
                >
                  {props.currentStep === props.totalSteps
                    ? "Save and Submit"
                    : "Next"}
                  <FaLongArrowAltRight className="ml-1 text-[24px]" />
                </button>
              </div>
            </div>

            {/* 



<TextareaAutosize
                className="textarea-box textarea-tw  min-h-[10em] whitespace-normal mt-3"
                value={content}
                placeholder="What's your niche?"
                onChange={update}
              ></TextareaAutosize> */}
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
                      {popupText}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step;

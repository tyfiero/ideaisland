import React, { useState, useEffect } from "react";

import { Popover, ArrowContainer } from "react-tiny-popover";
import {
  FaInfoCircle,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
} from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";

import { useSelector, useDispatch } from "react-redux";
import { pFormAction } from "../../../redux/actions";
// import { FaLaptopCode, FaShoppingBag } from "react-icons/fa";
function PWho(props) {
  const [content, setContent] = useState("");
  // const [content2, setContent2] = useState("");

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const dispatch = useDispatch();
  const pFormRedux = useSelector((state) => state.pForm);

  const update = (e) => {
    let updated = pFormRedux;
    updated.who = e.target.value;
    dispatch(pFormAction(updated));
    setContent(e.target.value);

    if (!props.changes) {
      props.setChanges(true);
    }
  };

  useEffect(() => {
    if (props.reset) {
      setContent("");
    } else {
      if (pFormRedux.who) {
        setContent(pFormRedux.who);
      }
    }
  }, [props.reset]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (pFormRedux.who) {
      setContent(pFormRedux.who);
    }
  }, [props.loadData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div
        className="flex items-center justify-center  px-4 pt-[1rem] sm:px-6 lg:px-8 drop-shadow-xl fade-effect-quick

  "
      >
        <div className="w-full max-w-[42rem] sm:py-5 md:p-10 space-y-8  normal-box-soft">
          <div className="relative flex flex-col items-center justify-between gap-3 p-3 problem-page fade-effect-quick min-h-[25em]">
          <div className="absolute md:-top-5 md:-left-5 sm:-top-2 sm:left-2">

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
                      Understanding your audience is a key step in buidling a
                      product. It helps to frame your target market and how your
                      end users will use your product. <br />
                      <a
                        className="underline text-blues-300"
                        href="https://www.shopify.com/blog/target-market"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {" "}
                        Here&apos;s an article from Shopify
                      </a>{" "}
                      if you want to learn more.
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
            <h1 className="text-3xl text-t-bd dark:text-blues-100">Who?</h1>

            <div className=" normal-box-soft  min-h-[10em] p-5 my-2">
              <h3 className="heading">Who is your audience?</h3>
              <p className="px-5">
                Think of your target demographic, more specific the better
              </p>

            <div className="flex flex-col w-full">
             
              <TextareaAutosize
                className="textarea-box textarea-tw  min-h-[10em] whitespace-normal mt-3"
                value={content}
                placeholder="What's your niche?"
                onChange={update}
              ></TextareaAutosize>
              {/* <p>
                *This note will be saved to your Idea Page for your review
                later.
              </p> */}

{/* <div className="flex flex-col p-2 my-2 glass-box bg-clear-pl2">
              <p>
                What problem are you trying to solve? What frustrates or annoys
                your users?
              </p>

              <TextareaAutosize
                className="textarea-box textarea-tw  h-[5em] whitespace-normal"
                value={content2}
                placeholder="..."
                onChange={update}
              ></TextareaAutosize>
              </div> */}
            </div>
            </div>
         
            <div className="flex items-center justify-between w-full">
              <button
                className="card__btn_prev save_button left-[5%]  flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect-quick"
                onClick={() => props.goToStep(3)}
              >
                <FaLongArrowAltLeft className="mr-1 text-[24px]" />
                Back
              </button>
              <div className="relative group">
                <div className="absolute transition duration-1000 opacity-0 rounded-3xl -inset-1 bg-gradient-to-r from-t-pl via-t-bl to-t-bpop blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
                <button
                  className="w-[5em] h-[3em] card__btn_next right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer shadow-clear-bd3 md:hover:shadow-xl m-1 drop-shadow-xl "
                  onClick={() => props.goToStep(5)}
                >
                  Next
                  <FaLongArrowAltRight className="ml-1 text-[24px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PWho;

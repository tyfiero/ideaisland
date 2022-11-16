import React, { useState, useEffect } from "react";
import { Popover, ArrowContainer } from "react-tiny-popover";
import { pFormAction } from "../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import {
  FaLaptopCode,
  FaShoppingBag,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaCheck,
  FaInfoCircle,
} from "react-icons/fa";
function PWhat(props) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [content, setContent] = useState("");
  const [button1, setButton1] = useState(false);
  const [button2, setButton2] = useState(false);
  const dispatch = useDispatch();
  const pFormRedux = useSelector((state) => state.pForm);

  const update = (e) => {
    let updated = pFormRedux;
    updated.what = e.target.value;
    dispatch(pFormAction(updated));
    setContent(e.target.value);
    if (!props.changes) {
      props.setChanges(true);
    }
    // props.update(e.target.name, e.target.value);
  };
  const updateButton = (e) => {
    let updated = pFormRedux;
    updated.productType = e.target.value;
    dispatch(pFormAction(updated));
    if (!props.changes) {
      props.setChanges(true);
    }
    // props.update("productType", e.target.value);
  };

  useEffect(() => {
    if (props.reset) {
      setContent("");
      setButton1(false);
      setButton2(false);
    } else {
      if (pFormRedux.what) {
        setContent(pFormRedux.what);
      }
    }
  }, [props.reset]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (pFormRedux.what) {
      setContent(pFormRedux.what);
    }
  }, [props.loadData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div
        className="flex items-center justify-center  px-4 pt-[1rem] sm:px-3 lg:px-8 drop-shadow-xl fade-effect-quick 

  "
      >
        <div className="w-full max-w-[42rem] sm:py-5 md:p-10 space-y-8  normal-box-soft">
          <div className="relative flex flex-col items-center justify-center gap-3 p-3 problem-page fade-effect-quick">
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
                      This helps to frame what kinds of solutions would work for
                      your product. What form your solution will take on will
                      impact how it gets built and tested. <br /> <br /> Check
                      out
                      <a
                        className="underline text-blues-300"
                        href="http://productdesignmanagement.com/physical-vs-virtual-products/#:~:text=Software%20products%20are%20never%20standalone,connections%20(like%20electric%20power"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {" "}
                        this blog post
                      </a>{" "}
                      from the accomplished Product Manager and Co-Founder of
                      Igloo Design, Yariv Sade.
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
            <h1 className="text-3xl text-t-bd dark:text-blues-100">What?</h1>
            <div className=" normal-box-soft sm:max-w-[98%] min-h-[10em] p-5 my-2 flex flex-col items-center">
              <h3 className="heading">
                Are you building software or physical product?
              </h3>

            <div className="flex gap-5 mt-4">
              <button
                className={
                  "px-2 py-3 rounded-3xl  flex items-center justify-center text-black gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer relative " +
                  (button1
                    ? " border-4 border-t-bl bg-blues-200"
                    : "bg-blues-200")
                }
                onClick={(e) => {
                  setButton1(!button1);
                  setButton2(false);
                  updateButton(e);
                }}
                value="Software Product"
              >
                <FaLaptopCode />
                Software Product{" "}
                {button1 ? (
                  <span className="absolute flex items-center justify-center w-6 h-6 leading-none text-center text-black rounded-full -top-2 -left-2 bg-t-bpop">
                    <FaCheck />
                  </span>
                ) : null}
              </button>
              <button
                className={
                  "px-3 py-3 rounded-3xl  flex items-center justify-center text-black gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer relative  " +
                  (button2
                    ? " border-4 border-t-pm bg-pinks-200"
                    : "bg-pinks-100")
                }
                onClick={(e) => {
                  setButton2(!button2);
                  setButton1(false);
                  updateButton(e);
                }}
                value="Physical Product"
              >
                <FaShoppingBag /> Physical Product{" "}
                {button2 ? (
                  <span className="absolute flex items-center justify-center w-6 h-6 leading-none text-center text-black rounded-full -top-2 -left-2 bg-t-bpop">
                    <FaCheck />
                  </span>
                ) : null}
              </button>
            </div>

            <div className="flex flex-col w-full">
              <p className="my-5">If neither, describe what you are looking to innovate:</p>
              {/* <textarea
                // type="text"
                className="textarea-box  textarea-tw   h-[10em] whitespace-normal"
                // name="what"
                value={content}
                placeholder="What are you building?"
                onChange={update}
              /> */}
               <TextareaAutosize
                className="textarea-box textarea-tw  min-h-[10em] whitespace-normal mt-3"
                value={content}
                placeholder="What are you building or what do you want to build?"
                onChange={update}
              ></TextareaAutosize>
              {/* <p>
                *This note will be saved to your Idea Page for your review
                later.
              </p> */}
            </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <button
                className="card__btn_prev save_button left-[5%]  flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect-quick"
                onClick={() => props.goToStep(2)}
              >
                <FaLongArrowAltLeft className="mr-1 text-[24px]" />
                Back
              </button>
              <div className="relative group">
                <div className="absolute transition duration-1000 rounded-full opacity-0 -inset-1 bg-gradient-to-r from-t-pl via-t-bl to-t-bpop blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
                <button
                  className="w-[5em] h-[3em] card__btn_next right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer shadow-clear-bd3 md:hover:shadow-xl m-1 drop-shadow-xl "
                  onClick={() => props.goToStep(4)}
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

export default PWhat;

import React, { useState } from "react";

import { Popover, ArrowContainer } from "react-tiny-popover";
import { useRouter } from "next/router";

import {
  FaLaptopCode,
  FaShoppingBag,
  FaLongArrowAltLeft,
  FaPastafarianism,
  FaAlignLeft,
  FaLongArrowAltRight,
  FaCheck,
  FaRobot,
  FaRandom,
} from "react-icons/fa";
import Link from "next/link";

function SIdeate(props) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [button1, setButton1] = useState(false);
  const [button2, setButton2] = useState(false);
  const router = useRouter();

  const update = (e) => {
    props.update(e.target.name, e.target.value);
  };
  const updateButton = (e) => {
    props.update("productType", e.target.value);
  };
  return (
    <div>
      <div
        className="flex items-center justify-center  px-4 pt-[1rem] sm:px-6 lg:px-8 drop-shadow-xl fade-effect-quick min-w-[50em]

  "
      >
        <div className="w-full max-w-[42rem] p-10 space-y-8  normal-box-soft">
          <div className="flex flex-col items-center justify-center problem-page fade-effect-quick">
            <h1 className="heading-top">Ideate</h1>
            <div className="normal-box-soft">
              <h3 className="heading">Oh yes, it&apos;s idea time 😎</h3>
            </div>

            <div className="flex gap-5">
              {/* <button
                className={"w-[12em] h-[4em] rounded-3xl  flex items-center justify-center text-black gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " + (button1 ? " border-4 border-t-bl bg-blues-200" : "bg-blues-100")}
                onClick={(e)=>{setButton1(!button1); setButton2(false)
                  updateButton(e)}}
                value="Software Product"
              >
                <FaRandom />
                Combinatorial Tool {button1 ?   <span className="absolute flex items-center justify-center w-6 h-6 leading-none text-center text-black rounded-full -top-2 -left-2 bg-t-bpop"><FaCheck/></span> : null}
              </button>
              <button
              className={"w-[12em] h-[4em] rounded-3xl  flex items-center justify-center text-black gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " + (button2 ? " border-4 border-t-bl bg-blues-200" : "bg-blues-100")}
              onClick={(e)=>{setButton2(!button2); setButton1(false)
                updateButton(e)}}
                value="Physical Product"
              >
                <FaRobot /> AI tool {button2 ?   <span className="absolute flex items-center justify-center w-6 h-6 leading-none text-center text-black rounded-full -top-2 -left-2 bg-t-bpop"><FaCheck/></span> : null}
              </button> */}
              <div className="flex flex-col gap-5">
                <h4>Tools:</h4>
                <Link href="/Solutions/Combinatorial">
                  <a>
                    <div className="flex solution-button">
                      <FaRandom className="text-2xl" />
                      <p>Combinatorial Tool</p>
                    </div>
                  </a>
                </Link>

                <Link href="/Solutions/Sentence">
                  <a>
                    <div className="solution-button">
                      <FaAlignLeft className="text-2xl" />
                      <p>Sentence Tool</p>
                    </div>
                  </a>
                </Link>

                <Link href="/Solutions/Ai">
                  <a>
                    <div className="solution-button">
                      <FaPastafarianism className="text-3xl" />
                      <p>AI Tool</p>
                    </div>
                  </a>
                </Link>
              </div>
            </div>

            <div className="flex flex-col">
              {/* <p>If neither, describe what you are looking to innovate:</p>
              <textarea
                // type="text"
                className="textarea-box h-[10em] whitespace-normal"
                name="what"
                placeholder="What are you building?"
                onChange={update}
              />
              <p>
                *This note will be saved to your Idea Page for your review
                later.
              </p> */}
              <Popover
                isOpen={isPopoverOpen}
                padding={2} // adjust padding here!
                onClickOutside={() => setIsPopoverOpen(false)}
                positions={["bottom", "left", "right"]}
                content={({ position, childRect, popoverRect }) => (
                  <ArrowContainer
                    position={position}
                    childRect={childRect}
                    popoverRect={popoverRect}
                    arrowColor={"white"}
                    arrowSize={10}
                    arrowStyle={{ opacity: 1 }}
                    className="popover-arrow-container"
                    arrowClassName="popover-arrow"
                  >
                    <div
                      className="!opacity-100 bg-white w-[25em] rounded-xl p-5"
                      onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                    >
                      It all starts with an idea. With quantity comes quality.
                      This is the time to set judgement to the side, and put on
                      your creativity hat.
                    </div>
                  </ArrowContainer>
                )}
              >
                <p
                  onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                  className="underline cursor-pointer text-blues-100 md:hover:scale-110"
                >
                  Why this step?
                </p>
              </Popover>
            </div>
            <div className="flex items-center justify-between w-full">
              <button
                className=" save_button card__btn_prev left-[5%]  flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect-quick !w-[10em]"
                onClick={() => router.push("/Problem")}
              >
                <FaLongArrowAltLeft className="mr-1 text-[24px]" />
                Back to Problem
              </button>
              <div className="relative group">
                <div className="absolute transition duration-1000 rounded-full opacity-0 -inset-1 bg-gradient-to-r from-t-pl via-t-bl to-t-bpop blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
                <button
                  className="w-[5em] h-[3em] card__btn_next right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer shadow-t-bd/50 md:hover:shadow-xl m-1 drop-shadow-xl "
                  onClick={() => props.goToStep(2)}
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

export default SIdeate;

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
  FaInfoCircle,
  FaRobot,
  FaRandom,
  FaRegLightbulb,
} from "react-icons/fa";
import Link from "next/link";

import Image from "next/image";
import { MdOutlineUpgrade } from "react-icons/md";

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
        <div className="w-full max-w-[62rem] p-10 space-y-8  normal-box-soft relative !bg-gradient-to-b from-clear-pl3 to-clear-bl3 min-h-[30em]">
          
          <div className="absolute top-0 left-0 flex items-center content-center w-full h-full overflow-hidden select-none rounded-xl">
            
              <img src="/treeillustration.png" alt="palm" className="object-cover opacity-25 -z-10"/> 
          </div>
          <div className="absolute top-5 left-5">
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
                    It all starts with an idea. With quantity comes quality.
                    This is the time to set judgement to the side, and put on
                    your creativity hat.
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
          <div className="flex flex-col items-center justify-center gap-3 p-3 problem-page fade-effect-quick !m-0">
            <h1 className="text-3xl text-t-bd dark:text-blues-100">Solutions</h1>
            {/* <div className="!bg-white normal-box-soft !opacity-100">
              <h3 className="heading">The s</h3>
            </div> */}
            <div className="bg-white/60 rounded-xl">
              {/* <Image
        alt="Next.js logo"
        src="/palmnobgoptimized.png"
        width={2802}
        height={1487}
        priority={true}
      /> */}
        {/* <SolutionWizard /> */}

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
                {/* <h4>Tools:</h4> */}
                <Link href="/solutions/finder">
                  <a>
                  <div className="relative group !w-[25em]">
                <div className="absolute w-full transition duration-1000 rounded-full opacity-90 -inset-1 bg-gradient-to-r from-t-bl via-blues-200 to-blues-50 blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
                <button
                  className="w-[95%] h-[3em] bg-gradient-to-r from-t-bl via-blues-300 to-blues-100  flex items-center justify-between px-5 md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer shadow-clear-bd3 md:hover:shadow-xl m-1 drop-shadow-xl rounded-full text-xl text-white"
                >
            Solution Finder
                  <FaRegLightbulb className="ml-1 text-[24px] text-blues-500" />
                </button>
              </div>
                
                  </a>
                </Link>

                <Link href="/solutions/improve">
                  <a>
                  <div className="relative group !w-[25em]">
                <div className="absolute w-full transition duration-1000 rounded-full opacity-90 -inset-1 bg-gradient-to-r from-t-bl via-blues-200 to-blues-50 blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
                <button
                  className="w-[95%] h-[3em] bg-gradient-to-r from-t-bl via-t-bl to-t-bpop  flex items-center justify-between px-5 md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer shadow-clear-bd3 md:hover:shadow-xl m-1 drop-shadow-xl rounded-full text-xl text-white"
                >
            Improve Existing Solution
                  <MdOutlineUpgrade className="ml-1 text-[34px] text-blues-600" />
                </button>
              </div>
                  </a>
                </Link>

                {/* <Link href="/solutions/ai">
                  <a>
                    <div className="solution-button">
                      <FaPastafarianism className="text-3xl" />
                      <p>AI Tool</p>
                    </div>
                  </a>
                </Link> */}
              </div>
            </div>

            {/* <div className="flex items-center justify-between w-full">
              <button
                className=" save_button card__btn_prev left-[5%]  flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect-quick !w-[10em]"
                onClick={() => router.push("/problem/progress")}
              >
                <FaLongArrowAltLeft className="mr-1 text-[24px]" />
                Back to Problem
              </button>
              <div className="relative group">
                <div className="absolute transition duration-1000 rounded-full opacity-0 -inset-1 bg-gradient-to-r from-t-pl via-t-bl to-t-bpop blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
                <button
                  className="w-[5em] h-[3em] card__btn_next right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer shadow-clear-bd3 md:hover:shadow-xl m-1 drop-shadow-xl "
                  onClick={() => props.goToStep(2)}
                >
                  Next
                  <FaLongArrowAltRight className="ml-1 text-[24px]" />
                </button>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SIdeate;
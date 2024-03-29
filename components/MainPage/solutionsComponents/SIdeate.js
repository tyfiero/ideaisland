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
  FaQuestion,
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
        className="flex items-center justify-center  md:px-4 pt-[1rem] sm:px-6 lg:px-8 drop-shadow-xl fade-effect-quick sm:min-w-[20em] md:min-w-[50em] scale-95

  "
      >
        <div className="w-full max-w-[62rem] p-10 space-y-8  normal-box-soft relative !bg-gradient-to-b from-clear-pl3 dark:from-clear-pd2 dark:to-clear-bd4 to-clear-bl3 min-h-[30em]">
          <div className="absolute top-0 left-0 flex items-center content-center w-full h-full overflow-hidden select-none rounded-xl">
            <img
              src="/treeillustration.png"
              alt="palm"
              className="object-cover opacity-25 -z-10 sm:scale-125"
            />
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
            <h1 className="text-3xl text-t-bd dark:text-blues-100">
              Solutions
            </h1>
            
            <div className="bg-white/60 rounded-xl">
        
            </div>
            <div className="flex gap-5">
        
              <div className="flex flex-col items-center gap-5">
                <Link href="/solutions/finder">
                  <a>
                    <div className="relative group md:!w-[25em] sm:!w-[18em]">
                      <div className="absolute w-full transition duration-1000 rounded-full opacity-90 -inset-1 bg-gradient-to-r from-t-bl via-blues-200 to-blues-50 blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
                      <button className="w-[95%] h-[3em] bg-gradient-to-r from-t-bl via-blues-300 to-blues-100  flex items-center justify-between px-5 md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer shadow-clear-bd3 md:hover:shadow-xl m-1 drop-shadow-xl rounded-full text-xl text-white">
                        Solution Finder
                        <FaRegLightbulb className="ml-1 text-[24px] text-blues-500" />
                      </button>
                    </div>
                  </a>
                </Link>
                <Link href="/solutions/cards">
                  <a>
                    <div className="relative group md:!w-[25em] sm:!w-[18em]">
                      <div className="absolute w-full transition duration-1000 rounded-full opacity-50 -inset-1 bg-gradient-to-r from-blues-100 via-t-bl to-t-bd blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
                      <button className="w-[95%] h-[3em] bg-gradient-to-r from-t-bl via-t-bl to-t-bd  flex items-center justify-between px-5 md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer shadow-clear-bd3 md:hover:shadow-xl m-1 drop-shadow-xl rounded-full text-xl text-white">
                        Question Cards
                        <FaQuestion className="ml-1 text-[24px] text-blues-200" />
                      </button>
                    </div>
                  </a>
                </Link>
               
              </div>
            </div>

         
          </div>
        </div>
      </div>
    </div>
  );
}

export default SIdeate;

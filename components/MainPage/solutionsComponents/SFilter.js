import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  FaLaptopCode,
  FaShoppingBag,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaCheck,
  FaInfoCircle,
} from "react-icons/fa";
import { ArrowContainer, Popover } from "react-tiny-popover";
import SFilterIdeas from "./SFilterIdeas";
import { useSelector, useDispatch } from "react-redux";

function SFilter(props) {
  const sFormRedux = useSelector((state) => state.sForm);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [button1, setButton1] = useState(false);
  const [button2, setButton2] = useState(false);
  const router = useRouter();

  return (
    <div>
      <div
        className="flex items-center justify-center  px-4 pt-[1rem] sm:px-6 lg:px-8 drop-shadow-xl fade-effect-quick md:min-w-[50em]

  "
      >
        <div className="w-full max-w-[72rem] md:p-10 sm:py-10 sm:px-1  normal-box-soft relative">
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
              positions={["bottom", "right"]}
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
                    You can&apos;t bring all of your ideas to market. Selecting
                    the most promising idea is a difficult, but important step.
                    By choosing one, you can explore that idea further and run
                    it through the idea evolution process to see if this idea is
                    worth pursuing. If so, Great!! You have your idea and a
                    plan. If not, thats ok! Evolve another idea and repeat the
                    process.
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
          <div className="flex flex-col items-center justify-center w-full fade-effect-quick">
            <h1 className=" text-3xl text-t-bd dark:text-blues-100  !m-0">
              {props.mode === "features"
                ? "Select an Idea to add Features to"
                : "Select an Idea to add a Tech Stack to"}
            </h1>
            <div className="normal-box-soft !p-2">
              <p className="m-0">
                You can always come back to select another idea.{" "}
              </p>
            </div>

            <div className="flex gap-5">
              
            </div>

            <div className="flex flex-col w-full">
              <SFilterIdeas />
            </div>
            <div className="flex items-center justify-between w-full mt-4">
              <button
                className="card__btn_prev save_button left-[5%]  flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect-quick"
                onClick={() => router.push("/solutions")}
              >
                <FaLongArrowAltLeft className="mr-1 text-[24px]" />
                Back
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SFilter;

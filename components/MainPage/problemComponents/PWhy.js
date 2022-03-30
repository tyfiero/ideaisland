import React, { useState } from "react";

import {
  FaBuilding,
  FaLaptopCode,
  FaQuestion,
  FaShoppingBag,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaCheck,
  FaInfoCircle,
} from "react-icons/fa";

import { Popover, ArrowContainer } from "react-tiny-popover";
import { useSelector, useDispatch } from "react-redux";
import { pFormAction } from "../../../redux/actions";

function PWhy(props) {
  // console.log(props.update)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [button1, setButton1] = useState(false);
  const [button2, setButton2] = useState(false);
  const dispatch = useDispatch();
  const pFormRedux = useSelector((state) => state.pForm);



  const update = (e) => {

    let updated = pFormRedux;
    updated.why = e.target.value;
    dispatch(pFormAction(updated))
    // props.update(e.target.name, e.target.value);
  };
  const updateButton = (e) => {
    let updated = pFormRedux;
    updated.whyOptions = e.target.value;
    dispatch(pFormAction(updated))
    // props.update("whyOptions", e.target.value);
  };

  return (
    <div>
      <div
        className="flex items-center justify-center  px-4 pt-[1rem] sm:px-6 lg:px-8 drop-shadow-xl fade-effect-quick

  "
      >
        <div className="w-full max-w-[42rem] p-10 space-y-8   normal-box-soft">
          <div className="flex flex-col items-center justify-center problem-page fade-effect-quick">
          <div className="absolute top-5 right-5">
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
                      className="!opacity-100 bg-white w-[25em] rounded-xl p-5"
                      onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                    >
                      Starting with why helps keep the end in mind. It helps
                      frame the entire reason you embark on the innovation
                      journey. <br /> Check out Simon Sinek&apos;s
                      <a
                        className="underline text-blues-300"
                        href="https://www.youtube.com/watch?v=u4ZoJKF_VuA&ab_channel=TEDxTalks"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {" "}
                        TED talk
                      </a>{" "}
                      for more on the importance of starting with why.
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
            <h1 className="heading-top">Why?</h1>
            <div className="normal-box-soft">
              <h3 className="heading">
                Why are you building something? Why are you innovating?
              </h3>
            </div>

            <div className="flex gap-5">
              <button
                className={"w-[12em] h-[4em] rounded-3xl  flex items-center justify-center text-black gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " + (button1 ? " border-4 border-t-bl bg-blues-200" : "bg-blues-100")}
                onClick={(e)=>{setButton1(!button1)
                  updateButton(e)}}
                value="Start a Business"
              >
                <FaBuilding />
                Start a Business
                {button1 ?   <span className="absolute flex items-center justify-center w-6 h-6 leading-none text-center text-black rounded-full -top-2 -left-2 bg-t-bpop"><FaCheck/></span> : null}
              </button>
              <button
              className={"w-[12em] h-[4em] rounded-3xl  flex items-center justify-center text-black gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " + (button2 ? " border-4 border-t-bl bg-blues-200" : "bg-blues-100")}
              onClick={(e)=>{setButton2(!button2)
                updateButton(e)}}
                value="Solve a problem I have"
              >
                <FaQuestion /> Solve a problem I have  {button2 ?   <span className="absolute flex items-center justify-center w-6 h-6 leading-none text-center text-black rounded-full -top-2 -left-2 bg-t-bpop"><FaCheck/></span> : null}
              </button>
            </div>

            <div className="flex flex-col">
              <p>
                Tell the purpose you are looking to fulfill, think big picture,
                small picture, whatever your picture.
              </p>
              <textarea
                // type="text"
                className="textarea-box h-[10em] whitespace-normal"
                // name="why"
                placeholder="Enter your why..."
                onChange={update}
              />
              <p>
                *This note will be saved to your Idea Page for your review
                later.
              </p>

              
            </div>
            <div className="flex items-center justify-end w-full">
             
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

export default PWhy;

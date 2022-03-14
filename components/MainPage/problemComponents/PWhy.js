import React, { useState } from "react";

import {
  FaBuilding,
  FaLaptopCode,
  FaQuestion,
  FaShoppingBag,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaCheck,
} from "react-icons/fa";

import { Popover, ArrowContainer } from "react-tiny-popover";

function PWhy(props) {
  // console.log(props.update)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [button1, setButton1] = useState(false);
  const [button2, setButton2] = useState(false);



  const update = (e) => {
    props.update(e.target.name, e.target.value);
  };
  const updateButton = (e) => {
    props.update("whyOptions", e.target.value);
  };

  return (
    <div>
      <div
        className="flex items-center justify-center  px-4 pt-[1rem] sm:px-6 lg:px-8 drop-shadow-xl fade-effect-quick

  "
      >
        <div className="w-full max-w-[42rem] p-10 space-y-8 shadow rounded-xl bg-blues-100 drop-shadow-xl container-style normal-box-soft">
          <div className="flex flex-col items-center justify-center problem-page fade-effect-quick">
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
                name="why"
                placeholder="Enter your why..."
                onChange={update}
              />
              <p>
                *This note will be saved to your Idea Page for your review
                later.
              </p>

              <Popover
                isOpen={isPopoverOpen}
                padding={2} // adjust padding here!
                onClickOutside={() => setIsPopoverOpen(false)}
                positions={["bottom", "left", "right"]} // preferred positions by priority
                content={({ position, childRect, popoverRect }) => (
                  <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
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
                      Starting with why helps keep the end in mind. It helps
                      frame the entire reason you embark on the innovation
                      journey. <br /> Check out Simon Sinek's{" "}
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
                <p
                  onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                  className="underline cursor-pointer text-blues-100 md:hover:scale-110"
                >
                  Why this question?
                </p>
              </Popover>
            </div>
            <div className="flex items-center justify-end w-full">
              <button
                className="card__btn save_button left-[5%]  items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect-quick !hidden float-right"
                onClick={() => props.goToStep(2)}
              >
                <FaLongArrowAltLeft className="mr-1 text-[24px]" />
                Back
              </button>
              <button
                className="card__btn_next save_button right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect"
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
  );
}

export default PWhy;

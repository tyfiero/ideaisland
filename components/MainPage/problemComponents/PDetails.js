import React, { useState } from "react";

import { Popover, ArrowContainer } from "react-tiny-popover";

import {
  FaLaptopCode,
  FaShoppingBag,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaInfoCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";
function PDetails(props) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [titleContent, setTitleContent] = useState("");

  const update = (e) => {
    props.update(e.target.name, e.target.value);
  };

  return (
    <div>
      <div
        className="flex items-center justify-center  px-4 pt-[1rem] sm:px-6 lg:px-8 drop-shadow-xl fade-effect-quick

  "
      >
        <div className="w-full max-w-[42rem] p-10 space-y-8 shadow rounded-xl bg-blues-100 drop-shadow-xl container-style normal-box-soft">
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
              positions={["bottom", "left", "right"]} // preferred positions by priority
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
                    className="!opacity-100 bg-white w-[25em] rounded-xl p-3"
                    onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                  >
                    Finding the root cause of your problem helps to clarify what you're actually trying to solve. 
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
            <h1 className="heading-top">Problem</h1>
            <div className="normal-box-soft">
              <h3 className="heading">
                Time to find your problem
              </h3>
            </div>

            {/* <div className='flex gap-5'>
        <button className='w-[12em] h-[4em] rounded-3xl  flex items-center justify-center text-white gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer bg-t-bl' onClick={() => props.goToStep(3)}><FaLaptopCode />Software Product</button>
        <button className='w-[12em] h-[4em] rounded-3xl  flex items-center justify-center text-white gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer bg-t-pm' onClick={() => props.goToStep(3)}><FaShoppingBag /> Physical Product</button>
        </div> */}

            <div className="flex flex-col">
              <div className="flex">
                {" "}
                <p>Give your problem/challenge/mission a name!</p>
                <p className="text-t-pm">*</p>
              </div>

              <input
                type="text"
                required
                className="textarea-box h-[3em]"
                name="title"
                placeholder="Title"
                onChange={(e) => {
                  setTitleContent(e.target.value);
                  update(e);
                }}
              />
              {/* <p>Your problem so far:</p>
              <div className="flex flex-wrap w-[25em] flex-col items-center">
                <div className="flex flex-col normal-box">
                  <h4>Why:</h4>
                  <p>{props.form?.whyOptions}</p>
                  <p>{props.form?.why}</p>

                </div>
                <div className="flex flex-col normal-box">
                  <h4>What:</h4>
                  <p>{props.form?.productType}</p>
                  <p>{props.form?.what}</p>

                </div>
                <div className="flex flex-col normal-box">
                  <h4>Who:</h4>
                  <p>{props.form?.who}</p>

                </div>
              </div> */}
              <p>What problem are you trying to solve? What frustrates or annoys your users?</p>

              <textarea
                // type="text"
                className="textarea-box h-[5em] whitespace-normal"
                name="details"
                placeholder="..."
                onChange={update}
              />
              <p>Explain why this frustration/annoyance occurs? This is a potential cause</p>

<textarea
  // type="text"
  className="textarea-box h-[5em] whitespace-normal"
  name="details"
  placeholder="..."
  onChange={update}
/>
<p>Why does the potential cause occur? This is your root cause.</p>

              <textarea
                // type="text"
                className="textarea-box h-[5em] whitespace-normal"
                name="details"
                placeholder="..."
                onChange={update}
              />
              <p>
                *This note will be saved to your Idea Page for your review
                later.
              </p>
              
            </div>
            <div className="flex items-center justify-between w-full">
              <button
                className="card__btn save_button left-[5%]  flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect-quick"
                onClick={() => props.goToStep(2)}
              >
                <FaLongArrowAltLeft className="mr-1 text-[24px]" />
                Back
              </button>

              {titleContent ? (
                <button
                  type="submit"
                  className="card__btn_next save_button right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect !w-[15em]"
                  onClick={props.saveProblemForm}
                >
                  Submit and Continue
                  <FaLongArrowAltRight className="ml-1 text-[24px]" />
                </button>
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

export default PDetails;

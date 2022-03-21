import React, { useState } from "react";

import { Popover, ArrowContainer } from "react-tiny-popover";
import { FaInfoCircle, FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { pFormAction } from "../../../redux/actions";
// import { FaLaptopCode, FaShoppingBag } from "react-icons/fa";
function PWho(props) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const dispatch = useDispatch();
  const pFormRedux = useSelector((state) => state.pForm);

  const update = (e) => {

    let updated = pFormRedux;
    updated.who = e.target.value;
    dispatch(pFormAction(updated))
    // props.update(e.target.name, e.target.value);
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
                    Understanding your audience is a key step in buidling a
                      product. It helps to frame your target market and how your
                      end users will use your product.
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
            <h1 className="heading-top">Who?</h1>

            <div className=" normal-box-soft">
              <h3 className="heading">Who is your audience?</h3>
              <p className="px-5">
                Think of your target demographic, more specific the better
              </p>
            </div>

            <div className="flex flex-col">
              <p>Answer:</p>
              <textarea
                // type="text"
                className="textarea-box h-[10em] whitespace-normal"
                placeholder="Who is your audience?"
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
              <button
                className="card__btn_next save_button right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect"
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
  );
}

export default PWho;

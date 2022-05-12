import React from "react";
/* eslint react/prop-types: 0 */
// import styles from './nav.less';
import {
  FaUsers,
  FaLaptopCode,
  FaGlobeAmericas,
  FaEllipsisH,
  FaLightbulb,
  FaFunnelDollar,
  FaFilter,
  FaListOl,
  FaLayerGroup,
  FaStar,
} from "react-icons/fa";
import { CgFileDocument } from "react-icons/cg";
// import { GrSelect } from "react-icons/gr";

const SolutionProgressStepper = (props) => {
  return (
    <div className="md:absolute sm:w-full md:w-16 sm:mt-2 md:mt-[2em] md:right-10 normal-box-soft z-50 select-none sm:mx-1 pt-2 sm:scale-95">
      <div className={"md:mb-2 flex md:flex-col sm:flex-row  items-center sm:justify-evenly "}>
        {/* <div className="flex flex-col items-center">
          <div
            className={
              "flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer  md:hover:scale-110 " +
              (props.currentStep === 1 ? "bg-t-pl" : "bg-blues-100")
            }
            onClick={() => props.goToStep(1)}
          >
            <FaLightbulb className="text-xl" />
          </div>

          <div>Ideate</div>
        </div>

        <div
          className={
            "w-2 h-8 my-2 rounded-full  " +
            (props.currentStep >= 2 ? "bg-t-bl" : "bg-slate-400")
          }
        ></div> */}

        <div className="flex flex-col items-center">
          <div
            className={
              "flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer  md:hover:scale-110 " +
              (props.currentStep === 1 ? "bg-t-pl" : "bg-blues-100")
            }
            onClick={() => props.goToStep(1)}
          >
            <FaLightbulb className="text-xl" />
          </div>
          <div className="text-sm">Select Idea</div>
        </div>

        <div
          className={
            "md:w-2 md:h-8 sm:h-2 sm:w-5 my-2 rounded-full  " +
            (props.currentStep >= 2 ? "bg-t-bl" : "bg-slate-400")
          }
        ></div>

        <div className="flex flex-col items-center">
          <div
            className={
              "flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer  md:hover:scale-110 " +
              (props.currentStep === 2 ? "bg-t-pl" : "bg-blues-100")
            }
            onClick={() => props.goToStep(2)}
          >
            <FaStar className="text-xl" />
          </div>
          <div className="text-sm">Add Features</div>
        </div>

        <div
          className={
            "md:w-2 md:h-8 sm:h-2 sm:w-5 my-2 rounded-full  " +
            (props.currentStep >= 3 ? "bg-t-bl" : "bg-slate-400")
          }
        ></div>

        <div className="flex flex-col items-center">
          <div
            className={
              "flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer  md:hover:scale-110 " +
              (props.currentStep === 3 ? "bg-t-pl" : "bg-blues-100")
            }
            onClick={() => props.goToStep(3)}
          >
            <FaListOl className="text-xl" />
          </div>
          <div className="text-sm">Rank Features</div>
        </div>

        <div
          className={
            "md:w-2 md:h-8 sm:h-2 sm:w-5 my-2 rounded-full  " +
            (props.currentStep >= 4 ? "bg-t-bl" : "bg-slate-400")
          }
        ></div>

        <div className="flex flex-col items-center">
          <div
            className={
              "flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer  md:hover:scale-110 " +
              (props.currentStep === 4 ? "bg-t-pl" : "bg-blues-100")
            }
            onClick={() => props.goToStep(4)}
          >
            <FaLayerGroup className="text-xl" />
          </div>
          <div className="text-sm">Tech Stack</div>
        </div>
        <div
          className={
            "md:w-2 md:h-8 sm:h-2 sm:w-5 my-2 rounded-full  " +
            (props.currentStep >= 5 ? "bg-t-bl" : "bg-slate-400")
          }
        ></div>
        <div className="flex flex-col items-center">

        <div
          className={
            "flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer  md:hover:scale-110 " +
            (props.currentStep === 5 ? "bg-t-pl" : "bg-blues-100")
          }
          onClick={() => props.goToStep(5)}
        >
          <CgFileDocument className="text-xl" />
        </div>
        <div className="text-sm">Review</div>
      </div>
      </div>
    </div>
  );
};

export default SolutionProgressStepper;

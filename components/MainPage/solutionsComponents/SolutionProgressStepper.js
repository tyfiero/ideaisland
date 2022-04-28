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

const SolutionProgressStepper = (props) => {
  return (
    <div className="absolute w-16 mt-[2em] right-10 normal-box-soft z-50 select-none">
      <div className={"mb-2 flex flex-col   items-center "}>
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

          <div>Ideate</div>
        </div>

        <div
          className={
            "w-2 h-8 my-2 rounded-full  " +
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
            <FaFilter className="text-xl" />
          </div>
          <div>Filter</div>
        </div>

        <div
          className={
            "w-2 h-8 my-2 rounded-full  " +
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
            <FaStar className="text-xl" />
          </div>
          <div className="text-sm">Add Features</div>
        </div>

        <div
          className={
            "w-2 h-8 my-2 rounded-full  " +
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
            <FaListOl className="text-xl" />
          </div>
          <div className="text-sm">Rank Features</div>
        </div>

        <div
          className={
            "w-2 h-8 my-2 rounded-full  " +
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
            <FaLayerGroup className="text-xl" />
          </div>
          <div className="text-sm">Tech Stack</div>
        </div>
        <div
          className={
            "w-2 h-8 my-2 rounded-full  " +
            (props.currentStep >= 6 ? "bg-t-bl" : "bg-slate-400")
          }
        ></div>

        <div
          className={
            "flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer  md:hover:scale-110 " +
            (props.currentStep === 6 ? "bg-t-pl" : "bg-blues-100")
          }
          onClick={() => props.goToStep(6)}
        >
          <FaEllipsisH className="text-xl" />
        </div>
        <div>Details</div>
      </div>
    </div>
  );
};

export default SolutionProgressStepper;

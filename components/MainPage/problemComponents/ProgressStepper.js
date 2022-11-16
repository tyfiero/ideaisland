import React from "react";
/* eslint react/prop-types: 0 */
import {
  FaUsers,
  FaLaptopCode,
  FaGlobeAmericas,
  FaEllipsisH,
  FaFolderOpen,
} from "react-icons/fa";

const ProgressStepper = (props) => {
  return (
    <div className="md:absolute sm:w-full scale-[97%] md:w-16 sm:mt-2 md:mt-[2em] md:right-10 normal-box-soft z-50 select-none sm:mx-1 pt-2">
      <div
        className={
          "md:mb-2 flex md:flex-col sm:flex-row  items-center sm:justify-evenly "
        }
      >
   <div className="flex flex-col items-center">

          <div
            className={
              "flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer  md:hover:scale-110 " +
              (props.currentStep === 1 ? "bg-t-pl text-t-pd" : "bg-blues-100 text-t-bd")
            }
            onClick={() => props.goToStep(1)}
          >
            <FaFolderOpen className="ml-[2px] text-xl" />
          </div>

          <div  className="text-slate-800 dark:text-slate-100">Load</div>
        </div>

        <div
          className={
            "md:w-2 md:h-16 sm:h-2 sm:w-8 my-2 rounded-full transition duration-1000 " +
            (props.currentStep >= 2 ? "bg-t-bl" : "bg-slate-400")
          }
        ></div>
 <div className="flex flex-col items-center">

          <div
            className={
              "flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer  md:hover:scale-110 " +
              (props.currentStep === 2 ?  "bg-t-pl text-t-pd" : "bg-blues-100 text-t-bd")
            }
            onClick={() => props.goToStep(2)}
          >
            <FaGlobeAmericas className="text-xl" />
          </div>

          <div  className="text-slate-800 dark:text-slate-100">Why</div>
        </div>
        <div
          className={
            "md:w-2 md:h-16 sm:h-2 sm:w-8 my-2 rounded-full  transition duration-1000 " +
            (props.currentStep >= 3 ? "bg-t-bl" : "bg-slate-400")
          }
        ></div>
      <div className="flex flex-col items-center">

          <div
            className={
              "flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer  md:hover:scale-110 " +
              (props.currentStep === 3 ?  "bg-t-pl text-t-pd" : "bg-blues-100 text-t-bd")
            }
            onClick={() => props.goToStep(3)}
          >
            <FaLaptopCode className="text-xl" />
          </div>
          <div  className="text-slate-800 dark:text-slate-100">What</div>
        </div>

        <div
          className={
            "md:w-2 md:h-16 sm:h-2 sm:w-8 my-2 rounded-full  transition duration-1000 " +
            (props.currentStep >= 4 ? "bg-t-bl" : "bg-slate-400")
          }
        ></div>
 <div className="flex flex-col items-center">

          <div
            className={
              "flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer  md:hover:scale-110 " +
              (props.currentStep === 4 ?  "bg-t-pl text-t-pd" : "bg-blues-100 text-t-bd")
            }
            onClick={() => props.goToStep(4)}
          >
            <FaUsers className="text-xl" />
          </div>
          <div  className="text-slate-800 dark:text-slate-100">Who</div>
        </div>

        <div
          className={
            "md:w-2 md:h-16 sm:h-2 sm:w-8 my-2 rounded-full  transition duration-1000 " +
            (props.currentStep >= 5 ? "bg-t-bl" : "bg-slate-400")
          }
        ></div>
 <div className="flex flex-col items-center">
        <div
          className={
            "flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer  md:hover:scale-110 " +
            (props.currentStep === 5 ?  "bg-t-pl text-t-pd" : "bg-blues-100 text-t-bd")
          }
          onClick={() => props.goToStep(5)}
        >
          <FaEllipsisH className="text-xl" />
        </div>
        <div className="text-slate-800 dark:text-slate-100">Details</div>
      </div>
      </div>
    </div>
  );
};

export default ProgressStepper;

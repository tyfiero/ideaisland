import React from 'react';
/* eslint react/prop-types: 0 */
// import styles from './nav.less';
import { FaUsers, FaLaptopCode, FaGlobeAmericas, FaEllipsisH, FaFolderOpen } from "react-icons/fa";

const ProgressStepper = (props) => {

  

    
    return (
        <div className='absolute w-16 mt-[5em] right-10 normal-box-soft z-50 select-none fade-effect-quick'>
        <div className={"mb-2 flex flex-col   items-center "}>
     
        <div >

        <div className={"flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer  md:hover:scale-110 " + (props.currentStep === 1 ? "bg-t-pl" : "bg-blues-100")} onClick={() => props.goToStep(1)}><FaFolderOpen className="ml-[2px] text-xl"/></div>

        <div>Load</div>

        </div>

        <div className={"w-2 h-16 my-2 rounded-full  "  + (props.currentStep >= 2 ? "bg-t-bl" : "bg-slate-400")}></div>
        <div >
            
        <div className={"flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer  md:hover:scale-110 " + (props.currentStep === 2 ? "bg-t-pl" : "bg-blues-100")} onClick={() => props.goToStep(2)}><FaGlobeAmericas className="text-xl"/></div>

<div>Why</div>

</div>
        <div className={"w-2 h-16 my-2 rounded-full  "  + (props.currentStep >= 3 ? "bg-t-bl" : "bg-slate-400")}></div>
        <div >

        <div className={"flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer  md:hover:scale-110 " + (props.currentStep === 3 ? "bg-t-pl" : "bg-blues-100")} onClick={() => props.goToStep(3)}><FaLaptopCode className="text-xl"/></div>
        <div>What</div>

</div>

<div className={"w-2 h-16 my-2 rounded-full  "  + (props.currentStep >= 4 ? "bg-t-bl" : "bg-slate-400")}></div>
        <div >

        <div className={"flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer  md:hover:scale-110 " + (props.currentStep === 4 ? "bg-t-pl" : "bg-blues-100")}  onClick={() => props.goToStep(4)}><FaUsers className="text-xl"/></div>
        <div>Who</div>

        </div>

        <div className={"w-2 h-16 my-2 rounded-full  "  + (props.currentStep >= 5 ? "bg-t-bl" : "bg-slate-400")}></div>
        
        
        <div className={"flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer  md:hover:scale-110 " + (props.currentStep === 5 ? "bg-t-pl" : "bg-blues-100")}  onClick={() => props.goToStep(5)}><FaEllipsisH className="text-xl"/></div>
        <div>Details</div>

        </div>
        </div>
    );
};

export default ProgressStepper;
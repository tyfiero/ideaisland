import React from 'react';
/* eslint react/prop-types: 0 */
// import styles from './nav.less';
import { FaUsers, FaLaptopCode, FaGlobeAmericas, FaEllipsisH } from "react-icons/fa";

const ProgressStepper = (props) => {
    // const dots = [];
    // for (let i = 1; i <= props.totalSteps; i += 1) {
    //     const isActive = props.currentStep === i;
    //     dots.push((
    //         <span
    //             key={`step-${i}`}
    //             className={`dot ${isActive ? " active" : ''}`}
    //             onClick={() => props.goToStep(i)}
    //         >&bull; {props.hashKey}</span>
    //     ));
    // }

  

    
    return (
        <div className='absolute w-16 mt-[5em] right-10 normal-box-soft z-50'>
        <div className={"mb-2 flex flex-col   items-center "}>
     
        <div >

        <div className={"flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer  md:hover:scale-110 " + (props.currentStep === 1 ? "bg-t-pl" : "bg-blues-100")} onClick={() => props.goToStep(1)}><FaGlobeAmericas className="text-xl"/></div>

        <div>Why</div>

        </div>

        <div className={"w-2 h-16 my-2 rounded-full  "  + (props.currentStep >= 2 ? "bg-t-bl" : "bg-slate-400")}></div>
        <div >

        <div className={"flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer  md:hover:scale-110 " + (props.currentStep === 2 ? "bg-t-pl" : "bg-blues-100")} onClick={() => props.goToStep(2)}><FaLaptopCode className="text-xl"/></div>
        <div>What</div>

</div>

<div className={"w-2 h-16 my-2 rounded-full  "  + (props.currentStep >= 3 ? "bg-t-bl" : "bg-slate-400")}></div>
        <div >

        <div className={"flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer  md:hover:scale-110 " + (props.currentStep === 3 ? "bg-t-pl" : "bg-blues-100")}  onClick={() => props.goToStep(3)}><FaUsers className="text-xl"/></div>
        <div>Who</div>

        </div>

        <div className={"w-2 h-16 my-2 rounded-full  "  + (props.currentStep >= 4 ? "bg-t-bl" : "bg-slate-400")}></div>
        
        
        <div className={"flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer  md:hover:scale-110 " + (props.currentStep === 4 ? "bg-t-pl" : "bg-blues-100")}  onClick={() => props.goToStep(4)}><FaEllipsisH className="text-xl"/></div>
        <div>Details</div>

        </div>
        </div>
    );
};

export default ProgressStepper;
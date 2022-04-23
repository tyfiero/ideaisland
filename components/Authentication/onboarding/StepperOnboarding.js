import React from 'react';
/* eslint react/prop-types: 0 */
// import styles from './nav.less';
import { FaUsers, FaLaptopCode, FaGlobeAmericas, FaEllipsisH, FaFolderOpen } from "react-icons/fa";

const StepperOnboarding = (props) => {

  

    
    return (
        <div className=' w-[24em]  mt-[3em] normal-box-soft z-50 select-none fade-effect-quick scale-75'>
        <div className={"my-2 mx-2 flex    items-center "}>
     
        <div >

        <div className={"flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer  md:hover:scale-110 " + (props.currentStep >= 1 ? "bg-t-bd" : "bg-blues-200")} onClick={() => props.goToStep(1)}></div>


        </div>

        <div className={"h-2 w-16 mx-2 rounded-full  "  + (props.currentStep >= 2 ? "bg-t-bl" : "bg-slate-400")}></div>
        <div >
            
        <div className={"flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer  md:hover:scale-110 " + (props.currentStep >= 2 ? "bg-t-bd" : "bg-blues-200")} onClick={() => props.goToStep(2)}></div>


</div>
        <div className={"h-2 w-16 mx-2 rounded-full  "  + (props.currentStep >= 3 ? "bg-t-bl" : "bg-slate-400")}></div>
        <div >

        <div className={"flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer  md:hover:scale-110 " + (props.currentStep >= 3 ? "bg-t-bd" : "bg-blues-200")} onClick={() => props.goToStep(3)}></div>

</div>

<div className={"h-2 w-16 mx-2 rounded-full  "  + (props.currentStep >= 4 ? "bg-t-bl" : "bg-slate-400")}></div>
        <div >

        <div className={"flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer  md:hover:scale-110 " + (props.currentStep >= 4 ? "bg-t-bd" : "bg-blues-200")}  onClick={() => props.goToStep(4)}></div>

        </div>

        {/* <div className={"h-2 w-16 mx-2 rounded-full  "  + (props.currentStep >= 5 ? "bg-t-bl" : "bg-slate-400")}></div>
        
        
        <div className={"flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer  md:hover:scale-110 " + (props.currentStep === 5 ? "bg-t-bd" : "bg-blues-200")}  onClick={() => props.goToStep(5)}></div> */}

        </div>
        </div>
    );
};

export default StepperOnboarding;
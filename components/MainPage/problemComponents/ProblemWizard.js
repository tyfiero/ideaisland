import React from "react";
import StepWizard from "react-step-wizard";
import { useState } from "react";
import PWhat from "./PWhat";
import PWho from "./PWho";
import PWhy from "./PWhy";
import PDetails from "./PDetails";
import ToolBar from "./ToolBar";
import ProgressStepper from "./ProgressStepper";

import { firestore, auth } from "../../../lib/firebase";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../lib/context";
import toast from "react-hot-toast";
import {
  FaShareSquare,
  FaChevronLeft,
  FaChevronRight,
  FaRedo,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import PStartMenu from "./PStartMenu";

function ProblemWizard(props) {
  const { username } = useContext(UserContext);
  const pFormRedux = useSelector((state) => state.pForm);
  const dispatch = useDispatch();
  const [changes, setChanges] = useState(false);
  const [reset, setReset] = useState(false);
  const [loadData, setLoadData] = useState(false);




  // Do something on step change
  // const onStepChange = (stats) => {
  //   // console.log(stats);
  // };
  
  // const setInstance = (SW) =>
  //   setFormContent({
  //     ...formContent,
  //     SW,
  //   });

  // const { SW } = formContent;
  return (
    <div>
      <ToolBar  />
      {/* <InstanceDemo SW={SW} /> */}
      <StepWizard
        // onStepChange={onStepChange}
        isHashEnabled
        isLazyMount={true} 
        //  transitions={state.transitions} // comment out for default transitions
        nav={<ProgressStepper />}
        // instance={setInstance}
      >
        <PStartMenu hashKey={"Start"} setChanges={setChanges} reset={reset} setReset={setReset}  loadData={loadData} setLoadData={setLoadData}/>
        <PWhy hashKey={"Why"} setChanges={setChanges} reset={reset} loadData={loadData}/>
        <PWhat hashKey={"What"}  setChanges={setChanges} reset={reset} loadData={loadData}/>
        <PWho hashKey={"Who"} setChanges={setChanges} reset={reset} loadData={loadData}/>
        <PDetails
          hashKey={"Details"}
          
          setChanges={setChanges}
          changes={changes}
          reset={reset}
          loadData={loadData}
        />
      </StepWizard>
    </div>
  );
}

export default ProblemWizard;

/** Demo of using instance */
const InstanceDemo = ({ SW }) => (
  <>
    <div className="z-50 flex float-right gap-5 py-1 pl-3 pr-5 text-xl border-b-2 border-l-2 rounded-bl-md hover:scale-150">
      <FaRedo className="cursor-pointer text-t-bd md:hover:scale-110" onClick={() => SW.goToStep(1)}/>
      <FaChevronLeft className="cursor-pointer text-t-pm md:hover:scale-110" />
      <FaChevronRight className="cursor-pointer text-t-bl md:hover:scale-110" />
      <FaShareSquare className="cursor-pointer text-t-bd md:hover:scale-110" />
    </div>
  </>
);

// const Stats = ({
//   currentStep,
//   firstStep,
//   goToStep,
//   lastStep,
//   nextStep,
//   previousStep,
//   totalSteps,
//   step,
// }) => (
//   <div>
//     <hr />
//     {step > 1 && (
//       <button className="btn btn-default btn-block" onClick={previousStep}>
//         Go Back
//       </button>
//     )}
//     {step < totalSteps ? (
//       <button className="btn btn-primary btn-block" onClick={nextStep}>
//         Continue
//       </button>
//     ) : (
//       <button className="btn btn-success btn-block" onClick={nextStep}>
//         Finish
//       </button>
//     )}
//     <hr />
//     <div style={{ fontSize: "21px", fontWeight: "200" }}>
//       <h4>Other Functions</h4>
//       <div>Current Step: {currentStep}</div>
//       <div>Total Steps: {totalSteps}</div>
//       <button className="btn btn-block btn-default" onClick={firstStep}>
//         First Step
//       </button>
//       <button className="btn btn-block btn-default" onClick={lastStep}>
//         Last Step
//       </button>
//       <button className="btn btn-block btn-default" onClick={() => goToStep(2)}>
//         Go to Step 2
//       </button>
//     </div>
//   </div>
// );

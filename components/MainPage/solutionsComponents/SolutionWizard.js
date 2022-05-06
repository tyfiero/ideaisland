import StepWizard from "react-step-wizard";
import loadable from "@loadable/component";

import SolutionProgressStepper from "./SolutionProgressStepper";
import {
  serverTimestamp,
  query,
  where,
  collection,
  orderBy,
  doc,
  getFirestore,
  updateDoc,
  addDoc,
  onSnapshot,
  deleteDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { firestore, auth } from "../../../lib/firebase";
import { useContext, useState, useEffect, React } from "react";
import { UserContext } from "../../../lib/context";
import toast from "react-hot-toast";
import {
  FaShareSquare,
  FaChevronLeft,
  FaChevronRight,
  FaRedo,
} from "react-icons/fa";
import ToolBar from "../problemComponents/ToolBar";

import SIdeate from "./SIdeate";
import { useSelector } from "react-redux";

const SFilter = loadable(() => import("./SFilter"));
const SRankFeatures = loadable(() => import("./SRankFeatures"));
const SFeatures = loadable(() => import("./SFeatures"));
const STechStack = loadable(() => import("./STechStack"));
const SDetails = loadable(() => import("./SDetails"));

function SolutionWizard(props) {
  // const { user, username } = useContext(UserContext);
  const sFormRedux = useSelector((state) => state.sForm);

  // const userUIDRedux = useSelector((state) => state.userUID);
  const [changes, setChanges] = useState(false);
  const [reset, setReset] = useState(false);


  console.log(changes + "  changes")
  // const [formContent, setFormContent] = useState({ form: {} });
  // const updateForm = (key, value) => {
  //   const { form } = formContent;

  //   form[key] = value;
  //   setFormContent({
  //     ...formContent,
  //     form,
  //   });
  //   // console.log(form.details)
  // };

  // Create a new post in firestore

  // Do something on step change
  // const onStepChange = (stats) => {
  //   console.log(stats);
  //   if(sFormRedux.idea === null){
  //     toast.error("Please select an idea before continuing")
  //     // goToStep(1)
  //   }
  // };
  
  // const setInstance = (SW) =>
  //   setFormContent({
  //     ...formContent,
  //     SW,
  //   });

  // const { SW } = formContent;
  return (
    <div className="w-full h-full">
      <ToolBar />
      {/* <InstanceDemo SW={SW} /> */}
      <StepWizard
        // onStepChange={onStepChange}
        isHashEnabled
        isLazyMount={true} // Lazy mount
        initialStep={1}
        //  transitions={state.transitions} // comment out for default transitions
        nav={<SolutionProgressStepper />}
        // instance={setInstance}
      >
        {/* <SIdeate update={updateForm} /> */}
        <SFilter hashKey={"select-idea"} changes={changes} setChanges={setChanges} reset={reset} setReset={setReset}/>
        <SFeatures  hashKey={"add-features"} changes={changes} setChanges={setChanges} reset={reset} setReset={setReset}/>
        <SRankFeatures hashKey={"rank-features"} changes={changes} setChanges={setChanges} reset={reset} setReset={setReset}/>
        <STechStack hashKey={"tech-stack"} changes={changes} setChanges={setChanges} reset={reset} setReset={setReset}/>
        <SDetails hashKey={"Details"} changes={changes} setChanges={setChanges} reset={reset} setReset={setReset}/>
      </StepWizard>
    </div>
  );
}

export default SolutionWizard;

/** Demo of using instance */
const InstanceDemo = ({ SW }) => (
  <>
    <div className="z-40 flex float-right gap-5 py-1 pl-3 pr-5 text-xl border-b-2 border-l-2 rounded-bl-md hover:scale-150">
      <FaRedo
        className="cursor-pointer text-t-bd md:hover:scale-110"
        onClick={() => SW.goToStep(1)}
      />
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

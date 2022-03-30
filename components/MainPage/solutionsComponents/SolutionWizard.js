import React from "react";
import StepWizard from "react-step-wizard";
import { useState } from "react";

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
import { useContext, useEffect } from "react";
import { UserContext } from "../../../lib/context";
import toast from "react-hot-toast";
import {
  FaShareSquare,
  FaChevronLeft,
  FaChevronRight,
  FaRedo,
} from "react-icons/fa";
import ToolBar from "../problemComponents/ToolBar";
import SDetails from "./SDetails";
import SFeatures from "./SFeatures";
import CombinatorialPage from "../../../pages/Solutions/Combinatorial";
import SFilter from "./SFilter";
import SRankFeatures from "./SRankFeatures";
import STechStack from "./STechStack";
import SIdeate from "./CombinatorialComponents/SIdeate";
function SolutionWizard(props) {
  const { username } = useContext(UserContext);

  const [formContent, setFormContent] = useState({ form: {} });
  const updateForm = (key, value) => {
    const { form } = formContent;

    form[key] = value;
    setFormContent({
      ...formContent,
      form,
    });
    // console.log(form.details)
  };

  // console.log(formContent);
  // Create a new post in firestore
  const saveProblemForm = async (e) => {
    e?.preventDefault();
    const uid = auth.currentUser.uid;

    const ref = doc(
      getFirestore(),
      "users",
      uid,
      "solution",
      formContent.form.title
    );

    // Tip: give all fields a default value here
    const data = {
      problemTitle: formContent.form.title,
      uid,
      username,
      productType: formContent.form.productType || null,
      whyOptions: formContent.form.whyOptions || null,
      why: formContent.form.why || null,
      what: formContent.form.what || null,
      who: formContent.form.who || null,
      details: formContent.form.details || null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    // console.log(timeID);

    await setDoc(ref, data)
      // await addDoc(collection(getFirestore(), "users", uid, "ideas"), data)
      .then(() => {
        toast.success("Progress saved!");
        // dispatch(unsavedChangesAction(false));
        // dispatch(editModeAction("display"));
        // // console.log("It Worked!");
        // // console.log(ref.id);
        // dispatch(currentDocAction(data));
      })
      .catch((error) => {
        toast.error("Error occured :( " + error);
        console.log("It failed!" + error);
      });

    // Imperative navigation after doc is set
    // router.push(`/admin/${slug}`);
  };
  // Do something on step change
  const onStepChange = (stats) => {
    // console.log(stats);
  };
  const setInstance = (SW) =>
    setFormContent({
      ...formContent,
      SW,
    });

  const { SW } = formContent;
  return (
    <div className="w-full h-full">
      <ToolBar />
      {/* <InstanceDemo SW={SW} /> */}
      <StepWizard
        onStepChange={onStepChange}
        isHashEnabled
        initialStep={1}
        //  transitions={state.transitions} // comment out for default transitions
        nav={<SolutionProgressStepper />}
        instance={setInstance}
      >
        {/* <ProblemPage /> */}
        <SIdeate hashKey={"ideate"} update={updateForm} />
        <SFilter hashKey={"select-idea"} update={updateForm} cookieUID={props.cookieUID} />
        <SFeatures hashKey={"add-features"} update={updateForm} form={formContent}/>
        <SRankFeatures hashKey={"rank-features"} update={updateForm} form={formContent}/>
        <STechStack hashKey={"tech-stack"} update={updateForm} />
        <SDetails
          hashKey={"Details"}
          update={updateForm}
          saveProblemForm={saveProblemForm}
          cookieUID={props.cookieUID}
        />
      </StepWizard>
    </div>
  );
}

export default SolutionWizard;

/** Demo of using instance */
const InstanceDemo = ({ SW }) => (
  <>
    <div className="flex float-right gap-5 py-1 pl-3 pr-5 text-xl border-b-2 border-l-2 rounded-bl-md z-[100] hover:scale-150">
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

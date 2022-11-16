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
import SToolBar from "./SToolBar";
import TechStackStepper from "./TechStackStepper";

const SFilter = loadable(() => import("./SFilter"));
const SRankFeatures = loadable(() => import("./SRankFeatures"));
const SFeatures = loadable(() => import("./SFeatures"));
const STechStack = loadable(() => import("./STechStack"));
const SDetails = loadable(() => import("./SDetails"));

function TechStackWizard(props) {
  // const { user, username } = useContext(UserContext);
  const sFormRedux = useSelector((state) => state.sForm);

  // const userUIDRedux = useSelector((state) => state.userUID);
  const [changes, setChanges] = useState(false);
  const [reset, setReset] = useState(false);

  // console.log(changes + "  changes");

  const [state, updateState] = useState({
    form: {},
    demo: true, // uncomment to see more
  });

  const updateForm = (key, value) => {
    const { form } = state;

    form[key] = value;
    updateState({
      ...state,
      form,
    });
  };

  const setInstance = (SWC) => {
    updateState({
      ...state,
      SWC,
    });
  };
  const { SWC, demo } = state;
  // console.log(state);
  // console.log(SWC);

  return (
    <div className="w-full h-full">
      <SToolBar SWC={SWC} />
      {/* <InstanceDemo SW={SW} /> */}
      <StepWizard
        // onStepChange={onStepChange}
        isHashEnabled
        isLazyMount={true} // Lazy mount
        initialStep={1}
        //  transitions={state.transitions} // comment out for default transitions
        nav={<TechStackStepper />}
        instance={setInstance}
      >
        {/* <SIdeate update={updateForm} /> */}
        <SFilter
          hashKey={"select-idea"}
          changes={changes}
          mode="tech-stack"
          setChanges={setChanges}
          reset={reset}
          setReset={setReset}
        />
        <STechStack
          hashKey={"tech-stack"}
          changes={changes}
          setChanges={setChanges}
          reset={reset}
          setReset={setReset}
        />
        <SDetails
          hashKey={"Details"}
          mode="tech-stack"
          changes={changes}
          setChanges={setChanges}
          reset={reset}
          setReset={setReset}
        />
      </StepWizard>
    </div>
  );
}

export default TechStackWizard;


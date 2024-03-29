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

  const [state, updateState] = useState({
    form: {},
    // demo: true, // uncomment to see more
  });
  const { SW } = state;


  
  const setInstance = (SW) =>
    updateState({
      ...state,
      SW,
    });

  // const InstanceDemo1 = ({ SW }) => (
  //   <>
  //     <h4>Control from outside component</h4>
  //     <button className={"btn btn-secondary"} onClick={SW.previousStep}>
  //       Previous Step
  //     </button>
  //     &nbsp;
  //     <button className={"btn btn-secondary"} onClick={SW.nextStep}>
  //       Next Step
  //     </button>
  //     &nbsp;
  //     <button
  //       className={"btn btn-secondary"}
  //       onClick={() => SW.goToNamedStep("progress")}
  //     >
  //       Go to progress
  //     </button>
  //   </>
  // );

  return (
    <div>
      <ToolBar SW={SW}/>
      {/* <InstanceDemo SW={SW} /> */}
      <StepWizard
        // onStepChange={onStepChange}
        isHashEnabled
        isLazyMount={true}
        initialStep={1}
        //  transitions={state.transitions} // comment out for default transitions
        nav={<ProgressStepper />}
        instance={setInstance}
      >
        <PStartMenu
          hashKey={"Start"}
          setChanges={setChanges}
          reset={reset}
          setReset={setReset}
          loadData={loadData}
          setLoadData={setLoadData}
        />
        <PWhy
          hashKey={"Why"}
          setChanges={setChanges}
          reset={reset}
          loadData={loadData}
        />
        <PWhat
          hashKey={"What"}
          setChanges={setChanges}
          reset={reset}
          loadData={loadData}
        />
        <PWho
          hashKey={"Who"}
          setChanges={setChanges}
          reset={reset}
          loadData={loadData}
        />
        <PDetails
          hashKey={"Details"}
          setChanges={setChanges}
          changes={changes}
          reset={reset}
          loadData={loadData}
        />
      </StepWizard>

      {/* <InstanceDemo1 SW={SW}/> */}
    </div>
  );
}

export default ProblemWizard;

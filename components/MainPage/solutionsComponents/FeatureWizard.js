import StepWizard from "react-step-wizard";
import loadable from "@loadable/component";
import { useState, React } from "react";
import { useSelector } from "react-redux";
import SToolBar from "./SToolBar";
import FeatureStepper from "./FeatureStepper";

const SFilter = loadable(() => import("./SFilter"));
const SRankFeatures = loadable(() => import("./SRankFeatures"));
const SFeatures = loadable(() => import("./SFeatures"));
const SDetails = loadable(() => import("./SDetails"));

function FeatureWizard(props) {
  const sFormRedux = useSelector((state) => state.sForm);

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
        nav={<FeatureStepper />}
        instance={setInstance}
      >
        {/* <SIdeate update={updateForm} /> */}
        <SFilter
          hashKey={"select-idea"}
          mode={"features"}
          changes={changes}
          setChanges={setChanges}
          reset={reset}
          setReset={setReset}
        />
        <SFeatures
          hashKey={"add-features"}
          changes={changes}
          setChanges={setChanges}
          reset={reset}
          setReset={setReset}
        />
        <SRankFeatures
          hashKey={"rank-features"}
          changes={changes}
          setChanges={setChanges}
          reset={reset}
          setReset={setReset}
        />
        <SDetails
          hashKey={"Details"}
          mode={"features"}
          changes={changes}
          setChanges={setChanges}
          reset={reset}
          setReset={setReset}
        />
      </StepWizard>
      {/* <InstanceDemo1 SWC={SWC}/> */}
    </div>
  );
}

export default FeatureWizard;

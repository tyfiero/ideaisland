import React, { useState, useEffect } from "react";
import Step from "../../components/Devlab/Step";
import StepWizard from "react-step-wizard";
import { ThoughtRoute } from "../../components/Devlab/ThoughtRoutes";
import ThoughtToolBar from "../../components/Devlab/ThoughtToolBar";

function DevLab(props) {
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

  return (
    <>
    <ThoughtToolBar SW={SW} setPlay={props.setPlay}/>
      <StepWizard
        // onStepChange={onStepChange}
        isHashEnabled
        // isLazyMount={true}
        initialStep={1}
        //  transitions={state.transitions} // comment out for default transitions
        // nav={<ProgressStepper />}
        instance={setInstance}
      >
      
        {/* <Step
          hashKey={"Start"}
          setChanges={setChanges}
          reset={reset}
          setReset={setReset}
          loadData={loadData}
          setLoadData={setLoadData}
          heading={"Start"}
          text={"This is the start of the devlab"}
          subtext={"This is the start of the devlab"}
            buttonText={"Back"}
            buttonText2={"Next"}
            popupText={"This is the start of the devlab"}
            placeholder={"This is the start of the devlab"}
        /> */}

{props.routeArray.map((data, index) => (
                            <Step
                            key={index}
                            num={data.num}
                            hashKey={data.urlHash}
                            setChanges={setChanges}
                            reset={reset}
                            setReset={setReset}
                            loadData={loadData}
                            setLoadData={setLoadData}
                            heading={data.title}
                            text={data.text}
                            subtext={data.subtext}
                              buttonText={data.buttonText}
                              buttonText2={data.buttonText2}
                              popupText={data.popupText}
                              placeholder={data.placeholder}
                          />
                          ))}
      </StepWizard>
    </>
  );
}

export default DevLab;

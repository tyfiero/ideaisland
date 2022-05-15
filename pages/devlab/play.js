import React, { useState, useEffect, useRef } from "react";
import Step from "../../components/Devlab/Step";
import StepWizard from "react-step-wizard";
import { ThoughtRoute } from "../../components/Devlab/ThoughtRoutes";
import ThoughtToolBar from "../../components/Devlab/ThoughtToolBar";
import dynamic from "next/dynamic";
import { AiOutlineFullscreen } from "react-icons/ai";
const Earth = dynamic(() => import('../../components/Devlab/Earth'), {

  ssr: false,
})
function DevLab(props) {
  const [changes, setChanges] = useState(false);
  const [reset, setReset] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

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




    /* Get the element you want displayed in fullscreen mode (a video in this example): */
    // const spaceWindow= useRef(null)
  
  /* When the openFullscreen() function is executed, open the video in fullscreen.
  Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */
  // const fullScreen = () =>{
  //   if (spaceWindow.requestFullscreen) {
  //     spaceWindow.requestFullscreen();
  //   } else if (spaceWindow.webkitRequestFullscreen) { /* Safari */
  //   spaceWindow.webkitRequestFullscreen();
  //   } else if (spaceWindow.msRequestFullscreen) { /* IE11 */
  //   spaceWindow.msRequestFullscreen();
  //   }
  // }
  



  return (
    <div className={" w-full h-full" + (fullScreen ? " fixed top-0 left-0 w-full h-full z-[1000]" : " ")}>
<Earth />

    <ThoughtToolBar SW={SW} setPlay={props.setPlay} fullScreen={fullScreen} setFullScreen={setFullScreen}/>
    {/* <AiOutlineFullscreen  onClick={fullScreen} className="scale-50 cursor-pointer text-t-pm md:hover:scale-150"/> */}
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

{props.routeArray?.map((data, index) => (
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
    </div>
  );
}

export default DevLab;

import StepWizard from "react-step-wizard";
import { useState, React } from "react";
import SignupPage from "../SignupPage";
import StepperOnboarding from "./StepperOnboarding";
import UsernameForm from "./UsernameForm"
import Tut1 from "./Tut1";


import Pricing from "./Pricing";
function OnboardingPage() {




    // Do something on step change
  const onStepChange = (stats) => {
    // console.log(stats);
  };
  return (
    <div className="flex flex-col w-full h-full overflow-hidden ">
      {/* <InstanceDemo SW={SW} /> */}
      <StepWizard
        onStepChange={onStepChange}
        isHashEnabled
        className="flex flex-col-reverse items-center justify-center w-full h-full"
        //  transitions={state.transitions} // comment out for default transitions
        nav={<StepperOnboarding />}
        // instance={setInstance}
      >
       
        <SignupPage hashKey={"signup"}
        //  setChanges={setChanges} reset={reset} loadData={loadData}
         />
        <UsernameForm hashKey={"select-username"}/>
        <Pricing hashKey={"select-plan"} onboard={true}/>
        <Tut1 hashKey={"tour"}/>
      </StepWizard>
    </div>
  )
}

export default OnboardingPage;
import React from "react";
import Pricing from "../components/Authentication/onboarding/Pricing";
// const PaddleScript = dynamic(() => import("react-quill"), {
//     ssr: false,
//   });
function PricingPage() {
  

  
  return (
    <div className="mt-36">
       <div className="font-semibold text-center">
            <h1 className="text-5xl">
              <span className="tracking-wide text-t-bd">Premium </span>
              <span className="text-t-bd">Plans</span>
            </h1>
            <p className="w-full px-8 pt-6 text-xl font-normal text-slate-400 md:w-full">
              Choose the plan that works best for you.
            </p>
          </div>
     <Pricing/>
    </div>
  );
}

export default PricingPage;

import Script from "next/script";
import React from "react";
import Pricing from "../components/Authentication/onboarding/Pricing";
// const PaddleScript = dynamic(() => import("react-quill"), {
//     ssr: false,
//   });
function PricingPage() {
  

  
  return (
    <div className="">
        {/* <Script
        src="https://cdn.paddle.com/paddle/paddle.js"
        strategy="beforeInteractive"
        onLoad={(e) => {
          // eslint-disable-next-line
          // Paddle.Environment.set("sandbox");
          // eslint-disable-next-line
          Paddle.Setup({
            vendor: Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID),
            // vendor: 6024,

       
          });
          console.log("Loaded paddle");
        }}
      /> */}
     <Pricing/>
    </div>
  );
}

export default PricingPage;

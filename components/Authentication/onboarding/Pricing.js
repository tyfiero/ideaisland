import { React, useContext, useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Toggle from "react-toggle";
import Script from "next/script";
// import dynamic from "next/dynamic";
import { UserContext } from "../../../lib/context";
// import { auth } from "../../../lib/firebase";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import PaddleLoader from "../PaddleLoader";
// import { doc, getFirestore, updateDoc } from "firebase/firestore";
import WelcomePopUp from "./WelcomePopUp";
// const PaddleScript = dynamic(() => import("react-quill"), {
//     ssr: false,
//   });
function Pricing(props) {
  const [annual, setAnnual] = useState(true);
  const [successPopUp, setSuccessPopUp] = useState(false);
  const [plan, setPlan] = useState("Basic");
  const [credits, setCredits] = useState(100);
  const [cancelSubUrl, setCancelSubUrl] = useState(null);

  const userUIDRedux = useSelector((state) => state.userUID);
  const { username, user, paidPlan } = useContext(UserContext);

  useEffect(() => {
    const Paddle = window.Paddle;
    // console.log(Paddle)
    // eslint-disable-next-line
    if (typeof Paddle !== "undefined") {
    console.log("IT RAN, NO EXCUSES")
      let vendorNum = Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID);
      // console.log(vendorNum);
      // eslint-disable-next-line
      Paddle.Setup({
        vendor: vendorNum,
      });
      console.log("Loaded Paddle");
    }
  }, []);

  // const updateIdea = async (
  //   amount,
  //   planType,
  //   cancelUrl,
  //   updateUrl,
  //   paddleUserId,
  //   nextBillDate,
  //   subscriptionStartDate,
  //   subscriptionID
  // ) => {
  //   let uid;

  //   if (user?.uid) {
  //     uid = user?.uid;
  //   } else if (userUIDRedux) {
  //     uid = userUIDRedux;
  //   } else if (auth.currentUser?.uid) {
  //     uid = auth.currentUser?.uid;
  //   } else {
  //     uid = "default";
  //     // console.log("no uid available :(");
  //   }
  //   const ref = doc(getFirestore(), "users", uid);

  //   let data = {
  //     credits: amount,
  //     plan: planType,
  //     cancelUrl: cancelUrl,
  //     updateUrl: null,
  //     paddleUserID: null,
  //     nextBillDate: null,
  //     subscriptionStartDate: null,
  //     subscriptionID: null,
  //   };
  //   await updateDoc(ref, data)
  //     .then(() => {
  //       toast.success(`New AI credit balance: ${amount}`);
  //     })
  //     .catch((error) => {
  //       toast.error("Error occured, please contact support");
  //       console.log("Update failed!" + error);
  //     });
  // };

  function checkoutComplete(data) {
    // console.log(data);
    // alert("Thanks for your purchase.");

    let updateUrl;
    let cancelUrl;
    let paddleUserId;
    let nextBillDate;
    let subscriptionStartDate;
    let subscriptionID;

    if (
      data.product.name === "Hobbyist" ||
      data.product.name === "Hobbyist Monthly"
    ) {
      setCredits(0);
      setPlan("Hobbyist");
      // updateIdea(0, "Hobbyist");
      setSuccessPopUp(true);
    } else if (
      data.product.name === "Innovator" ||
      data.product.name === "Innovator Monthly"
    ) {
      setCredits(250);
      setPlan("Innovator");
      // updateIdea(250, "Innovator");
      setSuccessPopUp(true);
    } else if (
      data.product.name === "Pro" ||
      data.product.name === "Pro Monthly"
    ) {
      setCredits(1000);
      setPlan("Pro");
      // updateIdea(1000, "Pro");
      setSuccessPopUp(true);
    }
  }

  function checkoutClosed(data) {
    // console.log(data);

    toast.error("Purchase canceled");
  }

  return (
    <div>
      {/* <PaddleLoader /> */}
      {/* <script async src="https://cdn.paddle.com/paddle/paddle.js">
        {console.log("Loaded paddleeeeeeeeeee from script")}
      </script> */}
      <Script
        id="paddle-checkout-js"
        src="https://cdn.paddle.com/paddle/paddle.js"
        // strategy="beforeInteractive"
          onLoad={(e) => {
            console.log("before load paddle");

            // eslint-disable-next-line
            // Paddle.Environment.set("sandbox");
            // eslint-disable-next-line
            Paddle.Setup({
              vendor: Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID),

            });
            console.log("Loaded paddle");
          }
        }
        onError={(e) => {
          console.log("Error loading paddle");
          console.log(e);
        }}
      />
      {!props.onboard && !successPopUp && (
        <div className="mt-4 font-semibold text-center">
          <h1 className="text-5xl">
            <span className="tracking-wide text-t-bd">Premium </span>
            <span className="text-t-bd">Plans</span>
          </h1>
          <p className="w-full px-8 pt-1 text-xl font-normal text-slate-400 md:w-full nun">
            Choose the plan that works best for you.
          </p>
          <p className="w-full px-8 pt-1 text-lg font-normal text-slate-400 md:w-full nun">
            Each plan comes with a 7-day free trial.
          </p>
        </div>
      )}
      {successPopUp ? (
        <WelcomePopUp onboard={props.onboard} plan={plan} credits={credits} />
      ) : (
        <div>
          <div className="items-center mt-1 fade-effect-quick">
            <div className="flex flex-col items-center">
              {props.onboard && (
                <div className="font-semibold text-center">
                  <h1 className="text-5xl">
                    <span className="tracking-wide text-t-bd">
                      Select a Plan{" "}
                    </span>
                  </h1>
                  <p className="w-full px-8 pt-1 text-lg font-normal text-slate-400 md:w-full nun">
            Each plan comes with a 7-day free trial.
          </p>
                </div>
              )}

              <div className="flex items-center w-[16em] justify-center rounded-xl p-2  gap-3  h-10 mt-0 glass-box bg-white/50 dark:bg-slate-600/80">
                <p
                  className={
                    annual
                      ? "text-slate-500 text-sm transition"
                      : "!text-t-bl text-lg transition"
                  }
                >
                  Monthly
                </p>
                <Toggle
                  className=" fade-effect"
                  defaultChecked={annual}
                  icons={false}
                  onChange={() => {
                    setAnnual(!annual);
                  }}
                />
                <p
                  className={
                    !annual
                      ? "text-slate-500 text-sm transition"
                      : "!text-t-bl text-lg transition"
                  }
                >
                  Annual
                </p>
              </div>
              <div
                  className={
                    "w-[50%] px-4 py-4 mt-6 text-black transition duration-500 rounded-lg      group  flex-col flex justify-between " +
                    (paidPlan === "Beta"
                      ? " bg-clear-bl1 border-8 border-t-bd dark:bg-clear-bl1 shadow-3xl"
                      : " bg-white/60 md:hover:bg-clear-bl2 dark:bg-slate-600/80 shadow-lg")
                  }
                >
                  <div className="relative p-4">
                    {paidPlan === "Beta" && (
                      <p className="absolute text-xl font-bold -left-3 -top-4 text-t-bd">
                        Current Plan:
                      </p>
                    )}
                    <div className="flex justify-center">
                      <span className="inline-flex px-4 py-1 mb-0 text-3xl font-semibold leading-5 tracking-wide transition rounded-full group-hover:text-white blue-gradient-text">
                        Beta Testing Plan
                      </span>
                    </div>
                    <div className="flex justify-center mt-4 text-6xl font-extrabold leading-none transition text-blues-200 group-hover:text-white">
                            Free
                      {/* <span className="pt-8 ml-1 text-2xl font-medium leading-8 text-gray-500 transition group-hover:text-gray-200 dark:text-white fre ">
                        /month
                      </span> */}
                    </div>
                    <p className="mt-4 text-md">Plan includes :</p>
                    <ul className="w-full mt-2 mb-6 text-sm">
                      <li className="flex items-center mb-3 dark:text-white nun ">
                        <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                        All beta features to test
                      </li>
                    
                    </ul>
                  </div>
                      <p className="!mb-5 text-center">This plan is totally free, and helps us test out backend code. Thank you for helping us test ideaisland!! :D</p>
                  <button
                    className={
                      "w-full px-3 py-2  transition-colors duration-700 transform rounded-lg shadow text-md    " +
                      (paidPlan === "Beta"
                        ? " bg-slate-300 cursor-not-allowed"
                        : " text-white hover:bg-white hover:text-t-bl bg-t-bl")
                    }
                    onClick={() => {
                      if (paidPlan !== "Beta") {
                        // eslint-disable-next-line
                        if (Paddle.Audience.AllowPopup() === true) {
                          // eslint-disable-next-line
                          Paddle.Checkout.open({
                            product: "772088",
                            email: user.email || null,
                            passthrough: `${user?.uid}`,
                            successCallback: checkoutComplete,
                            closeCallback: checkoutClosed,
                          });
                        } else {
                          toast.error("Please allow popups to proceed");
                        }
                      } else {
                        toast.error("You are already on this plan");
                      }
                    }}
                  >
                    {paidPlan === "Beta"
                      ? "Active Plan"
                      : "Select this plan"}
                  </button>
                </div>



                
              <div className="flex-wrap items-center justify-center w-full my-0 sm:gap-3 md:gap-8 sm:flex">
                {/* Basic */}
                <div
                  className={
                    "w-full px-4 py-4 mt-6 text-black transition duration-500 rounded-lg     sm:w-1/2 md:w-1/2 lg:w-[23em] group md:min-h-[36em] flex-col flex justify-between " +
                    (paidPlan === "Hobbyist"
                      ? " bg-clear-bl1 border-8 border-t-bd dark:bg-clear-bl1 shadow-3xl"
                      : " bg-white/60 md:hover:bg-clear-bl2 dark:bg-slate-600/80 shadow-lg")
                  }
                >
                  <div className="relative p-4">
                    {paidPlan === "Hobbyist" && (
                      <p className="absolute text-xl font-bold -left-3 -top-4 text-t-bd">
                        Current Plan:
                      </p>
                    )}
                    <div className="flex justify-center">
                      <span className="inline-flex px-4 py-1 mb-0 text-3xl font-semibold leading-5 tracking-wide transition rounded-full group-hover:text-white blue-gradient-text">
                        Hobbyist
                      </span>
                    </div>
                    <div className="flex justify-center mt-4 text-6xl font-extrabold leading-none transition text-blues-200 group-hover:text-white">
                      {annual ? "$9" : "$12"}
                      <span className="pt-8 ml-1 text-2xl font-medium leading-8 text-gray-500 transition group-hover:text-gray-200 dark:text-white fre ">
                        /month
                      </span>
                    </div>
                    <p className="mt-4 text-md">Plan includes :</p>
                    <ul className="w-full mt-2 mb-6 text-sm">
                      <li className="flex items-center mb-3 dark:text-white nun ">
                        <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                        Problem Tool
                      </li>
                      <li className="flex items-center mb-3 dark:text-white nun ">
                        <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                        Solution Tools
                      </li>
                      <li className="flex items-center mb-3 dark:text-white nun ">
                        <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                        Save notes and ideas
                      </li>
                      <li className="flex items-center mb-3 dark:text-white nun ">
                        <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                        Access to our community
                      </li>
                      <li className="flex items-center mb-3 opacity-50 dark:text-white nun ">
                        <FaTimesCircle className="mr-4 text-xl text-t-pd" />
                        Feature selection tool
                      </li>
                      <li className="flex items-center mb-3 opacity-50 dark:text-white nun ">
                        <FaTimesCircle className="mr-4 text-xl text-t-pd" />
                        Tech stack builder
                      </li>
                      <li className="flex items-center mb-3 opacity-50 dark:text-white nun ">
                        <FaTimesCircle className="mr-4 text-xl text-t-pd" />
                        AI assisted ideation
                      </li>
                    </ul>
                  </div>

                  <button
                    className={
                      "w-full px-3 py-2  transition-colors duration-700 transform rounded-lg shadow text-md    " +
                      (paidPlan === "Hobbyist"
                        ? " bg-slate-300 cursor-not-allowed"
                        : " text-white hover:bg-white hover:text-t-bl bg-t-bl")
                    }
                    onClick={() => {
                      if (paidPlan !== "Hobbyist") {
                        // eslint-disable-next-line
                        if (Paddle.Audience.AllowPopup() === true) {
                          // eslint-disable-next-line
                          Paddle.Checkout.open({
                            product: annual ? "767575" : "767574",
                            // product: "769844",
                            email: user.email || null,
                            passthrough: `${user?.uid}`,
                            successCallback: checkoutComplete,
                            closeCallback: checkoutClosed,
                          });
                        } else {
                          toast.error("Please allow popups to proceed");
                        }
                      } else {
                        toast.error("You are already on this plan");
                      }
                    }}
                  >
                    {paidPlan === "Hobbyist"
                      ? "Active Plan"
                      : "Select this plan"}
                  </button>
                </div>

                {/* <!-- Popular --> */}

                <div
                  className={
                    "w-full px-4 py-4 mt-6 text-black transition duration-500 rounded-lg     sm:w-1/2 md:w-1/2 lg:w-[23em] group min-h-[36em] flex-col flex justify-between " +
                    (paidPlan === "Innovator"
                      ? " bg-clear-bl1 border-8 border-t-bd dark:bg-clear-bl1 shadow-3xl"
                      : " bg-white/60 md:hover:bg-clear-bl2 dark:bg-slate-600/80 shadow-lg")
                  }
                >
                  <div className="relative p-4">
                    {paidPlan === "Innovator" && (
                      <p className="absolute text-xl font-bold -left-3 -top-4 text-t-bd">
                        Current Plan:
                      </p>
                    )}
                    <div className="flex justify-center">
                      <span className="inline-flex px-4 py-1 text-3xl font-semibold leading-5 tracking-wide transition rounded-full group-hover:text-white blue-gradient-text">
                        Innovator
                      </span>
                    </div>
                    <div className="flex justify-center mt-4 text-6xl font-extrabold leading-none transition text-t-bl group-hover:text-white">
                      {annual ? "$29" : "$36"}
                      <span className="pt-8 ml-1 text-2xl font-medium leading-8 text-gray-500 transition group-hover:text-gray-200 dark:text-white fre ">
                        /month
                      </span>
                    </div>
                    <p className="mt-4 text-md">Plan includes :</p>
                    <ul className="w-full mt-2 mb-6 text-sm">
                      <li className="flex items-center mb-3 dark:text-white nun ">
                        <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                        Problem Tool
                      </li>
                      <li className="flex items-center mb-3 dark:text-white nun ">
                        <FaCheckCircle className="mr-4 text-xl text-t-bl " />
                        Solution Tools
                      </li>
                      <li className="flex items-center mb-3 dark:text-white nun ">
                        <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                        Save notes and ideas
                      </li>
                      <li className="flex items-center mb-3 dark:text-white nun ">
                        <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                        Access to our community
                      </li>
                      <li className="flex items-center mb-3 dark:text-white nun ">
                        <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                        Feature selection tool
                      </li>
                      <li className="flex items-center mb-3 dark:text-white nun ">
                        <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                        Tech stack builder
                      </li>
                      <li className="flex items-center mb-3 dark:text-white nun ">
                        <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                        AI assisted ideation (250 credits/month)
                      </li>
                      <li className="flex items-center mb-3 opacity-50 dark:text-white nun ">
                        <FaTimesCircle className="mr-4 text-xl text-t-pd" />
                        Innovation Consulting
                      </li>
                      <li className="flex items-center mb-3 opacity-50 dark:text-white nun ">
                        <FaTimesCircle className="mr-4 text-xl text-t-pd" />
                        Personalized Idea Report
                      </li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    className={
                      "w-full px-3 py-2  transition-colors duration-700 transform rounded-lg shadow text-md    " +
                      (paidPlan === "Innovator"
                        ? " bg-slate-300 cursor-not-allowed"
                        : " text-white hover:bg-white hover:text-t-bl bg-t-bl")
                    }
                    onClick={() => {
                      if (paidPlan !== "Innovator") {
                        // eslint-disable-next-line
                        Paddle.Checkout.open({
                          product: annual ? "769859" : "769860",
                          email: user.email || null,
                          passthrough: `${user?.uid}`,
                          successCallback: checkoutComplete,
                          closeCallback: checkoutClosed,
                        });
                      } else {
                        toast.error("You are already on this plan");
                      }
                    }}
                  >
                    {paidPlan === "Innovator"
                      ? "Active Plan"
                      : "Select this plan"}
                  </button>
                </div>

                {/* <!-- premium --> */}
                <div
                  className={
                    "w-full px-4 py-4 mt-6 text-black transition duration-500 rounded-lg     sm:w-1/2 md:w-1/2 lg:w-[23em] group min-h-[36em] flex-col flex justify-between " +
                    (paidPlan === "Pro"
                      ? " bg-clear-bl1 border-8 border-t-bd dark:bg-clear-bl1 shadow-3xl"
                      : " bg-white/60 md:hover:bg-clear-bl2 dark:bg-slate-600/80 shadow-lg")
                  }
                >
                  <div className="relative p-4">
                    {paidPlan === "Pro" && (
                      <p className="absolute text-xl font-bold -left-3 -top-4 text-t-bd">
                        Current Plan:
                      </p>
                    )}
                    <div className="flex justify-center">
                      <span className="inline-flex px-4 py-1 text-3xl font-semibold leading-5 tracking-wide transition rounded-full group-hover:text-white blue-gradient-text">
                        Pro
                      </span>
                    </div>
                    <div className="flex justify-center mt-4 text-6xl font-extrabold leading-none transition text-blues-600 group-hover:text-white">
                      {annual ? "$49" : "$89"}
                      <span className="pt-8 ml-1 text-2xl font-medium leading-8 text-gray-500 transition group-hover:text-gray-200 dark:text-white fre ">
                        /month
                      </span>
                    </div>
                    <p className="mt-4 text-md">Plan includes :</p>
                    <ul className="w-full mt-2 mb-6 text-sm">
                      <li className="flex items-center mb-3 dark:text-white nun ">
                        <FaCheckCircle className="mr-4 text-xl text-t-bl " />
                        Problem Tool
                      </li>
                      <li className="flex items-center mb-3 dark:text-white nun">
                        <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                        Solution Tools
                      </li>
                      <li className="flex items-center mb-3 dark:text-white nun ">
                        <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                        Save notes and ideas
                      </li>
                      <li className="flex items-center mb-3 dark:text-white nun ">
                        <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                        Access to our community
                      </li>
                      <li className="flex items-center mb-3 dark:text-white nun ">
                        <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                        Feature selection tool
                      </li>
                      <li className="flex items-center mb-3 dark:text-white nun ">
                        <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                        Tech stack builder
                      </li>
                      <li className="flex items-center mb-3 dark:text-white nun ">
                        <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                        AI assisted ideation (1000 credits/month)
                      </li>
                      <li className="flex items-center mb-3 dark:text-white nun ">
                        <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                        Innovation Consulting (4 hours per month)
                      </li>
                      <li className="flex items-center mb-3 dark:text-white nun ">
                        <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                        Personalized Idea Report
                      </li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    className={
                      "w-full px-3 py-2  transition-colors duration-700 transform rounded-lg shadow text-md    " +
                      (paidPlan === "Pro"
                        ? " bg-slate-300 cursor-not-allowed"
                        : " text-white hover:bg-white hover:text-t-bl bg-t-bl")
                    }
                    onClick={() => {
                      if (paidPlan !== "Pro") {
                        // eslint-disable-next-line
                        Paddle.Checkout.open({
                          product: annual ? "769861" : "769863",
                          email: user.email || null,
                          passthrough: `${user?.uid}`,
                          successCallback: checkoutComplete,
                          closeCallback: checkoutClosed,
                        });
                      } else {
                        toast.error("You are already on this plan");
                      }
                    }}
                  >
                    {paidPlan === "Pro" ? "Active Plan" : "Select this plan"}
                  </button>
                </div>
              </div>
              {!props.onboard && <div className="mb-48"></div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pricing;

import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Toggle from "react-toggle";
import Script from "next/script";
import dynamic from 'next/dynamic';
// const PaddleScript = dynamic(() => import("react-quill"), {
//     ssr: false,
//   });
let Paddle;
function Pricing() {
  const [annual, setAnnual] = React.useState(true);
  

  
  return (
    <div>
      <Script
        src="https://cdn.paddle.com/paddle/paddle.js"
        strategy="afterInteractive"
        onLoad={(e) => {
            // eslint-disable-next-line
          Paddle.Setup({ vendor: Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID) });
          console.log("Loaded paddle")
        }}
      />
      <div className="items-center min-h-screen mt-5 fade-effect-quick">
        <div className="flex flex-col items-center">
          <div className="font-semibold text-center">
            <h1 className="text-5xl">
              <span className="tracking-wide text-t-bd">Premium </span>
              <span className="text-t-bd">Plans</span>
            </h1>
            <p className="w-full px-8 pt-6 text-xl font-normal text-slate-400 md:w-full">
              Choose the plan that works best for you.
            </p>
          </div>

          <div className="flex items-center w-[13em] justify-center rounded-xl p-0  gap-3  h-10 mt-5">
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
          <div className="flex-wrap items-center justify-center w-full gap-8 my-4 sm:flex">
            {/* Basic */}
            <div className="w-full px-4 py-4 mt-6 text-black transition duration-500 rounded-lg shadow-lg bg-white/60 md:hover:bg-clear-bl3 sm:w-1/2 md:w-1/2 lg:w-1/4 group">
              <div className="p-4">
                <div className="flex justify-center">
                  <span className="inline-flex px-4 py-1 mb-4 text-3xl font-semibold leading-5 tracking-wide transition rounded-full group-hover:text-white ">
                    Premium
                  </span>
                </div>
                <div className="flex justify-center mt-4 text-6xl font-extrabold leading-none transition text-blues-200 group-hover:text-white">
                  {annual ? "$9" : "$12"}
                  <span className="pt-8 ml-1 text-2xl font-medium leading-8 text-gray-500 transition group-hover:text-gray-200">
                    /month
                  </span>
                </div>
              </div>
              <p className="mt-4 text-md">Plan includes :</p>
              <ul className="w-full mt-6 mb-6 text-sm">
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                  All illimited components
                </li>
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                  Own custom Tailwind styles
                </li>
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                  Unlimited Templates
                </li>
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                  Free premium dashboard
                </li>
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                  Best ranking
                </li>
                <li className="flex items-center mb-3 opacity-50">
                  <FaTimesCircle className="mr-4 text-xl text-t-pd" />
                  Prenium svg
                </li>
                <li className="flex items-center mb-3 opacity-50">
                  <FaTimesCircle className="mr-4 text-xl text-t-pd" />
                  My wife
                </li>
              </ul>
              
              <button className="w-full px-3 py-3 text-sm transition-colors duration-700 transform bg-white rounded-lg shadow paddle_button text-t-bl hover:text-white hover:bg-t-bl" data-theme="none" data-product="767575"  onClick={() => {

// eslint-disable-next-line
          Paddle.Checkout.open({
            product: (annual ? "767575" : "767574"),
          });
        }}
      >
                  Buy Now!
                </button>
            </div>

            {/* <!-- Popular --> */}

            <div className="w-full px-4 py-4 mt-6 text-black transition duration-500 rounded-lg shadow-lg bg-white/60 md:hover:bg-clear-bl3 sm:w-1/2 md:w-1/2 lg:w-1/4 group">
              <div className="p-4">
                <div className="flex justify-center">
                  <span className="inline-flex px-4 py-1 mb-4 text-3xl font-semibold leading-5 tracking-wide transition rounded-full group-hover:text-white ">
                    Popular
                  </span>
                </div>
                <div className="flex justify-center mt-4 text-6xl font-extrabold leading-none transition text-t-bl group-hover:text-white">
                  {annual ? "$29" : "$36"}
                  <span className="pt-8 ml-1 text-2xl font-medium leading-8 text-gray-500 transition group-hover:text-gray-200">
                    /month
                  </span>
                </div>
              </div>
              <p className="mt-4 text-md">Plan includes :</p>
              <ul className="w-full mt-6 mb-6 text-sm">
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                  All illimited components
                </li>
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                  Own custom Tailwind styles
                </li>
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                  Unlimited Templates
                </li>
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                  Free premium dashboard
                </li>
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                  Best ranking
                </li>
                <li className="flex items-center mb-3 opacity-50">
                  <FaTimesCircle className="mr-4 text-xl text-t-pd" />
                  Prenium svg
                </li>
                <li className="flex items-center mb-3 opacity-50">
                  <FaTimesCircle className="mr-4 text-xl text-t-pd" />
                  My wife
                </li>
              </ul>
              <button
                type="button"
                className="w-full px-3 py-3 text-sm transition-colors duration-700 transform bg-white rounded-lg shadow text-t-bl hover:text-white hover:bg-t-bl"
              >
                Continue
              </button>
            </div>

            {/* <!-- premium --> */}
            <div className="w-full px-4 py-4 mt-6 text-black transition duration-500 rounded-lg shadow-lg bg-white/60 md:hover:bg-clear-bl3 sm:w-1/2 md:w-1/2 lg:w-1/4 group">
              <div className="p-4">
                <div className="flex justify-center">
                  <span className="inline-flex px-4 py-1 mb-4 text-3xl font-semibold leading-5 tracking-wide transition rounded-full group-hover:text-white ">
                    Popular
                  </span>
                </div>
                <div className="flex justify-center mt-4 text-6xl font-extrabold leading-none transition text-blues-600 group-hover:text-white">
                  {annual ? "$49" : "$60"}
                  <span className="pt-8 ml-1 text-2xl font-medium leading-8 text-gray-500 transition group-hover:text-gray-200">
                    /month
                  </span>
                </div>
              </div>
              <p className="mt-4 text-md">Plan includes :</p>
              <ul className="w-full mt-6 mb-6 text-sm">
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                  All illimited components
                </li>
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                  Own custom Tailwind styles
                </li>
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                  Unlimited Templates
                </li>
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                  Free premium dashboard
                </li>
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                  Best ranking
                </li>
                <li className="flex items-center mb-3 opacity-50">
                  <FaTimesCircle className="mr-4 text-xl text-t-pd" />
                  Premium svg
                </li>
                <li className="flex items-center mb-3 opacity-50">
                  <FaTimesCircle className="mr-4 text-xl text-t-pd" />
                  My wife
                </li>
              </ul>
              <button
                type="button"
                className="w-full px-3 py-3 text-sm transition-colors duration-700 transform bg-white rounded-lg shadow text-t-bl hover:text-white hover:bg-t-bl"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;

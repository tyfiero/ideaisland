import {React, useContext, useState} from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Toggle from "react-toggle";
import Script from "next/script";
import dynamic from 'next/dynamic';
import { UserContext } from "../../../lib/context";
import { auth } from "../../../lib/firebase";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
// const PaddleScript = dynamic(() => import("react-quill"), {
//     ssr: false,
//   });
let Paddle;
function Pricing(props) {
  const [annual, setAnnual] = useState(true);
  const userUIDRedux = useSelector((state) => state.userUID);
  const { username, user } = useContext(UserContext);
  
  const updateIdea = async (amount, plan) => {
    let uid;

    if (user?.uid) {
      uid = user?.uid;
    } else if (userUIDRedux) {
      uid = userUIDRedux;
    } else if (auth.currentUser?.uid) {
      uid = auth.currentUser?.uid;
    } else {
      uid = "default";
      // console.log("no uid available :(");
    }
    const ref = doc(getFirestore(), "users", uid);


    let data = {credits: amount, plan: plan}
    await updateDoc(ref, data)
    .then(() => {
        toast.success(`New AI credit balance: ${amount}`);

    })
    .catch((error) => {
      toast.error("Error occured, please contact support");
      console.log("Update failed!" + error);
    });


    }
  
  return (
    <div>
      <Script
        src="https://cdn.paddle.com/paddle/paddle.js"
        strategy="afterInteractive"
        onLoad={(e) => {
            // eslint-disable-next-line
          //   Paddle.Environment.set('sandbox')
          // Paddle.Setup({ vendor: Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID) });
          console.log("Loaded paddle")
        }}
      />
      <div className="items-center mt-5 fade-effect-quick">
        <div className="flex flex-col items-center">
        {props.onboard && <div className="font-semibold text-center">
            <h1 className="text-5xl">
              <span className="tracking-wide text-t-bd">Select a Plan </span>
            </h1>
           
          </div>}

          <div className="flex items-center w-[16em] justify-center rounded-xl p-2  gap-3  h-10 mt-2 glass-box bg-white/50">
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
          <div className="flex-wrap items-center justify-center w-full gap-8 my-0 sm:flex">
            {/* Basic */}
            <div className=" px-4 py-4 mt-6 text-black transition duration-500 rounded-lg shadow-lg bg-white/60 md:hover:bg-clear-bl3 sm:w-1/2 md:w-1/2 lg:w-[23em] group !min-h-[43em] flex-col flex justify-between">
              <div className="p-4">
                <div className="flex justify-center">
                  <span className="inline-flex px-4 py-1 mb-0 text-3xl font-semibold leading-5 tracking-wide transition rounded-full group-hover:text-white blue-gradient-text">
                    Hobbyist
                  </span>
                </div>
                <div className="flex justify-center mt-4 text-6xl font-extrabold leading-none transition text-blues-200 group-hover:text-white">
                  {annual ? "$9" : "$12"}
                  <span className="pt-8 ml-1 text-2xl font-medium leading-8 text-gray-500 transition group-hover:text-gray-200">
                    /month
                  </span>
                </div>
              <p className="mt-4 text-md">Plan includes :</p>
              <ul className="w-full mt-2 mb-6 text-sm">
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                  Problem Tool
                </li>
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                  Solution Tools
                </li>
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                  Save notes and ideas
                </li>
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                  Access to our community
                </li>
                <li className="flex items-center mb-3 opacity-50">
                  <FaTimesCircle className="mr-4 text-xl text-t-pd" />
                    Feature selection tool
                </li>
                <li className="flex items-center mb-3 opacity-50">
                  <FaTimesCircle className="mr-4 text-xl text-t-pd" />
                   Tech stack builder 
                </li>
                <li className="flex items-center mb-3 opacity-50">
                  <FaTimesCircle className="mr-4 text-xl text-t-pd" />
                    AI assisted ideation
                </li>
               
              </ul>
              </div>
              
              <button className="w-full px-3 py-3 text-sm transition-colors duration-700 transform bg-white rounded-lg shadow paddle_button text-t-bl hover:text-white hover:bg-t-bl" data-theme="none" data-product="767575"  onClick={() => {

// eslint-disable-next-line
          // Paddle.Checkout.open({
          //   product: (annual ? "767575" : "767574"),
          // });
          
              updateIdea(100,"Hobbyist")
                if(props.onboard){
                  props.goToStep(4)
                }
        }}
      >
                  Select this plan
                </button>
            </div>

            {/* <!-- Popular --> */}

            <div className="w-full px-4 py-4 mt-6 text-black transition duration-500 rounded-lg shadow-lg bg-white/60 md:hover:bg-clear-bl3 sm:w-1/2 md:w-1/2 lg:w-[23em] group min-h-[43em] flex-col flex justify-between">
              <div className="p-4">
                <div className="flex justify-center">
                  <span className="inline-flex px-4 py-1 text-3xl font-semibold leading-5 tracking-wide transition rounded-full group-hover:text-white blue-gradient-text">
                    Innovator
                  </span>
                </div>
                <div className="flex justify-center mt-4 text-6xl font-extrabold leading-none transition text-t-bl group-hover:text-white">
                  {annual ? "$29" : "$36"}
                  <span className="pt-8 ml-1 text-2xl font-medium leading-8 text-gray-500 transition group-hover:text-gray-200">
                    /month
                  </span>
                </div>
              <p className="mt-4 text-md">Plan includes :</p>
              <ul className="w-full mt-2 mb-6 text-sm">
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                  Problem Tool
                </li>
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                  Solution Tools
                </li>
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                  Save notes and ideas
                </li>
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                  Access to our community
                </li>
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                    Feature selection tool
                </li>
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                   Tech stack builder 
                </li>
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                    AI assisted ideation (250 credits/month)
                </li>
                <li className="flex items-center mb-3 opacity-50">
                  <FaTimesCircle className="mr-4 text-xl text-t-pd" />
                    Innovation Consulting
                </li>
                <li className="flex items-center mb-3 opacity-50">
                  <FaTimesCircle className="mr-4 text-xl text-t-pd" />
                    Personalized Idea Report
                </li>
              </ul>
              </div>

              <button
                type="button"
                className="w-full px-3 py-3 text-sm transition-colors duration-700 transform bg-white rounded-lg shadow text-t-bl hover:text-white hover:bg-t-bl"
                onClick={()=>{

                  
                  updateIdea(250,"Innovator")
                  if(props.onboard){
                    props.goToStep(4)
                  }
                }}
              >
                Select this plan
              </button>
            </div>

            {/* <!-- premium --> */}
            <div className="w-full px-4 py-4 mt-6 text-black transition duration-500 rounded-lg shadow-lg bg-white/60 md:hover:bg-clear-bl3 sm:w-1/2 md:w-1/2 lg:w-[23em] group min-h-[43em] flex-col flex justify-between">
              <div className="p-4">
                <div className="flex justify-center">
                  <span className="inline-flex px-4 py-1 text-3xl font-semibold leading-5 tracking-wide transition rounded-full group-hover:text-white blue-gradient-text">
                    Pro
                  </span>
                </div>
                <div className="flex justify-center mt-4 text-6xl font-extrabold leading-none transition text-blues-600 group-hover:text-white">
                  {annual ? "$49" : "$60"}
                  <span className="pt-8 ml-1 text-2xl font-medium leading-8 text-gray-500 transition group-hover:text-gray-200">
                    /month
                  </span>
                </div>
              <p className="mt-4 text-md">Plan includes :</p>
              <ul className="w-full mt-2 mb-6 text-sm">
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                  Problem Tool
                </li>
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                  Solution Tools
                </li>
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                  Save notes and ideas
                </li>
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                  Access to our community
                </li>
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                    Feature selection tool
                </li>
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                   Tech stack builder 
                </li>
               <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                    AI assisted ideation (1000 credits/month)
                </li>
                <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                    Innovation Consulting (4 hours per month)
                </li>
                 <li className="flex items-center mb-3 ">
                  <FaCheckCircle className="mr-4 text-xl text-t-bl" />
                    Personalized Idea Report
                </li>
              </ul>
              </div>
              <button
                type="button"
                className="w-full px-3 py-3 text-sm transition-colors duration-700 transform bg-white rounded-lg shadow text-t-bl hover:text-white hover:bg-t-bl"
                onClick={()=>{

                  
                  updateIdea(1000, "Pro")
                if(props.onboard){
                  props.goToStep(4)
                }
        
                        }}
              >
                Select this plan
              </button>
            </div>
          </div>
          {!props.onboard && <div className="mb-48"></div>  }
        </div>
      </div>
    </div>
  );
}

export default Pricing;

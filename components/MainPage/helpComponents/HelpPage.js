import React from "react";
import {
  FaUserAlt,
  FaBug,
  FaUserGraduate,
  FaRegCommentDots,
  FaRegListAlt,
  FaEnvelope,
} from "react-icons/fa";
import Link from "next/link";
// import { HelpAccordion } from "@mui/material";
import HelpAccordion from "./Accordion";
import { BsArrowDown, BsArrowRight } from "react-icons/bs";

const HelpPage = () => {
  let date = new Date().getFullYear();
  const items = [
    {
      title: "Evolved Idea",
      subtitle: "What exactly is an evolved idea?",
      content: <p>An evolved idea is an idea that....</p>,
    },
    {
      title: "Combinatorial Thinking",
      subtitle: "What's so special about random inspiration?",
      content: (
        <p>
          Combinatorial thinking allows us to force combinations in our brains
          that wouldn&apos;t normally happen. It gets different parts of your
          brain working together, and naturally leads you to truly novel ideas.
        </p>
      ),
    },
    {
      title: "Island Method",
      subtitle: "Why does it work?",
      content: (
        <>
          <p>
            In short, the Island Method constitutes a stepwise thinking
            framework that helps frame innovation.
          </p>
          <p> Read more about the Island Method</p>
          <a
            className="underline cursor-pointer text-t-bl"
            href="ideaisland.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
        </>
      ),
    },
  ];
  return (
    <div className="pt-8 help-page fade-effect-quick">
      <h1 className="text-3xl text-t-bd dark:text-blues-100">Help</h1>

          <div className="help-boxes-div-container">
        <div className="help-boxes-div">
          {/* <div className="help-box min-w-[13em] min-h-[10em] bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] ">
            <div className="help-circle bg-blues-100 dark:bg-t-bl">
              <FaUserGraduate className="help-icons" />
            </div>
            <h4 className="help-header text-t-bd dark:text-blues-100">
              Tutorial
            </h4>
            <p className="help-text">
              Stuck? See a guided tour of the platform.
            </p>
          </div> */}
          {/* <div className="help-box  bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] ">
            <div className="help-circle bg-blues-100 dark:bg-t-bl">
              <FaRegListAlt className="help-icons" />
            </div>
            <h4 className="help-header text-t-bd dark:text-blues-100">FAQs</h4>
            <p className="help-text">The most common community questions.</p>
          </div> */}
         
        </div>
        <div className="help-boxes-div">
      
          <a target="_blank" href="https://tally.so/r/wA9xow" rel="noreferrer">
            <div className="help-box  min-w-[13em] min-h-[10em] bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] ">
              <div className="help-circle bg-blues-100 dark:bg-t-bl">
                <FaRegCommentDots className="help-icons " />
              </div>
              <h4 className="help-header text-t-bd dark:text-blues-100">
                Feedback
              </h4>
              <p className="help-text">
                Suggest new features or tell us how we are doing!
              </p>
            </div>
          </a>
          
          <a target="_blank" href="https://tally.so/r/m6z0Ym" rel="noreferrer">
            <div className="help-box min-w-[13em] min-h-[10em] bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] ">
              <div className="help-circle bg-blues-100 dark:bg-t-bl">
                <FaBug className="help-icons " />
              </div>
              <h4 className="help-header text-t-bd dark:text-blues-100">
                Report Issue
              </h4>
              <p className="help-text">Submit a bug to our developer. </p>
            </div>
          </a>
          <Link href="/profile" passHref>
            <div className="help-box min-w-[13em] min-h-[10em] bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] ">
              <div className="help-circle bg-blues-100 dark:bg-t-bl">
                <FaUserAlt className="help-icons" />
              </div>
              <h4 className="help-header text-t-bd dark:text-blues-100">
                Account
              </h4>
              <p className="help-text">
                Manage billing and account information.
              </p>
            </div>
          </Link>
         
          <a target="_blank" href="mailto:dylan@digitalmasonry.io" rel="noreferrer">
            <div className="help-box min-w-[13em] min-h-[10em] bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] ">
            <div className="help-circle bg-blues-100 dark:bg-t-bl">
            <FaEnvelope className="help-icons " />
          </div>
              <h4 className="help-header text-t-bd dark:text-blues-100">
                Contact
              </h4>
              <p className="help-text">
              Send us an email, we&apos;d love to hear from you!
              </p>
            </div>
          </a>
          <a target="_blank" href="https://ideaisland.io/resources-and-insights-page-copy/" rel="noreferrer">
            <div className="help-box min-w-[13em] min-h-[10em] bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] ">
              <div className="help-circle bg-blues-100 dark:bg-t-bl">
                <img
                  src="/bulb.svg"
                  alt="logo"
                  className="w-auto mx-auto h- sm:h-6"
                />
              </div>
              <h4 className="help-header text-t-bd dark:text-blues-100">
                About Us
              </h4>
              <p className="help-text">
                Learn about our company and our mission.
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* <div className="normal-box-soft w-[70%] min-h-[15em] flex flex-col items-center">
        <h4 className="help-header text-t-bd dark:text-blues-100">FAQs</h4>
        <HelpAccordion
          items={items}
          initialActiveItemIndex={0}
          closeOtherItemsOnClick
        />
      </div> */}

      {/* <Accordion /> */}
   
      <div className="normal-box-soft w-[45%] min-h-[7em] flex items-center flex-col min-w-[28em]">
        <h4 className="help-header text-t-bd dark:text-blues-100">
          Get started
        </h4>

        {/* <p>
          A quick start guide that will have you well on your way to awesome
          &quot;Aha&quot;! moments
        </p> */}
        <div className="normal-box bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] !w-[40%] flex flex-col items-center  min-h-[3em] min-w-[25em] justify-center">
          <p>
            Read our Getting Started blog post{" "}
            <a
              href="https://ideaisland.io/getting_started/"
              className="underline text-sky-500"
            >
              {" "}
              here
            </a>
          </p>
          {/* <ul>
            <li className="text-slate-700 dark:text-slate-100">Get started long explanation placeholder</li>
            <li className="text-slate-700 dark:text-slate-100">Get started long explanation placeholder</li>
            <li className="text-slate-700 dark:text-slate-100">Get started long explanation placeholder</li>
            <li className="text-slate-700 dark:text-slate-100">Get started long explanation placeholder</li>
            <li className="text-slate-700 dark:text-slate-100">Get started long explanation placeholder</li>
          </ul> */}
        </div>
      </div>

      <div className="normal-box-soft md:w-[70%] sm:w-[98%] min-h-[15em]">
        <h4 className="help-header text-t-bd dark:text-blues-100">
          Tips and Tricks
        </h4>


        <div className="normal-box bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] !w-[90%] flex flex-col items-start m-auto text-left nun px-10 py-5">
        <p className="my-5 text-xl text-left">Thanks for joining us! Here are some quick tips:</p>

          <ul className="mt-5 space-y-4 list-disc list-inside">
          <div  className="text-lg fre">
              For best results, use the tools in order
              <ul className="ml-5 space-y-1 text-base list-disc list-inside nun">
                <div className="flex flex-wrap items-center text-sm">Purpose  <BsArrowRight className="mx-2 text-xl dark:text-white" />Problem<BsArrowRight className="mx-2 text-xl dark:text-white" /><p className="whitespace-nowrap">Solution Finder</p><BsArrowRight className="mx-2 text-xl dark:text-white" /><p className="whitespace-nowrap">Feature Builder</p><BsArrowRight className="mx-2 text-xl dark:text-white" /><p className="whitespace-nowrap">Feature Rank + Select</p><BsArrowRight className="mx-2 text-xl dark:text-white" /><p className="whitespace-nowrap">Tech Stack Selector</p><BsArrowRight className="mx-2 text-xl dark:text-white" /><p className="whitespace-nowrap">MRR Calculator</p></div>
             

              
                <li className="ml-0">
                  If you want to skip around: use the progress roadmap on the
                  right side of the screen or next buttons to skip any one
                  section, as it is intended to be completed in order.
                </li>
              </ul>
            </div>
            <div  className="text-lg fre">
             Problems Section:
              <ul className="ml-5 space-y-4 text-base list-disc list-inside nun">
              <li>
              “Who is your audience” and “Time to find your
              problem” workflows can/should be completed in the order that makes
              sense to you, this is the only time where we would recommend going
              out of order based on your preference.{" "}
                </li>
                <li>
                  If you think its better to state your problem and then state
                  who you want to target, that is completely acceptable
                </li>
              </ul>
            </div>
            <div  className="text-lg fre">
              Solution Finder Help:
              <ul className="ml-5 space-y-4 text-base list-disc list-inside nun">

                <li>
                  Problem Statement and Idea Inspiration sections - simply click
                  a word to: text edit, lock from randomization, add reference
                  image, randomize, or find similar word, for the word that is
                  selected.
                </li>
                <li>
                  To randomize the whole thing, ensure none are locked and click
                  the dice at the top right corner of the respective box.
                </li>
              </ul>
            </div>
            <div  className="text-lg fre">
              Innovation AI Tips:
              <ul className="ml-5 space-y-4 text-base list-disc list-inside nun">
                <li>
                  Keep trying: it&#39;s a beta feature, and has imperfections,
                  but if you keep trying it will eventually provide something
                  helpful.
                </li>
                <li>
                  Different models, different performance: Our cheaper AI (GPT-J
                  based) is useful and efficient. It provides value but
                  generally is less performant (good) than the GPT-3 based AI.
                </li>
                <li>
                  Copy to AI: click the copy sentence button in the top
                  right-hand corner of both the idea inspiration and problem
                  statement sections to copy to your clipboard. Simply paste
                  into the Innovation AI and see what it puts out!
                </li>
              </ul>
            </div>
            {/* <li>
              Save the Idea: Input your idea into the idea notepad and PLEASE
              MAKE SURE to click “save idea”, otherwise, the idea will be lost
            </li> */}
            <div  className="text-lg fre">
             Feature Builder:
             <ul className="ml-5 space-y-4 text-base list-disc list-inside nun">

            <li>
              You can choose features from our pre-populated
              menu or add custom features and click the blue “+add” button to
              add it to the list of features in your Solution
            </li>
            </ul>
            </div>
            <div  className="text-lg fre">
              Feature Selection:
              <ul className="ml-5 space-y-4 text-base list-disc list-inside nun">

                <li>
                  Click the “...” buttons to cycle through options for your
                  features importance, feasibility, cost and version. This will
                  help you understand what to prioritize as you build the MVP.
                  Notice how too many features makes it a lot of work to
                  organize, now imagine building them all. Start small, and add
                  features as customers ask for them, or if you feel they are
                  necessary to solve your customer problem.
                </li>
              </ul>
            </div>
            <div  className="text-lg fre">
              Tech Stack:{" "}
              <ul className="ml-5 space-y-4 text-base list-disc list-inside nun">
                <li>
                  Pick the stack of technologies you will use to build your MVP.
                  Note how we have included prices for various technologies to
                  the best of our ability, however, we always recommend
                  researching/getting quoted the costs associated with using a
                  particular technology, and once you know, input the price in
                  the “add custom” section so you can keep track of your
                  operating costs.{" "}
                </li>
                <li>
                  Knowing your costs will be vital to understanding pricing,
                  profitability and the economics of your solution, as will be
                  demonstrated in the next tool, the MRR calculator
                </li>
              </ul>
            </div>
            <div  className="text-lg fre">
              MRR Calculator:
              <ul className="ml-5 space-y-4 text-base list-disc list-inside nun">
                <li>
                Adjust the sliders for your pricing and costs and
              user growth to estimate what your MRR growth would be over a
              12-month span, this should help you figure out if you need to drop
              costs, raise prices, or move ahead! 
                </li>
                </ul>
            </div>
          </ul>
          
          <p className="pb-5 mt-5 sm:text-xl sm:text-center md:text-2xl m">Good Luck, and Happy ideating,
              <span className="fre logo mx-1 !text-2xl">ideaisland</span> welcomes you!</p>

              <img
                  src="/bulb.svg"
                  alt="logo"
                  className="w-auto h-32 mx-auto mb-5"
                />
        </div>
      </div>

     

      <div className="w-full h-[6em] pt-5 bg-clear-pl4 flex  flex-col gap-5">
        <p className="text-[18px] ">Made with ♥️ &nbsp;in Seattle</p>
        <p className="text-[11px]">Copyright © {date} Digital Masonry LLC</p>
      </div>
    </div>
  );
};

export default HelpPage;

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
      <h1 className="text-3xl text-t-bd dark:text-blues-100">
        Help
      </h1>

      <div className="help-boxes-div-container">
        <div className="help-boxes-div">
          <div className="help-box  bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] ">
            <div className="help-circle bg-blues-100 dark:bg-t-bl">
              <FaUserGraduate className="help-icons" />
            </div>
            <h4 className="help-header text-t-bd dark:text-blues-100">
              Tutorial
            </h4>
            <p className="help-text">
              Stuck? See a guided tour of the platform.
            </p>
          </div>
          <div className="help-box  bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] ">
            <div className="help-circle bg-blues-100 dark:bg-t-bl">
              <FaRegListAlt className="help-icons" />
            </div>
            <h4 className="help-header text-t-bd dark:text-blues-100">FAQs</h4>
            <p className="help-text">The most common community questions.</p>
          </div>
          <Link href="/profile" passHref>
            <div className="help-box  bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] ">
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
        </div>
        <div className="help-boxes-div">
          <a target="_blank" href="https://tally.so/r/wA9xow" rel="noreferrer">
            <div className="help-box  bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] ">
              <div className="help-circle help-circle-alt bg-pinks-100 dark:bg-t-pl">
                <FaRegCommentDots className="help-icons help-icons-alt" />
              </div>
              <h4 className="help-header help-header-alt text-t-pd dark:text-pinks-100">
                Feedback
              </h4>
              <p className="help-text">
                Suggest new features or tell us how we are doing!
              </p>
            </div>
          </a>
          <a target="_blank" href="https://tally.so/r/m6z0Ym" rel="noreferrer">
            <div className="help-box  bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] ">
              <div className="help-circle help-circle-alt bg-pinks-100 dark:bg-t-pl">
                <FaBug className="help-icons help-icons-alt" />
              </div>
              <h4 className="help-header help-header-alt text-t-pd dark:text-pinks-100">
                Report Issue
              </h4>
              <p className="help-text">Submit a bug to our developer. </p>
            </div>
          </a>
          <a target="_blank" href="https://ideaisland.io" rel="noreferrer">
            <div className="help-box  bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] ">
              <div className="help-circle help-circle-alt bg-pinks-100 dark:bg-t-pl">
                <img
                  src="/bulb.svg"
                  alt="logo"
                  className="w-auto mx-auto h- sm:h-6"
                />
              </div>
              <h4 className="help-header help-header-alt text-t-pd dark:text-pinks-100">
                About Us
              </h4>
              <p className="help-text">
                Learn about our company and our mission.
              </p>
            </div>
          </a>
        </div>
      </div>

      <div className="normal-box-soft w-[70%] min-h-[15em] flex flex-col items-center">
        <h4 className="help-header text-t-bd dark:text-blues-100">FAQs</h4>
        <HelpAccordion
          items={items}
          initialActiveItemIndex={0}
          closeOtherItemsOnClick
        />
      </div>

      {/* <Accordion /> */}
      <div className="normal-box-soft w-[70%] min-h-[15em]">
        <h4 className="help-header text-t-bd dark:text-blues-100">
          Tips and Tricks
        </h4>

        <p>Pointers to help you come up with your best ideas.</p>
        <div className="normal-box bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] !w-[90%] flex flex-col items-center m-auto ">
          <ul className="my-1">
            <li className="text-slate-700 dark:text-slate-100">Thanks for joining us! Here are some quick tips:
For best results, use the tools in order (top to bottom).
Purpose
Problem
Solution Finder
Feature Builder
Feature Rank + Select
Tech Stack Selector
MRR Calculator
*If you want to skip around: use the progress roadmap on the right side of the screen or next buttons to skip any one section, as it is intended to be completed in order.







</li>
          
            <li className="text-slate-700 dark:text-slate-100">In Problems section, “Who is your audience” and “Time to find your problem” workflows can/should be completed in the order that makes sense to you, this is the only time where we would recommend going out of order based on your preference. (If you think its better to state your problem and then state who you want to target, that is completely acceptable)</li>
            <li className="text-slate-700 dark:text-slate-100">Solution Finder Help- Problem Statement and Idea Inspiration sections - simply click a word to: text edit, lock from randomization, add reference image, randomize, or find similar word, for the word that is selected.
To randomize the whole thing, ensure none are locked and click the dice at the top right corner of the respective box.
Innovation AI Tips:
Keep trying: its a beta feature, and has imperfections, but if you keep trying it will eventually provide something helpful.
Different model, different performance: Our free AI (GPT-J based) is useful and cheap and efficient. It provides value, but generally is less performant (good) than the GPT-3 based AI.
Copy to AI: click the copy sentence button in the top right hand corner of both the idea inspiration and problem statement sections to copy to your clip board. Simply paste into the Innovation AI and see what it puts out!
Save the Idea: Input your idea into the idea notepad and PLEASE MAKE SURE to click “save idea”, otherwise, the idea will be lost.</li>
            <li className="text-slate-700 dark:text-slate-100">Feature Builder: you can choose features from our pre-populated menu or add custom features and click the blue “+add” button to add it to the list of features in your Solution Feature Selection: click the “...” buttons to cycle through options for your features importance, feasibility, cost and version. This will help you understand what to prioritize as you build the MVP. Notice how too many features makes it a lot of work to organize, now imagine building them all. Start small, and add features as customers ask for them, or if you feel they are necessary to solve your customer problem.</li>
            <li className="text-slate-700 dark:text-slate-100">Tech Stack: Pick the stack of technologies you will use to build your MVP. Note how we have included prices for various technologies to the best of our ability, however, we always recommend researching/getting quoted the costs associated with using a particular technology, and once you know, input the price in the “add custom” section so you can keep track of your operating costs. Knowing your costs will be vital to understanding pricing, profitability and the economics of your solution, as will be demonstrated in the next tool, the MRR calculator.</li>
            <li className="text-slate-700 dark:text-slate-100">MRR Calculator: Adjust the sliders for your pricing and costs and user growth to estimate what your MRR growth would be over a 12 month span, this should help you figure out if you need to drop costs, raise prices, or move ahead!</li>
            <li className="text-slate-700 dark:text-slate-100">Good Luck, and Happy ideating, ideaisland welcomes you!</li>
          </ul>
        </div>
      </div>

      <div className="normal-box-soft w-[70%] min-h-[15em]">
        <h4 className="help-header text-t-bd dark:text-blues-100">
          Get started
        </h4>

        <p>
          A quick start guide that will have you well on your way to awesome
          &quot;Aha&quot;! moments
        </p>
        <div className="normal-box bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] !w-[90%] flex flex-col items-center m-auto ">
          <ul>
            <li className="text-slate-700 dark:text-slate-100">Get started long explanation placeholder</li>
            <li className="text-slate-700 dark:text-slate-100">Get started long explanation placeholder</li>
            <li className="text-slate-700 dark:text-slate-100">Get started long explanation placeholder</li>
            <li className="text-slate-700 dark:text-slate-100">Get started long explanation placeholder</li>
            <li className="text-slate-700 dark:text-slate-100">Get started long explanation placeholder</li>
          </ul>
        </div>
      </div>

      <a target="_blank" href="mailto:ty@digitalmasonry.io" rel="noreferrer">
        <div className="normal-box flex items-center flex-col bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] !w-[30em] !h-[9em]">
          <div className="help-circle">
            <FaEnvelope className="help-icons " />
          </div>
          <h4 className="help-header text-t-bd dark:text-blues-100">
            Contact Us
          </h4>
          <p className="help-text">
            Still have questions? We&apos;d love to hear from you!
          </p>
        </div>
      </a>

      <div className="w-full h-[6em] pt-5 bg-clear-pl4 flex  flex-col gap-5">
        <p className="text-[18px] ">Made with ♥️ &nbsp;in Seattle</p>
        <p className="text-[11px]">Copyright © {date} Digital Masonry LLC</p>
      </div>
    </div>
  );
};

export default HelpPage;

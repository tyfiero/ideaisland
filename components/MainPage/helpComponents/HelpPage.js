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
    let date =  new Date().getFullYear();
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
          that wouldn't normally happen. It gets different parts of your brain
          working together, and naturally leads you to truly novel ideas.
        </p>
      ),
    },
    {
      title: "Island Method",
      subtitle: "Why does it work?",
      content: (
        <div>
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
        </div>
      ),
    },
  ];
  return (
    <div className="help-page fade-effect-quick">
      <h1 className="heading-top">Help</h1>

      <div className="help-boxes-div-container">
      <div className="help-boxes-div">

        <div className="help-box">
          <div className="help-circle">
            <FaUserGraduate className="help-icons" />
          </div>
          <h4 className="help-header">Tutorial</h4>
          <p className="help-text">Stuck? See a guided tour of the platform.</p>
        </div>
        <div className="help-box">
          <div className="help-circle">
            <FaRegListAlt className="help-icons" />
          </div>
          <h4 className="help-header">FAQs</h4>
          <p className="help-text">The most common community questions.</p>
        </div>
        <Link href="/">
          <div className="help-box">
            <div className="help-circle">
              <FaUserAlt className="help-icons" />
            </div>
            <h4 className="help-header">Account</h4>
            <p className="help-text">Manage billing and account information.</p>
          </div>
        </Link>
      </div>
      <div className="help-boxes-div">

        <a target="_blank" href="https://tally.so/r/wA9xow" rel="noreferrer">
          <div className="help-box">
            <div className="help-circle help-circle-alt">
              <FaRegCommentDots className="help-icons help-icons-alt" />
            </div>
            <h4 className="help-header help-header-alt">Feedback</h4>
            <p className="help-text">
              Suggest new features or tell us how we are doing!
            </p>
          </div>
        </a>
        <a target="_blank" href="https://tally.so/r/m6z0Ym" rel="noreferrer">
          <div className="help-box">
            <div className="help-circle help-circle-alt">
              <FaBug className="help-icons help-icons-alt" />
            </div>
            <h4 className="help-header help-header-alt">Report Issue</h4>
            <p className="help-text">Submit a bug to our developer. </p>
          </div>
        </a>
        <a target="_blank" href="https://ideaisland.io" rel="noreferrer">
          <div className="help-box">
            <div className="help-circle help-circle-alt">
              <img
                src="/bulb.svg"
                alt="logo"
                className="w-auto mx-auto h- sm:h-6"
              />
            </div>
            <h4 className="help-header help-header-alt">About Us</h4>
            <p className="help-text">
              Learn about our company and our mission.
            </p>
          </div>
        </a>
      </div>
      </div>

      
      <div className="normal-box-soft w-[70%] min-h-[15em] flex flex-col items-center">
        <h4 className="help-header">FAQs</h4>
        <HelpAccordion
          items={items}
          initialActiveItemIndex={0}
          closeOtherItemsOnClick
        />
      </div>

      {/* <Accordion /> */}
      <div className="normal-box-soft w-[70%] min-h-[15em]">
        <h4 className="help-header">Tips and Tricks</h4>

        <p>Pointers to help you come up with your best ideas.</p>
        <div className="normal-box !w-[90%] flex flex-col items-center m0-auto ">
          <ul className="my-1">
            <li>Tip or trick long explanation placeholder</li>
            <li>Tip or trick long explanation placeholder</li>
            <li>Tip or trick long explanation placeholder</li>
            <li>Tip or trick long explanation placeholder</li>
            <li>Tip or trick long explanation placeholder</li>
            <li>Tip or trick long explanation placeholder</li>
          </ul>
        </div>
      </div>

      <div className="normal-box-soft w-[70%] min-h-[15em]">
        <h4 className="help-header">Get started</h4>

        <p>
          A quick start guide that will have you well on your way to awesome
          "Aha!" moments
        </p>
        <div className="normal-box !w-[90%] flex flex-col items-center m0-auto ">
          <ul>
            <li>Get started long explanation placeholder</li>
            <li>Get started long explanation placeholder</li>
            <li>Get started long explanation placeholder</li>
            <li>Get started long explanation placeholder</li>
            <li>Get started long explanation placeholder</li>
          </ul>
        </div>
      </div>

      <a target="_blank" href="mailto:ty@digitalmasonry.io" rel="noreferrer">
        <div className="help-box !w-[30em] !h-[9em]">
          <div className="help-circle">
            <FaEnvelope className="help-icons " />
          </div>
          <h4 className="help-header ">Contact Us</h4>
          <p className="help-text">
            Still have questions? We'd love to hear from you!
          </p>
        </div>
      </a>

      <p className="text-[18px]">Made with ♥️ in Seattle</p>
      <p className="text-[11px]">Copyright © {date} Digital Masonry LLC</p>

    </div>
  );
};

export default HelpPage;

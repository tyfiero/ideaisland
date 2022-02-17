import React from "react";
import {
  FaUserAlt,
  FaBug,
  FaUserGraduate,
  FaRegCommentDots,
  FaRegListAlt,
} from "react-icons/fa";
import Link from "next/link";

const HelpPage = () => {
  return (
    <div className="help-page fade-effect-quick">
      <h1 className="heading-top">Help Page</h1>

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
      </div>

      <p>Get started Checklist</p>
      <p>Guided tours/walkthroughs</p>
      <p>Tips and Tricks</p>
      <p>FAQ</p>
      <p>Contact us</p>

      <p>Made with ♥️ in Seattle</p>
    </div>
  );
};

export default HelpPage;

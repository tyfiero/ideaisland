import React from "react";
import toast from "react-hot-toast";
import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  InstapaperIcon,
  LinkedinIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const Modal = ({ setOpenShareMenu }) => {
  let link = "ideaisland.io";
  let imageUrl = "https://ideaisland.vercel.app/bulb.svg";
  let title = "ideaisland";
  let description =
    "An app that helps you find the best ideas for your next project";
  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link);

      toast.success("Link Copied to Clipboard");
    }
  };

  return (
    <>
      <div className="darkBG fade-effect-quick" onClick={() => setOpenShareMenu(false)} />
      <div className="flex flex-col items-center centered">
        <div
          className={
            "modal glass-box bg-[rgba(255, 255, 255, 0.25)] dark:bg-[hsla(200,0%,5%,0.35)] sm:max-w-[90%]  shadow-2xl flex flex-col  items-center grow-effect"
          }
        >
          <div className={"modalHeader"}>
            <h5 className="text-2xl text-t-bd dark:text-blues-100">Share</h5>
          </div>
          <button className="closeBtn" onClick={() => setOpenShareMenu(false)}>
            X
          </button>
          <div className="modalContent text-slate-800 dark:text-slate-50">
            If you found value with these tools, your friends will too!
          </div>

          <div className="flex gap-2 h-[5em] w-[full]">
            <EmailShareButton
              subject={"Check out this app"}
              body={"I think you would like it!"}
              url={link}
              separator="  "
            >
              <EmailIcon size={40} round />
            </EmailShareButton>

            <TwitterShareButton
              url={link}
              title={
                "Check out this app I found, it helps you find the best ideas for your next project"
              }
              via="TheIdeaIsland"
              hashtags={["ideas", "innovation", "softwaredevelopment"]}
            >
              <TwitterIcon size={40} round />
            </TwitterShareButton>

            <FacebookShareButton url={link} quote={"Check out this app!"}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>

            <RedditShareButton url={link}>
              <RedditIcon size={40} round />
            </RedditShareButton>

            <PinterestShareButton
              media={imageUrl}
              url={link}
              description={description}
            >
              <PinterestIcon size={40} round />
            </PinterestShareButton>

          

            <TelegramShareButton url={link} title={title}>
              <TelegramIcon size={40} round />
            </TelegramShareButton>

            <WhatsappShareButton url={link} title={title}>
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>
          </div>
          <div className="flex justify-center gap-2">
            <input className="rounded-xl" type="text" value={link} disabled />

            <button className="copyBtn" onClick={copyToClipboard}>
              Copy
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

import React from "react";
// import { useState } from "react";
import { auth } from "../../lib/firebase";

import AuthCheck from "../../components/Authentication/AuthCheck";

import {
  FaLaptopCode,
  FaShoppingBag,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaCheck,
  FaInfoCircle,
  FaPlus,
  FaTimes,
  FaUser,
  FaDatabase,
  FaCode,
  FaEthereum,
  FaReact,
  FaPalette,
  FaServer,
  FaGitAlt,
  FaTools,
  FaInfinity,
  FaBan,
  FaHeart,
  FaLink,
  FaRegHeart,
  FaArrowRight,
} from "react-icons/fa";

import { useRouter } from "next/router";
import Tilt from "react-parallax-tilt";

const ImplementationPage = (props) => {
  return (
    <div className="implementation-page fade-effect-quick">
      <h1 className="text-3xl text-t-bd dark:text-blues-100">Next Steps</h1>

      <div className="flex flex-col items-center w-full">
        <div className="flex flex-wrap items-center w-[90%]  px-5 pb-5 rounded-2xl">
          <div className="flex w-full"></div>

          <div></div>

          <div className="relative flex flex-wrap items-center justify-center w-full px-5 py-5 mt-2 transition duration-[1400ms] ring-2 hover:ring-8 ring-t-bl rounded-2xl hover:bg-clear-bl2">
            <div className="flex w-full ">
              {/* <p className="pb-3 text-t-bl">Web2 Tools</p> */}
            </div>
            <div className="flex">
              <Tilt
                className="parallax-effect-glare-scale"
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={500}
                transitionSpeed={1000}
                scale={1.02}
                glareEnable={true}
                glarePosition="bottom"
                glareColor="#ffffff"
              >
                <ImplementTool
                  route="/next-steps/features"
                  color={"bg-indigo-200"}
                  bColor="md:hover:ring-indigo-500"
                  textColor=" text-indigo-600"
                  title="Add Features"
                  description="Select the features you want to add to your app and prioritize them."
                  imgSrc="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmxvdyUyMGNoYXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                />
              </Tilt>
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                transitionSpeed={1000}
                scale={1.02}
              >
                <ImplementTool
                  route="/next-steps/tech-stack"
                  color={"bg-sky-200"}
                  bColor="md:hover:ring-sky-500"
                  textColor=" text-sky-600"
                  title="Select Tech Stack"
                  description="Plan the technical side of the project. Select the technologies you want to use and forecast costs."
                  imgSrc="https://images.unsplash.com/photo-1592609931095-54a2168ae893?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGNvZGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                />
              </Tilt>

              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                transitionSpeed={1000}
                scale={1.02}
              >
                <ImplementTool
                  route="/next-steps/mrr-calculator"
                  color={"bg-green-200"}
                  bColor="md:hover:ring-green-500"
                  textColor=" text-green-600"
                  title="MRR Calculator"
                  description="This tool helps you accurately forecast future revenue growth from a subscription based business model."
                  imgSrc="https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Z3JhcGh8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                />
              </Tilt>

           
            </div>
          </div>
         
        </div>

        <div className="flex p-2 mt-5 mb-10 rounded-xl bg-clear-pl4">
          <p>
            {"More tools coming soon! Have a suggestion for a tool you want?"}{" "}
          </p>
          <a
            className="ml-2 underline text-blues-300"
            href="https://tally.so/r/w7Q4Pm"
            target="_blank"
            rel="noreferrer"
          >
            Let us know!
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImplementationPage;

const ImplementTool = ({
  color,
  bColor,
  imgSrc,
  title,
  description,
  textColor,
  route,
}) => {
  const router = useRouter();

  return (
    <div
      className={
        "flex flex-col core-element items-center justify-center w-[15em] h-[25em] p-1 bg-white/80 dark:bg-slate-800 rounded-xl md:hover:scale-105 transition duration-500 md:hover:ring-8  ring-clear-bd3 mx-2 " +
        bColor
      }
    >
      <div className="w-full h-[10em] bg-white/40  rounded-lg">
        <img
          src={imgSrc}
          alt="logo"
          className="object-cover  h-[10em] w-full rounded-lg"
        />
      </div>

      <div className="flex flex-col justify-between items-center h-[15em] px-5 py-2 inner-element">
        <h3 className={"m-0 text-2xl  " + textColor}>{title}</h3>

        <p className="text-sm text-left">{description}</p>
        <button
          onClick={() => {
            router.push(route);
          }}
          className={
            " flex gap-1 items-center rounded-full justify-center p-1 border-2  md:hover:scale-105 md:active:scale-95 whitespace-nowrap transition cursor-pointer h-[3em] w-[90%] " +
            color +
            " " +
            bColor
          }
        >
          <p className="m-0 dark:text-slate-800">Launch</p>{" "}
          <FaArrowRight className={textColor} />
        </button>
      </div>
    </div>
  );
};

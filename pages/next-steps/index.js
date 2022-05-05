import React from "react";
// import { useState } from "react";
import { auth } from "../../lib/firebase";

// import axios from "axios";
// let key = process.env.NEXT_PUBLIC_TEST;
// console.log(key + "key");
// const axios = require("axios");

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

const ImplementationPage = (props) => {
  return (
    <div className="implementation-page fade-effect-quick">
      <h1 className="text-3xl text-t-bd dark:text-blues-100">Next Steps</h1>

      <div className="flex flex-col items-center w-full">
        <div className="flex flex-wrap items-center w-[90%]  px-5 pb-5 rounded-2xl">
          <div className="flex w-full">
          </div>

          <div></div>

          <div className="relative flex flex-wrap items-center justify-center w-full px-5 pb-5 border-8 border-t-bl rounded-2xl bg-clear-bl2">
            <div className="flex w-full ">
              <p className="pb-3 text-t-bl">Web2 Tools</p>
            </div>
            <div className="flex">
            <ImplementTool
              route="/implementation/mrr-calculator"
              color={"bg-blues-100"}
              bColor="md:hover:ring-clear-bd3"
              textColor=" text-t-bl"
              title="MRR Calculator"
              description="This tool helps you accurately forecast future revenue growth from a subscription based business model."
              imgSrc="https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Z3JhcGh8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
            />
            {/* <ImplementTool
              route="/implementation/mrr-calculator"
              color={"bg-blues-100"}
              bColor="md:hover:ring-clear-bd3"
              textColor=" text-t-bl"
              title="Pricing Tool"
              description="This tool helps you price your products and services."
              imgSrc="https://images.unsplash.com/photo-1598520106830-8c45c2035460?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2hpdGVib2FyZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            />
            <ImplementTool
              route="/implementation/mrr-calculator"
              color={"bg-blues-100"}
              bColor="md:hover:ring-clear-bd3"
              textColor=" text-t-bl"
              title="Runway Calculator"
              description="How long can you operate without revenue? This tool aims to show you."
              imgSrc="https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjZ8fGNhbGN1bGF0b3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
            />
            <ImplementTool
              route="/implementation/mrr-calculator"
              color={"bg-blues-100"}
              bColor="md:hover:ring-clear-bd3"
              textColor=" text-t-bl"
              title="Marketing plan"
              description="Build a simple marketing plan to help you grow your business."
              imgSrc="https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDd8fG1hcmtldGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            /> */}
          </div></div>
          {/* <div className="flex flex-wrap items-center justify-center w-full px-5 pb-5 mt-2 border-4 border-t-pm rounded-2xl bg-clear-pm2">
            <div className="flex w-full">
              <p className="pb-3 text-t-pm">Web3 Tools</p>
            </div>
            <div className="flex">

            <ImplementTool
              route="/implementation/mrr-calculator"
              color={"bg-t-pl"}
              bColor="md:hover:ring-t-pl"
              textColor=" text-t-pm"
              title="Tokenomics Calculator"
              description="A calculator for calculating the tokenomics of a crypto project."
              imgSrc="https://images.unsplash.com/photo-1631603090989-93f9ef6f9d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y3J5cHRvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            />
            <ImplementTool
              route="/implementation/mrr-calculator"
              color={"bg-t-pl"}
              bColor="md:hover:ring-t-pl"
              textColor=" text-t-pm"
              title="NFT Project Tool"
              description="Plan out your NFT project with this tool."
              imgSrc="https://images.unsplash.com/photo-1642751227050-feb02d648136?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzB8fGV0aGVyZXVtfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            />
            <ImplementTool
              route="/implementation/mrr-calculator"
              color={"bg-t-pl"}
              bColor="md:hover:ring-t-pl"
              textColor=" text-t-pm"
              title="DAO Tool"
              description="A calculator to plan a DAO."
              imgSrc="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fG5ldHdvcmslMjBwZW9wbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
            />
            <ImplementTool
              route="/implementation/mrr-calculator"
              color={"bg-t-pl"}
              bColor="md:hover:ring-t-pl"
              textColor=" text-t-pm"
              title="Ecosystem Tool"
              description="A tool to map out crypto ecosystems and identify gaps in the market."
              imgSrc="https://images.unsplash.com/photo-1634704760994-96e3ccf2ae85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGV0aGVyZXVtfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            />
          </div>
          </div> */}
     
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
        "flex flex-col items-center justify-center w-[15em] h-[25em] p-1 bg-white/80 dark:bg-slate-800 rounded-xl md:hover:scale-105 transition duration-500 md:hover:ring-8  ring-clear-bd3 mx-2 " +
        bColor
      }
    >
      <div className="w-full h-[10em] bg-white/40  ">
        <img
          src={imgSrc}
          alt="logo"
          className="object-cover  h-[10em] w-full rounded-lg"
        />
      </div>

      <div className="flex flex-col justify-between items-center h-[15em] px-5 py-2">
        <h3 className={"m-0 text-2xl " + textColor}>{title}</h3>

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
          <p className="m-0">Launch</p> <FaArrowRight className={textColor} />
        </button>
      </div>
    </div>
  );
};

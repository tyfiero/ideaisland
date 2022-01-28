import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import { Link } from "react-router-dom";
// import { IconName } from "react-icons/fa";

import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
// import { isMobile, browserName } from "react-device-detect";
// import { Squash as Hamburger } from "hamburger-react";
// import { SentencePage } from "../pages/SolutionPage";
import {
  FaHome,
  FaBug,
  FaBrain,
  FaRandom,
  FaAlignLeft,
  FaSitemap,
  FaBacterium,
  FaQuestion,
} from "react-icons/fa";
import Link from "next/link";

const Sidebar2 = (props) => {
  //   console.log(isMobile + "mobile");
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  const [showText, setShowText] = useState(false);
  const [clicked, setClicked] = useState(false);

  const [selectedIcon, setSelectedIcon] = useState(0);
  const [currentUrl, setCurrentUrl] = useState("/");
  const [hovered, setHovered] = useState(false);

  //   const handleMouseEnter = (e) => {

  //     // e.target.style.background = "grey";
  //   };
  //   const handleMouseLeave = (e) => {

  //   };

  const hoverHandler = () => {
    // console.log(hovered + "hover");

    setHovered(true);
  };
  const leaveHandler = () => {
    // console.log(hovered + "leave");

    setHovered(false);
  };

  const sidebarClickHandler = () => {
    // console.log("clicked");
    setClicked(true);
    // setTimeout(function () {
    //   //   console.log(event.target.value + " LONG");

    //   setClicked(false);
    // }, 3000);
  };
  return (
    <div
      onMouseEnter={hoverHandler}
      onMouseLeave={leaveHandler}
      className=" md:border-l-0 flex md:left-0 md:top-[25%] sm:bottom-0  md:bottom-[30%] sm:w-full md:flex-col sm:flex-row md:w-36 md:rounded-r-[3rem] sm:rounded-t-[3rem]  md:rounded-tl-none sm:rounded-b-1xl md:absolute sm:fixed bg-gradient-to-t from-t-bl  to-t-pl border-black border-2 content-center md:items-left text-black  justify-evenly	md:py-4 sm:pb-1 sm:pt-4 sm:overflow-visible  z-10"
    >
      <Link href="/Home">
        <a>
          <div className="flex ml-2 md:flex-row sm:flex-col hover:text-white sm:items-center">
            <FaHome className="text-3xl" />
            <p>Home</p>
          </div>
        </a>
      </Link>

      <Link href="/Problem">
        <a>
          <div className="flex w-full ml-2 md:flex-row sm:flex-col hover:text-white sm:items-center">
            <FaBug className="text-3xl" />
            <p className="sm:text-[14px]">Problem</p>
          </div>
        </a>
      </Link>
      <Link href="/Solutions">
        <a>
          <div className="flex ml-2 md:flex-row sm:flex-col hover:text-white sm:items-center">
            <FaBrain className="text-3xl" />
            <p className="sm:text-[14px]">Solutions</p>
          </div>
        </a>
      </Link>
      <Link href="/Implementation">
        <a>
          <div className="flex ml-2 md:flex-row sm:flex-col hover:text-white sm:items-center">
            <FaSitemap className="text-3xl" />
            <p className="sm:text-[12px]">Implementation</p>
          </div>
        </a>
      </Link>
      <Link href="/Help">
        <a>
          <div className="flex ml-2 md:flex-row sm:flex-col hover:text-white sm:items-center">
            <FaQuestion className="text-3xl" />
            <p className="sm:text-[14px]">Help</p>
          </div>
        </a>
      </Link>
      {/* <Link href="/Home"></Link> */}
    </div>

    // <>
    //   <IconContext.Provider value={{ color: "black" }}>
    //     <div
    //       sidebar={sidebar}
    //       onMouseEnter={handleMouseEnter}
    //       onMouseLeave={handleMouseLeave}
    //       onClick={sidebarClickHandler}
    //       //   onClick={console.log("clicked")}
    //     >
    //       <SidebarWrap>
    //         {/* <NavIcon to="#">
    //           <AiIcons.AiOutlineClose onClick={showSidebar} />
    //         </NavIcon> */}
    //         {/* {SidebarData.map((item, index) => {
    //           return <SubMenu item={item} key={index} />;
    //         })} */}
    //         {SidebarData.map((item, index) => {
    //           {
    //             // console.log(item);
    //           }

    //           return (
    //             <div
    //               className={
    //                 index === selectedIcon ? "sidebar-item-selected" : null
    //               }
    //               //   className={
    //               //     "sidebar-item" + index + " " + (selectedIcon && selected)
    //               //   }
    //               key={index}
    //             >
    //               <SubMenu
    //                 hover={showText}
    //                 item={item}
    //                 key={index}
    //                 click={clicked}
    //                 onClick={submenuClickHandler}
    //               />
    //             </div>
    //           );
    //         })}
    //         {/* <SubMenu item={item} key={index} /> */}
    //       </SidebarWrap>
    //     </div>
    //   </IconContext.Provider>
    // </>
  );
};

export default Sidebar2;

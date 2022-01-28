import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { IconName } from "react-icons/fa";

// import { isMobile, browserName } from "react-device-detect";
// import { Squash as Hamburger } from "hamburger-react";
// import { SentencePage } from "../pages/SolutionPage";
import { FaHome, FaBug, FaBrain, FaSitemap, FaQuestion } from "react-icons/fa";
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
  const [selected, setSelected] = useState(0);

  //   const handleMouseEnter = (e) => {

  //     // e.target.style.background = "grey";
  //   };
  //   const handleMouseLeave = (e) => {

  //   };
  // const divClickHandler = () => {
  //     setSe
  // }
  const hoverHandler = () => {
    // console.log(hovered + "hover");
    setTimeout(function () {
      setHovered(true);
    }, 250);
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

  let clickStyle = {
    color: "white",
  };
  let unClickStyle = {
    color: "black",
  };

  return (
    <div
      className="sidebardiv md:border-l-0 flex md:left-0 md:top-[25%] sm:bottom-0  md:bottom-[30%] sm:w-full md:flex-col sm:flex-row md:rounded-r-[3rem] sm:rounded-t-[3rem]  md:rounded-tl-none sm:rounded-b-1xl md:absolute sm:fixed bg-gradient-to-t from-t-bl  to-t-pl border-black border-[2px] content-center md:items-left  justify-evenly	md:py-4 sm:pb-1 sm:pt-4 sm:overflow-visible  z-10"
    >
      <Link href="/Home">
        <a>
          <div
            className="sidebarunittcontainer flex rounded-[4rem] h-12 md:flex-row sm:flex-col  hover:bg-t-bl sm:items-center"
            style={selected === 0 ? clickStyle : unClickStyle}
            onClick={() => {
              setSelected(0);
            }}
          >
            <FaHome className=" sideicon" />
         <p className="sidebartext ml-2 text-[14px]">Home</p>
          </div>
        </a>
      </Link>

      <Link href="/Problem">
        <a>
          <div
            className="sidebarunittcontainer flex rounded-[4rem] h-12 md:flex-row sm:flex-col   hover:bg-t-bl sm:items-center"
            style={selected === 1 ? clickStyle : unClickStyle}
            onClick={() => {
              setSelected(1);
            }}
          >
            <FaBug className="sideicon" />
              <p className="sidebartext sm:text-[14px] ml-2">Problem</p>
          </div>
        </a>
      </Link>
      <Link href="/Solutions">
        <a>
          <div
            className="sidebarunittcontainer flex rounded-[4rem] h-12 md:flex-row sm:flex-col   hover:bg-t-bl sm:items-center"
            style={selected === 2 ? clickStyle : unClickStyle}
            onClick={() => {
              setSelected(2);
            }}
          >
            <FaBrain className="sideicon" />
              <p className="sidebartext sm:text-[14px] ml-2">Solutions</p>
          </div>
        </a>
      </Link>
      <Link href="/Implementation">
        <a>
          <div
            className=" sidebarunittcontainer flex rounded-[4rem] h-12 md:flex-row sm:flex-col  hover:bg-t-bl sm:items-center"
            style={selected === 3 ? clickStyle : unClickStyle}
            onClick={() => {
              setSelected(3);
            }}
          >
            <FaSitemap className="sideicon" />
            <p className="sidebartext sm:text-[14px] ml-2">Plan</p>
          </div>
        </a>
      </Link>
      <Link href="/Help">
        <a>
          <div
            className="sidebarunittcontainer flex rounded-[4rem] h-12 md:flex-row sm:flex-col hover:text-white  hover:bg-t-bl sm:items-center"
            style={selected === 4 ? clickStyle : unClickStyle}
            onClick={() => {
              setSelected(4);
            }}
          >
            <FaQuestion className="sideicon" />
              <p className=" sidebartext sm:text-[14px] ml-2">Help</p>
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

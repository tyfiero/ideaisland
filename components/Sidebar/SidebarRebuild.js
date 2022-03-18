import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
// import { IconName } from "react-icons/fa";

// import { isMobile, browserName } from "react-device-detect";
// import { Squash as Hamburger } from "hamburger-react";
// import { SentencePage } from "../pages/SolutionPage";
import {
  FaHome,
  FaBug,
  FaBrain,
  FaSitemap,
  FaQuestion,
  FaBook,
} from "react-icons/fa";
import Link from "next/link";
import { useUserData } from "../../lib/hooks";
import { UserContext } from "../../lib/context";
import { useSelector } from "react-redux";

const Sidebar2 = (props) => {
  const { user, username } = useContext(UserContext);

  const [selected, setSelected] = useState(0);
  // const [usernameSlug, setUsernameSlug] = useState("");
  const userData = useUserData();
  const userRedux = useSelector((state) => state.userData);
  const userNameRedux = useSelector((state) => state.userName);
  const loggedIn = useSelector((state) => state.loggedIn);

  // useEffect(() => {
  //   //I fixed it, this code can be deleted i think

  //   if (userRedux) {
  //     setUsernameSlug(userNameRedux);
  //     console.log(usernameSlug + "redux");
  //     console.log(userRedux);

  //     return usernameSlug;
  //   } else if (username) {
  //     setUsernameSlug(username);
  //     console.log(usernameSlug + "username context");
  //     return usernameSlug;
  //   } else {
  //     console.log("Dammit");
  //   }
  // }, []);

  let clickStyle = {
    color: "#fbf0ff",
  };
  let unClickStyle = {
    color: "black",
  };

  return (
    <div className="sidebardiv md:border-l-0 flex md:left-0 md:top-[25%] sm:bottom-0  md:bottom-[30%] sm:w-full md:flex-col sm:flex-row md:rounded-r-[3rem] sm:rounded-t-[3rem]  md:rounded-tl-none sm:rounded-b-1xl md:absolute sm:fixed bg-gradient-to-t from-clear-bl  to-clear-pl border-black border-[0px] content-center md:items-left  justify-evenly	md:py-4 sm:pb-1 sm:pt-4 sm:overflow-visible  z-10">
      <Link href="/Home">
        <a>
          <div
            className="sidebarunittcontainer flex rounded-[4rem] h-12 md:flex-row sm:flex-col  hover:bg-clear-w4 sm:items-center  md:rounded-l-none"
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

      {/* <Link href={loggedIn ?  `user/${userNameRedux}/notes` :  "/login"}>
       */}
     {/* <Link href={`user/${userNameRedux || null}/notes`}> */}
     <Link href={`/notes`} passHref>

      
        <a>
          <div
            className=" sidebarunittcontainer flex rounded-[4rem] h-12 md:flex-row sm:flex-col  hover:bg-clear-w1 sm:items-center md:rounded-l-none"
            style={selected === 4 ? clickStyle : unClickStyle}
            onClick={() => {
              setSelected(4);
            }}
          >
            <FaBook className="sideicon" />
            <p className="sidebartext sm:text-[14px] ml-2">Notes</p>
          </div>
        </a>
      </Link>
      <Link href="/Problem">
        <a>
          <div
            className="sidebarunittcontainer flex rounded-[4rem] h-12 md:flex-row sm:flex-col   hover:bg-clear-w3 sm:items-center md:rounded-l-none"
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
            className="sidebarunittcontainer flex rounded-[4rem] h-12 md:flex-row sm:flex-col   hover:bg-clear-w2 sm:items-center md:rounded-l-none"
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
            className=" sidebarunittcontainer flex rounded-[4rem] h-12 md:flex-row sm:flex-col  hover:bg-clear-w1 sm:items-center md:rounded-l-none"
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
            className="sidebarunittcontainer flex rounded-[4rem] h-12 md:flex-row sm:flex-col hover:text-white  hover:bg-clear-w sm:items-center md:rounded-l-none "
            style={selected === 5 ? clickStyle : unClickStyle}
            onClick={() => {
              setSelected(5);
            }}
          >
            <FaQuestion className="z-10 sideicon" />
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

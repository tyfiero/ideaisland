import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import { Link } from "react-router-dom";
// import { IconName } from "react-icons/fa";

import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import { isMobile, browserName } from "react-device-detect";
// import { Squash as Hamburger } from "hamburger-react";
// import { SentencePage } from "../pages/SolutionPage";
// import { useLocation } from "react-router-dom";

const Nav = styled.div`
  //   background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

// const NavIcon = styled(Link)`
//   margin-left: 2rem;
//   font-size: 2rem;
//   height: 80px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// `;
let SidebarNav;

SidebarNav = styled.nav`
  //   background: #15171c;
  background: linear-gradient(
    20deg,
    var(--colorLight1) 0%,
    var(--colorLight2) 35%,
    var(--colorDark1) 58%,
    var(--colorDark2) 100%
  );
  box-shadow: 0 0 12px 5px white;

  /* margin-left: 1rem; */
  /* border-radius: 2rem; */
  border-top-right-radius: 2rem;
  border-bottom-right-radius: 2rem;
  border-top: solid 2px black;
  color: black;
  //   height: 50vh;
  display: flex;
  //   justify-content: center;
  justify-content: space-evenly;
  align-items: center;
  //   padding-right: 58px;

  position: fixed;
  top: 25%;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
  //   font-size: 1rem;
  &:hover {
    width: 200px;
  }
`;

// if (isMobile) {
//   SidebarNav = styled.nav`
//     // display: inline-flex;
//     // flex-direction: row;
//     // flex-wrap: wrap;
//     // place-items: center;
//     // //   background: #15171c;
//     // background: linear-gradient(
//     //   90deg,
//     //   var(--colorLight1) 0%,
//     //   var(--colorLight2) 35%,
//     //   var(--colorDark1) 58%,
//     //   var(--colorDark2) 100%
//     // );
//     // box-shadow: 0 0 12px 5px white;
//     // border-radius: 2rem;
//     // color: black;
//     // width: 100vw;
//     // height: 50vh;
//     // justify-content: center;
//     // position: fixed;
//     // bottom: 0%;
//     // transition: 350ms;
//     // z-index: 10;
//     //   font-size: 1rem;
//   `;
// }

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = (props) => {
  //   console.log(isMobile + "mobile");
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  const [showText, setShowText] = useState(false);
  const [clicked, setClicked] = useState(false);

  const [selectedIcon, setSelectedIcon] = useState(0);
  const [currentUrl, setCurrentUrl] = useState("/");

  useEffect(() => {
    if (isMobile) {
      setSidebar(false);
      setShowText(true);
    }
  }, [isMobile]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMobile) {
      setSidebar(props.toggle);
    }
  }, [props.toggle]);

  const handleMouseEnter = (e) => {
    if (!isMobile) {
      setShowText(true);
      //   console.log(showText + " showtextENTER");
    }
    // e.target.style.background = "grey";
  };
  const handleMouseLeave = (e) => {
    if (!isMobile) {
      setShowText(false);
      //   console.log(showText + " showtextLEAVE");
    }
  };

  let hamburgerStyle = {
    position: "fixed",
    top: "100px",
    left: "80%",
  };

  const submenuClickHandler = (index) => {
    setShowText(false);

    // if (isMobile) {

    //   setSidebar(false);
    // }
  };
  // const location = useLocation();
  //   console.log(location.pathname);
  // let path = location.pathname;

  useEffect(() => {
    // console.log("Location changed");
    // setCurrentUrl(path);
    if (location.pathname === "/") {
      setSelectedIcon(0);
    } else if (location.pathname === "/problem") {
      setSelectedIcon(1);
    } else if (location.pathname === "/solutions") {
      setSelectedIcon(2);
    } else if (location.pathname === "/implementation") {
      setSelectedIcon(3);
    } else if (location.pathname === "/help") {
      setSelectedIcon(4);
    }
  }, []);

  //   const Root = () => {
  //     const history = useHistory();

  //     useEffect(() => {
  //       return history.listen((location) => {
  //         console.log(`You changed the page to: ${location.pathname}`);
  //       });
  //     }, [history]);
  //   };

  //   let selected = "black";
  const sidebarClickHandler = () => {
    // console.log("clicked");
    setClicked(true);
    // setTimeout(function () {
    //   //   console.log(event.target.value + " LONG");

    //   setClicked(false);
    // }, 3000);
  };
  return (
    <>
      <IconContext.Provider value={{ color: "black" }}>
        <SidebarNav
          sidebar={sidebar}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={sidebarClickHandler}
          //   onClick={console.log("clicked")}
        >
          <SidebarWrap>
            {/* <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon> */}
            {/* {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })} */}
            {SidebarData.map((item, index) => {
              {
                // console.log(item);
              }

              return (
                <div
                  className={
                    index === selectedIcon ? "sidebar-item-selected" : null
                  }
                  //   className={
                  //     "sidebar-item" + index + " " + (selectedIcon && selected)
                  //   }
                  key={index}
                >
                  <SubMenu
                    hover={showText}
                    item={item}
                    key={index}
                    click={clicked}
                    onClick={submenuClickHandler}
                  />
                </div>
              );
            })}
            {/* <SubMenu item={item} key={index} /> */}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;

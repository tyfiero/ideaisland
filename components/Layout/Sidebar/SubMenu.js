import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled("div")`
  display: flex;
  color: black;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  border-radius: 3rem;

  text-decoration: none;
  font-size: 18px;
  &:hover {
    background: var(--colorDark2soft);
    border-right: 14px solid var(--colorPop);
    border-radius: 8rem;

    cursor: pointer;
    color: var(--colorLight1);
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
  font-size: 15px;
  text-decoration: bolder;
  text
`;

const DropdownLink = styled("div")`
  //   background: #414757;
  //   background: linear-gradient(
  //     180deg,
  //     var(--colorLight1) 0%,
  //     var(--colorDark1) 100%
  //   );
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  border-radius: 1rem;
  text-decoration: none;
  //   width: 70%;
  color: black;
  //   border-top: solid 2px var(--colorDark1);

  font-size: 15px;
  &:hover {
    background: var(--colorDark2);
    cursor: pointer;
    color: var(--colorLight1);
  }
`;

const SubMenu = ({ item, hover, click }) => {
  //   console.log("-------SUBMENU RERENDERED");
  const [subnav, setSubnav] = useState(false);
  //   const [subnavHovered, setSubnavHovered] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  let textLabel = <SidebarLabel>{item.title}</SidebarLabel>;

  useEffect(() => {
    // console.log(hover + "HOVER");
    // setSubnavHovered(!subnavHovered);
    //   console.log(subnavHovered + "snH");

    if (hover === false) {
      setSubnav(false);
      //   console.log(subnavHovered + "close");
    }
  }, [hover]);

  //attempt to have submenu closed when menu is clicked. Not working tho
  //   useEffect(() => {
  //     console.log(click + "CLICK");
  //     // setSubnavHovered(!subnavHovered);
  //     //   console.log(subnavHovered + "snH");

  //     if (click === true) {
  //       setSubnav(false);
  //       //   console.log(subnavHovered + "close");
  //     }
  //   }, [click]);

  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          {hover === true ? textLabel : null}
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink
              className="pl-12 "
              to={item.path}
              key={index}
              onClick={() => {
                setSubnav(false);
                // console.log(index);
              }}
            >
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
        {/* height: 60px;
  display: flex;
  align-items: center;
  border-radius: 1rem;
  text-decoration: none;
  //   width: 70%;
  color: black;
  //   border-top: solid 2px var(--colorDark1);

  font-size: 15px;
  &:hover {
    background: var(--colorDark2);
    cursor: pointer;
    color: var(--colorLight1);
  } */}
      {/* {subnav === true
        ? item.subNav.map((item, index) => {
            return (
              <DropdownLink
                to={item.path}
                key={index}
                onClick={() => {
                  setSubnav(false);
                }}
              >
                {item.icon}
                <SidebarLabel>{item.title}</SidebarLabel>
              </DropdownLink>
            );
          })
        : null} */}
    </>
  );
};

export default SubMenu;

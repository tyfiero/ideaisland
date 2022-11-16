import React from "react";
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


export const SidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <FaHome className="icons" />,

  },
  {
    title: "Problem",
    path: "/problem",
    icon: <FaBug />,
  },
  {
    title: "Solutions",
    path: "/solutions",
    icon: <FaBrain />,


    subNav: [
      {
        title: "Combinatorial Tool",
        path: "/solutions/combinatorial",
        icon: <FaRandom />,
        cName: "sub-nav",
      },
      {
        title: "Sentence Tool",
        path: "/solutions/sentence",
        icon: <FaAlignLeft />,
        cName: "sub-nav",
      },
      {
        title: "TBD tool",
        path: "/solutions/TBD",
        icon: <FaBacterium />,
      },
    ],
  },

  {
    title: "Implementation",
    path: "/implementation",
    icon: <FaSitemap />,
  },
  {
    title: "Help",
    path: "/help",
    icon: <FaQuestion />,
  },
];

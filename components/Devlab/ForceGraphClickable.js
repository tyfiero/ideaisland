

import { useCallback, useEffect, useRef, useState } from "react";
import { ForceGraph2D, ForceGraph3D } from "react-force-graph";

import DummyData from "./data.json";

// import Button from "./Button";
// import Info from "./Info";
// import Menu from "./Menu";
// import Panel from "./Panel";
// import Toolbar from "./Toolbar";

// import "./style.scss";

const myInitialData = {
  nodes: [
    {
      id: 1341021,
      user: "name1",
      val: 4
    },
    {
      id: 4062045,
      user: "name2",
      val: 4
    }
  ],
  links: [
    {
      source: 1341021,
      target: 4062045
    }
  ]
};

const nodeToAdd = {
  id: 1346410,
  user: "name3",
  val: 4
};

const applyAnalytics = (data) => {
  const nodes = data.nodes.map((node) => {
    return {
      ...node,
      val: Math.floor(Math.random() * 6) + 1
    };
  });

  const links = data.links.map((link) => {
    return {
      ...link,
      width: 2
    };
  });

  return { ...data, nodes, links };
};
function genRandomTree(N = 300, reverse = false) {
    return {
      nodes: [...Array(N).keys()].map(i => ({ id: i })),
        links: [...Array(N).keys()]
      .filter(id => id)
      .map(id => ({
        [reverse ? 'target' : 'source']: id,
        [reverse ? 'source' : 'target']: Math.round(Math.random() * (id-1))
      }))
    };
  }

export default function ForceGraphClickable() {
  // const testData = myInitialData;
  const testData = applyAnalytics(myInitialData);

  const [myData, setMyData] = useState(genRandomTree());
  const [menuData, setMenuData] = useState(false);
  const [panelData, setPanelData] = useState(false);
  const [is3D, setIs3D] = useState(false);

  const refGraph = useRef();

  const handleOnClickRemoveNode = useCallback(() => {
    if (myData.nodes.find((node) => node.id === nodeToAdd.id)) {
      const links = myData.links.filter(
        (link) =>
          link.source.id !== nodeToAdd.id && link.target.id !== nodeToAdd.id
      );

      setMyData({
        ...myData,
        nodes: myData.nodes.filter((node) => node.id !== nodeToAdd.id),
        links
      });
    }
  }, [myData]);

  const jumpToNode = useCallback(
    (refGraph, node) => {
      if (is3D) {
        const distance = 256;
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

        refGraph.current.cameraPosition(
          {
            x: node.x * distRatio,
            y: node.y * distRatio,
            z: node.z * distRatio
          }, // new position
          node, // lookAt ({ x, y, z })
          1500 // ms transition duration
        );
      } else {
        refGraph.current.centerAt(node.x, node.y, 1500);
      }
    },
    [is3D]
  );

  const handleOnClickAddNode = useCallback(() => {
    const nodeToJumpTo = myData.nodes.find(
      (node) => node.id === myData.nodes[0].id
    );

    jumpToNode(refGraph, nodeToJumpTo);

    if (!myData.nodes.find((node) => node.id === nodeToAdd.id)) {
      setMyData({
        ...myData,
        nodes: [...myData.nodes, nodeToAdd],
        links: [
          ...myData.links,
          {
            target: 1346410,
            source: nodeToJumpTo.id,
            width: 0
          }
        ]
      });
    }
  }, [myData, refGraph, jumpToNode]);

  const handleOnClickNode = useCallback((node) => {
    setMenuData(false);
    setPanelData({ ...node });
  }, []);

  const handleOnRightClickNode = useCallback((node, event) => {
    setMenuData({
      positionX: event.pageX,
      positionY: event.pageY
    });
  }, []);

  const handleOnClickBackGround = useCallback((e) => {
    setMenuData(false);
  }, []);

  const handleOnRightClickBackGround = useCallback(() => {
    setMenuData(false);
  }, []);

  const handleOnclickClosePanel = useCallback(() => {
    setPanelData(false);
    setMenuData(false);
  }, []);

  const handleOnclickJumpToNode = useCallback(
    (node) => {
      jumpToNode(refGraph, node);
    },
    [refGraph, jumpToNode]
  );

  const handleOnClickToggle3D = useCallback(() => {
    setIs3D(!is3D);
  }, [is3D]);

  const Space = is3D ? ForceGraph3D : ForceGraph2D;

  return (
    <div className="App">
      <Space
        ref={refGraph}
        graphData={myData}
        nodeAutoColorBy={(node) => node.user}
        onNodeClick={handleOnClickNode}
        onNodeRightClick={handleOnRightClickNode}
        onBackgroundClick={handleOnClickBackGround}
        onBackgroundRightClick={handleOnRightClickBackGround}
        nodeVal={(node) => node.val || 0}
        nodeLabel={(node) => node.user}
        onNodeDragEnd={(node) => {
          node.fx = node.x;
          node.fy = node.y;
          node.fz = node.z;
        }}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={(link) => {
          return link.width;
        }}
      />
      {panelData && (
        <Panel
          node={panelData}
          onClickClose={handleOnclickClosePanel}
          onClickJumpToNode={handleOnclickJumpToNode}
        />
      )}
      {menuData && (
        <Menu positionX={menuData.positionX} positionY={menuData.positionY} />
      )}
      <Toolbar>
        <Button onClick={handleOnClickAddNode}>Add node</Button>
        <Button onClick={handleOnClickRemoveNode}>Remove node</Button>
        <Button onClick={handleOnClickToggle3D}>Toggle Magic</Button>
      </Toolbar>
      <Info countNodes={myData.nodes.length} countLinks={myData.links.length} />
    </div>
  );
}



const Button = ({ children, onClick }) => {
    return (
      <button
        onClick={onClick}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
      >
        {children}
      </button>
    );
  };


  const Info = ({ countNodes, countLinks }) => {
    return (
      <div
        className="flex items-center justify-center p-2 overflow-hidden bg-white rounded-lg shadow-xl"
        style={{
          position: "absolute",
          top: "24px",
          right: "32px",
          zIndex: 2
        }}
      >
        <span>Nodes: {countNodes}</span>, <span>Links: {countLinks}</span>
      </div>
    );
  };
  

  
  const Menu = ({ positionX, positionY }) => {
    return (
      <div
        className="my-10"
        style={{
          position: "absolute",
          left: `${positionX}px`,
          top: `${positionY}px`,
          zIndex: 2
        }}
      >
        <div className="overflow-hidden bg-white rounded shadow-lg">
          <div className="border-b">
            <a href="/" className="flex px-4 py-2 hover:bg-gray-100">
              <div className="text-gray-800">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="pl-3">
                <p className="text-sm font-medium leading-none text-gray-800">
                  Expand node
                </p>
                <p className="text-xs text-gray-500">
                  Show all the connected nodes to this node
                </p>
              </div>
            </a>
            <a href="/" className="flex px-4 py-2 hover:bg-gray-100">
              <div className="text-gray-800">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="pl-3">
                <p className="text-sm font-medium leading-none text-gray-800">
                  Why?
                </p>
                <p className="text-xs text-gray-500">Is this menu here?</p>
              </div>
            </a>
            <a href="/" className="flex px-4 py-2 hover:bg-gray-100">
              <div className="text-gray-800">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="pl-3">
                <p className="text-sm font-medium leading-none text-gray-800">
                  Really?
                </p>
                <p className="text-xs text-gray-500">Why?</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  };
  

  const Panel = ({ node, onClickClose, onClickJumpToNode }) => {
    return (
      <div
        className="flex items-center justify-center"
        style={{
          position: "absolute",
          left: `24px`,
          top: `96px`,
          zIndex: 2
        }}
      >
        <div className="max-w-sm px-3 py-6">
          <div className="bg-white rounded-lg shadow-xl ">
            <div className="p-4 bg-center bg-cover">
              <div className="flex justify-end">
                <Button onClick={onClickClose}>X</Button>
              </div>
            </div>
            <div className="p-4 border-t border-gray-300">
              <p className="text-3xl text-gray-900">{node.user}</p>
            </div>
            <div className="p-4 border-t border-gray-300">
              <pre className="text-gray-700">
                {JSON.stringify({
                  id: node.id,
                  user: node.user,
                  val: node.val
                })}
              </pre>
            </div>
            <div className="flex p-4 text-gray-700 border-t border-gray-300">
              <Button onClick={(event) => onClickJumpToNode(node, event)}>
                Jump to node
              </Button>
              <Button onClick={() => alert("Better here :)")}>Expand Node</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const Toolbar = ({ children }) => {
    return (
      <div
        className="absolute flex items-center justify-center p-2 bg-white rounded-lg shadow-xl top-20 left-[15em]"
        style={{
        //   position: "absolute",
        //   top: "24px",
        //   left: "32px",
          zIndex: 2
        }}
      >
        {children}
      </div>
    );
  };
  
  
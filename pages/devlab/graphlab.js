import React from "react";
// import ForceGraph3D from "3d-force-graph";

import dynamic from "next/dynamic";

const ForceGraphClient = dynamic(
  () => import("../../components/Devlab/ForceGraph"),
  {
    ssr: false,
  }
);
// import ForceGraph from "../components/Devlab/ForceGraph";
// function genRandomTree(N = 300, reverse = false) {
//   return {
//     nodes: [...Array(N).keys()].map((i) => ({ id: i })),
//     links: [...Array(N).keys()]
//       .filter((id) => id)
//       .map((id) => ({
//         [reverse ? "target" : "source"]: id,
//         [reverse ? "source" : "target"]: Math.round(Math.random() * (id - 1)),
//       })),
//   };
// }

function GraphLab() {
//   const GROUPS = 12;
//   const gData = genRandomTree();
// console.log(ForceGraphClient)

  return (
    <div className="w-full h-full">
      <ForceGraphClient />
      {/* <ForceGraph /> */}
        {/* <ForceGraph3D /> */}
    </div>
  );
}

export default GraphLab;

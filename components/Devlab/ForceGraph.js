// import ForceGraph3D from '3d-force-graph';

import {  ForceGraph3D, ForceGraph2D } from 'react-force-graph';

import React from 'react'
import ForceGraphClickable from './ForceGraphClickable';

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



function ForceGraph() {

    const GROUPS = 12;
    const gData = genRandomTree();
    const [dimension, setDimension] = React.useState(2);

  return (
    <div>
<p>GRAPH LAB </p>
<button
className="p-2 text-white bg-t-bl rounded-xl"
onClick={() => {setDimension(dimension === 2 ? 3 : (dimension === 4 ? 2 : 4))}}
>Switch to {dimension === 2? "3D" : (dimension === 4 ? "2D" : "Clickable")}</button>
{dimension === 2 && <ForceGraph2D
        graphData={genRandomTree()}
        nodeAutoColorBy={d => d.id%GROUPS}
        linkAutoColorBy={d => gData.nodes[d.source].id%GROUPS}
        linkWidth={2}
      /> }
      
      {dimension === 3 && <ForceGraph3D
        graphData={genRandomTree()}
        nodeAutoColorBy={d => d.id%GROUPS}
        linkAutoColorBy={d => gData.nodes[d.source].id%GROUPS}
        linkWidth={2}
      />}

      {dimension === 4 && <ForceGraphClickable />}

      

      

    </div>
  )
}

export default ForceGraph




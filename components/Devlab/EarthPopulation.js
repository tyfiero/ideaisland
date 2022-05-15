import Script from "next/script";
import { React, useEffect, useRef,useState} from "react";
// import ReactGlobe from "react-globe";
import Globe from "react-globe.gl";
// custom globe material
import * as THREE from 'three';
import * as d3 from "d3";

// import worldpopdata from "./worldpopdata.csv";
const globeMaterial = new THREE.MeshPhongMaterial();
globeMaterial.bumpScale = 10;
new THREE.TextureLoader().load('//unpkg.com/three-globe/example/img/earth-water.png', texture => {
  globeMaterial.specularMap = texture;
  globeMaterial.specular = new THREE.Color('grey');
  globeMaterial.shininess = 15;
});


function EartPopulation(props) {
  const globeEl = useRef();


  
// const [globeDrag, setGlobeDrag] = React.useState(null);
  useEffect(() => {
      const globe = globeEl.current;
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.35;
      // globe.controls().pauseAnimation = true;

// console.log(offsetHeight)

  }, []);

const directionalLight = globeEl.current.scene().children.find(obj3d => obj3d.type === 'DirectionalLight');
directionalLight && directionalLight.position.set(330, 1440, 10); 

// change light position to see the specularMap's effect


  



  //population
  const [popData, setPopData] = useState([]);

  useEffect(() => {
    // load data
    fetch('https://gateway.pinata.cloud/ipfs/QmQZNovmg5dWRprnM3yHZ7gJ3rjfxtznudgu7BjiusMKtM').then(res => res.text())
      .then(csv => d3.csvParse(csv, ({ lat, lng, pop }) => ({ lat: +lat, lng: +lng, pop: +pop })))
      .then(setPopData);
// console.log(popData)

  }, []);

  const weightColor = d3.scaleSequentialSqrt(d3.interpolateRgb( "#4eaef7", "hsla(312, 59%, 61%, 1)"))
  .domain([0, 1e7]);

  
// console.log(popData)
  return (
    <div className="absolute w-full h-full overflow-hidden scale-100 globeEl touch-none">


      <Globe 
         ref={globeEl}
         backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
       animateIn={true}
       enablePointerInteraction={false}
       showAtmosphere={true}
       atmosphereAltitude={0.15}
       globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
       bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
       globeMaterial={globeMaterial}
     
       hexBinPointsData={popData}
       hexBinPointWeight="pop"
       hexAltitude={d => d.sumWeight * 6e-8}
       hexBinResolution={4}
       hexTopColor={d => weightColor(d.sumWeight)}
       hexSideColor={d => weightColor(d.sumWeight)}
       hexBinMerge={true}

      />
    </div>
  );
}

export default EartPopulation;

import Script from "next/script";
import { React, useEffect, useRef,useState} from "react";
// import ReactGlobe from "react-globe";
import Globe from "react-globe.gl";
// custom globe material
import * as THREE from 'three';
// import * as d3 from "d3";

// import worldpopdata from "./worldpopdata.csv";
const globeMaterial = new THREE.MeshPhongMaterial();
globeMaterial.bumpScale = 10;
new THREE.TextureLoader().load('//unpkg.com/three-globe/example/img/earth-water.png', texture => {
  globeMaterial.specularMap = texture;
  globeMaterial.specular = new THREE.Color('grey');
  globeMaterial.shininess = 15;
});


function Earth(props) {
  const globeEl = useRef();
  useEffect(() => {
      const globe = globeEl.current;
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.35;
      globe.controls().pauseAnimation = true;
  }, []);

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
      />
    </div>
  );
}

export default Earth;

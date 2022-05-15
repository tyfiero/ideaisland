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


function EarthCables(props) {
  const globeEl = useRef();
  const [cablePaths, setCablePaths] = useState([]);


  
// const [globeDrag, setGlobeDrag] = React.useState(null);
  useEffect(() => {
      const globe = globeEl.current;
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.35;
      // globe.controls().pauseAnimation = true;

// console.log(offsetHeight)


const directionalLight = globeEl.current.scene().children.find(obj3d => obj3d.type === 'DirectionalLight');
directionalLight && directionalLight.position.set(330, 1440, 10); 





  // from https://github.com/telegeography/www.submarinecablemap.com
  fetch('//raw.githubusercontent.com/telegeography/www.submarinecablemap.com/master/web/public/api/v3/cable/cable-geo.json')
  .then(r =>r.json())
  .then(cablesGeo => {
    let cablePaths = [];
    cablesGeo.features.forEach(({ geometry, properties }) => {
      geometry.coordinates.forEach(coords => cablePaths.push({ coords, properties }));
    });

    setCablePaths(cablePaths);
  });



  

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

       pathsData={cablePaths}
       pathPoints="coords"
       pathPointLat={p => p[1]}
       pathPointLng={p => p[0]}
       pathColor={path => path.properties.color}
       pathLabel={path => path.properties.name}
       pathDashLength={0.1}
       pathDashGap={0.008}
       pathDashAnimateTime={12000}





      />
    </div>
  );
}

export default EarthCables;

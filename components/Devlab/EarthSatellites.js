import Script from "next/script";
import { React, useEffect, useMemo, useRef,useState} from "react";
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

const EARTH_RADIUS_KM = 6371; // km
const SAT_SIZE = 180; // km
const TIME_STEP = 3 * 500; // per frame

var satellite = require('satellite.js');

function EarthSatellites(props) {
  const globeEl = useRef();
  const [satData, setSatData] = useState();
  const [globeRadius, setGlobeRadius] = useState();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // time ticker
    (function frameTicker() {
      requestAnimationFrame(frameTicker);
      setTime(time => new Date(+time + TIME_STEP));
    })();
  }, []);

  useEffect(() => {
    // load satellite data
    fetch('//unpkg.com/globe.gl/example/datasets/space-track-leo.txt').then(r => r.text()).then(rawData => {
      const tleData = rawData.replace(/\r/g, '')
        .split(/\n(?=[^12])/)
        .filter(d => d)
        .map(tle => tle.split('\n'));
      const satData = tleData.map(([name, ...tle]) => ({
        satrec: satellite.twoline2satrec(...tle),
        name: name.trim().replace(/^0 /, '')
      }))
      // exclude those that can't be propagated
      .filter(d => !!satellite.propagate(d.satrec, new Date()).position)
      .slice(0, 1500);

      setSatData(satData);
    });
  }, []);
  
  


  const objectsData = useMemo(() => {
    if (!satData) return [];

    // Update satellite positions
    const gmst = satellite.gstime(time);
    return satData.map(d => {
      const eci = satellite.propagate(d.satrec, time);
      if (eci.position) {
        const gdPos = satellite.eciToGeodetic(eci.position, gmst);
        const lat = satellite.radiansToDegrees(gdPos.latitude);
        const lng = satellite.radiansToDegrees(gdPos.longitude);
        const alt = gdPos.height / EARTH_RADIUS_KM;
        return { ...d, lat, lng, alt };
      }
      return d;
    });
  }, [satData, time]);

  const satObject = useMemo(() => {
    if (!globeRadius) return undefined;

    const satGeometry = new THREE.OctahedronGeometry(SAT_SIZE * globeRadius / EARTH_RADIUS_KM / 2, 0);
    const satMaterial = new THREE.MeshLambertMaterial({ color: '#4eaef7', transparent: true, opacity: 0.7 });
    return new THREE.Mesh(satGeometry, satMaterial);
  }, [globeRadius]);

  useEffect(() => {
    setGlobeRadius(globeEl.current.getGlobeRadius());
    globeEl.current.pointOfView({ altitude: 3.5 });
  }, []);




  
// const [globeDrag, setGlobeDrag] = React.useState(null);
  useEffect(() => {
      const globe = globeEl.current;
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.35;
      // globe.controls().pauseAnimation = true;

// console.log(offsetHeight)


const directionalLight = globeEl.current.scene().children.find(obj3d => obj3d.type === 'DirectionalLight');
directionalLight && directionalLight.position.set(330, 1440, 10); 







  

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

      //  pathsData={cablePaths}
      //  pathPoints="coords"
      //  pathPointLat={p => p[1]}
      //  pathPointLng={p => p[0]}
      //  pathColor={path => path.properties.color}
      //  pathLabel={path => path.properties.name}
      //  pathDashLength={0.1}
      //  pathDashGap={0.008}
      //  pathDashAnimateTime={12000}

      objectsData={objectsData}
      objectLabel="name"
      objectLat="lat"
      objectLng="lng"
      objectAltitude="alt"
      objectThreeObject={satObject}



      />

<div id="time-log">{time.toString()}</div>
    </div>
  );
}

export default EarthSatellites;

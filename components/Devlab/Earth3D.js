

   
// import React, { useRef } from "react";
// import { useFrame, useLoader } from "@react-three/fiber";
// import { OrbitControls, Stars } from "@react-three/drei";
// import * as THREE from "three";
// import { Canvas } from "@react-three/fiber";
// import EarthDayMap from "../../assets/textures/8k_earth_daymap.jpg";
// import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
// import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";
// import EarthCloudsMap from "../../assets/textures/8k_earth_clouds.jpg";
// import { TextureLoader } from "three";



// function Earth3D(props) {
//     const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
//         TextureLoader,
//         [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
//       );
    
//       const earthRef = useRef();
//       const cloudsRef = useRef();
    
//       useFrame(({ clock }) => {
//         const elapsedTime = clock.getElapsedTime();
    
//         earthRef.current.rotation.y = elapsedTime / 6;
//         cloudsRef.current.rotation.y = elapsedTime / 6;
//       });
//   return (
//     <div>Earth3D</div>
//   )
// }

// export default Earth3D
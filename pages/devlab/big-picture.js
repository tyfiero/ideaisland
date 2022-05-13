import React from 'react'
import Earth from '../../components/Devlab/Earth'
import Earth3D from '../../components/Devlab/Earth3D'
// import ReactGlobe from 'react-globe';

function BigPicture() {
  return (
    <div className=''>

        <Earth />
        
         {/* <Earth3D /> */}
         {/* <ReactGlobe /> */}
         {/* <ReactGlobe height="100vh" width="100vw" /> */}
         {/* <ReactGlobe
        height="100vh"
        globeTexture="https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/globe_dark.jpg"
        markers={markers}
        width="100vw"
        options={options}
      /> */}
    </div>
  )
}

export default BigPicture
import React from 'react'
// import Earth from '../../components/Devlab/Earth'
import Earth3D from '../../components/Devlab/Earth3D'
// import ReactGlobe from 'react-globe';
import dynamic from 'next/dynamic'
import { FaGlobeAmericas, FaSatellite } from 'react-icons/fa'
import { IoMdPeople } from 'react-icons/io'
import { MdCable } from 'react-icons/md'
// import EarthCables from '../../components/Devlab/EarthCables'

const Earth = dynamic(() => import('../../components/Devlab/Earth'), {

    ssr: false,
})
const EarthCables = dynamic(() => import('../../components/Devlab/EarthCables'), {

    ssr: false,
})
const EarthSatellites = dynamic(() => import('../../components/Devlab/EarthSatellites'), {
    ssr: false,
})
const EarthPopulation = dynamic(() => import('../../components/Devlab/EarthSatellites'), {

    ssr: false,
})

// const Earth = dynamic(() => import('../../components/Devlab/Earth'), { ssr: false });
function BigPicture() {

    const [mode, setMode] = React.useState("clean");
  return (
    <div className='relative'>
 {/* <div className="flex items-center gap-2 p-2 text-center w-fit justify-evenly glass-box !border-slate-500/70 absolute top-2 left-2">
         
          <button
            className={
              "w-[6em] h-[2em] rounded-3xl  flex items-center justify-center text-slate-100 gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer " +
              (mode === "clean" ? " bg-t-bl" : " bg-slate-300 dark:bg-slate-800")
            }
            onClick={() => setMode("clean")}
          >
            <FaGlobeAmericas className="text-[18px] text-t-bd dark:text-blues-100" />

            <p
              className={
                "mr-1  mb-0 " +
                (mode === "clean"
                  ? "text-slate-100 text-[20px]"
                  : "text-black text-[18px]")
              }
            >
              Earth
            </p>
          </button>
          <button
            className={
              "w-[7.5em] h-[2em] rounded-3xl px-1 bg-t-bl flex items-center justify-center text-slate-100 gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95  cursor-pointer " +
              (mode === "satellite" ? " bg-t-pm" : " bg-slate-300 dark:bg-slate-800")
            }
            onClick={() => setMode("satellite")}
          >
            <FaSatellite className="text-[18px] text-t-pd dark:text-pinks-100" />

            <p
              className={
                "mr-1  mb-0 " +
                (mode === "satellite"
                  ? "text-slate-100 text-[20px]"
                  : "text-black text-[18px]")
              }
            >
              Satellites
            </p>
          </button>
          <button
            className={
              "px-3 h-[2em] rounded-3xl bg-t-bl flex items-center justify-center  gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer " +
              (mode === "cable" ? " bg-clear-bpop2 dark:bg-clear-bpop2" : " bg-slate-300 dark:bg-slate-800")
            }
            onClick={() => setMode("cable")}
          >
            <MdCable className={"text-[18px]  " +  (mode === "cable" ? " text-slate-300 dark:text-slate-800" : " text-t-bpop  dark:text-slate-100")} />

            <p
              className={
                "mr-1 mb-0 " +
                (mode === "cable"
                  ? "text-slate-100 text-[20px] dark:text-slate-800"
                  : "text-black text-[18px]")
              }
            >
              Cables
            </p>
          </button>
          <button
            className={
              "px-3 h-[2em] rounded-3xl bg-t-bl flex items-center justify-center  gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer " +
              (mode === "population" ? " bg-slate-700 dark:bg-slate-300" : " bg-slate-300 dark:bg-slate-800")
            }
            onClick={() => setMode("population")}
          >
            <IoMdPeople className={"text-[18px]  " +  (mode === "population" ? " text-slate-300 dark:text-slate-800" : " text-slate-800  dark:text-slate-100")} />

            <p
              className={
                "mr-1 mb-0 " +
                (mode === "population"
                  ? "text-slate-100 text-[20px] dark:text-slate-800"
                  : "text-black text-[18px]")
              }
            >
              Population
            </p>
          </button>
        </div> */}
        {/* <Earth /> */}
        <EarthCables />
    {/* {mode === "clean" && <Earth /> }
    {mode === "cable" && <EarthCables /> }
       {mode === "satellite" && <EarthSatellites />} 
       {mode === "population" && <EarthSatellites />}  */}
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
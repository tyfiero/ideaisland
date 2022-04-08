import DarkModeToggle from "../Layout/DarkModeToggle";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../lib/context";
import FullLoader from "../Layout/FullLoader";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import { ChromePicker } from "react-color";
import { SketchPicker, Slider } from "react-color";
var { Hue } = require("react-color/lib/components/common");

const SettingsPage = () => {
  const { user, username } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);

  const [colorOpacity, setColorOpacity] = useState(0.6);
  // const [color, setColor] = useState("#000000")
  const [changeColor, setChangeColor] = useState(false);
  let blobc1 = localStorage.getItem("blob1") || "#4eaef7";
  let blobc2 = localStorage.getItem("blob2") || "#2549a8";
  let blobc3 = localStorage.getItem("blob3") || "#be0081";
  let blobc4 = localStorage.getItem("blob4") || "#eec3fd";
  let blobc5 = localStorage.getItem("blob5") || "#00fff8";

//   console.log([blobc1, blobc2, blobc3, blobc4, blobc5]);

  const [color, setColor] = useState(blobc1);
  const [color2, setColor2] = useState(blobc2);
  const [color3, setColor3] = useState(blobc3);
  const [color4, setColor4] = useState(blobc4);
  const [color5, setColor5] = useState(blobc5);

//   console.log([color, color2, color3, color4, color5]);

  useEffect(() => {
    if (!user) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [user]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    //on change of color, set the color to the local storage
    //I want to avoid setting localstorage to default color state

    //if localstorage color is not the same as the color state, set the localstorage to the color state

    document.documentElement.style.setProperty("--blob1", color);
    localStorage.setItem("blob1", color);

    document.documentElement.style.setProperty("--blob2", color2);
    localStorage.setItem("blob2", color2);

    document.documentElement.style.setProperty("--blob3", color3);
    localStorage.setItem("blob3", color3);

    document.documentElement.style.setProperty("--blob4", color4);
    localStorage.setItem("blob4", color4);

    document.documentElement.style.setProperty("--blob5", color5);
    localStorage.setItem("blob5", color5);
  }, [color, color2, color3, color4, color5]);// eslint-disable-line react-hooks/exhaustive-deps

 

  useEffect(() => {
    setColor("#4eaef7");
    setColor2("#2549a8");
    setColor3("#be0081");
    setColor4("#eec3fd");
    setColor5("#00fff8");
  }, [reset]);

  //change opacity variable
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.setProperty("--blobOpacity", colorOpacity);
    }
  }, [colorOpacity]);

  //next two useEffects save to local storage
  //This one loads from local storage
  useEffect(() => {
    let opacityNum = localStorage.getItem("colorOpacity");
   

    if (colorOpacity !== opacityNum) {
      setColorOpacity(opacityNum);
    }

      setColor(blobc1);

      setColor2(blobc2);

      setColor3(blobc3);

      setColor4(blobc4);

      setColor5(blobc5);
  }, []);

  useEffect(() => {
    localStorage.setItem("colorOpacity", colorOpacity);
  }, [colorOpacity]);

  return (
    //  <AuthCheck>
    <div className="sentence-container fade-effect-quick">
      {loading ? (
        <FullLoader show={true} />
      ) : (
        <div>
          {" "}
          <h1 className="heading-top">Settings</h1>
          <div className="flex flex-col gap-5 p-5 glass-box">
            <div className="flex gap-20">
              <p>Dark Mode: </p>
              <DarkModeToggle />
            </div>

            <div className="flex gap-5">
              <p>Background: </p>

              <input
                type="range"
                className="mr-8 color-range range"
                min={0}
                max={2.2}
                value={colorOpacity}
                step="0.01"
                onChange={(e) => {
                  setColorOpacity(e.target.valueAsNumber);
                }}
              />
            </div>
            <div className="flex items-center gap-5">
              <p>Background colors</p>
              <button
                onClick={() => setChangeColor(!changeColor)}
                className="p-1 text-white bg-t-bl rounded-xl"
              >
                {changeColor ? "Done" : "Change"}
              </button>
            </div>
          </div>
          <p>Your username is: {username}</p>
          <p>Your uid is: {user?.uid}</p>
          {loading && <div className="h-[20em] w-[35em] bg-t-bl">LOADING</div>}
          {!user && (
            <div className="h-[40em] w-[35em] bg-t-pm">
              You are not logged in
            </div>
          )}
        </div>
      )}
      {changeColor && (
        <div className="p-5 normal-box-soft w-[60em] ">
          <button
            onClick={() => setReset(!reset)}
            className="p-1 text-white bg-t-bl rounded-xl"
          >
            Reset to default
          </button>
          <p>Note: this will affect the way the site is intended to look.</p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <div className="flex flex-col items-center">
              <p>Color 1</p>
              <ChromePicker color={color} onChange={(x) => setColor(x.hex)} />
            </div>
            <div className="flex flex-col items-center">
              <p>Color 2</p>
              <ChromePicker color={color2} onChange={(x) => setColor2(x.hex)} />
            </div>
            <div className="flex flex-col items-center">
              <p>Color 3</p>
              <ChromePicker color={color3} onChange={(x) => setColor3(x.hex)} />
            </div>
            <div className="flex flex-col items-center">
              <p>Color 4</p>
              <ChromePicker color={color4} onChange={(x) => setColor4(x.hex)} />
            </div>
            <div className="flex flex-col items-center">
              <p>Color 5</p>
              <ChromePicker color={color5} onChange={(x) => setColor5(x.hex)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;

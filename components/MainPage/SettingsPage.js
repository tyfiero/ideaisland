import DarkModeToggle from "../Layout/DarkModeToggle";
import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../../lib/context";
import FullLoader from "../Layout/FullLoader";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import { ChromePicker } from "react-color";
import { SketchPicker, Slider } from "react-color";
import { FaRedo } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

var { Hue } = require("react-color/lib/components/common");

const SettingsPage = () => {
  const { user, username } = useContext(UserContext);
  const darkRedux = useSelector((state) => state.darkMode);

  const imgRef = useRef();
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);

  const [colorOpacity, setColorOpacity] = useState(0.6);
  const [menuOpacity, setMenuOpacity] = useState(0.6);
  const [opacityChange, setOpacityChange] = useState(false);

  const [changeColor, setChangeColor] = useState(false);
  const [addImage, setAddImage] = useState(false);

  let blobc1 = localStorage.getItem("blob1") || "hsla(206,91%,64%,1)";
  let blobc2 = localStorage.getItem("blob2") || "hsla(224,64%,40%,1)";
  let blobc3 = localStorage.getItem("blob3") || "hsla(319,100%,37%,1)";
  let blobc4 = localStorage.getItem("blob4") || "hsla(284,94%,88%,1)";
  let blobc5 = localStorage.getItem("blob5") || "hsla(178,100%,50%,1)";
  let blobc6 = localStorage.getItem("blob6") || "hsla(312,59%,61%,1)";

  let img1 = localStorage.getItem("img1") || "";
  //   console.log([blobc1, blobc2, blobc3, blobc4, blobc5]);

  const [color, setColor] = useState(blobc1);
  const [color2, setColor2] = useState(blobc2);
  const [color3, setColor3] = useState(blobc3);
  const [color4, setColor4] = useState(blobc4);
  const [color5, setColor5] = useState(blobc5);
  const [color6, setColor6] = useState(blobc6);

  const [imgSrc, setImgSrc] = useState(img1);

  //   console.log([color, color2, color3, color4, color5]);

  useEffect(() => {
    if (!user) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    //on change of color, set the color to the local storage
    //I want to avoid setting localstorage to default color state

    //if localstorage color is not the same as the color state, set the localstorage to the color state
    // console.log(color)

    const sliceHsl = (fullString) => {
      let sliced = fullString.slice(5);
      let slicedAgain = sliced.slice(0, -7);
      return slicedAgain;
    };
    const sliceHslAlpha = (fullString) => {
      let sliced = fullString.slice(5);
      let slicedAgain = sliced.slice(0, -3);
      return slicedAgain;
    };
    document.documentElement.style.setProperty("--blob1", color);
    document.documentElement.style.setProperty("--colorDark1", color);
    document.documentElement.style.setProperty(
      "--colorDark1HslBase",
      sliceHsl(color)
    );
    document.documentElement.style.setProperty(
      "--colorDark1base",
      sliceHslAlpha(color)
    );

    localStorage.setItem("blob1", color);

    document.documentElement.style.setProperty("--blob2", color2);
    document.documentElement.style.setProperty("--colorDark2", color2);
    document.documentElement.style.setProperty(
      "--colorDark2base",
      sliceHslAlpha(color2)
    );
    localStorage.setItem("blob2", color2);

    document.documentElement.style.setProperty("--blob3", color3);
    document.documentElement.style.setProperty("--colorLight2", color3);
    document.documentElement.style.setProperty(
      "--colorLight2base",
      sliceHslAlpha(color3)
    );
    localStorage.setItem("blob3", color3);

    document.documentElement.style.setProperty("--blob4", color4);
    document.documentElement.style.setProperty("--colorLight1", color4);
    document.documentElement.style.setProperty(
      "--colorLight1base",
      sliceHslAlpha(color4)
    );
    document.documentElement.style.setProperty(
      "--colorLight1HslBase",
      sliceHsl(color4)
    );

    localStorage.setItem("blob4", color4);

    document.documentElement.style.setProperty("--blob5", color5);
    document.documentElement.style.setProperty("--colorPop", color5);

    localStorage.setItem("blob5", color5);

    document.documentElement.style.setProperty("--blob6", color6);
    document.documentElement.style.setProperty("--colorLight3", color6);
    document.documentElement.style.setProperty(
      "--colorLight3base",
      sliceHslAlpha(color6)
    );
    localStorage.setItem("blob6", color6);
  }, [color, color2, color3, color4, color5, color6]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setColor("hsla(206,91%,64%,1)");
    setColor2("hsla(224,64%,40%,1)");
    setColor3("hsla(319,100%,37%,1)");
    setColor4("hsla(284,94%,88%,1)");
    setColor5("hsla(178,100%,50%,1)");
    setColor6("hsla(312,59%,61%,1)");
  }, [reset]);

  //change opacity variable
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.setProperty("--blobOpacity", colorOpacity);
      localStorage.setItem("colorOpacity", colorOpacity);
    }
  }, [colorOpacity]);
  //change menu opacity variable
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("menuOpacity", menuOpacity);
      let base = darkRedux ? "hsla(200,0%,50%," : "hsla(200,0%,100%,";

      let concat = base + menuOpacity + ")";
      document.documentElement.style.setProperty("--menuColor", concat);
    }
  }, [menuOpacity]);// eslint-disable-line react-hooks/exhaustive-deps

  //next two useEffects save to local storage
  //This one loads from local storage
  useEffect(() => {
    let opacityNum = localStorage.getItem("colorOpacity");
    let menuOpacityNum = localStorage.getItem("menuOpacity");

    let imgSrcLS = localStorage.getItem("bgImg");

    if (colorOpacity !== opacityNum) {
      setColorOpacity(opacityNum);
    }
    if (menuOpacity !== menuOpacityNum) {
      setMenuOpacity(menuOpacityNum);
    }
    if (imgSrc !== imgSrcLS) {
      setImgSrc(imgSrcLS);
    }
    setColor(blobc1);

    setColor2(blobc2);

    setColor3(blobc3);

    setColor4(blobc4);

    setColor5(blobc5);
    setColor6(blobc6);
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (imgSrc) {
      document.querySelector("body").style.backgroundImage = `url(${imgSrc})`;
      localStorage.setItem("bgImg", imgSrc);
    } else {
      document.querySelector("body").style.backgroundImage = "none";
    }
  }, [imgSrc]);

  const handleFocus = (event) => event.target.select();

  return (
    //  <AuthCheck>
    <div className="w-full sentence-container fade-effect-quick overflow-y-scroll">
      {loading ? (
        <FullLoader show={true} />
      ) : (
        <div>
          <h1 className="text-3xl text-t-bd dark:text-blues-100">Settings</h1>
          <div className="flex flex-col min-w-[40em] gap-5 p-5 glass-box bg-[rgba(255, 255, 255, 0.25)] dark:bg-[hsla(200,0%,5%,0.35)]  ">
            <div className="flex gap-20">
              <p className="text-black transition duration-500 dark:text-slate-50 ">
                Dark Mode:{" "}
              </p>
              <DarkModeToggle />
            </div>

            <div className="flex gap-5">
              <p className="text-black transition duration-500 whitespace-nowrap dark:text-slate-50 ">
                Background gradient:{" "}
              </p>

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
              <p className="text-black transition duration-500 dark:text-slate-50 ">
                Change UI Colors
              </p>
              <button
                onClick={() => setChangeColor(!changeColor)}
                className="p-1 text-white bg-t-bl rounded-xl"
              >
                {changeColor ? "Done" : "Change"}
              </button>
            </div>
            <div className="flex gap-5">
              <p className="text-black transition duration-500 whitespace-nowrap dark:text-slate-50">
                Menu opacity:{" "}
              </p>
              <button
                onClick={() => {
                  if (opacityChange) {
                    setMenuOpacity(0.5);
                    setOpacityChange(false);
                  } else {
                    setOpacityChange(true);
                  }
                }}
                className="flex items-center gap-2 p-1 text-sm text-white whitespace-nowrap bg-t-bl rounded-xl"
              >
                {!opacityChange ? (
                  "Change"
                ) : (
                  <>
                    <FaRedo /> Reset
                  </>
                )}
              </button>
              {opacityChange && (
                <input
                  type="range"
                  className={
                    "mr-8  range " +
                    (darkRedux ? " opacity-range-dark" : " opacity-range")
                  }
                  min={0}
                  max={1}
                  value={menuOpacity}
                  step="0.01"
                  onChange={(e) => {
                    setMenuOpacity(e.target.valueAsNumber);
                  }}
                />
              )}
            </div>
            <div className="flex items-center gap-5">
              <p className="text-black transition duration-500 whitespace-nowrap dark:text-slate-50">
                Background image
              </p>
              <button
                onClick={() => setAddImage(!addImage)}
                className="p-1 text-white whitespace-nowrap bg-t-bl rounded-xl"
              >
                {addImage ? "Done" : img1 ? "Edit Image" : "Set Image"}
              </button>
              {addImage && (
                <>
                  {" "}
                  <input
                    className="w-[96%] textarea-box  textarea-tw  "
                    value={imgSrc}
                    onFocus={handleFocus}
                    onChange={(e) => {
                      setImgSrc(e.target.value);
                    }}
                    placeholder="Image Url"
                    // className={styles.input}
                  />
                  {imgSrc && (
                    <button
                      onClick={() => {
                        setImgSrc("");
                        localStorage.setItem("bgImg", "");
                      }}
                      className="p-1 text-white bg-t-pm rounded-xl"
                    >
                      Delete
                    </button>
                  )}
                </>
              )}
            </div>
            {addImage && (
              <p>
                For best results use a light image with a landscape orientation.
              </p>
            )}
          </div>
          {/* <p>Your username is: {username}</p> */}
          {/* <p>Your uid is: {user?.uid}</p>
          {loading && <div className="w-full h-[45em] bg-t-pm">LOADING</div>} */}
          {/* {changeColor && <div className="text-left rounded-2xl">
          <p className="pl-5 bg-t-bpop rounded-t-xl">Accent Color</p>

          <p className="pl-5 bg-t-bd">Color 1 dark</p>
          <p className="pl-5 bg-t-pl">Color 2 light</p>
          <p className="pl-5 bg-t-pm">Color 2 medium</p>
          <p className="pl-5 bg-t-pd rounded-b-xl">Color 2 dark</p>

        
          </div>} */}

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
              <p>Color 1 light</p>
              {/* <div className="flex rounded-lg">
    <div className="w-5 h-5 bg-blues-50"></div>
    <div className="w-5 h-5 bg-blues-100"></div>
    <div className="w-5 h-5 bg-blues-200"></div>
    <div className="w-5 h-5 bg-blues-300"></div>
    <div className="w-5 h-5 bg-blues-400"></div>
    <div className="w-5 h-5 bg-blues-500"></div>
    <div className="w-5 h-5 bg-blues-600"></div>
    <div className="w-5 h-5 bg-blues-700"></div>
    <div className="w-5 h-5 bg-blues-800"></div>
    <div className="w-5 h-5 bg-blues-900"></div>
</div> */}
              <div className="h-8 rounded-xl w-[12.5rem] bg-t-bl"></div>

              <ChromePicker
                color={color}
                onChange={(x) => {
                  let s = x.hsl.s.toFixed(2) * 100;
                  let l = x.hsl.l.toFixed(2) * 100;
                  let hsl = `hsla(${Math.round(x.hsl.h)},${Math.round(
                    s
                  )}%,${Math.round(l)}%,1)`;
                  setColor(hsl);
                }}
              />
            </div>
            <div className="flex flex-col items-center">
              <p>Color 1 dark</p>
              <div className="h-8 rounded-xl w-[12.5rem] bg-t-bd"></div>

              <ChromePicker
                color={color2}
                onChange={(x) => {
                  let s = x.hsl.s.toFixed(2) * 100;
                  let l = x.hsl.l.toFixed(2) * 100;
                  let hsl = `hsla(${Math.round(x.hsl.h)},${Math.round(
                    s
                  )}%,${Math.round(l)}%,1)`;
                  setColor2(hsl);
                }}
              />
            </div>
            <div className="flex flex-col items-center">
              <p>Accent Color</p>
              <div className="h-8 rounded-xl w-[12.5rem] bg-t-bpop"></div>

              <ChromePicker
                color={color5}
                onChange={(x) => {
                  let s = x.hsl.s.toFixed(2) * 100;
                  let l = x.hsl.l.toFixed(2) * 100;
                  let hsl = `hsla(${Math.round(x.hsl.h)},${Math.round(
                    s
                  )}%,${Math.round(l)}%,1)`;
                  setColor5(hsl);
                }}
              />
            </div>
            <div className="flex flex-col items-center">
              <p>Color 2 light</p>
              {/* <div className="flex bg-white rounded-lg">
    <div className="w-5 h-5 bg-clear-pl5"></div>
    <div className="w-5 h-5 bg-clear-bl2"></div>
    <div className="w-5 h-5 bg-clear-bd3"></div>
    <div className="w-5 h-5 bg-clear-pd4"></div>
    <div className="w-5 h-5 bg-clear-pm5"></div>
    <div className="w-5 h-5 bg-pinks-200"></div>
    <div className="w-5 h-5 bg-pinks-300"></div>
    <div className="w-5 h-5 bg-pinks-400"></div>
    <div className="w-5 h-5 bg-pinks-500"></div>
    <div className="w-5 h-5 bg-pinks-600"></div>
</div> */}
              {/* <div className="flex rounded-lg">
    <div className="w-5 h-5 bg-pinks-50"></div>
    <div className="w-5 h-5 bg-pinks-100"></div>
    <div className="w-5 h-5 bg-pinks-200"></div>
    <div className="w-5 h-5 bg-pinks-300"></div>
    <div className="w-5 h-5 bg-pinks-400"></div>
    <div className="w-5 h-5 bg-pinks-500"></div>
    <div className="w-5 h-5 bg-pinks-600"></div>
    <div className="w-5 h-5 bg-pinks-700"></div>
    <div className="w-5 h-5 bg-pinks-800"></div>
    <div className="w-5 h-5 bg-pinks-900"></div>
</div> */}
              <div className="h-8 rounded-xl w-[12.5rem] bg-t-pl"></div>
              {/* <div className="h-8 rounded-xl w-[12.5rem] bg-[hsla(103,66%,58%,0.9)]"></div>
          <div className="h-8 rounded-xl w-[12.5rem] bg-clear-pl5"></div> */}
              <ChromePicker
                color={color4}
                onChange={(x) => {
                  let s = x.hsl.s.toFixed(2) * 100;
                  let l = x.hsl.l.toFixed(2) * 100;
                  let hsl = `hsla(${Math.round(x.hsl.h)},${Math.round(
                    s
                  )}%,${Math.round(l)}%,1)`;
                  setColor4(hsl);
                }}
              />
            </div>
            <div className="flex flex-col items-center">
              <p>Color 2 dark</p>
              <div className="h-8 rounded-xl w-[12.5rem] bg-t-pd"></div>

              <ChromePicker
                color={color3}
                onChange={(x) => {
                  let s = x.hsl.s.toFixed(2) * 100;
                  let l = x.hsl.l.toFixed(2) * 100;
                  let hsl = `hsla(${Math.round(x.hsl.h)},${Math.round(
                    s
                  )}%,${Math.round(l)}%,1)`;
                  setColor3(hsl);
                }}
              />
            </div>

            <div className="flex flex-col items-center">
              <p>
                Color 2 Medium <span className="text-xs">(minor color)</span>
              </p>
              <div className="h-8 rounded-xl w-[12.5rem] bg-t-pm"></div>

              <ChromePicker
                color={color6}
                onChange={(x) => {
                  let s = x.hsl.s.toFixed(2) * 100;
                  let l = x.hsl.l.toFixed(2) * 100;
                  let hsl = `hsla(${Math.round(x.hsl.h)},${Math.round(
                    s
                  )}%,${Math.round(l)}%,1)`;
                  setColor6(hsl);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;

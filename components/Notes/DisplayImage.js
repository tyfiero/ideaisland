import {
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
  useContext,
  React,
} from "react";

import {
  FaAngleDown,
  FaAngleUp,
  FaEdit,
  FaImage,
  FaSave,
  FaSearch,
  FaTimes,
  FaUndo,
} from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { auth } from "../../lib/firebase";

import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../../lib/context";
import {
  serverTimestamp,
  query,
  collection,
  orderBy,
  getFirestore,
  updateDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import axios from "axios";
import ImageList from "./ImageList";
import Loader from "../Layout/Loader";

function DisplayImage({ type, mode }) {
  const currentDocRedux = useSelector((state) => state.currentDoc);
  const { user, username } = useContext(UserContext);
  const userUIDRedux = useSelector((state) => state.userUID);

  const [pics, setPics] = useState([
    {
      id: 188029,
      width: 5312,
      height: 2650,
      url: "https://www.pexels.com/photo/island-covered-with-green-trees-under-the-clear-skies-188029/",
      photographer: "Ingo Joseph",
      photographer_url: "https://www.pexels.com/@ingo",
      photographer_id: 3,
      avg_color: "#6D9DC3",
      src: {
        original:
          "https://images.pexels.com/photos/188029/pexels-photo-188029.jpeg",
        large2x:
          "https://images.pexels.com/photos/188029/pexels-photo-188029.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        large:
          "https://images.pexels.com/photos/188029/pexels-photo-188029.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        medium:
          "https://images.pexels.com/photos/188029/pexels-photo-188029.jpeg?auto=compress&cs=tinysrgb&h=350",
        small:
          "https://images.pexels.com/photos/188029/pexels-photo-188029.jpeg?auto=compress&cs=tinysrgb&h=130",
        portrait:
          "https://images.pexels.com/photos/188029/pexels-photo-188029.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
        landscape:
          "https://images.pexels.com/photos/188029/pexels-photo-188029.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        tiny: "https://images.pexels.com/photos/188029/pexels-photo-188029.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
      },
      liked: false,
      alt: "Island Covered With Green Trees Under the Clear Skies",
    },
    {
      id: 994605,
      width: 2726,
      height: 2047,
      url: "https://www.pexels.com/photo/seaside-994605/",
      photographer: "Fabian Wiktor",
      photographer_url: "https://www.pexels.com/@fabianwiktor",
      photographer_id: 369193,
      avg_color: "#88979C",
      src: {
        original:
          "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg",
        large2x:
          "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        large:
          "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        medium:
          "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&h=350",
        small:
          "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&h=130",
        portrait:
          "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
        landscape:
          "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        tiny: "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
      },
      liked: false,
      alt: "Seaside",
    },
    {
      id: 1536428,
      width: 4032,
      height: 3024,
      url: "https://www.pexels.com/photo/coconut-trees-planted-on-island-1536428/",
      photographer: "Kelli Golis",
      photographer_url: "https://www.pexels.com/@kelli-golis-701973",
      photographer_id: 701973,
      avg_color: "#6D8E9A",
      src: {
        original:
          "https://images.pexels.com/photos/1536428/pexels-photo-1536428.jpeg",
        large2x:
          "https://images.pexels.com/photos/1536428/pexels-photo-1536428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        large:
          "https://images.pexels.com/photos/1536428/pexels-photo-1536428.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        medium:
          "https://images.pexels.com/photos/1536428/pexels-photo-1536428.jpeg?auto=compress&cs=tinysrgb&h=350",
        small:
          "https://images.pexels.com/photos/1536428/pexels-photo-1536428.jpeg?auto=compress&cs=tinysrgb&h=130",
        portrait:
          "https://images.pexels.com/photos/1536428/pexels-photo-1536428.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
        landscape:
          "https://images.pexels.com/photos/1536428/pexels-photo-1536428.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        tiny: "https://images.pexels.com/photos/1536428/pexels-photo-1536428.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
      },
      liked: false,
      alt: "Coconut Trees Planted on Island",
    },
    {
      id: 1316897,
      width: 2394,
      height: 2992,
      url: "https://www.pexels.com/photo/bird-s-eye-view-photography-of-island-1316897/",
      photographer: "Oliver Sjöström",
      photographer_url: "https://www.pexels.com/@ollivves",
      photographer_id: 333270,
      avg_color: "#0C3943",
      src: {
        original:
          "https://images.pexels.com/photos/1316897/pexels-photo-1316897.jpeg",
        large2x:
          "https://images.pexels.com/photos/1316897/pexels-photo-1316897.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        large:
          "https://images.pexels.com/photos/1316897/pexels-photo-1316897.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        medium:
          "https://images.pexels.com/photos/1316897/pexels-photo-1316897.jpeg?auto=compress&cs=tinysrgb&h=350",
        small:
          "https://images.pexels.com/photos/1316897/pexels-photo-1316897.jpeg?auto=compress&cs=tinysrgb&h=130",
        portrait:
          "https://images.pexels.com/photos/1316897/pexels-photo-1316897.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
        landscape:
          "https://images.pexels.com/photos/1316897/pexels-photo-1316897.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        tiny: "https://images.pexels.com/photos/1316897/pexels-photo-1316897.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
      },
      liked: false,
      alt: "Bird's Eye View Photography Of Island",
    },
    {
      id: 240526,
      width: 2050,
      height: 3087,
      url: "https://www.pexels.com/photo/coconut-tree-near-body-of-water-under-blue-sky-240526/",
      photographer: "Asad Photo Maldives",
      photographer_url: "https://www.pexels.com/@asadphotography",
      photographer_id: 45786,
      avg_color: "#7590A9",
      src: {
        original:
          "https://images.pexels.com/photos/240526/pexels-photo-240526.jpeg",
        large2x:
          "https://images.pexels.com/photos/240526/pexels-photo-240526.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        large:
          "https://images.pexels.com/photos/240526/pexels-photo-240526.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        medium:
          "https://images.pexels.com/photos/240526/pexels-photo-240526.jpeg?auto=compress&cs=tinysrgb&h=350",
        small:
          "https://images.pexels.com/photos/240526/pexels-photo-240526.jpeg?auto=compress&cs=tinysrgb&h=130",
        portrait:
          "https://images.pexels.com/photos/240526/pexels-photo-240526.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
        landscape:
          "https://images.pexels.com/photos/240526/pexels-photo-240526.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        tiny: "https://images.pexels.com/photos/240526/pexels-photo-240526.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
      },
      liked: false,
      alt: "Coconut Tree Near Body of Water Under Blue Sky",
    },
    {
      id: 1139040,
      width: 3954,
      height: 2962,
      url: "https://www.pexels.com/photo/aerial-view-photography-of-island-1139040/",
      photographer: "Flo Dahm",
      photographer_url: "https://www.pexels.com/@flodahm",
      photographer_id: 154317,
      avg_color: "#51838B",
      src: {
        original:
          "https://images.pexels.com/photos/1139040/pexels-photo-1139040.jpeg",
        large2x:
          "https://images.pexels.com/photos/1139040/pexels-photo-1139040.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        large:
          "https://images.pexels.com/photos/1139040/pexels-photo-1139040.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        medium:
          "https://images.pexels.com/photos/1139040/pexels-photo-1139040.jpeg?auto=compress&cs=tinysrgb&h=350",
        small:
          "https://images.pexels.com/photos/1139040/pexels-photo-1139040.jpeg?auto=compress&cs=tinysrgb&h=130",
        portrait:
          "https://images.pexels.com/photos/1139040/pexels-photo-1139040.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
        landscape:
          "https://images.pexels.com/photos/1139040/pexels-photo-1139040.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        tiny: "https://images.pexels.com/photos/1139040/pexels-photo-1139040.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
      },
      liked: false,
      alt: "Aerial View Photography of Island",
    },
    {
      id: 457878,
      width: 3828,
      height: 2552,
      url: "https://www.pexels.com/photo/green-trees-near-seashore-under-blue-sky-457878/",
      photographer: "Asad Photo Maldives",
      photographer_url: "https://www.pexels.com/@asadphotography",
      photographer_id: 45786,
      avg_color: "#9FAF9F",
      src: {
        original:
          "https://images.pexels.com/photos/457878/pexels-photo-457878.jpeg",
        large2x:
          "https://images.pexels.com/photos/457878/pexels-photo-457878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        large:
          "https://images.pexels.com/photos/457878/pexels-photo-457878.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        medium:
          "https://images.pexels.com/photos/457878/pexels-photo-457878.jpeg?auto=compress&cs=tinysrgb&h=350",
        small:
          "https://images.pexels.com/photos/457878/pexels-photo-457878.jpeg?auto=compress&cs=tinysrgb&h=130",
        portrait:
          "https://images.pexels.com/photos/457878/pexels-photo-457878.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
        landscape:
          "https://images.pexels.com/photos/457878/pexels-photo-457878.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        tiny: "https://images.pexels.com/photos/457878/pexels-photo-457878.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
      },
      liked: false,
      alt: "Green Trees Near Seashore Under Blue Sky",
    },
    {
      id: 2196602,
      width: 3120,
      height: 3896,
      url: "https://www.pexels.com/photo/flock-of-birds-flying-over-islet-2196602/",
      photographer: "Thiago  Matos",
      photographer_url: "https://www.pexels.com/@thiagomobile",
      photographer_id: 903600,
      avg_color: "#849CA7",
      src: {
        original:
          "https://images.pexels.com/photos/2196602/pexels-photo-2196602.jpeg",
        large2x:
          "https://images.pexels.com/photos/2196602/pexels-photo-2196602.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        large:
          "https://images.pexels.com/photos/2196602/pexels-photo-2196602.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        medium:
          "https://images.pexels.com/photos/2196602/pexels-photo-2196602.jpeg?auto=compress&cs=tinysrgb&h=350",
        small:
          "https://images.pexels.com/photos/2196602/pexels-photo-2196602.jpeg?auto=compress&cs=tinysrgb&h=130",
        portrait:
          "https://images.pexels.com/photos/2196602/pexels-photo-2196602.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
        landscape:
          "https://images.pexels.com/photos/2196602/pexels-photo-2196602.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        tiny: "https://images.pexels.com/photos/2196602/pexels-photo-2196602.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
      },
      liked: false,
      alt: "Flock of Birds Flying over Islet",
    },
    {
      id: 2307638,
      width: 3840,
      height: 2160,
      url: "https://www.pexels.com/photo/aerial-view-of-green-island-2307638/",
      photographer: "Arist Creathrive",
      photographer_url: "https://www.pexels.com/@arist-creathrive-1183525",
      photographer_id: 1183525,
      avg_color: "#295B5E",
      src: {
        original:
          "https://images.pexels.com/photos/2307638/pexels-photo-2307638.jpeg",
        large2x:
          "https://images.pexels.com/photos/2307638/pexels-photo-2307638.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        large:
          "https://images.pexels.com/photos/2307638/pexels-photo-2307638.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        medium:
          "https://images.pexels.com/photos/2307638/pexels-photo-2307638.jpeg?auto=compress&cs=tinysrgb&h=350",
        small:
          "https://images.pexels.com/photos/2307638/pexels-photo-2307638.jpeg?auto=compress&cs=tinysrgb&h=130",
        portrait:
          "https://images.pexels.com/photos/2307638/pexels-photo-2307638.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
        landscape:
          "https://images.pexels.com/photos/2307638/pexels-photo-2307638.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        tiny: "https://images.pexels.com/photos/2307638/pexels-photo-2307638.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
      },
      liked: false,
      alt: "Aerial View of Green Island",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPic, setIsPic] = useState(false);
  const [imgHeight, setImgHeight] = useState(600);
  const [imgHeightUnit, setImgHeightUnit] = useState(0);
  let defaultPic = "https://rb.gy/a46vwt";
  const [imgSrc, setImgSrc] = useState(defaultPic);
  const [showImgPopUp, setShowImgPopUp] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [position, setPosition] = useState("0");
  const [pexels, setPexels] = useState(true);
  const [loading, setLoading] = useState(false);
  const [urlOpen, setUrlOpen] = useState(false);

  const [pageCounter, setPageCounter] = useState(1);

  const imgRef = useRef(null);
  const imgURLRef = useRef(null);

  // Send url back from imagecard component
  const sendURL = (url) => {
    // console.log(url);
    setImgSrc(url);
    reSizeImgBounds();
    updateImagetoDB();
  };

  useEffect(() => {
    setShowImgPopUp(false);
    // console.log("UE START");
    setImageLoading(true);

    if (currentDocRedux) {
      // if (imgSrc) {
      if (currentDocRedux.imgUrl.length > 0) {
        setImgSrc(currentDocRedux.imgUrl);
        imgURLRef.current = currentDocRedux.imgUrl;
      } else {
        setImgSrc(defaultPic);
        imgURLRef.current = defaultPic;
        setShowImgPopUp(true);
      }
      if (currentDocRedux.imgUrl) {
        setIsPic(true);
      } else {
        setIsPic(false);
      }
      // setPosition(currentDocRedux.imgPosition);
    }
    // console.log(imgSrc);
    // console.log(imgURLRef.current);

    if (imgSrc === imgURLRef.current) {
      setImageLoading(false);
    }
  }, [currentDocRedux]); // eslint-disable-line react-hooks/exhaustive-deps

  const reSizeImgBounds = () => {
    // console.log(e);
    if (typeof window !== "undefined") {
      // console.log(currentDocRedux.imgPosition + "CDR pos");
      // const { offsetHeight, offsetWidth } = img;
      // setImgHeight([offsetHeight, offsetWidth]);
      // console.log(imgHeight[0] + "imgheight");
      // let heightDivFour = ;
      // console.log(imgRef.current.clientHeight + "init");
      // setImgHeight(imgRef.current.clientHeight);

      var localImgHeight = imgRef.current.clientHeight;
      var localImgWidth = imgRef.current.clientWidth;

      // console.log(imgRef.current.clientHeight + "after");

      // console.log(localImgHeight + "hieght");

      if (localImgHeight >= localImgWidth) {
        setImgHeightUnit(localImgHeight / 2.2);
        // console.log(localImgHeight + "unit");
      } else {
        setImgHeightUnit(localImgHeight / 2.5);
        // console.log(localImgHeight + "unit");
      }
    }
  };
  const updateImagetoDB = async () => {
    let uid;

    if (user?.uid) {
      uid = user?.uid;
    } else if (userUIDRedux) {
      uid = userUIDRedux;
    } else if (auth.currentUser?.uid) {
      uid = auth.currentUser?.uid;
    } else {
      uid = "default";
      console.log("no uid available :(");
    }
    const ref = doc(
      getFirestore(),
      "users",
      uid,
      type,
      currentDocRedux.identifier
    );
    await updateDoc(ref, {
      //   title: title,
      //   content: content,
      //   published: publish,
      //   rating: rating,
      //   slug,
      imgUrl: imgSrc,
      imgPosition: position,
      updatedAt: serverTimestamp(),
    })
      .then(() => {
        setShowImgPopUp(!showImgPopUp);
        setPexels(false);
        setSearchTerm("idea");
        toast.success("Image/Position Saved!");
      })
      .catch((error) => {
        toast.error("Error occured 😩");
        console.log("Update failed!" + error);
      });
  };

  const searchPexels = async (values, newPage) => {
    // console.time("load");
    // e.preventDefault();
    if (searchTerm.length === 0 || values.length === 0) {
      return;
    }
    setLoading(true);
    console.log(pageCounter);
    console.log(values);
    // console.log(searchTerm);
    let formData, pageNum;
    // let pageData= pageCounter;
    if (newPage === 2) {
      formData = searchTerm;
      setPageCounter(pageCounter + 1);
      pageNum = pageCounter + 1;

      // pageData = 2
    } else {
      formData = values;

      // setPageCounter(1);
      pageNum = 1;
    }
    // setLoading(true)
    console.log(pageCounter);

    await axios({
      method: "POST",
      url: "/api/pexels",
      data: {
        input: formData,
        page: pageNum,
      },
      // headers: headers,
    })
      .then((response) => {
        console.log("index response");
        console.log(response);
        // setAiResponse(response.data.results);
        // dispatch(gpt3OutputAction(aiResponse));
        // setResponseRecieved(true);
        // setAiLoading(false);
        // console.log(response.data);

        setPics(response.data.results.photos);
        setLoading(false);
        // console.log(pics)
        // return response;
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    // console.timeEnd("load");
  };

  let pexelsWindow = (
    <div className=" flex items-center flex-col w-[35em] z-50">
      <div
        // onSubmit={handleSubmit(onSubmitForm)}
        className="relative flex items-center justify-between w-full text-gray-600 bg-white border-2 border-gray-300 rounded-2xl"
      >
        <input
          className="h-10 px-5  text-sm bg-white border-gray-300 border-none w-[60%] rounded-2xl focus:outline-none"
          type="search"
          name="search"
          placeholder="Search Photos from Pexels"
          value={searchTerm}
          // {...register("input")}
          onChange={(e) => {
            // console.log(e.target.value)
            setSearchTerm(e.target.value, 1);
            setPageCounter(1);
            // setTimeout(() => {
            // setSearchTerm(e.target.value)
            // handleSubmit(onSubmitForm)
            searchPexels(e.target.value, 1);
            // }, 500);
          }}
        />
        {pics.length > 0 && (
          <button
            className="flex items-center justify-center gap-3 px-2 py-1 mr-1 text-white cursor-pointer rounded-3xl bg-t-bd drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 w-[10em]"
            onClick={() => {
              // onSubmitForm(2);
              searchPexels(searchTerm, 2);
            }}
          >
            <FaUndo />
            Load More
          </button>
        )}
        <button
          // type="submit"
          onClick={() => {
            searchPexels(searchTerm);
          }}
          className="p-2 mr-1 text-white cursor-pointer rounded-3xl bg-t-bl drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
        >
          <FaSearch />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <ImageList loading={loading} images={pics} sendURL={sendURL} />
      </div>
      {pics.length === 0 && <p>No images found</p>}
      <Loader show={loading} cN="!absolute  top-[60%]" />

      <div className="flex items-center justify-center w-full">
        {!urlOpen && (
          <button
            onClick={() => setUrlOpen(!urlOpen)}
            className="flex items-center justify-center gap-3 px-2 py-1 mr-1 text-white cursor-pointer rounded-3xl bg-clear-bl3 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 w-[10em]"
          >
            <p className="text-xs text-white">Use my own image</p>
          </button>
        )}
        {urlOpen && (
          <div className="flex flex-col w-full  normal-box !bg-clear-bl1 py-2 items-center justify-center relative">
            <button
              onClick={() => setUrlOpen(!urlOpen)}
              className="absolute top-0 right-0 flex items-center justify-center gap-3 px-2 py-1 mr-1 cursor-pointer text-t-bd rounded-3xl drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 "
            >
              <FaTimes />
            </button>
            <p>Paste Image URL</p>
            <input
              type="text"
              className="mb-1 textarea-box textarea-tw !rounded-xl !h-8 w-[40%]"
              placeholder={"https://your-url-here.com/myimage.jpg"}
              onChange={(e) => {
                setImgSrc(e.target.value);
                imgURLRef.current = e.target.value;
                // let charLength = e.target.value.length;
                // console.log(charLength);
                // if (charLength >= 150) {
              }}
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      className={
        "h-[10em] w-[100%] flex items-center overflow-hidden rounded-2xl image-cover-div  group relative"
      }
    >
      <button
        onClick={() => {
          reSizeImgBounds();
          setShowImgPopUp(!showImgPopUp);
          setPexels(false);
          setSearchTerm("");
        }}
        className={
          mode === "edit"
            ? " fade-effect-turbo opacity-100 absolute top-2 left-6"
            : "group-hover:opacity-100 opacity-0 fade-effect-turbo transition absolute top-2 left-4"
        }
      >
        <div className=" flex items-center justify-center w-[8em] h-8 rounded-full bg-white/60 md:hover:scale-105   gap-2 text-black/60 ">
          <FaImage className="text-t-bl" />
          Edit Image
        </div>{" "}
      </button>
      {showImgPopUp && (
        <div
          className={
            "fixed top-10 left-16 normal-box bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] flex flex-col !rounded-xl z-30 "
          }
        >
          <div className="flex items-center justify-between">
            <p
              onClick={() => {
                setShowImgPopUp(!showImgPopUp);
                setPexels(false);
                setSearchTerm("");
              }}
              className="absolute right-0 mr-1 text-3xl cursor-pointer md:hover:text-t-bl text-t-pm top-1"
            >
              <FaTimes />
            </p>
          </div>

          <div className="flex flex-col items-center justify-start w-full">
            <div
              className={
                "flex items-center justify-start w-full  flex-row gap-1 px-3 mt-2"
              }
            >
            <h3 className="text-lg text-t-bd">Images</h3>

              {/* <div
              className="w-[15em] h-[2em] rounded-3xl  flex items-center justify-center text-black gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform  mt-2"
            //   onClick={() => {
            //     setPexels(!pexels);
            //   }}
            >
                Search Photos from Pexels: */}
              {/* <img src="/pexels.svg" alt="logo" className="w-auto h-8" /> */}
              {/* </div> */}
            </div>
            <div> {pexelsWindow} </div>
          </div>
          <div className="flex flex-col w-full mb-4 mt-1 normal-box !bg-clear-bl1 py-2 items-center justify-center">
            <p>Image Position:</p>
            <div className="flex justify-center mx-[2em] w-full mt-1">
              <FaAngleDown className="text-[20px] text-t-bd" />
              <input
                id="typeinp"
                type="range"
                className="blue range"
                min={-imgHeightUnit || 400}
                max={imgHeightUnit || -400}
                // defaultValue="0"
                value={position}
                step="1"
                onChange={(e) => {
                  // console.log(imgHeightUnit);

                  // console.log(e.target.valueAsNumber)
                  setPosition(e.target.valueAsNumber);
                  // console.log(position)
                }}
              />
              <FaAngleUp className="text-[20px] text-t-pd" />
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <button
              className="w-[24em] h-[3em] rounded-3xl bg-t-bl flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer mb-2 text-lg"
              onClick={() => {
                updateImagetoDB();
                // setShowImgPopUp(false)
              }}
            >
              <FaSave />
              Save image & Position
            </button>
          </div>
        </div>
      )}

      {/* {loading ? <Skeleton className=" object-cover !leading-loose !rounded-xl w-[12em] h-[8em] !p-0" />: <img
    src={isPhoto}
    alt=""
    className="object-cover rounded-xl card__image w-[12em] h-[8em] "
    placeholder="blur"
  />} */}
      {imageLoading && (
        <div className="z-0 w-full h-full">
          <Skeleton
            width={"100%"}
            height={"100%"}
            className=" w-full h-full object-cover !leading-loose !rounded-xl  !p-0 fade-effect-quick z-100"
            baseColor="var(--colorSkeleton1)"
            highlightColor="var(--colorSkeleton2)"
          />
        </div>
      )}

      <img
        ref={imgRef}
        onLoad={() => {
          // console.log("IMG LOADED");

          setImageLoading(false);

          setPosition(currentDocRedux.imgPosition);
        }}
        style={{ objectPosition: "0px " + position + "px" }}
        className={
          " w-full fade-effect-turbo " + (imageLoading ? " !hidden" : "")
        }
        src={imgSrc}
        alt="cover image"
        placeholder="blur"
      />
    </div>
  );
}

export default DisplayImage;

import { firestore, auth } from "../../lib/firebase";
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
import { useCollection } from "react-firebase-hooks/firestore";
// import DOMPurify from "dompurify";
import Stars from "./Stars";
import {
  FaAngleDoubleDown,
  FaAngleDoubleUp,
  FaAngleDown,
  FaAngleUp,
  FaEdit,
  FaExternalLinkAlt,
  FaGlobeAmericas,
  FaGripLines,
  FaImage,
  FaLock,
  FaSave,
  FaSearch,
  FaUndo,
} from "react-icons/fa";
import {
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
  useContext,
} from "react";
// import DOMPurify from "isomorphic-dompurify";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { editModeAction, sFormAction } from "../../redux/actions";
import sanitize from "../../lib/sanitize";
// const probe = require('probe-image-size');
import ImageList from "./ImageList";
import axios from "axios";

import { useForm } from "react-hook-form";
import ChipFeature from "../MainPage/solutionsComponents/CombinatorialComponents/ChipFeature";
import ChipTechStackDisplay from "../MainPage/solutionsComponents/CombinatorialComponents/ChipTechStackDisplay";
import { MdOutlineUpgrade } from "react-icons/md";
import { useRouter } from "next/router";

export default function IdeaDisplay(props) {
  const currentDocRedux = useSelector((state) => state.currentDoc);
  const [cleanContent, setCleanContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, username } = useContext(UserContext);
  const sFormRedux = useSelector((state) => state.sForm);

  const [showImgPopUp, setShowImgPopUp] = useState(false);
  const [pexels, setPexels] = useState(false);
  const [pageCounter, setPageCounter] = useState(1);
  const userUIDRedux = useSelector((state) => state.userUID);
const router= useRouter();
  let type = props.type;

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
  const [searchTerm, setSearchTerm] = useState("island");
  const { register, handleSubmit } = useForm({});

  // const [hover, setHover] = useState(false);
  const [position, setPosition] = useState("0");
  const [isPic, setIsPic] = useState(false);
  const [imgHeight, setImgHeight] = useState(600);
  const [imgHeightUnit, setImgHeightUnit] = useState(0);
  const dispatch = useDispatch();

  let picList = [
    "https://rb.gy/df8y2i",
    "https://rb.gy/osiw9l",
    "https://rb.gy/s8a3mn",
    "https://rb.gy/1jfgm0",
    "https://rb.gy/hpeopl",
    "https://rb.gy/dur8fg",
    "https://rb.gy/ujaeir",
    "https://rb.gy/z8yvnq",
    "https://rb.gy/a46vwt",
    "https://rb.gy/2nshjg",
    "https://rb.gy/gujhr7",
    "https://rb.gy/nsaww3",
    "https://rb.gy/fnxgkq",
    "https://rb.gy/nwvqlx",
    "https://rb.gy/pkjcm5",
    "https://rb.gy/2o5v0d",
    "https://rb.gy/5cnzzy",
    "https://rb.gy/ine8y2",
    "https://rb.gy/czxlg0",
  ];

  let randomNumber = Math.floor(Math.random() * picList.length);

  // let randomPic =

  let defaultPic = picList[randomNumber];
  const [imgSrc, setImgSrc] = useState(defaultPic);

  // Send url back from imagecard component
  const sendURL = (url) => {
    // console.log(url);
    setImgSrc(url);
    reSizeImgBounds();
  };
  // console.log(currentDocRedux);
  const imgRef = useRef(null);
  // console.log(imgSrc)

  useEffect(() => {
    setShowImgPopUp(false);

    // const domPurify = DOMPurify(window);
    var clean = sanitize(currentDocRedux?.content, {
      USE_PROFILES: { html: true },
    });

    setCleanContent(clean);

    // console.log(currentDocRedux);
    // console.log(currentDocRedux.title);

    // const probe = require('probe-image-size');

    // console.log(imgRef.current.clientHeight + "init");
    // console.log(imgRef.current.currentSrc);

    // console.log(currentDocRedux.imgPosition);
    // setImgHeight(imgRef.current.clientHeight);

    // setImgSrc(currentDocRedux);

    // imgRef.style.objectPosition = "0 10%";
    // console.log(imgSrc);

    if (currentDocRedux) {
      //   console.log(setEditDocDetails[0].imgPosition);
      if (imgSrc) {
        setImgSrc(currentDocRedux.imgUrl);
        // console.log(imgSrc);
      } else {
        setImgSrc(defaultPic);

        // console.log(imgSrc);
      }
      if (currentDocRedux.imgUrl) {
        setIsPic(true);
      } else {
        setIsPic(false);
      }
      setPosition(currentDocRedux.imgPosition);
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

  const onSubmitForm = async (values) => {
    setLoading(true);
    console.time("load");
    // e.preventDefault();
    console.log(pageCounter);
    // console.log(values.input);
    // console.log(searchTerm);
    let formData, pageNum;
    // let pageData= pageCounter;
    if (values === 2) {
      formData = searchTerm;
      setPageCounter(pageCounter + 1);
      pageNum = pageCounter + 1;

      // pageData = 2
    } else {
      formData = values.input;

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
        // console.log("index response");
        // console.log(response.data.results);
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
        return "Sorry, an Error occured";
      });

    console.timeEnd("load");
  };

  // {handleSubmit(onSubmitFormGptJ)}>
  let pexelsWindow = (
    <div className=" flex items-center flex-col w-[35em]">
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="flex items-center w-full text-gray-600 bg-white border-2 border-gray-300 rounded-2xl"
      >
        <input
          className="h-10 px-5  text-sm bg-white border-gray-300 border-none w-[90%] rounded-2xl focus:outline-none"
          type="search"
          name="search"
          placeholder="Search Pexels"
          value={searchTerm}
          {...register("input")}
          onChange={(e) => {
            // console.log(e.target.value)
            setSearchTerm(e.target.value);
            setPageCounter(1);
            // setTimeout(() => {
            // setSearchTerm(e.target.value)
            //   onSubmitForm()
            // }, 500);
          }}
        />
        <button
          type="submit"
          className="p-2 mr-1 text-white cursor-pointer rounded-3xl bg-t-bl drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
        >
          <FaSearch />
        </button>
      </form>
      <div className="flex items-center gap-2">
        <ImageList loading={loading} images={pics} sendURL={sendURL} />
      </div>
      {pics.length === 0 && <p>No images found</p>}
      {pics.length > 0 && (
        <button
          className="flex items-center justify-center gap-3 p-2 mr-1 text-white cursor-pointer rounded-3xl bg-t-bd drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 w-[10em]"
          onClick={() => {
            onSubmitForm(2);
          }}
        >
          <FaUndo />
          Load More
        </button>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center w-full fade-effect-quick">
      {!isPic && (
        <button
          onClick={() => {
            // setImgSrc(
            //   "https://images.unsplash.com/photo-1530658432962-05f34932eb47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2307&q=80"
            // );
            // setTimeout(function(){
            // setShowImgPopUp(true)
            setIsPic(true);
            setImgSrc(defaultPic);
            setShowImgPopUp(true);

            // }, 2000);
          }}
          className="fixed flex items-center justify-center w-[8em]  gap-2 h-8 rounded-full bg-white/60 md:hover:scale-105 top-2 left-4"
        >
          {" "}
          <FaImage className="text-t-bl" />
          Add Image
        </button>
      )}
      {/* {isPic && ( */}
      <div
        className={
          "h-[10em] w-[100%] flex items-center overflow-hidden rounded-2xl image-cover-div  " +
          (isPic ? "" : " !hidden")
        }
      >
        <button
          onClick={() => {
            reSizeImgBounds();
            setShowImgPopUp(!showImgPopUp);
            setPexels(false);
            setSearchTerm("idea");
          }}
          className="img-button fade-effect-turbo"
        >
          <div className="fixed flex items-center justify-center w-[8em] h-8 rounded-full bg-white/60 md:hover:scale-105  top-2 left-4 gap-2 text-black/60 ">
            <FaImage className="text-t-bl" />
            Edit Image
          </div>{" "}
        </button>
        {showImgPopUp && (
          <div
            className={
              "fixed top-10 left-16 normal-box bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] flex flex-col !rounded-xl "
            }
          >
            <div className="flex items-center justify-between">
              <p className="mx-4">Position:</p>

              <p
                onClick={() => {
                  setShowImgPopUp(!showImgPopUp);
                  setPexels(false);
                  setSearchTerm("idea");
                }}
                className="mr-1 text-2xl cursor-pointer md:hover:text-t-bl text-t-bd"
              >
                X
              </p>
            </div>
            <div className="flex justify-center mx-[2em]">
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

            <p className="mx-4">Set Image URL:</p>

            <input
              type="text"
              className="mx-5 mb-1 textarea-box textarea-tw "
              placeholder={imgSrc || "Paste image url here"}
              onChange={(e) => {
                setImgSrc(e.target.value);
                // let charLength = e.target.value.length;
                // console.log(charLength);
                // if (charLength >= 150) {
              }}
            />

            <div className="flex flex-col items-center justify-center w-full">
              {/* <p className="mx-4">Or</p> */}
              <div
                className={
                  "flex items-center justify-center w-full " +
                  (pexels ? " flex-row gap-10" : " flex-col")
                }
              >
                <button
                  className="w-[12em] h-[2em] rounded-3xl bg-t-bpop flex items-center justify-center text-black gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer mb-2"
                  onClick={() => {
                    setPexels(!pexels);
                  }}
                >
                  <img src="/pexels.svg" alt="logo" className="w-auto h-8" />
                  {pexels ? "Close" : "Browse Pexels"}
                </button>

                <button
                  className="w-[13em] h-[2em] rounded-3xl bg-t-bl flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer mb-2"
                  onClick={() => {
                    updateImagetoDB();
                    // setShowImgPopUp(false)
                  }}
                >
                  <FaSave />
                  Save image & Position
                </button>
              </div>
              {pexels && <div> {pexelsWindow} </div>}
            </div>
          </div>
        )}
        <img
          ref={imgRef}
          // onLoad={()=>{console.log("IMG LOADED")}}
          style={{ objectPosition: "0px " + position + "px" }}
          className={" w-full fade-effect-turbo "}
          src={imgSrc}
          alt="cover image"
        />
      </div>
      <div className="text-t-bd text-[28px] p-5 mt-3">
        <h2 className="mx-3 ">{currentDocRedux?.title || "*Unnamed Idea"}</h2>
      </div>

      <div
        className={
          "flex items-center my-2  w-[98%] " +
          (type === "ideas" ? "justify-between" : "justify-end")
        }
      >
        {type === "ideas" && (
          <>
            <div className="flex items-center gap-1 ">
              <p className="text-[22px] text-t-bd">Rating</p>
              <Stars hover={false} rating={currentDocRedux?.rating} />
            </div>
            {/* <div>
              {currentDocRedux?.published ? (
                <div className="flex items-center gap-1">
                  <FaGlobeAmericas className="text-t-bl" />
                  <p className="text-t-bl">Public&nbsp;&nbsp; </p>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <FaLock className="text-t-pd" />
                  <p className="text-t-pd">Private</p>
                </div>
              )}
            </div> */}
          </>
        )}

        <div className="flex items-center gap-2">
        <div>
                <button
                onClick={()=>{
                 
                    let newRef = sFormRedux;
                    newRef.idea = currentDocRedux;
                    
                    dispatch(sFormAction(newRef))
                    router.push("/solutions/improve#add-features")
                   
             
                  }
                   
                   }
                className=" px-3 h-[2em] rounded-3xl bg-t-pm flex items-center justify-center text-white gap-3 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer "
              >
               <><MdOutlineUpgrade className="text-[24px]" /> Improve Idea </>
             {/* {currentDocRedux?.features?.length === 0 ? <><MdOutlineUpgrade className="text-[24px]" /> Improve Idea </> : <><FaExternalLinkAlt className="text-[18px]" /> Edit Improved Idea </>} */}

                </button>
                
                </div>
          <button
            className="w-[9em] h-[2em] rounded-3xl bg-t-bl flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer"
            onClick={() => {
              dispatch(editModeAction("edit"));
            }}
          >
            <FaEdit />
            Edit Idea
          </button>
        </div>
      </div>

      <div
        className={
          "normal-box-soft w-full !rounded-2xl first-letter:" +
          (type === "ideas" ? " !bg-clear-bl2" : " !bg-clear-bpop2")
        }
      >
        <div className="normal-box bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] mt-1 mx-1 min-h-[15em] !rounded-2xl mb-4 ">
          <div
            className="mx-2"
            dangerouslySetInnerHTML={{
              __html: cleanContent,
            }}
          ></div>
        </div>

      {currentDocRedux?.features &&  <div className="flex flex-col">
                <p className="text-left">Features:</p>
                <div className="flex flex-wrap items-center justify-center gap-2 normal-box-soft">
                  {currentDocRedux?.features.map((feature, index) => (
                    <ChipFeature
                      cost={feature.cost}
                      comments={feature.comments}
                      name={feature.name}
                      feasibility={feature.feasibility}
                      importance={feature.importance}
                      version={feature.version}
                      key={index}
                    />
                  ))}
                  {currentDocRedux?.features.length === 0 && (
                    <p>No features added yet.</p>
                  )}
                </div>
              </div>}


              {currentDocRedux?.features &&  <div className="flex flex-col">
                <p className="text-left">Tech Stack:</p>
                <div className="flex flex-col items-center justify-center normal-box-soft ">
                  <div className="flex flex-wrap items-center justify-center gap-2 ">
                    {currentDocRedux?.techStack.map((tool, index) => (
                      <ChipTechStackDisplay
                        cost={tool.cost}
                        name={tool.name}
                        type={tool.type}
                        kind={tool.kind}
                        key={index}
                      />
                    ))}
                  </div>

                  {currentDocRedux?.techStack.length === 0 ? (
                    <p>No tech stack selected.</p>
                  ) : (
                    <div className="flex gap-5 mt-2">
                      <p className="text-sm ">
                        Monthly Cost:{" "}
                        {currentDocRedux?.stackCost[0]?.monthly > 0
                          ? "$" + currentDocRedux?.stackCost[0].monthly
                          : "Free"}
                      </p>
                      <p className="text-sm ">
                        Annual Cost:{" "}
                        {currentDocRedux?.stackCost[1]?.yearly > 0
                          ? "$" + currentDocRedux?.stackCost[1].yearly
                          : "Free"}
                      </p>
                    </div>
                  )}
                </div>
              </div>}
              
      </div>
    </div>
  );
}

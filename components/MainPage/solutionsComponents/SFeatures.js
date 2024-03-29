import React, { useState, useEffect } from "react";
import { Popover, ArrowContainer } from "react-tiny-popover";
import {
  FaLaptopCode,
  FaShoppingBag,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaCheck,
  FaStar,
  FaPlus,
  FaTimes,
  FaInfoCircle,
  FaUser,
  FaEthereum,
  FaLock,
} from "react-icons/fa";
import Chip from "./CombinatorialComponents/Chip";
import { useSelector, useDispatch } from "react-redux";
import { sFormAction } from "../../../redux/actions";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineDevicesOther } from "react-icons/md";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import toast from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";

function SFeatures(props) {

  const dispatch = useDispatch();
  const sFormRedux = useSelector((state) => state.sForm);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [showAuthentication, setShowAuthentication] = useState(false);
  const [showData, setShowData] = useState(false);
  const [showPlatform, setShowPlatform] = useState(false);

  const [showSocial, setShowSocial] = useState(false);
  const [showWeb3, setShowWeb3] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showMisc, setShowMisc] = useState(false);

  const [rerender, setRerender] = useState(false);

  const [featureContent, setFeatureContent] = useState("");
  const [featureArray, setFeatureArray] = useState([]);

  useEffect(() => {
    if (sFormRedux.idea === null) {
      props.goToStep(1);
      toast.error("Please select an idea before continuing");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (props.reset) {
      setFeatureArray([]);
      setFeatureContent("");
    } else {
      if (sFormRedux.features?.length > 0) {
        setFeatureArray(sFormRedux.features);
      }
    }
  }, [props.reset]); // eslint-disable-line react-hooks/exhaustive-deps



  useEffect(() => {

    setRerender(!rerender);
  }, [sFormRedux, featureArray]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateArray = (data) => {

    //NOTE!! This is duplicated many times. If you want to change it, change all of them.
    let featureObject = {
      name: data,
      importance: "...",
      feasibility: "...",
      cost: "...",
      version: "MVP",
      comments: "",
    };
    featureArray.push(featureObject);
    // console.log(featureArray);
    setFeatureArray(featureArray);
    let updated = sFormRedux;
    updated.features = featureArray;
    if (!props.changes) {
      props.setChanges(true);
    }
    dispatch(sFormAction(updated));

    // props.update("Features", featureArray);
  };
  const deleteIndex = (data) => {
    // setChanges(true)
    // console.log("🚀 ~ file: SFeatures.js ~ line 29 ~ deleteIndex ~ data", data);
    for (var i = featureArray.length - 1; i >= 0; i--) {
      if (featureArray[i].name === data) {
        // console.log(featureArray);
        featureArray.splice(i, 1);
        // console.log(featureArray);

        setFeatureArray(featureArray);
        // setChanges(false)
      }
    }

    if (!props.changes) {
      props.setChanges(true);
    }

    let updated = sFormRedux;
    updated.features = featureArray;
    dispatch(sFormAction(updated));
    // props.update("Features", featureArray);
  };
  const updateButton = (e) => {
    // console.log(e);
    let featureObject = {
      name: e.target.value,
      importance: "...",
      feasibility: "...",
      cost: "...",
      version: "MVP",
      comments: "",
    };
    featureArray.push(featureObject);

    if (!props.changes) {
      props.setChanges(true);
    }

    // featureArray.push(e.target.value);
    // console.log(featureArray);
    let updated = sFormRedux;
    updated.features = featureArray;
    dispatch(sFormAction(updated));
    // props.update("Features", featureArray);
  };


  return (
    <div>
      <div
        className="flex items-center justify-center  px-4 pt-[1rem] sm:px-6 lg:px-8 drop-shadow-xl fade-effect-quick  md:mr-[70px] 

  "
      >
        <div className=" sm:py-5 md:p-10 space-y-8  !rounded-2xl  normal-box-soft">
          <div className="flex md:flex-row sm:flex-col">
            <div className="relative flex flex-col items-center justify-center gap-3 px-2 problem-page fade-effect-quick">
            <div className="absolute md:-top-5 md:-left-5 sm:-top-2 sm:left-2">

                <Popover
                  isOpen={isPopoverOpen}
                  containerStyle={{
                    zIndex: 100,
                    boxShadow: "5px 13px 28px 0px rgba(0,0,0,0.48)",
                    backgroundColor: "white",
                    borderRadius: "2em",
                  }}
                  onClickOutside={() => setIsPopoverOpen(false)}
                  positions={["bottom", "left", "right"]}
                  content={({ position, childRect, popoverRect }) => (
                    <ArrowContainer
                      position={position}
                      childRect={childRect}
                      popoverRect={popoverRect}
                      arrowColor={"white"}
                      arrowSize={10}
                      arrowStyle={{ opacity: 1, top: "-6px" }}
                      className="popover-arrow-container"
                      arrowClassName="popover-arrow"
                    >
                      <div
                        className="!opacity-100 bg-white w-[25em] nun rounded-xl p-3"
                        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                      >
                        Features are essential to any application. Identifying
                        the key features you need ahead of time will help you
                        frame the product and gauge the complexity.
                      </div>
                    </ArrowContainer>
                  )}
                >
                  <div
                    onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                    className="w-5"
                  >
                    <FaInfoCircle className="text-2xl cursor-pointer text-blues-300 dark:text-blues-100 md:hover:scale-110" />
                  </div>
                </Popover>
              </div>
              <h1 className="text-3xl text-t-bd dark:text-blues-100">
                Features
              </h1>
              <div className="normal-box-soft">
                <h3 className="heading">
                  What features do you need? What features MUST your users have?
                </h3>
                <p>
                  Features should add value to your customer, encourage
                  conversion, or actively generate or process revenue.
                </p>
              </div>
              <div className="glass-box bg-white/30  dark:bg-[hsla(200,0%,20%,0.764)] !rounded-xl text-left max-w-[100%] w-[110%]">
                <h3 className=" text-t-bd dark:text-blue-100">My Features:</h3>
                {/* <p>featureString:</p>
                  <p>{featureString}</p>
                  <p>props:</p>                  
                  <p>{props.form.form.Features}</p>


                  <p>Feature with a sentence description</p> */}
                <div className="flex flex-wrap w-full gap-1 ">
                  {featureArray.length === 0 && <p>No features added yet.</p>}
                  {featureArray.map((data, index) => (
                    <ListItem
                      name={data.name}
                      key={index}
                      deleteIndex={deleteIndex}
                    />
                  ))}
                </div>
                {/* <p>Feature with a sentence description</p>
                  <p>Feature with a sentence description</p> */}
              </div>
              <div className="flex w-full gap-2 md:flex-row sm:flex-col">
                <div className="flex flex-wrap flex-col sm:gap-1 md:gap-2 px-2 py-2 border-2 md:flex-col rounded-xl sm:justify-center sm:max-h-[15em] md:max-h-full">
                  <button
                    className={
                      "sm:scale-90 md:w-[10em] sm:px-3 h-[3em] rounded-3xl  flex items-center justify-start pl-3  gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " +
                      (showPlatform
                        ? " border-4 border-sky-700 bg-sky-500 text-white"
                        : "bg-sky-300")
                    }
                    onClick={(e) => {
                      setShowPlatform(!showPlatform);
                    }}
                  >
                    <MdOutlineDevicesOther className="text-2xl" />
                    Platform
                    {showPlatform ? (
                      <span className="absolute flex items-center justify-center w-6 h-6 leading-none text-center text-black rounded-full -top-2 -left-2 bg-sky-200">
                        <FaTimes />
                      </span>
                    ) : null}
                  </button>
                  <button
                    className={
                      "sm:scale-90 md:w-[10em] sm:px-3 h-[3em] rounded-3xl  flex items-center justify-start pl-3  gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " +
                      (showSocial
                        ? " border-4 border-teal-700 bg-teal-500 text-white"
                        : "bg-teal-300")
                    }
                    onClick={(e) => {
                      setShowSocial(!showSocial);
                    }}
                  >
                    <IoIosPeople className="text-2xl" />
                    Social
                    {showSocial ? (
                      <span className="absolute flex items-center justify-center w-6 h-6 leading-none text-center text-black bg-teal-200 rounded-full -top-2 -left-2">
                        <FaTimes />
                      </span>
                    ) : null}
                  </button>

                  <button
                    className={
                      " sm:scale-90 md:w-[10em] sm:px-3 h-[3em] rounded-3xl  flex items-center justify-start pl-3  gap-2 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " +
                      (showAuthentication
                        ? " border-4 border-green-700 text-white bg-green-500 "
                        : "bg-green-300")
                    }
                    onClick={(e) => {
                      setShowAuthentication(!showAuthentication);
                    }}
                  >
                    <FaUser /> Authentication
                    {showAuthentication ? (
                      <span className="absolute flex items-center justify-center w-6 h-6 leading-none text-center text-black bg-green-200 rounded-full -top-2 -left-2">
                        <FaTimes />
                      </span>
                    ) : null}
                  </button>
                  <button
                    className={
                      " sm:scale-90 md:w-[10em] sm:px-3 h-[3em] rounded-3xl  flex items-center justify-start pl-3  gap-2 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " +
                      (showData
                        ? " border-4 border-yellow-500 bg-yellow-400 text-white"
                        : "bg-yellow-200 text-black")
                    }
                    onClick={(e) => {
                      setShowData(!showData);
                    }}
                  >
                    <FaLaptopCode />
                    Data
                    {showData ? (
                      <span className="absolute flex items-center justify-center w-6 h-6 leading-none text-center text-black bg-yellow-100 rounded-full -top-2 -left-2">
                        <FaTimes />
                      </span>
                    ) : null}
                  </button>
                  <button
                    className={
                      "sm:scale-90 md:w-[10em] sm:px-3 h-[3em] rounded-3xl  flex items-center justify-start pl-3  gap-2 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " +
                      (showSecurity
                        ? " border-4 border-orange-700 bg-orange-500 text-white"
                        : "bg-orange-300")
                    }
                    onClick={(e) => {
                      setShowSecurity(!showSecurity);
                    }}
                  >
                    <FaLock /> Security
                    {showSecurity ? (
                      <span className="absolute flex items-center justify-center w-6 h-6 leading-none text-center text-black bg-orange-200 rounded-full -top-2 -left-2">
                        <FaTimes />
                      </span>
                    ) : null}
                  </button>
                  <button
                    className={
                      "sm:scale-90 md:w-[10em] sm:px-3 h-[3em] rounded-3xl  flex items-center justify-start pl-3  gap-2 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " +
                      (showWeb3
                        ? " border-4 border-red-700 bg-red-500 text-white"
                        : "bg-red-300 text-black")
                    }
                    onClick={(e) => {
                      setShowWeb3(!showWeb3);
                    }}
                  >
                    <FaEthereum className="text-xl" /> Web3
                    {showWeb3 ? (
                      <span className="absolute flex items-center justify-center w-6 h-6 leading-none text-center text-black bg-red-200 rounded-full -top-2 -left-2">
                        <FaTimes />
                      </span>
                    ) : null}
                  </button>

                  <button
                    className={
                      "sm:scale-90 md:w-[10em] sm:px-3 h-[3em] rounded-3xl  flex items-center justify-start pl-3  gap-2 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " +
                      (showMisc
                        ? " border-4 border-violet-700 bg-violet-500 text-white"
                        : "bg-violet-300")
                    }
                    onClick={(e) => {
                      setShowMisc(!showMisc);
                    }}
                  >
                    <HiOutlineDotsCircleHorizontal className="text-xl" /> Other
                    Features
                    {showMisc ? (
                      <span className="absolute flex items-center justify-center w-6 h-6 leading-none text-center text-black rounded-full -top-2 -left-2 bg-violet-200">
                        <FaTimes />
                      </span>
                    ) : null}
                  </button>
                </div>

                {/* <button
              className={
                "w-[12em] h-[4em] rounded-3xl  flex items-center justify-center text-black gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  "
              }
              onClick={(e) => {
                updateButton(e);
              }}
              value="Solve a problem I have"
            >
              alskdjf
            </button> */}

                <div
                  className="glass-box bg-[rgba(255, 255, 255, 0.25)] dark:bg-[hsla(200,0%,5%,0.65)]   border-2 border-t-pm w-full !p-2  !rounded-xl gap-2"
                  onClick={() => {
                    // console.log("click")
                    setRerender(!rerender);
                  }}
                >
                  <div className="glass-box !rounded-xl w-full">
                    <p className="mt-0 mb-0 text-left">Add Custom Features:</p>

                    <div className="flex items-center justify-start gap-2 ">
                      <TextareaAutosize
                        // type="text"
                        className="textarea-box  textarea-tw  sm:w-full  md:!w-[60%] whitespace-normal"
                        name="feature"
                        placeholder="..."
                        value={featureContent}
                        onChange={(e) => setFeatureContent(e.target.value)}
                      />
                      <button
                        className="w-[4em] h-[3em] rounded-full p-1  flex items-center justify-center text-black gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer bg-t-bl "
                        onClick={() => {
                          updateArray(featureContent);
                          setFeatureContent("");
                        }}
                      >
                        <FaPlus className="text-[18px] text-white" />{" "}
                        <p className="m-0 text-white">Add</p>
                      </button>
                    </div>
                  </div>
                  {/* <p>Common Features</p> */}
                  {showPlatform && (
                    <div
                      className="flex flex-col items-start p-1 mt-2 mb-2 border-2 border-sky-400 bg-sky-400/30 rounded-2xl"
                      transition-style="in:wipe:right"
                    >
                      <p className="pl-3 m-0">Platform</p>
                      <div
                        className="flex flex-wrap gap-1"
                        transition-style="in:wipe:right"
                      >
                        <Chip
                          // changes={changes}
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Web"
                          value="Web"
                          icon="plus"
                          color="bg-sky-100"
                          bColor="border-sky-300"
                          iconColor="text-sky-600"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="IOS"
                          icon="plus"
                          color="bg-sky-100"
                          bColor="border-sky-300"
                          iconColor="text-sky-600"
                        />

                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Android"
                          icon="plus"
                          color="bg-sky-100"
                          bColor="border-sky-300"
                          iconColor="text-sky-600"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="MacOS"
                          icon="plus"
                          color="bg-sky-100"
                          bColor="border-sky-300"
                          iconColor="text-sky-600"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Windows"
                          icon="plus"
                          color="bg-sky-100"
                          bColor="border-sky-300"
                          iconColor="text-sky-600"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Linux"
                          icon="plus"
                          color="bg-sky-100"
                          bColor="border-sky-300"
                          iconColor="text-sky-600"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Chrome extension"
                          icon="plus"
                          color="bg-sky-100"
                          bColor="border-sky-300"
                          iconColor="text-sky-600"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Plugin"
                          icon="plus"
                          color="bg-sky-100"
                          bColor="border-sky-300"
                          iconColor="text-sky-600"
                        />
                      </div>
                    </div>
                  )}
                  {showSocial && (
                    <div
                      className="flex flex-col items-start p-1 my-2 border-2 border-teal-400 bg-teal-400/30 rounded-2xl"
                      transition-style="in:wipe:right"
                    >
                      <p className="pl-3 m-0">Social</p>
                      <div className="flex flex-wrap gap-1">
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Share to Social Media"
                          icon="plus"
                          color="bg-teal-100"
                          bColor="border-teal-300"
                          iconColor="text-teal-500"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Realtime Collaboration"
                          icon="plus"
                          color="bg-teal-100"
                          bColor="border-teal-300"
                          iconColor="text-teal-500"
                        />

                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="File sharing"
                          icon="plus"
                          color="bg-teal-100"
                          bColor="border-teal-300"
                          iconColor="text-teal-500"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Comments"
                          icon="plus"
                          color="bg-teal-100"
                          bColor="border-teal-300"
                          iconColor="text-teal-500"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Liking/Hearting"
                          icon="plus"
                          color="bg-teal-100"
                          bColor="border-teal-300"
                          iconColor="text-teal-500"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Voting/Polling"
                          icon="plus"
                          color="bg-teal-100"
                          bColor="border-teal-300"
                          iconColor="text-teal-500"
                        />
                      </div>
                    </div>
                  )}
                  {showAuthentication && (
                    <div
                      className="flex flex-col items-start p-1 mb-2 border-2 border-green-400 bg-green-400/30 rounded-2xl"
                      transition-style="in:wipe:right"
                    >
                      <p className="pl-3 m-0">Authentication</p>
                      <div className="flex flex-wrap gap-1">
                        <Chip
                          // changes={changes}
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Sign-in with Email/Password"
                          value="Sign-in with Email/Password"
                          icon="plus"
                          color="bg-green-100"
                          bColor="border-green-300"
                          iconColor="text-green-500"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Sign-in with Google/other 3rd party"
                          icon="plus"
                          color="bg-green-100"
                          bColor="border-green-300"
                          iconColor="text-green-500"
                        />

                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="2-factor Auth"
                          icon="plus"
                          color="bg-green-100"
                          bColor="border-green-300"
                          iconColor="text-green-500"
                        />
                      </div>
                    </div>
                  )}

                  {showData && (
                    <div
                      className="flex flex-col items-start p-1 my-2 border-2 border-yellow-400 bg-yellow-400/30 rounded-2xl"
                      transition-style="in:wipe:right"
                    >
                      <p className="pl-3 m-0">Data</p>
                      <div className="flex flex-wrap gap-1">
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Relational Database"
                          icon="plus"
                          color="bg-yellow-100"
                          bColor="border-yellow-300"
                          iconColor="text-yellow-500"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="No-SQL Database"
                          icon="plus"
                          color="bg-yellow-100"
                          bColor="border-yellow-300"
                          iconColor="text-yellow-500"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Import data"
                          icon="plus"
                          color="bg-yellow-100"
                          bColor="border-yellow-300"
                          iconColor="text-yellow-500"
                        />

                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Export data"
                          icon="plus"
                          color="bg-yellow-100"
                          bColor="border-yellow-300"
                          iconColor="text-yellow-500"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="File uploading"
                          icon="plus"
                          color="bg-yellow-100"
                          bColor="border-yellow-300"
                          iconColor="text-yellow-500"
                        />
                      </div>
                    </div>
                  )}
                  {showSecurity && (
                    <div
                      className="flex flex-col items-start p-1 mt-2 border-2 border-orange-400 bg-orange-400/30 rounded-2xl"
                      transition-style="in:wipe:right"
                    >
                      <p className="pl-3 m-0">Security</p>
                      <div className="flex flex-wrap gap-1">
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Data Encryption"
                          icon="plus"
                          color="bg-orange-100"
                          bColor="border-orange-300"
                          iconColor="text-orange-500"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Cryptography"
                          icon="plus"
                          color="bg-orange-100"
                          bColor="border-orange-300"
                          iconColor="text-orange-500"
                        />

                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Biometrics"
                          icon="plus"
                          color="bg-orange-100"
                          bColor="border-orange-300"
                          iconColor="text-orange-500"
                        />
                      </div>
                    </div>
                  )}
                  {showWeb3 && (
                    <div
                      className="flex flex-col items-start p-1 mt-2 border-2 border-pink-400 bg-pink-400/30 rounded-2xl"
                      transition-style="in:wipe:right"
                    >
                      <p className="pl-3 m-0">Web3</p>
                      <div className="flex flex-wrap gap-1">
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Crypto Payments"
                          icon="plus"
                          color="bg-pink-100"
                          bColor="border-pink-300"
                          iconColor="text-pink-500"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Wallet Integration"
                          icon="plus"
                          color="bg-pink-100"
                          bColor="border-pink-300"
                          iconColor="text-pink-500"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="NFTs"
                          icon="plus"
                          color="bg-pink-100"
                          bColor="border-pink-300"
                          iconColor="text-pink-500"
                        />

                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Yield Farming"
                          icon="plus"
                          color="bg-pink-100"
                          bColor="border-pink-300"
                          iconColor="text-pink-500"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Blockchain node capabilities"
                          icon="plus"
                          color="bg-pink-100"
                          bColor="border-pink-300"
                          iconColor="text-pink-500"
                        />
                      </div>
                    </div>
                  )}
                  {showMisc && (
                    <div
                      className="flex flex-col items-start p-1 mt-2 border-2 border-violet-400 bg-violet-400/30 rounded-2xl"
                      transition-style="in:wipe:right"
                    >
                      <p className="pl-3 m-0">Misc</p>
                      <div className="flex flex-wrap gap-1">
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Payment Processing"
                          icon="plus"
                          color="bg-violet-100"
                          bColor="border-violet-300"
                          iconColor="text-violet-500"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Full text search"
                          icon="plus"
                          color="bg-violet-100"
                          bColor="border-violet-300"
                          iconColor="text-violet-500"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Calendar"
                          icon="plus"
                          color="bg-violet-100"
                          bColor="border-violet-300"
                          iconColor="text-violet-500"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Computer vision"
                          icon="plus"
                          color="bg-violet-100"
                          bColor="border-violet-300"
                          iconColor="text-violet-500"
                        />

                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Ecommerce"
                          icon="plus"
                          color="bg-violet-100"
                          bColor="border-violet-300"
                          iconColor="text-violet-500"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Analytics"
                          icon="plus"
                          color="bg-violet-100"
                          bColor="border-violet-300"
                          iconColor="text-violet-500"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Timers"
                          icon="plus"
                          color="bg-violet-100"
                          bColor="border-violet-300"
                          iconColor="text-violet-500"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Notifications"
                          icon="plus"
                          color="bg-violet-100"
                          bColor="border-violet-300"
                          iconColor="text-violet-500"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="AI/ML"
                          icon="plus"
                          color="bg-violet-100"
                          bColor="border-violet-300"
                          iconColor="text-violet-500"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="NLP"
                          icon="plus"
                          color="bg-violet-100"
                          bColor="border-violet-300"
                          iconColor="text-violet-500"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Static pages"
                          icon="plus"
                          color="bg-violet-100"
                          bColor="border-violet-300"
                          iconColor="text-violet-500"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Templates"
                          icon="plus"
                          color="bg-violet-100"
                          bColor="border-violet-300"
                          iconColor="text-violet-500"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Dark Mode"
                          icon="plus"
                          color="bg-violet-100"
                          bColor="border-violet-300"
                          iconColor="text-violet-500"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="3D"
                          icon="plus"
                          color="bg-violet-100"
                          bColor="border-violet-300"
                          iconColor="text-violet-500"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Notes"
                          icon="plus"
                          color="bg-violet-100"
                          bColor="border-violet-300"
                          iconColor="text-violet-500"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Tagging"
                          icon="plus"
                          color="bg-violet-100"
                          bColor="border-violet-300"
                          iconColor="text-violet-500"
                        />
                        <Chip
                          updateArray={updateArray}
                          deleteIndex={deleteIndex}
                          text="Drag and drop"
                          icon="plus"
                          color="bg-violet-100"
                          bColor="border-violet-300"
                          iconColor="text-violet-500"
                        />
                      </div>
                    </div>
                  )}
                  {!showPlatform &&
                    !showWeb3 &&
                    !showAuthentication &&
                    !showMisc &&
                    !showData &&
                    !showSocial &&
                    !showSecurity && (
                      <div className="flex items-center justify-center gap-3 px-8 py-8">
                        {/* <FaLongArrowAltLeft className="text-xl" />{" "} */}
                        <p>Add feature categories to see features here.</p>
                      </div>
                    )}
                </div>
              </div>

              {/* <div className="flex flex-col"></div> */}
              <div className="flex items-center justify-between w-full ">
                <button
                  className="card__btn_prev save_button left-[5%]  flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect-quick"
                  onClick={() => props.goToStep(1)}
                >
                  <FaLongArrowAltLeft className="mr-1 text-[24px]" />
                  Back
                </button>
                <div className="relative group">
                  <div className="absolute transition duration-1000 rounded-full opacity-0 -inset-1 bg-gradient-to-r from-t-pl via-t-bl to-t-bpop blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
                  <button
                    className="w-[5em] h-[3em] card__btn_next right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer shadow-clear-bd3 md:hover:shadow-xl m-1 drop-shadow-xl "
                    onClick={() => props.goToStep(3)}
                  >
                    Next
                    <FaLongArrowAltRight className="ml-1 text-[24px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SFeatures;

function ListItem({ name, deleteIndex }) {
  return (
    <div className="flex items-center justify-between px-1 ml-3 border-2 fade-effect-quick w-fit rounded-xl bg-clear-bl2 dark:border-blues-300 border-t-bd">
      <p className="font-bold dark:text-blues-100 text-t-bd">{name}</p>
      {/* <FaTimes
        className="transition cursor-pointer text-t-pm md:hover:scale-125 md:active:scale-110"
        onClick={() => deleteIndex(name)}
      /> */}
    </div>
  );
}

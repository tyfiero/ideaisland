import React, { useState } from "react";

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
} from "react-icons/fa";
import Chip from "./CombinatorialComponents/chip";
import { useEffect } from "react";
function SFeatures(props) {
  // console.log("Rerendered")

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [showCommonFeatures, setShowCommonFeatures] = useState(false);
  const [button2, setButton2] = useState(false);
  const [featureContent, setFeatureContent] = useState("");
  const [featureArray, setFeatureArray] = useState([]);
  const [featureString, setFeatureString] = useState("");
  // const [changes, setChanges] = useState(false);


  // console.log(props.form.form.Features);
  // console.log(featureString);

  // useEffect(() => {
  //   console.log("ACTION");

  //   let text = featureArray.toString();
  //   console.log(text);
  //   setFeatureString(text);
  // }, [props.form.form]);

  const updateArray = (data) => {
    console.log(featureArray);

    let featureObject = {
      name: data,
      importance: "Could Have",
      feasibility: "test",
      cost: "test",
      version: "test",
      comments: "test",
    };
    featureArray.push(featureObject);
    // console.log(featureArray);

    props.update("Features", featureArray);
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

    props.update("Features", featureArray);
  };
  const updateButton = (e) => {
    // console.log(e);
    let featureObject = {
      name: e.target.value,
      importance: "Could Have",
      feasibility: "test",
      cost: "test",
      version: "test",
      comments: "test",
    };
    featureArray.push(featureObject);
    // featureArray.push(e.target.value);
    // console.log(featureArray);

    props.update("Features", featureArray);
  };

  console.log(featureString);

  // for (var i = 0; i < featureArray.length; i++){
  // // document.writeln((i+1) + ": " + array[i]);
  // console.log(((i+1) + ": " + featureArray[i]) + " THISS");

  // }
  // let arrayTextList =

  return (
    <div>
      <div
        className="flex items-center justify-center  px-4 pt-[1rem] sm:px-6 lg:px-8 drop-shadow-xl fade-effect-quick min-w-[50em] mr-[70px] 

  "
      >
        <div className="w-full p-10 space-y-8 shadow !rounded-2xl bg-blues-100 drop-shadow-xl container-style normal-box-soft">
          <div className="flex">
            <div className="flex flex-col items-center justify-center problem-page fade-effect-quick">
            <div className="absolute top-5 right-12">
            <Popover
              isOpen={isPopoverOpen}
              containerStyle={{
                zIndex: 100,
                boxShadow: "5px 13px 28px 0px rgba(0,0,0,0.48)",
                backgroundColor: "white",
                borderRadius: "2em",
              }}
              onClickOutside={() => setIsPopoverOpen(false)}
              positions={["bottom", "left", "right"]} // preferred positions by priority
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
                    className="!opacity-100 bg-white w-[25em] rounded-xl p-3"
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
                <FaInfoCircle className="text-2xl cursor-pointer text-blues-300 md:hover:scale-110" />
              </div>
            </Popover>
          </div>
              <h1 className="heading-top">Features</h1>
              <div className="normal-box-soft">
                <h3 className="heading">
                  What features do you want to include? What features MUST your
                  users have?
                </h3>
                <p>
                  Features should add value to your customer, encourage
                  conversion, or actively generate or process revenue.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  className={
                    "w-[12em] h-[4em] rounded-3xl  flex items-center justify-center text-black gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " +
                    (showCommonFeatures
                      ? " border-4 border-t-bl bg-blues-200"
                      : "bg-blues-100")
                  }
                  onClick={(e) => {
                    setShowCommonFeatures(!showCommonFeatures);
                    setButton2(false);
                  }}
                >
                  <FaLaptopCode />
                  Common Features
                  {showCommonFeatures ? (
                    <span className="absolute flex items-center justify-center w-6 h-6 leading-none text-center text-black rounded-full -top-2 -left-2 bg-t-pm">
                      <FaTimes />
                    </span>
                  ) : null}
                </button>
                <button
                  className={
                    "w-[12em] h-[4em] rounded-3xl  flex items-center justify-center text-black gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " +
                    (button2
                      ? " border-4 border-t-bl bg-blues-200"
                      : "bg-blues-100")
                  }
                  onClick={(e) => {
                    setButton2(!button2);
                    setShowCommonFeatures(false);
                  }}
                >
                  <FaStar /> Feature Inspirations{" "}
                  {button2 ? (
                    <span className="absolute flex items-center justify-center w-6 h-6 leading-none text-center text-black rounded-full -top-2 -left-2 bg-t-pm">
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

              {showCommonFeatures && (
                <div className="normal-box-soft border-2 border-t-pm w-[90%] !p-2  !rounded-xl gap-2">
                  {/* <p>Common Features</p> */}
                  <div className="flex flex-col items-start p-1 mb-2 border-2 border-teal-400 rounded-2xl">
                    <p className="pl-3 m-0">Authentication</p>
                    <div className="flex flex-wrap gap-1">
                      <Chip
                      // changes={changes}
                        updateArray={updateArray}
                        deleteIndex={deleteIndex}
                        formContent={props.form.form?.Features}
                        text="Sign-in with Email/Password"
                        value="Sign-in with Email/Password"
                        icon="plus"
                        color="bg-teal-100"
                        bColor="border-teal-300"
                        iconColor="text-teal-500"
                      />
                      <Chip
                        updateArray={updateArray}
                        deleteIndex={deleteIndex}
                        formContent={props.form.form?.Features}
                        text="Sign-in with Google/other 3rd party"
                        icon="plus"
                        color="bg-teal-100"
                        bColor="border-teal-300"
                        iconColor="text-teal-500"
                      />

                      <Chip
                        updateArray={updateArray}
                        deleteIndex={deleteIndex}
                        formContent={props.form.form?.Features}
                        text="2-factor Auth"
                        icon="plus"
                        color="bg-teal-100"
                        bColor="border-teal-300"
                        iconColor="text-teal-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-start p-1 my-2 border-2 border-yellow-400 rounded-2xl">
                    <p className="pl-3 m-0">Data</p>
                    <div className="flex flex-wrap gap-1">
                      <Chip
                        updateArray={updateArray}
                        deleteIndex={deleteIndex}
                        formContent={props.form.form?.Features}
                        text="Database"
                        icon="plus"
                        color="bg-yellow-100"
                        bColor="border-yellow-300"
                        iconColor="text-yellow-500"
                      />
                      <Chip
                        updateArray={updateArray}
                        deleteIndex={deleteIndex}
                        formContent={props.form.form?.Features}
                        text="Import Data"

                        icon="plus"
                        color="bg-yellow-100"
                        bColor="border-yellow-300"
                        iconColor="text-yellow-500"
                      />

                      <Chip
                        updateArray={updateArray}
                        deleteIndex={deleteIndex}
                        formContent={props.form.form?.Features}
                        text="Export data"
                        icon="plus"
                        color="bg-yellow-100"
                        bColor="border-yellow-300"
                        iconColor="text-yellow-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-start p-1 my-2 border-2 border-sky-400 rounded-2xl">
                    <p className="pl-3 m-0">Social</p>
                    <div className="flex flex-wrap gap-1">
                      <Chip
                        updateArray={updateArray}
                        deleteIndex={deleteIndex}
                        formContent={props.form.form?.Features}
                        text="Share to Social Media"
                        icon="plus"
                        color="bg-sky-100"
                        bColor="border-sky-300"
                        iconColor="text-sky-500"
                      />
                      <Chip
                        updateArray={updateArray}
                        deleteIndex={deleteIndex}
                        formContent={props.form.form?.Features}
                        text="Realtime Collaboration"
                        icon="plus"
                        color="bg-sky-100"
                        bColor="border-sky-300"
                        iconColor="text-sky-500"
                      />

                      <Chip
                        updateArray={updateArray}
                        deleteIndex={deleteIndex}
                        formContent={props.form.form?.Features}
                        text="File sharing"
                        icon="plus"
                        color="bg-sky-100"
                        bColor="border-sky-300"
                        iconColor="text-sky-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-start p-1 mt-2 border-2 border-violet-400 rounded-2xl">
                    <p className="pl-3 m-0">Misc</p>
                    <div className="flex flex-wrap gap-1">
                      <Chip
                        updateArray={updateArray}
                        deleteIndex={deleteIndex}
                        formContent={props.form.form?.Features}
                        text="Notes"
                        icon="plus"
                        color="bg-violet-100"
                        bColor="border-violet-300"
                        iconColor="text-violet-500"
                      />
                      <Chip
                        updateArray={updateArray}
                        deleteIndex={deleteIndex}
                        formContent={props.form.form?.Features}
                        text="3rd party integrations"
                        icon="plus"
                        color="bg-violet-100"
                        bColor="border-violet-300"
                        iconColor="text-violet-500"
                      />

                      <Chip
                        updateArray={updateArray}
                        deleteIndex={deleteIndex}
                        formContent={props.form.form?.Features}
                        text="AI/ML"
                        icon="plus"
                        color="bg-violet-100"
                        bColor="border-violet-300"
                        iconColor="text-violet-500"
                      />
                    </div>
                  </div>
                </div>
              )}
              {button2 && (
                <div className="normal-box-soft border-2 border-t-pm w-[90%] p-5 !rounded-xl gap-2">
                  <p>*Inspirations or other feature set goes here*</p>
                </div>
              )}
              <div className="flex flex-col">
               
              </div>
              <div className="flex items-center justify-between w-full">
                <button
                  className="card__btn save_button left-[5%]  flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect-quick"
                  onClick={() => props.goToStep(2)}
                >
                  <FaLongArrowAltLeft className="mr-1 text-[24px]" />
                  Back
                </button>
                <button
                  className="card__btn_next save_button right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect"
                  onClick={() => props.goToStep(4)}
                >
                  Next
                  <FaLongArrowAltRight className="ml-1 text-[24px]" />
                </button>
              </div>
            </div>
            <div className="normal-box-soft !rounded-xl w-[30em]">
              <div className="normal-box !rounded-xl text-left">
                <h3 className="heading2">Feature List:</h3>
                {/* <p>featureString:</p>
                  <p>{featureString}</p>
                  <p>props:</p>                  
                  <p>{props.form.form.Features}</p>


                  <p>Feature with a sentence description</p> */}
                {featureArray.length === 0 && <p>No features added yet.</p>}
                {featureArray.map((data, index) => (
                  <ListItem
                    name={data.name}
                    key={index}
                    deleteIndex={deleteIndex}
                  />
                ))}

                {/* <p>Feature with a sentence description</p>
                  <p>Feature with a sentence description</p> */}
              </div>
              <p className="mt-3 mb-1">Add Other Features:</p>

              <div className="flex items-center gap-2">
                <textarea
                  // type="text"
                  className="textarea-box h-[5em] !w-full whitespace-normal"
                  name="feature"
                  placeholder="Write feature here"
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default SFeatures;

function ListItem({ name, deleteIndex }) {
  return (
    <div className="flex items-center justify-between ml-3">
      <li>{name}</li>
      <FaTimes
        className="transition cursor-pointer text-t-pm md:hover:scale-125 md:active:scale-110"
        onClick={() => deleteIndex(name)}
      />
    </div>
  );
}

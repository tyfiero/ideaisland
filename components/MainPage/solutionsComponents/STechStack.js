import React, { useState, useEffect } from "react";

import { Popover, ArrowContainer } from "react-tiny-popover";
import Select from "react-select";

import {
  FaLaptopCode,
  FaShoppingBag,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaCheck,
  FaInfoCircle,
  FaPlus,
  FaTimes,
  FaUser,
  FaDatabase,
  FaCode,
  FaEthereum,
  FaReact,
  FaPalette,
  FaServer,
  FaGitAlt,
  FaTools,
  FaInfinity,
  FaBan,
  FaHeart,
  FaLink,
  FaRegHeart,
  FaExternalLinkAlt,
  FaGlobeAmericas,
  FaEdit,
} from "react-icons/fa";
import { sFormAction, sUpdateAction } from "../../../redux/actions";

import { AiOutlineCluster } from "react-icons/ai";
import { SiTailwindcss } from "react-icons/si";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import {
  languages,
  web3,
  hosting,
  devOps,
  devTools,
  versionControl,
  noCode,
  otherTools,
  frontEnd,
  backEnd,
  cssTools,
  dataBases,
  authentication,
  componentLibraries,
} from "./CombinatorialComponents/DataForTechStack";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

function STechStack(props) {
  // console.log("TECHSTACK--------------------" + props.isActive);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const sFormRedux = useSelector((state) => state.sForm);
  const [toolContent, setToolContent] = useState("");
  const [toolCost, setToolCost] = useState("");
  const [toolCostType, setToolCostType] = useState("Monthly");

  const [toolArray, setToolArray] = useState([]);
  const [selected, setSelected] = useState("Languages");
  const [monthlyCost, setMonthlyCost] = useState();

  const [selectedPriceOption, setSelectedPriceOption] = useState({
    value: "Monthly",
    label: "Monthly",
  });

  useEffect(() => {
    if (sFormRedux.idea === null) {
      props.goToStep(1);
      toast.error("Please select an idea before continuing");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (props.reset) {
      setToolArray([]);
      setToolContent("");
      setToolCost("");
    } else {
      if (sFormRedux.stack?.length > 0) {
        setToolArray(sFormRedux.stack);
      }
    }
  }, [props.reset]); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log([toolContent, toolCost, selectedPriceOption.value]);
  const update = (data) => {
    // console.log(data);

    let toolObj = {
      name: data[0],
      cost: data[1],
      type: data[2],
      url: data[3] || null,
      isOpenSource: data[4] || null,
      kind: data[5] || null,
    };

    let updated = sFormRedux;
    updated.stack = [...toolArray, toolObj];
    dispatch(sFormAction(updated));

    setToolArray([...toolArray, toolObj]);
    if (!props.changes) {
      props.setChanges(true);
    }
  };

  const deleteItem = (data) => {
    console.log(data);
    let newArray = toolArray;
    for (var i = toolArray.length - 1; i >= 0; i--) {
      if (newArray[i].name === data) {
        // console.log(featureArray);
        newArray.splice(i, 1);
        // console.log(featureArray);

        let updated = sFormRedux;
        updated.stack = newArray;
        dispatch(sFormAction(updated));

        setToolArray(newArray);
        setRefresh(!refresh);
      }
    }
    if (!props.changes) {
      props.setChanges(true);
    }
  };
  // const updateButton = (e) => {
  //   props.update("productType", e.target.value);
  // };
  let defaultZero = 0;

  useEffect(() => {
    // console.log(toolArray);
    // console.log(sFormRedux)

    if (toolArray.length > 0) {
      let monthTotal = toolArray.reduce((acc, obj) => {
        return acc + obj.cost;
      }, 0);

      let updated = sFormRedux;
      updated.stackCost = [
        { monthly: Number(monthTotal).toFixed(2) },
        { yearly: Number(monthTotal * 12).toFixed(2) },
      ];
      dispatch(sFormAction(updated));
      setMonthlyCost(monthTotal);
    }
  }, [toolArray]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="flex items-center justify-center  px-4 pt-[1rem] sm:px-6 lg:px-8 drop-shadow-xl fade-effect-quick md:min-w-[50em] md:mr-[70px] sm:mb-10

  "
    >
      <div className=" p-10 space-y-8  !rounded-2xl  normal-box-soft">
        <div className="flex">
          <div className="relative flex flex-col items-center justify-center w-full px-4 problem-page fade-effect-quick">
            <div className="absolute -top-5 -left-5">
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
                      className="!opacity-100 bg-white w-[25em] nun rounded-xl p-3 nun "
                      onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                    >
                      What infrastructure does your application need? Selecting
                      the right stack to build your product is tough. It&apos;s
                      deeply personal, given what you are talented in, yet it is
                      also objective, what infrastructure provider allows your
                      users to benefit most?
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
              Tech Stack
            </h1>
            <p>Pick the technologies you want to use in your solution</p>

            <div className="flex gap-2 sm:w-[128%] md:w-full flex-col md:max-w-[60em]">
              <div className="glass-box bg-white/30  dark:bg-[hsla(200,0%,20%,0.764)] !rounded-xl text-left md:w-full  sm:w-[100%] mb-2">
                <h3 className=" text-t-bd dark:text-blue-100">Tech Stack:</h3>
                {/* <p>featureString:</p>
                  <p>{featureString}</p>
                  <p>props:</p>                  
                  <p>{props.form.form.Features}</p>


                  <p>Feature with a sentence description</p> */}
                <div className="flex flex-wrap w-full gap-1 ">
                  {toolArray.length === 0 && <p>No tools added yet.</p>}
                  {toolArray.map((data, index) => (
                    <ListItem
                      cost={data.cost}
                      name={data.name}
                      url={data.url}
                      type={data.type}
                      key={index}
                      kind={data.kind}

                      // deleteIndex={deleteIndex}
                    />
                  ))}
                </div>
                <hr className=" sm:my-2 md:mt-2"></hr>
                <div className="flex justify-center gap-4">
                  <div className="flex items-center sm:justify-center sm:text-center sm:ring-2 sm:rounded-lg sm:px-2 md:justify-between md:gap-2 sm:flex-col md:flex-row">
                    <p className="mb-0 font-bold text-t-bd dark:text-blues-100">
                      Monthly Cost:
                    </p>
                    <p className="mb-0 mr-2 text-lg text-t-pd">
                      $
                      {monthlyCost
                        ? Number(monthlyCost).toFixed(2)
                        : defaultZero.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center sm:justify-center sm:text-center sm:ring-2 sm:rounded-lg sm:px-2 md:justify-between md:gap-2 sm:flex-col md:flex-row">
                    <p className="mb-0 font-bold text-t-bd dark:text-blues-100">
                      Annual Cost:
                    </p>
                    <p className="mb-0 mr-2 text-lg text-t-pm ">
                      $
                      {monthlyCost
                        ? Number(monthlyCost * 12).toFixed(2)
                        : defaultZero.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center sm:justify-center sm:text-center sm:ring-2 sm:rounded-lg sm:px-2 md:justify-between md:gap-2 sm:flex-col md:flex-row">
                    <p className="mb-0 font-bold text-t-bd dark:text-blues-100">
                      Total Cost:
                    </p>
                    <p className="mb-0 mr-2 text-lg text-t-pm ">
                      $
                      {monthlyCost
                        ? Number(monthlyCost).toFixed(2)
                        : defaultZero.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 md:w-full md:flex-row sm:flex-col">
                <div className="flex py-3 flex-col border-2 md:max-h-[65em] sm:w-[103%] md:w-full rounded-xl items-center gap-2 overflow-auto sm:max-h-[27em] min-w-[15em]  sm:flex-wrap sm:px-1  sm:scale-[92%] md:scale-100 !m-0">
                  <button
                    className={
                      "w-[13em] !h-[2.5em] rounded-3xl pl-5 flex items-center justify-start  gap-2 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " +
                      (selected === "Custom"
                        ? " border-4 border-slate-700 text-white bg-slate-500 "
                        : "bg-slate-300 text-black")
                    }
                    onClick={() => {
                      if (selected !== "Custom") {
                        setSelected("Custom");
                      } else {
                        setSelected("");
                      }
                    }}
                  >
                    <FaEdit />
                    Custom
                  </button>
                  <button
                    className={
                      "w-[13em] !h-[2.5em] rounded-3xl pl-5 flex items-center justify-start  gap-2 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " +
                      (selected === "Languages"
                        ? " border-4 border-blue-700 text-white bg-blue-500 "
                        : "bg-blue-300 text-black")
                    }
                    onClick={() => {
                      if (selected !== "Languages") {
                        setSelected("Languages");
                      } else {
                        setSelected("");
                      }
                    }}
                  >
                    <FaCode />
                    Languages
                  </button>
                  <button
                    className={
                      "w-[13em] !h-[2.5em] rounded-3xl pl-5 flex items-center justify-start  gap-2 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " +
                      (selected === "Dev Tools"
                        ? " border-4 border-sky-700 text-white bg-sky-500 "
                        : "bg-sky-300 text-black")
                    }
                    onClick={() => {
                      if (selected !== "Dev Tools") {
                        setSelected("Dev Tools");
                      } else {
                        setSelected("");
                      }
                    }}
                  >
                    <FaTools />
                    Dev Tools
                  </button>
                  <button
                    className={
                      "w-[13em] !h-[2.5em] rounded-3xl pl-5 flex items-center justify-start  gap-2 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " +
                      (selected === "No/Low Code"
                        ? " border-4 border-cyan-700 text-white bg-cyan-500 "
                        : "bg-cyan-300 text-black")
                    }
                    onClick={() => {
                      if (selected !== "No/Low Code") {
                        setSelected("No/Low Code");
                      } else {
                        setSelected("");
                      }
                    }}
                  >
                    <FaBan />
                    No Code + Low Code
                  </button>
                  <button
                    className={
                      "w-[13em] !h-[2.5em] rounded-3xl pl-5 flex items-center justify-start  gap-2 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " +
                      (selected === "Authentication"
                        ? " border-4 border-teal-700 text-white bg-teal-500 "
                        : "bg-teal-300 text-black")
                    }
                    onClick={() => {
                      if (selected !== "Authentication") {
                        setSelected("Authentication");
                      } else {
                        setSelected("");
                      }
                    }}
                  >
                    <FaUser />
                    Authentication
                  </button>

                  <button
                    className={
                      "w-[13em] !h-[2.5em] rounded-3xl pl-5 flex items-center justify-start  gap-2 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " +
                      (selected === "UI Framework"
                        ? " border-4 border-green-700 text-white bg-green-500 "
                        : "bg-green-300 text-black")
                    }
                    onClick={() => {
                      if (selected !== "UI Framework") {
                        setSelected("UI Framework");
                      } else {
                        setSelected("");
                      }
                    }}
                  >
                    <FaReact />
                    UI Framework
                  </button>
                  <button
                    className={
                      "w-[13em] !h-[2.5em] rounded-3xl pl-5 flex items-center justify-start  gap-2 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " +
                      (selected === "UI Component Library"
                        ? " border-4 border-lime-700 !text-white bg-lime-500 "
                        : "bg-lime-300 !text-black")
                    }
                    onClick={() => {
                      if (selected !== "UI Component Library") {
                        setSelected("UI Component Library");
                      } else {
                        setSelected("");
                      }
                    }}
                  >
                    <FaPalette />
                    <p
                      className={
                        "m-0 fre text-xs " +
                        (selected === "UI Component Library"
                          ? " !text-white "
                          : "!text-black")
                      }
                    >
                      UI Component Library
                    </p>
                  </button>
                  <button
                    className={
                      "w-[13em] !h-[2.5em] rounded-3xl pl-5 flex items-center justify-start  gap-2 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " +
                      (selected === "CSS Tools"
                        ? " border-4 border-yellow-700 text-white bg-yellow-500 "
                        : "bg-yellow-300 text-black")
                    }
                    onClick={() => {
                      if (selected !== "CSS Tools") {
                        setSelected("CSS Tools");
                      } else {
                        setSelected("");
                      }
                    }}
                  >
                    <SiTailwindcss />
                    CSS Tools
                  </button>
                  <button
                    className={
                      "w-[13em] !h-[2.5em] rounded-3xl pl-5 flex items-center justify-start  gap-2 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " +
                      (selected === "Data"
                        ? " border-4 border-amber-700 text-white bg-amber-500 "
                        : "bg-amber-300 text-black")
                    }
                    onClick={() => {
                      if (selected !== "Data") {
                        setSelected("Data");
                      } else {
                        setSelected("");
                      }
                    }}
                  >
                    <FaDatabase />
                    Data
                  </button>
                  <button
                    className={
                      "w-[13em] !h-[2.5em] rounded-3xl pl-5 flex items-center justify-start  gap-2 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " +
                      (selected === "Backend Framework"
                        ? " border-4 border-orange-700 text-white bg-orange-500 "
                        : "bg-orange-300 text-black")
                    }
                    onClick={() => {
                      if (selected !== "Backend Framework") {
                        setSelected("Backend Framework");
                      } else {
                        setSelected("");
                      }
                    }}
                  >
                    <AiOutlineCluster />

                    <p
                      className={
                        "m-0 fre text-sm " +
                        (selected === "Backend Framework"
                          ? " !text-white "
                          : "!text-black")
                      }
                    >
                      Backend Framework
                    </p>
                  </button>
                  <button
                    className={
                      "w-[13em] !h-[2.5em] rounded-3xl pl-5 flex items-center justify-start  gap-2 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " +
                      (selected === "Web3/Blockchain"
                        ? " border-4 border-red-700 bg-red-500 text-white"
                        : "bg-red-300 text-black")
                    }
                    onClick={() => {
                      if (selected !== "Web3/Blockchain") {
                        setSelected("Web3/Blockchain");
                      } else {
                        setSelected("");
                      }
                    }}
                  >
                    <FaEthereum />
                    Web3/Blockchain
                  </button>

                  <button
                    className={
                      "w-[13em] !h-[2.5em] rounded-3xl pl-5 flex items-center justify-start  gap-2 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " +
                      (selected === "Hosting"
                        ? " border-4 border-pink-700 text-white bg-pink-500 "
                        : "bg-pink-300 text-black")
                    }
                    onClick={() => {
                      if (selected !== "Hosting") {
                        setSelected("Hosting");
                      } else {
                        setSelected("");
                      }
                    }}
                  >
                    <FaServer />
                    Hosting
                  </button>

                  <button
                    className={
                      "w-[13em] !h-[2.5em] rounded-3xl pl-5 flex items-center justify-start  gap-2 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " +
                      (selected === "Version Control"
                        ? " border-4 border-fuchsia-700 text-white bg-fuchsia-500 "
                        : "bg-fuchsia-300 text-black")
                    }
                    onClick={() => {
                      if (selected !== "Version Control") {
                        setSelected("Version Control");
                      } else {
                        setSelected("");
                      }
                    }}
                  >
                    <FaGitAlt />
                    Version Control
                  </button>

                  <button
                    className={
                      "w-[13em] !h-[2.5em] rounded-3xl pl-5 flex items-center justify-start  gap-2 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " +
                      (selected === "DevOps"
                        ? " border-4 border-purple-700 text-white bg-purple-500 "
                        : "bg-purple-300 text-black")
                    }
                    onClick={() => {
                      if (selected !== "DevOps") {
                        setSelected("DevOps");
                      } else {
                        setSelected("");
                      }
                    }}
                  >
                    <FaInfinity />
                    DevOps
                  </button>
                  <button
                    className={
                      "w-[13em] !h-[2.5em] rounded-3xl pl-5 flex items-center justify-start  gap-2 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer  " +
                      (selected === "Other"
                        ? " border-4 border-indigo-700 text-white bg-indigo-500 "
                        : "bg-indigo-300 text-black")
                    }
                    onClick={() => {
                      if (selected !== "Other") {
                        setSelected("Other");
                      } else {
                        setSelected("");
                      }
                    }}
                  >
                    <HiOutlineDotsCircleHorizontal />
                    Other Tools
                  </button>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center min-h-[20em] md:w-full sm:w-full  rounded-xl md:p-5 sm:p-0 flex-col justify-between bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-70 border border-white/50 shadow-lg dark:bg-slate-800/70 sm:mb-3">
                    {/* {selected === "Faves" && (
                      <>
                        <p>No Favorites yet :(</p>
                      </>
                    )} */}

                    {selected === "Custom" && (
                      <div className="flex flex-col items-center normal-box-soft dark:bg-slate-700/80">
                        <p className="mb-1 text-xl fre text-t-bd dark:text-blues-100">
                          Add custom tool:
                        </p>

                        <div className="flex items-center gap-2 mb-3 sm:flex-col md:flex-row normal-box-soft dark:bg-slate-500/80">
                          <div className="flex-col">
                            <p className="m-0">Name</p>
                            <textarea
                              // type="text"
                              id="namebox"
                              className="textarea-box  textarea-tw   h-[3em] !w-[20em] whitespace-normal"
                              name="tool"
                              placeholder="..."
                              value={toolContent}
                              onChange={(e) => setToolContent(e.target.value)}
                            />
                          </div>
                          <div className="flex-col">
                            <p className="m-0">Cost</p>

                            <span>
                              &#36;
                              <input
                                type="number"
                                min="0.00"
                                max="10000000.00"
                                step="0.01"
                                placeholder="0.00"
                                value={toolCost}
                                className="textarea-box  textarea-tw  rounded-xl h-[2.7em] !w-[7em] "
                                onChange={(e) => {
                                  console.log(e.target.valueAsNumber);
                                  // if (toolCost) {
                                  setToolCost(e.target.valueAsNumber);
                                  // }
                                }}
                              />
                            </span>
                          </div>
                          <div className="flex-col">
                            <p className="m-0 mb-1">Frequency</p>
                            <Select
                              defaultValue={selectedPriceOption}
                              onChange={setSelectedPriceOption}
                              isSearchable={false}
                              className="react-select-container "
                              classNamePrefix="react-select"
                              options={[
                                { value: "Monthly", label: "Monthly" },
                                { value: "Yearly", label: "Yearly" },
                                { value: "One-Time", label: "One-Time" },
                              ]}
                            />
                          </div>

                          <button
                            className=" sm:w-[80%] md:w-[4em] h-[3em] sm:mt-3 sm:mb-2 rounded-full p-1  flex items-center justify-center text-black gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer bg-t-bl "
                            onClick={() => {
                              console.log([
                                toolContent,
                                toolCost,
                                selectedPriceOption.value,
                              ]);
                              update([
                                toolContent,
                                toolCost,
                                selectedPriceOption.value,
                              ]);
                              setToolCost("");

                              setToolContent("");
                              setToolCostType(selectedPriceOption);
                            }}
                          >
                            <FaPlus className="text-[18px] text-white" />{" "}
                            <p className="m-0 text-white">Add</p>
                          </button>
                        </div>
                        <div className="flex flex-wrap justify-center my-1 rounded-xl">
                          <p>
                            {"Are we missing a dev tool or platform you want?"}{" "}
                          </p>
                          <a
                            className="ml-2 underline text-blues-300"
                            href="https://tally.so/r/3Neg0m"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Let us know!
                          </a>
                        </div>
                      </div>
                    )}

                    {selected === "Languages" && (
                      <>
                        <div className="flex flex-wrap content-start justify-center sm:gap-0 md:gap-4 fade-effect-quick">
                          {languages.map((data, index) => (
                            <ItemCard
                              name={data.name}
                              key={index}
                              cost={data.cost}
                              url={data.url}
                              type={data.type}
                              kind={data.kind}
                              isOpenSource={data.isOpenSource}
                              update={update}
                              deleteItem={deleteItem}
                              color=" bg-blue-200 "
                              bColor=" border-blue-500 "
                              iconColor=" text-blue-500 "
                              fromColor=" from-blue-300 "
                              fromLightColor=" from-blue-200 "
                              viaColor=" via-blue-500 "
                              toColor=" to-blue-700 "

                              // deleteIndex={deleteIndex}
                            />
                          ))}
                        </div>
                      </>
                    )}
                    {selected === "Dev Tools" && (
                      <>
                        <div className="flex flex-wrap content-start justify-center sm:gap-0 md:gap-4 fade-effect-quick">
                          {devTools.map((data, index) => (
                            <ItemCard
                              name={data.name}
                              key={index}
                              cost={data.cost}
                              url={data.url}
                              kind={data.kind}
                              type={data.type}
                              isOpenSource={data.isOpenSource}
                              update={update}
                              deleteItem={deleteItem}
                              color=" bg-sky-200 "
                              bColor=" border-sky-500 "
                              iconColor=" text-sky-500 "
                              fromColor=" from-sky-300 "
                              fromLightColor=" from-sky-200 "
                              viaColor=" via-sky-500 "
                              toColor=" to-sky-700 "

                              // deleteIndex={deleteIndex}
                            />
                          ))}
                        </div>
                      </>
                    )}
                    {selected === "No/Low Code" && (
                      <>
                        <div className="flex flex-wrap content-start justify-center sm:gap-0 md:gap-4 fade-effect-quick">
                          {noCode.map((data, index) => (
                            <ItemCard
                              name={data.name}
                              key={index}
                              cost={data.cost}
                              url={data.url}
                              kind={data.kind}
                              type={data.type}
                              isOpenSource={data.isOpenSource}
                              update={update}
                              deleteItem={deleteItem}
                              color=" bg-cyan-200 "
                              bColor=" border-cyan-500 "
                              iconColor=" text-cyan-500 "
                              fromColor=" from-cyan-300 "
                              fromLightColor=" from-cyan-200 "
                              viaColor=" via-cyan-500 "
                              toColor=" to-cyan-700 "

                              // deleteIndex={deleteIndex}
                            />
                          ))}
                        </div>
                      </>
                    )}
                    {selected === "Authentication" && (
                      <>
                        <div className="flex flex-wrap content-start justify-center sm:gap-0 md:gap-4 fade-effect-quick">
                          {authentication.map((data, index) => (
                            <ItemCard
                              name={data.name}
                              key={index}
                              cost={data.cost}
                              url={data.url}
                              kind={data.kind}
                              type={data.type}
                              isOpenSource={data.isOpenSource}
                              update={update}
                              deleteItem={deleteItem}
                              color=" bg-teal-200 "
                              bColor=" border-teal-500 "
                              iconColor=" text-teal-500 "
                              fromColor=" from-teal-300 "
                              fromLightColor=" from-teal-200 "
                              viaColor=" via-teal-500 "
                              toColor=" to-teal-700 "

                              // deleteIndex={deleteIndex}
                            />
                          ))}
                        </div>
                      </>
                    )}
                    {selected === "UI Framework" && (
                      <>
                        <div className="flex flex-wrap content-start justify-center sm:gap-0 md:gap-4 fade-effect-quick">
                          {frontEnd.map((data, index) => (
                            <ItemCard
                              name={data.name}
                              key={index}
                              cost={data.cost}
                              url={data.url}
                              kind={data.kind}
                              type={data.type}
                              isOpenSource={data.isOpenSource}
                              update={update}
                              deleteItem={deleteItem}
                              color=" bg-green-200 "
                              bColor=" border-green-500 "
                              iconColor=" text-green-500 "
                              fromColor=" from-green-300 "
                              fromLightColor=" from-green-200 "
                              viaColor=" via-green-500 "
                              toColor=" to-green-700 "

                              // deleteIndex={deleteIndex}
                            />
                          ))}
                        </div>
                      </>
                    )}
                    {selected === "UI Component Library" && (
                      <>
                        <div className="flex flex-wrap content-start justify-center sm:gap-0 md:gap-4 fade-effect-quick">
                          {componentLibraries.map((data, index) => (
                            <ItemCard
                              name={data.name}
                              key={index}
                              cost={data.cost}
                              url={data.url}
                              kind={data.kind}
                              type={data.type}
                              isOpenSource={data.isOpenSource}
                              update={update}
                              deleteItem={deleteItem}
                              color=" bg-lime-200 "
                              bColor=" border-lime-500 "
                              iconColor=" text-lime-500 "
                              fromColor=" from-lime-300 "
                              fromLightColor=" from-lime-200 "
                              viaColor=" via-lime-500 "
                              toColor=" to-lime-700 "

                              // deleteIndex={deleteIndex}
                            />
                          ))}
                        </div>
                      </>
                    )}
                    {selected === "CSS Tools" && (
                      <>
                        <div className="flex flex-wrap content-start justify-center sm:gap-0 md:gap-4 fade-effect-quick">
                          {cssTools.map((data, index) => (
                            <ItemCard
                              name={data.name}
                              key={index}
                              cost={data.cost}
                              url={data.url}
                              kind={data.kind}
                              type={data.type}
                              isOpenSource={data.isOpenSource}
                              update={update}
                              deleteItem={deleteItem}
                              color=" bg-yellow-200 "
                              bColor=" border-yellow-500 "
                              iconColor=" text-yellow-500 "
                              fromColor=" from-yellow-300 "
                              fromLightColor=" from-yellow-200 "
                              viaColor=" via-yellow-500 "
                              toColor=" to-yellow-700 "

                              // deleteIndex={deleteIndex}
                            />
                          ))}
                        </div>
                      </>
                    )}
                    {selected === "Data" && (
                      <>
                        <div className="flex flex-wrap content-start justify-center sm:gap-0 md:gap-4 fade-effect-quick">
                          {dataBases.map((data, index) => (
                            <ItemCard
                              name={data.name}
                              key={index}
                              cost={data.cost}
                              url={data.url}
                              kind={data.kind}
                              type={data.type}
                              isOpenSource={data.isOpenSource}
                              update={update}
                              deleteItem={deleteItem}
                              color=" bg-amber-200 "
                              bColor=" border-amber-500 "
                              iconColor=" text-amber-500 "
                              fromColor=" from-amber-300 "
                              fromLightColor=" from-amber-200 "
                              viaColor=" via-amber-500 "
                              toColor=" to-amber-700 "

                              // deleteIndex={deleteIndex}
                            />
                          ))}
                        </div>
                      </>
                    )}
                    {selected === "Backend Framework" && (
                      <>
                        <div className="flex flex-wrap content-start justify-center sm:gap-0 md:gap-4 fade-effect-quick">
                          {backEnd.map((data, index) => (
                            <ItemCard
                              name={data.name}
                              key={index}
                              cost={data.cost}
                              url={data.url}
                              kind={data.kind}
                              type={data.type}
                              isOpenSource={data.isOpenSource}
                              update={update}
                              deleteItem={deleteItem}
                              color=" bg-orange-200 "
                              bColor=" border-orange-500 "
                              iconColor=" text-orange-500 "
                              fromColor=" from-orange-300 "
                              fromLightColor=" from-orange-200 "
                              viaColor=" via-orange-500 "
                              toColor=" to-orange-700 "

                              // deleteIndex={deleteIndex}
                            />
                          ))}
                        </div>
                      </>
                    )}
                    {selected === "Web3/Blockchain" && (
                      <>
                        <div className="flex flex-wrap content-start justify-center sm:gap-0 md:gap-4 fade-effect-quick">
                          {web3.map((data, index) => (
                            <ItemCard
                              name={data.name}
                              key={index}
                              cost={data.cost}
                              url={data.url}
                              type={data.type}
                              kind={data.kind}
                              isOpenSource={data.isOpenSource}
                              update={update}
                              deleteItem={deleteItem}
                              color=" bg-red-200 "
                              bColor=" border-red-500 "
                              iconColor=" text-red-500 "
                              fromColor=" from-red-300 "
                              fromLightColor=" from-red-200 "
                              viaColor=" via-red-500 "
                              toColor=" to-red-700 "

                              // deleteIndex={deleteIndex}
                            />
                          ))}
                        </div>
                      </>
                    )}
                    {selected === "Hosting" && (
                      <>
                        <div className="flex flex-wrap content-start justify-center sm:gap-0 md:gap-4 fade-effect-quick">
                          {hosting.map((data, index) => (
                            <ItemCard
                              name={data.name}
                              key={index}
                              cost={data.cost}
                              url={data.url}
                              type={data.type}
                              kind={data.kind}
                              isOpenSource={data.isOpenSource}
                              update={update}
                              deleteItem={deleteItem}
                              color=" bg-pink-200 "
                              bColor=" border-pink-500 "
                              iconColor=" text-pink-500 "
                              fromColor=" from-pink-300 "
                              fromLightColor=" from-pink-200 "
                              viaColor=" via-pink-500 "
                              toColor=" to-pink-700 "

                              // deleteIndex={deleteIndex}
                            />
                          ))}
                        </div>
                      </>
                    )}
                    {selected === "Version Control" && (
                      <>
                        <div className="flex flex-wrap content-start justify-center sm:gap-0 md:gap-4 fade-effect-quick">
                          {versionControl.map((data, index) => (
                            <ItemCard
                              name={data.name}
                              key={index}
                              cost={data.cost}
                              url={data.url}
                              type={data.type}
                              kind={data.kind}
                              isOpenSource={data.isOpenSource}
                              update={update}
                              deleteItem={deleteItem}
                              color=" bg-fuchsia-200 "
                              bColor=" border-fuchsia-500 "
                              iconColor=" text-fuchsia-500 "
                              fromColor=" from-fuchsia-300 "
                              fromLightColor=" from-fuchsia-200 "
                              viaColor=" via-fuchsia-500 "
                              toColor=" to-fuchsia-700 "

                              // deleteIndex={deleteIndex}
                            />
                          ))}
                        </div>
                      </>
                    )}
                    {selected === "DevOps" && (
                      <>
                        <div className="flex flex-wrap content-start justify-center sm:gap-0 md:gap-4 fade-effect-quick">
                          {devOps.map((data, index) => (
                            <ItemCard
                              name={data.name}
                              key={index}
                              cost={data.cost}
                              url={data.url}
                              type={data.type}
                              kind={data.kind}
                              isOpenSource={data.isOpenSource}
                              update={update}
                              deleteItem={deleteItem}
                              color=" bg-purple-200 "
                              bColor=" border-purple-500 "
                              iconColor=" text-purple-500 "
                              fromColor=" from-purple-300 "
                              fromLightColor=" from-purple-200 "
                              viaColor=" via-purple-500 "
                              toColor=" to-purple-700 "

                              // deleteIndex={deleteIndex}
                            />
                          ))}
                        </div>
                      </>
                    )}
                    {selected === "Other" && (
                      <>
                        <div className="flex flex-wrap content-start justify-center sm:gap-0 md:gap-4 fade-effect-quick">
                          {otherTools.map((data, index) => (
                            <ItemCard
                              name={data.name}
                              key={index}
                              cost={data.cost}
                              url={data.url}
                              type={data.type}
                              kind={data.kind}
                              isOpenSource={data.isOpenSource}
                              update={update}
                              deleteItem={deleteItem}
                              color=" bg-indigo-200 "
                              bColor=" border-indigo-500 "
                              iconColor=" text-indigo-500 "
                              fromColor=" from-indigo-300 "
                              fromLightColor=" from-indigo-200 "
                              viaColor=" via-indigo-500 "
                              toColor=" to-indigo-700 "

                              // deleteIndex={deleteIndex}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                <button
                  className="card__btn_prev save_button left-[5%]  flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect-quick"
                  onClick={() => props.goToStep(3)}
                >
                  <FaLongArrowAltLeft className="mr-1 text-[24px]" />
                  Back
                </button>
                <div className="relative group">
                  <div className="absolute transition duration-1000 rounded-full opacity-0 -inset-1 bg-gradient-to-r from-t-pl via-t-bl to-t-bpop blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
                  <button
                    className="w-[5em] h-[3em] card__btn_next right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer shadow-clear-bd3 md:hover:shadow-xl m-1 drop-shadow-xl "
                    onClick={() => props.goToStep(5)}
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

export default STechStack;

function ListItem({ name, deleteIndex, cost, url, type, kind }) {
  const [underline, setUnderline] = useState(
    " decoration-blue-300 dark:bg-blue-500/80 bg-blue-200/60 dark:border-blue-300  border-blue-700"
  );

  // console.log(kind);

  useEffect(() => {
    if (kind === "Languages") {
      setUnderline(
        " decoration-blue-300 dark:bg-blue-500/80 bg-blue-200/60 dark:border-blue-300  border-blue-700"
      );
    } else if (kind === "Custom") {
      setUnderline(
        "  dark:bg-slate-500/80 bg-slate-200/60 dark:border-slate-300  border-slate-700"
      );
    } else if (kind === "Dev-tools") {
      setUnderline(
        "  dark:bg-sky-500/80 bg-sky-200/60 dark:border-sky-300  border-sky-700"
      );
    } else if (kind === "No-Code") {
      setUnderline(
        "  dark:bg-cyan-500/80 bg-cyan-200/60 dark:border-cyan-300  border-cyan-700"
      );
    } else if (kind === "Authentication") {
      setUnderline(
        "  dark:bg-teal-500/80 bg-teal-200/60 dark:border-teal-300  border-teal-700"
      );
    } else if (kind === "FrontEnd ") {
      setUnderline(
        "  dark:bg-green-500/80 bg-green-200/60 dark:border-green-300  border-green-700"
      );
    } else if (kind === "Component library") {
      setUnderline(
        "  dark:bg-lime-500/80 bg-lime-200/60 dark:border-lime-300  border-lime-700"
      );
    } else if (kind === "CSS framework") {
      setUnderline(
        "  dark:bg-yellow-500/80 bg-yellow-200/60 dark:border-yellow-300  border-yellow-700"
      );
    } else if (kind === "Data") {
      setUnderline(
        " dark:bg-amber-500/80 bg-amber-200/60 dark:border-amber-300  border-amber-700"
      );
    } else if (kind === "BackEnd") {
      setUnderline(
        "  dark:bg-orange-500/80 bg-orange-200/60 dark:border-orange-300  border-orange-700"
      );
    } else if (kind === "Web-3") {
      setUnderline(
        "  dark:bg-red-500/80 bg-red-200/60 dark:border-red-300  border-red-700"
      );
    } else if (kind === "Hosting") {
      setUnderline(
        "  dark:bg-pink-500/80 bg-pink-200/60 dark:border-pink-300  border-pink-700"
      );
    } else if (kind === "Version Control") {
      setUnderline(
        "  dark:bg-fuchsia-500/80 bg-fuchsia-200/60 dark:border-fuchsia-300  border-fuchsia-700"
      );
    } else if (kind === "DevOps") {
      setUnderline(
        "  dark:bg-purple-500/80 bg-purple-200/60 dark:border-purple-300  border-purple-700"
      );
    } else if (kind === "Other") {
      setUnderline(
        " dark:bg-indigo-500/80 bg-indigo-200/60 dark:border-indigo-300  border-indigo-700 "
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // console.log(url)
  return (
    <div
      className={
        "flex items-center justify-between px-1 ml-3 border-2 fade-effect-quick w-fit rounded-xl " +
        underline
      }
    >
      <div className="flex items-center group">
        <p className={"mr-2  nun  text-inherit  "}>{name}</p>
        {/* <a
          href={url || "https://www.google.com"}
          target="_blank"
          rel="noreferrer"
        >
          <FaLink
            className={
              "transition group-hover:md:z-1000 group-hover:md:opacity-100 opacity-0 md:hover:scale-125 md:hover:text-blue-200"
            }
          />
        </a> */}
      </div>

      <p className="mb-0 mr-2">${Number(cost).toFixed(2)}</p>
      {/* <FaTimes
        className="transition cursor-pointer text-t-pm md:hover:scale-125 md:active:scale-110"
        onClick={() => deleteIndex(name)}
      /> */}
    </div>
  );
}

// function ItemChip({
//   name,
//   color,
//   bColor,
//   iconColor,
//   update,
//   cost,
//   url,
//   type,
//   fromColor,
//   fromLightColor,
//   viaColor,
// }) {
//   const [clicked, setClicked] = useState(false);

//   console.log(color);
//   return (
//     <button
//       onClick={(e) => {
//         // console.log(e);

//         if (clicked) {
//           // console.log("DELETE");

//           // deleteIndex(text);
//           setClicked(false);
//         } else {
//           // console.log("UPDATE");

//           update([name, cost, type, url]);
//           setClicked(true);
//         }
//       }}
//       // value={"BUTTON"}
//       className={
//         " flex gap-1 items-center rounded-full p-1 border-2  md:hover:scale-105 md:active:scale-95 whitespace-nowrap transition cursor-pointer h-fit w-fit " +
//         (clicked
//           ? " bg-slate-200  border-slate-500"
//           : " " + color + " " + bColor)
//       }
//     >
//       {clicked ? (
//         <FaTimes className="text-t-pm" />
//       ) : (
//         <FaPlus className={iconColor} />
//       )}

//       <p className="m-0 text-xs">{name}</p>
//     </button>
//   );
// }

function ItemCard({
  name,
  color,
  bColor,
  iconColor,
  update,
  deleteItem,
  cost,
  url,
  type,
  isOpenSource,
  fromColor,
  fromLightColor,
  viaColor,
  toColor,
  kind,
}) {
  const [clicked, setClicked] = useState(false);
  const [heartClicked, setHeartClicked] = useState(false);

  return (
    <div
      onClick={(e) => {
        // console.log(e);

        if (clicked) {
          // console.log("DELETE");

          deleteItem(name);
          setClicked(false);
        } else {
          // console.log("UPDATE");

          update([name, cost, type, url, isOpenSource, kind]);
          setClicked(true);
        }
      }}
      // value={"BUTTON"}
      className={
        "group flex gap-1 items-center rounded-xl !p-0      whitespace-nowrap transition duration-500  select-none cursor-pointer h-[6em] min-w-[5em]  md:hover:-translate-y-2	sm:scale-[85%] md:scale-100  " +
        (clicked
          ? " bg-gradient-to-b    border-4 " +
            fromColor +
            viaColor +
            toColor +
            bColor
          : "bg-gradient-to-t border-2  via-white/20  to-white/70 dark:to-[hsla(200,0%,5%,0.35)] " +
            fromLightColor +
            " " +
            bColor)
      }
    >
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        {clicked && (
          <span
            className={
              "absolute flex items-center justify-center w-6 h-6 leading-none text-center rounded-full  -top-2 -left-2 " +
              color +
              iconColor
            }
          >
            <FaTimes />
          </span>
        )}
        {/* <div className="w-full h-[70%] bg-white/40  relative"> */}
        {/* <img
            src={"https://picsum.photos/82/52"}
            alt="logo"
            className="object-cover"
          /> */}
        {/* <div className="absolute top-0 right-0 transition duration-200 opacity-0 z-100 group-hover:opacity-100">
            <div
              className="flex items-center justify-center w-6 h-6 rounded-full bg-clear-pl3 "
              onClick={() => setHeartClicked(!heartClicked)}
            >
              {heartClicked ? (
                <FaHeart className="text-t-pd" />
              ) : (
                <FaRegHeart className="text-t-pd" />
              )}
            </div>
          </div> */}
        {/* </div> */}

        <div className="relative w-full h-full">
          {isOpenSource && (
            <FaGlobeAmericas
              className={
                "absolute bottom-1 right-1 " +
                (clicked ? " text-sky-200" : " text-sky-700")
              }
            />
          )}

          {/* <FaGlobeAmericas/> */}
          <div className="w-full h-8 px-5 ">
            <p
              className={
                "m-0 text-xl " + (clicked ? " text-white" : " text-slate-700")
              }
            >
              {name}
            </p>
          </div>

          <div className="flex flex-col items-center justify-end gap-1 px-8 mt-2 ">
            {cost > 0 ? (
              <p
                className={
                  "m-0 text-sm " + (clicked ? " text-white" : " text-slate-700")
                }
              >
                {"$" +
                  cost.toFixed(2) +
                  (type === "Monthly"
                    ? "/month"
                    : type === "Annual"
                    ? "/year"
                    : " one-time")}
              </p>
            ) : (
              <p
                className={
                  "m-0 text-sm " + (clicked ? " text-white" : " text-slate-700")
                }
              >
                {"Free"}
              </p>
            )}

            <p
              className={
                "m-0 text-xs " + (clicked ? " text-white" : " text-slate-700")
              }
            >
              <a
                href={url || "https://www.google.com"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 transition md:hover:scale-125 md:hover:text-blue-200"
              >
                Link
                <FaExternalLinkAlt className="text-xs" />
              </a>
            </p>
          </div>
          {/* {!clicked && (
            <div
              className={
                " flex gap-1 items-center rounded-md p-1 border-2  md:hover:scale-105 md:active:scale-95 whitespace-nowrap transition cursor-pointer h-[1.5em] w-fit " +
                color +
                " " +
                bColor
              }
            >
              <p className="m-0">Add</p> <FaPlus className={iconColor} />
            </div>
          )}
          {clicked && (
            <div
              className={
                "flex items-center gap-1 h-fit w-fit rounded-md  border-2 border-t-pm  md:hover:scale-105 md:active:scale-95 whitespace-nowrap transition cursor-pointer h-[1.5em] w-fit bg-clear-pl5"
              }
            >
              <p className="m-0 ml-1">Delete</p>
              <FaTimes className="text-t-pm" />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

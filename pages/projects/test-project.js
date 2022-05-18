import React, { useEffect } from "react";
import { ProgressBar } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import Objective from "../../components/MainPage/projects/Objective";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Overview from "../../components/MainPage/projects/Overview";
import KeyResult from "../../components/MainPage/projects/KeyResult";
import { FaPlus, FaQuestionCircle } from "react-icons/fa";
// import KPIModal from "../../components/MainPage/projects/KPIModal";
import TextareaAutosize from "react-textarea-autosize";
import Select from "react-select";
import KrModal from "../../components/MainPage/projects/KrModal";
import KrTableTopper from "../../components/MainPage/projects/KrTableTopper";
import { Popover, ArrowContainer } from "react-tiny-popover";
import ObjModal from "../../components/MainPage/projects/ObjModal";



function TestProject() {
  const [objectives, setObjectives] = React.useState([]);
  //   const [kpis, setKpis] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [selectedObj, setSelectedObj] = React.useState(null);

//   console.log(selectedKr);
console.log(objectives)

  return (
    <div className="relative flex flex-col items-center w-full h-full mb-20 sm:justify-start md:justify-center md:mt-0">
     
{modalOpen && <ObjModal setModalOpen={setModalOpen} objectives={objectives} setObjectives={setObjectives} selectedObj={selectedObj} setSelectedObj={setSelectedObj} />}
      <Tabs
        className="md:w-[97%] md:h-[98%]"
        selectedTabClassName="!bg-clear-bl4 !w-[10em]  !border-t-bl !text-white !text-lg "
      >
        <TabList className="flex gap-1">
          <Tab className="bg-clear-pl3 !w-[10em] rounded-t-lg px-3 py-1 text-t-pd border-4 border-b-0 border-clear-pl3 dark:text-pinks-50 text-base transition duration-500 cursor-pointer">
            <h2 className="font-bold nun">Overview</h2>
          </Tab>
          <Tab className="bg-clear-pl3 !w-[10em] rounded-t-lg px-3 py-1 text-t-pd border-4 border-b-0 border-clear-pl3 dark:text-pinks-50 text-base transition duration-500 cursor-pointer">
            <h2 className="font-bold nun">Progress</h2>
          </Tab>
        </TabList>

        <TabPanel>
          <div className="flex flex-col items-center w-full h-full gap-5 rounded-tl-none glass-box fade-effect-quick min-h-[10em]">
            <Overview
              title={"Project title"}
              description={
                "Project description that explains what the project is."
              }
            />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="flex flex-col items-center justify-center w-full h-full gap-5 rounded-tl-none glass-box fade-effect-quick">
            <div className="relative flex flex-col items-center justify-center w-full gap-1 glass-box fade-effect-quick">
              <h2 className="absolute top-0 text-2xl left-2 nun text-t-bd dark:text-blues-100">
                Goal:
              </h2>
              <h2 className="text-2xl font-bold nun text-t-bd dark:text-blues-100">
                {"Become a hub of rapid idea experimentation for Entrepreneurs"}
              </h2>
              <div className="absolute top-1 right-3">
                <Popover
                  isOpen={isPopoverOpen}
                  containerStyle={{
                    zIndex: 100,
                    boxShadow: "5px 13px 28px 0px rgba(0,0,0,0.48)",
                    backgroundColor: "white",
                    borderRadius: "2em",
                  }}
                  onClickOutside={() => setIsPopoverOpen(false)}
                  positions={["bottom", "right"]}
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
                          What are Objectives and key results (OKRs)?
                        Key Results are important, quantifiable metrics for your
                        goal. Think of them as a way to measure the health of
                        your business, and help you guide it in the right
                        direction. An example of a key result would be: $5,000
                        MRR by Q4. ”
                      </div>
                    </ArrowContainer>
                  )}
                >
                  <div
                    onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                    className="w-5"
                  >
                    <FaQuestionCircle className="text-3xl cursor-pointer text-blues-300 dark:text-blues-100 md:hover:scale-110" />
                  </div>
                </Popover>
              </div>
              {/* <hr className="w-[86%] border-clear-bl4" /> */}

              <div className="flex flex-col w-[98%] mt-2 ring-2 ring-t-bl p-3 rounded-xl relative">
              <h2 className="absolute top-0 text-lg left-1 fre text-t-bd dark:text-blues-100">
                    Objectives
                  </h2>
                  <div className="absolute right-0 -top-1">
                  <div className="relative mt-2 group">
                    <div className="absolute transition duration-1000 rounded-full opacity-25 -inset-1 bg-gradient-to-r from-t-pl via-t-bl to-t-bpop blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
                    {/* <div className="relative flex justify-start rounded-lg ring-1 items-top"> */}

                    <button
                      onClick={() => {
                        // setObjectives([...objectives, { text: "title 1", progress: "50" }]);
                        setModalOpen(!modalOpen);
                      }}
                      className=" px-2 h-[2em] m-2 rounded-3xl bg-t-bl flex items-center justify-center text-slate-100 gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer md:hover:shadow-xl shadow-clear-bd3 step-2"
                    >
                      <FaPlus className="text-[20px]" />

                    </button>
                  </div>
                </div>
                  <div className="flex flex-col items-center w-full h-full gap-4 mt-8">
               {objectives.length === 0 && <p>No objectives yet</p>}
                {objectives.map((obj, index) => (
                    
              <Objective progress={40} title={obj.title} key={index}/>
                ))}
                </div>
            </div>
            </div> 

           
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default TestProject;

// function KPIUi(props) {
//   // console.log(props.date)

//   const [viewKpi, setViewKpi] = React.useState(false);
//   return (
//     <div
//       className={
//         "flex gap-2 glass-box items-center justify-between  w-[80%] cursor-pointer" +
//         props.color
//       }
//       onClick={() => {
//         props.setSelectedKpi(props.kpis[props.num]);
//         props.setModalOpen(true);
//         // setViewKpi(!viewKpi);
//       }}
//     >
//       <div className="flex items-center ">
//         <div className="flex flex-col max-w-[25em]">
//           <p className="text-xl Font-bold">{props.title}</p>
//           <p className="text-sm">{props.description}</p>
//         </div>
//       </div>
//       <div>
//         {props.date !== null && (
//           <p className="text-xs">
//             By:{" "}
//             {props.date.toLocaleDateString("en-us", {
//               year: "numeric",
//               month: "short",
//               day: "numeric",
//             })}
//           </p>
//         )}
//       </div>
//       <p>
//         {(props.type === "$" ? "$" : "") +
//           " " +
//           props.value +
//           (props.type === "%" ? "%" : props.type === "$" ? "" : props.type)}
//       </p>
//     </div>
//   );
// }

import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { FaArrowDown, FaPlay, FaPlus } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";
import DevLab from "../../pages/devlab/play";

function WizardBuilder() {
  const [update, setUpdate] = React.useState(false);
  const [play, setPlay] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [question, setQuestion] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [placeholder, setPlaceholder] = React.useState("");
  const [subtext, setSubtext] = React.useState("");
  const [popupText, setPopupText] = React.useState("");
  const [stepBuilderArray, setStepBuilderArray] = React.useState([1]);
  // const [counter, setCounter] = React.useState(1);

  const [stepNum, setStepNum] = React.useState(1);

  const [routeArray, setRouteArray] = React.useState([]);

const loadStep = (num) => {
  
  let newArray = routeArray;
  
  let stepUnit = newArray[num-1]

  setQuestion(stepUnit.text);
  setTitle(stepUnit.title);
  setPlaceholder(stepUnit.placeholder);
  setSubtext(stepUnit.subtext);
  setPopupText(stepUnit.popupText);
  setStepNum(num);
  
  setEditMode(true)
}
  
  useEffect(() => {

    if (update) {
      
      
loadStep(stepNum - 1);
      setUpdate(false);
    }
  }, [update]);






  return (
    <div>
      
        {play ? (
          <DevLab setPlay={setPlay} routeArray={routeArray}/>
        ) : (
          <div
        className="flex items-center justify-center  px-4 pt-[1rem] sm:px-6 lg:px-8 drop-shadow-xl fade-effect-quick

"
      >
          <div className="w-full max-w-[42rem] p-10 space-y-8  normal-box-soft">
            <div className="relative flex flex-col items-center justify-between gap-3 p-3 problem-page fade-effect-quick min-h-[25em]">
              <h1 className="text-3xl text-t-bd dark:text-blues-100">
                Wizard Builder
              </h1>
              <button
                className={"absolute flex items-center gap-2 px-3 py-1 my-1 text-lg transition rounded-lg -right-5 -top-7 nun   " + (stepNum > 1 ? " bg-clear-pl4 hover:scale-105 active:scale-95" : " bg-slate-300 cursor-not-allowed")}
                onClick={() => {
                  if(stepNum > 1){
                  setPlay(true);
                  }else{
                    toast.error("Add a step before starting.")
                  }
                }}
              >
                <FaPlay /> Start
              </button>

              {/* { stepBuilderArray.map((step, index) => (
           <StepBuilder num={index} key={index}/>

))} */}

              {/* <StepBuilder num={1}/> */}
              <div className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="flex flex-col items-center">
                    <div className="glass-box bg-clear-bl2 min-h-[10em] flex flex-col items-center p-5 my-2 w-full">
                      <p className="absolute text-xl text-left top-2 left-3 fre text-t-bl">
                        {stepNum}
                      </p>

                      <div className="flex items-center w-full gap-5 ml-8">
                        {" "}
                        <p className="absolute text-left left-7">Title</p>
                        <TextareaAutosize
                          className="w-[70%] ml-20 mt-3 text-xl whitespace-normal textarea-box textarea-tw text-t-bd dark:text-blues-100 !fre font-bold "
                          value={title}
                          placeholder={`Step ${stepNum} title`}
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                        ></TextareaAutosize>
                      </div>
                      <div className="flex items-center w-full">
                        {" "}
                        <p className="absolute text-left left-7"> Question</p>
                        <TextareaAutosize
                          className="w-[80%] ml-24 mt-3 whitespace-normal textarea-box textarea-tw"
                          value={question}
                          placeholder={
                            "How could we ...?"
                          }
                          onChange={(e) => {
                            setQuestion(e.target.value);
                          }}
                        ></TextareaAutosize>
                      </div>
                      <div className="flex items-center w-full">
                        {" "}
                        <p className="absolute text-left left-7">Subtext</p>
                        <TextareaAutosize
                          className="w-[80%] ml-24 mt-3 whitespace-normal textarea-box textarea-tw"
                          value={subtext}
                          placeholder="Description"
                          onChange={(e) => {
                            setSubtext(e.target.value);
                          }}
                        ></TextareaAutosize>
                      </div>
                      <div className="relative flex items-center w-full">
                        {" "}
                        <div className="flex flex-col ">


                        <p className="absolute text-left left-2 top-3">Text Area</p>
                        <p className="absolute text-left top-8 left-2">Placeholder</p>
                        </div>
                        <TextareaAutosize
                          className="w-[80%] ml-24 mt-3 whitespace-normal textarea-box textarea-tw"
                          value={placeholder}
                          placeholder="Enter answer here"
                          onChange={(e) => {
                            setPlaceholder(e.target.value);
                          }}
                        ></TextareaAutosize>
                      </div>
                      <div className="flex items-center w-full">
                        {" "}
                        <p className="absolute text-left left-7">Pop-up Text</p>
                        <TextareaAutosize
                          className="w-[80%] ml-24 mt-3 whitespace-normal textarea-box textarea-tw"
                          value={popupText}
                          placeholder="This step shows..."
                          onChange={(e) => {
                            setPopupText(e.target.value);
                          }}
                        ></TextareaAutosize>
                      </div>
                      {/* <NormalEntry
                      text="Question"
                      placeholder={"How can we improve customer experience?"}
                    />
                    <NormalEntry
                      text="Subtext"
                      placeholder="Think of things that would delight them"
                    />
                    <NormalEntry
                      text="Placeholder"
                      placeholder="Improve customer service by using chatbots."
                    />
                    <NormalEntry
                      text="Pop-up text"
                      placeholder="This question is important because ..."
                    /> */}
                    </div>
                    {/* <FaArrowDown className="text-2xl text-t-bd dark:text-blues-100" /> */}
                  </div>

                  <div className="relative group">
                    <div className="absolute transition duration-1000 rounded-full opacity-0 -inset-1 bg-gradient-to-r from-t-pl via-t-pm via-violet-400 to-t-pd blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
                    <button
                      className="w-[8em] h-[2em] card__btn_next right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer !shadow-clear-pd3 md:hover:shadow-xl m-1 drop-shadow-xl !bg-gradient-to-br from-white via-t-pl  to-t-pm !shadow-2xl "
                      onClick={() => {
                         setStepNum(stepNum + 1);
                        //  setStepBuilderArray([...stepBuilderArray, counter]);

                        let data = {
                          title: title,
                          text: question,
                          subtext: subtext,
                          popupText: popupText,
                          placeholder: placeholder,
                          response: null,
                          num: stepNum,
                        };

                        setRouteArray([...routeArray, data]);
                        // console.log(routeArray);

                        if(editMode){
                setEditMode(false)

                        }
                        
                        setTitle("");
                        setQuestion("");
                        setSubtext("");
                        setPopupText("");
                        setPlaceholder("");
                        
                      }}
                    >
                      <>
                        {/* <div className="flex flex-col items-center mt-2 leading-3"><p className="pl-2 text-t-pd dark:text-t-pd">Add Step</p><p className="pl-2 text-xs text-slate-500 dark:text-slate-500">(1 Credit)</p></div>  */}
                        <p className="pl-2 text-t-pd dark:text-t-pd">
                          Add Step
                        </p>
                        <FaPlus
                          style={{ fontSize: "32px" }}
                          className="pl-2 text-t-pd"
                        />
                      </>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col p-3 glass-box">
                  {routeArray.length === 0 && ( <div
        className={"flex flex-col items-center min-w-[10em] glass-box bg-clear-bl2"}
      >
        No steps added yet
      </div>)}
                  {routeArray.map((step, index) => (
                    <StepVizUnit
                      num={step.num}
                      key={index}
                      text={step.text}
                      title={step.title}
                      placeholder={step.placeholder}
                      subtext={step.subtext}
                      popupText={step.popupText}
                      loadStep={loadStep}
                    />
                  ))}
                </div>
              </div>
            </div>
      </div>
          </div>
        )}
    </div>
  );
}

export default WizardBuilder;


function StepVizUnit({
  text,
  placeholder,
  subtext,
  popupText,
  response,
  title,
  loadStep,
  num,
}) {
  const [color, setColor] = React.useState(" bg-clear-bl2");
  const [color2, setColor2] = React.useState(" bg-t-bl text-t-bd");

  useEffect(() => {
    if (num % 2 === 0) {
      setColor(" bg-clear-bl2");
      setColor2(" bg-t-bl text-t-bd");
    } else {
      setColor(" bg-clear-pl3");
      setColor2(" bg-t-pl text-t-pd");
    }
  }, []);

  return (
    <div className="flex flex-col items-center transition cursor-pointer hover:scale-105 active:scale-95 fade-effect-quick"
    onClick={()=>{
    // console.log(num)
    loadStep(num)
    }}>
      <div
        className={"flex flex-col items-center min-w-[10em] glass-box " + color}
      >
        <div
          className={
            "p-0 absolute -left-2 -top-2 w-[1.5em] h-[1.5em] rounded-full " +
            color2
          }
        >
          {num}
        </div>

        <p className="text-2xl font-bold text-left left-7 text-t-bl">{title}</p>
        <p className="text-lg text-left left-7">{text || "Question"}</p>
        <p className="text-sm text-left left-7">{subtext || "Subtext"}</p>
        <p className="p-1 pl-[2px] text-xs text-left rounded-lg bg-white/70 left-7 text-slate-500">
          {placeholder || "Placeholder"}
        </p>
        <p className="text-xs text-left left-7">{popupText || "Pop-up text"}</p>
      </div>
      <FaArrowDown className="text-2xl text-t-bd dark:text-blues-100" />
    </div>
  );
}




// function NormalEntry({ text, placeholder }) {
//   const [content, setContent] = React.useState("");

//   return (
//     <div className="flex items-center w-full">
//       {" "}
//       <p className="absolute text-left left-7">{text}</p>
//       <TextareaAutosize
//         className="w-[80%] ml-24 mt-3 whitespace-normal textarea-box textarea-tw"
//         value={content}
//         placeholder={placeholder}
//         onChange={(e) => {
//           setContent(e.target.value);
//         }}
//       ></TextareaAutosize>
//     </div>
//   );
// }






//  function StepBuilder({num}) {
//   const [content, setContent] = React.useState("");

//   return (
//     <div className="flex flex-col items-center">
//     <div className="glass-box bg-clear-bl2 min-h-[10em] flex flex-col items-center p-5 my-2 w-full">
//                 <p className="absolute text-xl text-left top-2 left-3 fre text-t-bl">{num}</p>

//               <div className="flex items-center w-full gap-5 ml-8">
//                 {" "}
//                 <p className="absolute text-left left-7">Title</p>

//                 <TextareaAutosize
//                   className="w-[80%] ml-20 mt-3 text-xl whitespace-normal textarea-box textarea-tw text-t-bd dark:text-blues-100 !fre font-bold "
//                   value={content}
//                   placeholder={`Step ${num} title`}
//                   onChange={(e) => {
//                     setContent(e.target.value);
//                   }}
//                 ></TextareaAutosize>
//               </div>

//               <NormalEntry
//                 text="Question"
//                 placeholder={"How can we improve customer experience?"}
//               />
//               <NormalEntry
//                 text="Subtext"
//                 placeholder="Think of things that would delight them"
//               />
//               <NormalEntry
//                 text="Placeholder"
//                 placeholder="Improve customer service by using chatbots."
//               />
//               <NormalEntry
//                 text="Pop-up text"
//                 placeholder="This question is important becase ..."
//               />
//             </div>
//            {/* <FaArrowDown className="text-2xl text-t-bd dark:text-blues-100" /> */}

//             </div>
//   )
// }
